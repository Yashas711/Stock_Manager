## StockManager
# Overview
StockManager is a Java-based microservices for stock market management. It allows administrators to manage stocks and users to buy, sell, and view their portfolios. Oracle Database is used for secure data storage, and Spring Boot enables RESTful APIs and service modularity.

Features
Admin:

Add, remove, modify stocks

Change stock prices

Secure endpoints and admin-only access

User:

Buy and sell stocks

View personal portfolio

Transaction tracking

Stock:

Real-time price fluctuations (automated/random)

Data Model:

Stocks, Customers, Transactions

Technologies Used
Java 8+

Spring Boot (Spring Starter Project)

JDBC

REST APIs

Oracle Database

Microservices
admin-service: Admin stock management and price changes

user-service: Stock buying/selling and user portfolio

stock-service: Stock registry and listing

transaction-service: Records of buy/sell actions

price-fluctuation-service: Automated/random stock price updates

Setup Instructions
Clone the repository for each microservice.

Configure application.properties:

text
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
spring.datasource.username=your_user
spring.datasource.password=your_pass
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
Build each microservice using Maven or your IDE.

Start each service using mvn spring-boot:run or from your IDE.

Usage
Start the Oracle database and ensure schema is created.

Run all microservices: each exposes REST API endpoints for features described above.

Admin endpoints require authentication (see code comments for implementation).

User actions and portfolios are calculated from transaction history for best database practices.

Portfolio Calculation
Portfolios are dynamically aggregated from the transactions table for each user. No separate portfolio table is needed for normalization and scalability.
