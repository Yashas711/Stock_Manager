package com.ofss;

import java.time.LocalDateTime;

public class Transaction {
    private Long transactionId;
    private Long stockId;
    private Long customerId;
    private String transactionType; // "BUY" or "SELL"
    private int stockQuantity;
    private double transactionPrice; // per stock price at transaction time
    private LocalDateTime transactionDate;
    
	public Transaction() {
		// TODO Auto-generated constructor stub
	}
	public Transaction(Long transactionId, Long stockId, Long customerId, String transactionType, int stockQuantity,
			double transactionPrice, LocalDateTime transactionDate) {
		super();
		this.transactionId = transactionId;
		this.stockId = stockId;
		this.customerId = customerId;
		this.transactionType = transactionType;
		this.stockQuantity = stockQuantity;
		this.transactionPrice = transactionPrice;
		this.transactionDate = transactionDate;
	}
	public Long getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
	public Long getStockId() {
		return stockId;
	}
	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}
	public Long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	public String getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public int getStockQuantity() {
		return stockQuantity;
	}
	public void setStockQuantity(int stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
	public double getTransactionPrice() {
		return transactionPrice;
	}
	public void setTransactionPrice(double transactionPrice) {
		this.transactionPrice = transactionPrice;
	}
	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

    // getters and setters
}
