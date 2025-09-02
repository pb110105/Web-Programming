# Sử dụng Tomcat 10 + JDK 24
FROM tomcat:10.0.44-jdk24

# Xoá các file webapp default
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy WAR vào webapps
COPY target/survey.war /usr/local/tomcat/webapps/survey.war

# Expose port 8080
EXPOSE 8080

# Chạy Tomcat
CMD ["catalina.sh", "run"]
