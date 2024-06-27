pipeline {
    agent any

    environment {
        SLACK_CHANNEL = 'mijail-deploy' // Change this to the channel where you want to send the notification
        SLACK_CREDENTIAL_ID = 'Mijail-Slack' // Change this to the ID of the Slack credentials configured in Jenkins
        POSTMAN_COLLECTION_ID = '35066665-0a7ea922-74a6-432f-948f-71d951c1a39d' // ID of your collection in Postman
        POSTMAN_API_KEY = credentials('Postman-PMAK') // ID of the Jenkins credentials for the Postman API Key
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Tests-API') {
            steps {
                script {
                    // Run Postman tests using Newman
                    echo 'Running Postman tests with Newman...'
                    def junitOutput = 'Postman/results.xml'
                    sh "newman run https://api.getpostman.com/collections/${POSTMAN_COLLECTION_ID}?apikey=${POSTMAN_API_KEY} --reporters cli,junit --reporter-junit-export ${junitOutput}"
                }
            }
        }

        stage('Tests-E2E') {
            steps {
                script {
                    // Run E2E tests with Cypress
                    echo 'Running Cypress tests...'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy to any Instance
                    echo 'Running deploy...'
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()

            // Send notification to Slack
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: currentBuild.currentResult == 'SUCCESS' ? 'good' : 'danger',
                message: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.currentResult}",
                teamDomain: 'mijail-deploy', // Change this to your team's domain in Slack
                tokenCredentialId: "${SLACK_CREDENTIAL_ID}"
            )
        }
    }
}
