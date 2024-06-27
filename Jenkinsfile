pipeline {
    agent any

    environment {
        SLACK_CHANNEL = 'mijail-deploy'
        SLACK_CREDENTIAL_ID = 'Mijail-Slack'
        POSTMAN_COLLECTION_ID = '35066665-0a7ea922-74a6-432f-948f-71d951c1a39d'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                script {
                    echo 'Instalando dependencias...'
                    sh 'npm install'
                }
            }
        }

        stage('Tests-API') {
            steps {
                withCredentials([string(credentialsId: 'Postman-PMAK', variable: 'POSTMAN_API_KEY')]) {
                    script {
                        echo 'Ejecutando pruebas de Postman con Newman...'
                        def junitOutput = 'Postman/results.xml'
                        sh "newman run https://api.getpostman.com/collections/${POSTMAN_COLLECTION_ID}?apikey=${POSTMAN_API_KEY} --reporters cli,junit --reporter-junit-export ${junitOutput}"
                    }
                }
            }
        }

        stage('Tests-E2E') {
            steps {
                script {
                    echo 'Ejecutando pruebas E2E con Cypress...'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Despliegue') {
            steps {
                script {
                    echo 'Ejecutando despliegue...'
                    // Agregar pasos de despliegue según sea necesario
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: currentBuild.currentResult == 'SUCCESS' ? 'good' : 'danger',
                message: "El build ${currentBuild.fullDisplayName} finalizó con estado: ${currentBuild.currentResult}",
                teamDomain: 'mijail-deploy',
                tokenCredentialId: "${SLACK_CREDENTIAL_ID}"
            )
        }
    }
}
