package com.ofss;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;

	public List<Stock> getAllStocks() {
		return adminRepository.findAllStocks();
	}

	public Stock getStockById(Long stockId) {
		return adminRepository.findStockById(stockId);
	}

	public void addStock(Stock stock) {
		adminRepository.addStock(stock);
	}

	public void updateStock(Long id,Stock stock) {
		adminRepository.updateStock(id,stock);
	}

	public void deleteStock(Long stockId) {
		adminRepository.deleteStock(stockId);
	}
	
	public void updatePrice(Long stockId, Double newPrice) {
		adminRepository.updatePrice(stockId, newPrice);
	}
	
	public void deleteCustomer(Long customerId) {
		adminRepository.deleteCustomer(customerId);
	}


}
