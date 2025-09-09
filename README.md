# StockManager

## Overview

**StockManager** is a Java-based microservices application for stock market management. It allows **administrators** to manage stocks and **users** to buy, sell, and view their portfolios. It uses an **Oracle Database** for secure data storage and **Spring Boot** for building RESTful APIs with modular services.

---

## Features

### 🛠️ Admin Features
- Add, remove, and modify stocks
- Change stock prices
- Secure admin-only endpoints

### 👤 User Features
- Buy and sell stocks
- View personal portfolio
- Track transaction history

### 📈 Stock Features
- Real-time-stimulation/randomized price fluctuations

---

## 🗃️ Data Model
- **Stocks**
- **Customers**
- **Transactions**

---

## 🚀 Technologies Used
- Java 8+
- Spring Boot (Spring Starter Project)
- JDBC
- REST APIs
- Oracle Database

---

## 🧩 Microservices

| Microservice              | Description                                      |
|--------------------------|--------------------------------------------------|
| `admin-service`          | Admin stock management and price changes         |
| `user-service`           | Buy/sell stocks and view user portfolio          |
| `stock-service`          | Stock registry and listing                       |
| `transaction-service`    | Records of buy/sell actions                      |

---

## 🛠️ Setup Instructions

### 1. Clone Repositories
Clone the repository for each microservice.

### 2. Configure Database Connection

Edit `application.properties` in each service:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
spring.datasource.username=your_user
spring.datasource.password=your_pass
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
