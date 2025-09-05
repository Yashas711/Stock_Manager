package com.ofss;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@CrossOrigin(origins="http://localhost:8000")
@RestController
@RequestMapping("/user")
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private RestTemplate restTemplate; 

	public Map<Long, Integer> getPortfolio(Long customerId) {
		List<Transaction> transactions = transactionRepository.findByCustomerId(customerId);
		Map<Long, Integer> portfolio = new HashMap<>();
		for (Transaction txn : transactions) {
			portfolio.putIfAbsent(txn.getStockId(), 0);
			int qty = portfolio.get(txn.getStockId());
			if ("BUY".equalsIgnoreCase(txn.getTransactionType())) {
				qty += txn.getStockQuantity();
			} else if ("SELL".equalsIgnoreCase(txn.getTransactionType())) {
				qty -= txn.getStockQuantity();
			}
			portfolio.put(txn.getStockId(), qty);
		}
		return portfolio;
	}

	// Buy stock
	public void buyStock(Long customerId, Long stockId, int quantity) {
		// Get current stock price from Stock service
		Double currentPrice = restTemplate.getForObject("http://localhost:8081/stocks/" + stockId, Stock.class)
				.getStockPrice();
		if (currentPrice == null) {
			throw new RuntimeException("Stock not found");
		}

		Transaction txn = new Transaction();
		txn.setCustomerId(customerId);
		txn.setStockId(stockId);
		txn.setTransactionType("BUY");
		txn.setStockQuantity(quantity);
		txn.setTransactionPrice(currentPrice);
		txn.setTransactionDate(LocalDateTime.now());

		transactionRepository.save(txn);
	}

	// Sell stock
	public void sellStock(Long customerId, Long stockId, int quantity) {
		Map<Long, Integer> portfolio = getPortfolio(customerId);
		int ownedQty = portfolio.getOrDefault(stockId, 0);
		if (ownedQty < quantity) {
			throw new RuntimeException("Insufficient stock quantity to sell");
		}

		Double currentPrice = restTemplate.getForObject("http://localhost:8081/stocks/" + stockId, Stock.class)
				.getStockPrice();
		if (currentPrice == null) {
			throw new RuntimeException("Stock not found");
		}

		Transaction txn = new Transaction();
		txn.setCustomerId(customerId);
		txn.setStockId(stockId);
		txn.setTransactionType("SELL");
		txn.setStockQuantity(quantity);
		txn.setTransactionPrice(currentPrice);
		txn.setTransactionDate(LocalDateTime.now());

		transactionRepository.save(txn);
	}
}


