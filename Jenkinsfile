pipeline {
    agent any

    environment {
        CYPRESS_BASE_URL = 'http://localhost:3000'
        SLACK_CHANNEL = 'mijail-deploy' // Cambia esto al canal donde quieres enviar la notificación
        SLACK_CREDENTIAL_ID = 'Mijail-Slack' // Cambia esto al ID de las credenciales de Slack configuradas en Jenkins
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    echo 'Test'
                    // Aquí puedes agregar tus comandos para ejecutar las pruebas
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()

            // Enviar notificación a Slack
             slackSend "Build deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
    }
}
