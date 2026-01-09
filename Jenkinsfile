pipeline {
    agent any

    /* --------------------------------------------
     * Tool Configuration
     * -------------------------------------------- */
    tools {
        nodejs 'node-brew'
    }

    /* --------------------------------------------
     * Global Environment Variables
     * -------------------------------------------- */
    environment {
        DEV_ENV   = 'dev'
        QA_ENV    = 'qa'
        STAGE_ENV = 'stage'
        PROD_ENV  = 'prod'

        ESLINT_STATUS = 'skipped'
        DEV_STATUS    = 'skipped'
        QA_STATUS     = 'skipped'
        STAGE_STATUS  = 'skipped'
        PROD_STATUS   = 'skipped'
    }

    /* --------------------------------------------
     * Pipeline Options
     * -------------------------------------------- */
    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    /* --------------------------------------------
     * Pipeline Stages
     * -------------------------------------------- */
    stages {

        /* ============================================
         * Environment Validation
         * ============================================ */
        stage('🔧 Environment Check') {
            steps {
                sh '''
                  echo "Node Version:"
                  node -v
                  echo "NPM Version:"
                  npm -v
                '''
            }
        }

        /* ============================================
         * Dependency Installation
         * ============================================ */
        stage('📦 Install Dependencies') {
            steps {
                sh '''
                  npm ci
                  npx playwright install --with-deps chromium
                '''
            }
        }

        /* ============================================
         * Static Code Analysis (ESLint)
         * ============================================ */
        stage('🔍 ESLint Analysis') {
            steps {
                sh 'mkdir -p eslint-report'

                script {
                    env.ESLINT_STATUS = sh(
                        script: 'npm run lint',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                sh 'npm run lint:report || true'
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'eslint-report',
                        reportFiles: 'index.html',
                        reportName: 'ESLint Report'
                    ])
                }
            }
        }

        /* ============================================
         * DEV Environment Tests
         * ============================================ */
        stage('🔧 DEV Tests') {
            steps {
                script {
                    env.DEV_STATUS = sh(
                        script: '''
                          npx playwright test --project=chromium \
                          --reporter=line \
                          --output=allure-results-dev
                        ''',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }
            }
            post {
                always {
                    allure([
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results-dev']]
                    ])
                }
            }
        }

        /* ============================================
         * QA Environment Tests
         * ============================================ */
        stage('🔍 QA Tests') {
            when {
                expression { env.DEV_STATUS == 'success' }
            }
            steps {
                script {
                    env.QA_STATUS = sh(
                        script: '''
                          npx playwright test --project=chromium \
                          --reporter=line \
                          --output=allure-results-qa
                        ''',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }
            }
            post {
                always {
                    allure([
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results-qa']]
                    ])
                }
            }
        }

        /* ============================================
         * STAGE Environment Tests
         * ============================================ */
        stage('🎯 STAGE Tests') {
            when {
                expression { env.QA_STATUS == 'success' }
            }
            steps {
                script {
                    env.STAGE_STATUS = sh(
                        script: '''
                          npx playwright test --project=chromium \
                          --reporter=line \
                          --output=allure-results-stage
                        ''',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }
            }
            post {
                always {
                    allure([
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results-stage']]
                    ])
                }
            }
        }

        /* ============================================
         * PROD Smoke Tests
         * ============================================ */
        stage('🚀 PROD Smoke Tests') {
            when {
                expression { env.STAGE_STATUS == 'success' }
            }
            steps {
                script {
                    env.PROD_STATUS = sh(
                        script: '''
                          npx playwright test --grep @smoke \
                          --project=chromium \
                          --reporter=line \
                          --output=allure-results-prod
                        ''',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }
            }
            post {
                always {
                    allure([
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results-prod']]
                    ])
                }
            }
        }
    }

    /* --------------------------------------------
     * Post Pipeline Actions
     * -------------------------------------------- */
    post {
        always {
            echo '============================================'
            echo '📊 PIPELINE SUMMARY'
            echo '============================================'
            echo "ESLint : ${env.ESLINT_STATUS}"
            echo "DEV    : ${env.DEV_STATUS}"
            echo "QA     : ${env.QA_STATUS}"
            echo "STAGE  : ${env.STAGE_STATUS}"
            echo "PROD   : ${env.PROD_STATUS}"
        }

        success {
            echo '✅ Pipeline completed successfully'
        }

        failure {
            echo '❌ Pipeline failed – check stage logs'
        }
    }
}
