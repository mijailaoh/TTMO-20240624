pipeline {
    agent any

    environment {
        SLACK_CHANNEL = 'mijail-deploy' // Cambia esto al canal donde quieres enviar la notificación
        SLACK_CREDENTIAL_ID = 'Mijail-Slack' // Cambia esto al ID de las credenciales de Slack configuradas en Jenkins
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Instalar dependencias
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Ejecutar pruebas de Cypress
                    echo 'Running Cypress tests...'
                    sh 'npx cypress run --quiet'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy a cualquier Instancia
                    echo 'Running deploy...'
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()

            // Enviar notificación a Slack
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: currentBuild.currentResult == 'SUCCESS' ? 'good' : 'danger',
                message: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.currentResult}",
                teamDomain: 'mijail-deploy', // Cambia esto por el dominio de tu equipo en Slack
                tokenCredentialId: "${SLACK_CREDENTIAL_ID}"
            )
        }
    }
}
