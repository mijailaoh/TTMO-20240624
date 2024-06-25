pipeline {
    agent any

    environment {
        CYPRESS_BASE_URL = 'http://localhost:3000'
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    echo 'Test'
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
