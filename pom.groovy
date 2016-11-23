project {
  modelVersion '4.0.0'
  parent {
    groupId 'org.springframework.boot'
    artifactId 'spring-boot-starter-parent'
    version '1.4.2.RELEASE'
  }
  groupId 'com.mpalourdio.projects'
  artifactId 'springbootangularhtml5'
  version '1.0.1-SNAPSHOT'
  name 'SpringBoot ang Angular HTML5 Router'
  url 'http://maven.apache.org'
  scm {
    developerConnection 'scm:git:git@github.com:mpalourdio/SpringBootAngularHTML5.git'
  }
  properties {
    'java.version' '1.8'
    'project.build.sourceEncoding' 'UTF-8'
  }
  dependencies {
    dependency {
      groupId 'org.springframework.boot'
      artifactId 'spring-boot-starter-web'
    }
  }
  build {
    pluginManagement {
      plugins {
        plugin {
          artifactId 'maven-release-plugin'
          version '2.5.3'
        }
      }
    }
    plugins {
      plugin {
        groupId 'org.springframework.boot'
        artifactId 'spring-boot-maven-plugin'
      }
      plugin {
        artifactId 'maven-release-plugin'
        configuration {
          pushChanges 'false'
        }
      }
      plugin {
        groupId 'org.codehaus.mojo'
        artifactId 'exec-maven-plugin'
        version '1.5.0'
        executions {
          execution {
            id 'exec-yarn-install'
            phase 'generate-sources'
            goals {
              goal 'exec'
            }
            configuration {
              executable 'yarn'
              arguments {
                argument 'install'
              }
            }
          }
          execution {
            id 'exec-bower-install'
            phase 'generate-sources'
            goals {
              goal 'exec'
            }
            configuration {
              executable 'bower'
              arguments {
                argument 'install'
              }
            }
          }
          execution {
            id 'exec-gulp-build'
            phase 'generate-sources'
            goals {
              goal 'exec'
            }
            configuration {
              executable 'gulp'
              arguments {
                argument 'build'
              }
            }
          }
        }
        configuration {
          workingDirectory '${basedir}/front'
        }
      }
      plugin {
        artifactId 'maven-resources-plugin'
        version '2.7'
        executions {
          execution {
            id 'copy-gulp-dist'
            phase 'process-classes'
            goals {
              goal 'copy-resources'
            }
            configuration {
              outputDirectory '${basedir}/target/classes/static'
              resources {
                resource {
                  directory 'front/dist'
                  filtering 'false'
                }
              }
            }
          }
        }
        configuration {
          encoding '${project.build.sourceEncoding}'
        }
      }
    }
  }
}
