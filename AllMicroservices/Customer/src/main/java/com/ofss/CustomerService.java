package com.ofss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

	
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
    private JdbcTemplate jdbcTemplate;

	
	
	public void addCustomer(Customer customer) {
		customerRepository.addCustomer(customer);
	}
	
	
	public void updateCustomer(Long id,Customer customer) {
		customerRepository.updateCustomer(id,customer);
	}
	
	public void deleteCustomer(Long customerId) {
		customerRepository.deleteCustomer(customerId);
		}
	
	public Customer getCustomerById(Long customerId) {
		return customerRepository.getCustomerById(customerId);
		}
	public Customer getCustomerByEmail(String email) {
		return customerRepository.getCustomerByEmail(email);
		}
	
	public boolean passwordAuthentication(String email, String password) {
		return customerRepository.passwordAuthentication(email, password);
		}

	// Get customer portfolio as map of stockId -> net quantity owned
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
	
	public List<Transaction> getTransaction(long customerId) {
	    List<Transaction> customerTransactions = new ArrayList<>();
	    List<Transaction> transactions = transactionRepository.findByCustomerId(customerId);
	    for (Transaction txn : transactions) {
	        if (txn.getCustomerId() == customerId) {
	            customerTransactions.add(txn);
	        }
	    }

	    return customerTransactions;
	}
	
	public List<Customer> getAllCustomers() {
	    String sql = "SELECT CustomerId, FirstName, LastName, MobileNumber, Email FROM Customer";
	    return jdbcTemplate.query(sql, (rs, rowNum) -> {
	        Customer c = new Customer();
	        c.setCustomerId(rs.getLong("CustomerId"));
	        c.setFirstName(rs.getString("FirstName"));
	        c.setLastName(rs.getString("LastName"));
	        c.setMobileNumber(rs.getString("MobileNumber")); // Fixed typo
	        c.setEmail(rs.getString("Email"));
	        return c;
	    });
	}

}
