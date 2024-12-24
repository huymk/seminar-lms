pipeline {
    agent {
        docker {
            image 'node:16' // Use a Node.js Docker image (can be any version you need)
            label 'docker'  // Optional, specify the label if necessary
        }
    }

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REPO = 'huymk/seminar-lms'
        IMAGE_TAG = "${env.BUILD_ID}"  // Tag the Docker image with the Jenkins build ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                git url: 'https://github.com/huymk/seminar-lms.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies using npm
                    sh 'npm install'
                }
            }
        }

        stage('Run Linter') {
            steps {
                script {
                    // Run ESLint or any other linter you've set up
                    sh 'npm run lint'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run your tests, for example with Jest
                    sh 'npm test'
                }
            }
        }

        stage('Build Next.js') {
            steps {
                script {
                    // Build the Next.js project
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh '''
                    docker build -t ${DOCKER_REGISTRY}/${DOCKER_REPO}:${IMAGE_TAG} .
                    '''
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub (Make sure you have credentials set up in Jenkins)
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker push ${DOCKER_REGISTRY}/${DOCKER_REPO}:${IMAGE_TAG}
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up or notifications
            echo 'Pipeline finished'
        }
        success {
            echo 'Docker image successfully pushed to Docker Hub!'
        }
        failure {
            echo 'There was an issue with the pipeline.'
        }
    }
}
