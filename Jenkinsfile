pipeline {
    agent {
        docker {            
            image 'node:20.2.0-alpine3.17'
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
                sh 'CI=false npm run build'
            }
        }
    }
}
