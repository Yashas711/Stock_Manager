package com.ofss;

import java.time.LocalDate;

public class Stock {
    private Long stockId;
    private String stockName;
    private Double stockPrice;
    private Double listingPrice;
    private LocalDate listingDate;
    private String listedExchange;
    // getters and setters
	public Long getStockId() {
		return stockId;
	}
	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}
	public String getStockName() {
		return stockName;
	}
	public void setStockName(String stockName) {
		this.stockName = stockName;
	}
	public Double getStockPrice() {
		return stockPrice;
	}
	public void setStockPrice(Double stockPrice) {
		this.stockPrice = stockPrice;
	}
	public Double getListingPrice() {
		return listingPrice;
	}
	public void setListingPrice(Double listingPrice) {
		this.listingPrice = listingPrice;
	}
	public LocalDate getListingDate() {
		return listingDate;
	}
	public void setListingDate(LocalDate listingDate) {
		this.listingDate = listingDate;
	}
	public String getListedExchange() {
		return listedExchange;
	}
	public void setListedExchange(String listedExchange) {
		this.listedExchange = listedExchange;
	}
}
