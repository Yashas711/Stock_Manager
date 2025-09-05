package com.ofss;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class StockService {

	@Autowired
	private StockRepository stockRepository;

	private Random random = new Random();

	public List<Stock> getAllStocks() {
		return stockRepository.findAllStocks();
	}

	public Stock getStockById(Long stockId) {
		return stockRepository.findStockById(stockId);
	}

	public void addStock(Stock stock) {
		stockRepository.addStock(stock);
	}

	public void updateStock(Stock stock) {
		stockRepository.updateStock(stock);
	}

	public void deleteStock(Long stockId) {
		stockRepository.deleteStock(stockId);
	}

	// Randomly fluctuate stock prices (+/-5%)

	@Scheduled(fixedRate = 60000) // every 60 seconds
	public void updateStockPricesRandomly() {
		System.out.println("Updating stock price........");
		List<Stock> stocks = stockRepository.findAllStocks();
		for (Stock stock : stocks) {
			boolean isPositive = random.nextBoolean(); // true = +, false = -
			double magnitude = random.nextDouble() * 0.5; // 0.0 to 0.5
			double changePercent = isPositive ? magnitude : -magnitude;
			double newPrice = stock.getStockPrice() * (1 + changePercent / 100);
			stock.setStockPrice(newPrice);
			stockRepository.updateStock(stock); // persist new price to DB
		}

	}

}