package com.ofss;

import java.util.List;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

class AuthRequest {
    private String email;
    private String password;
    
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
}


@CrossOrigin(origins="http://localhost:8000")
@RestController
@RequestMapping("/customer")
public class CustomerController {
	

    @Autowired
    private CustomerService customerService;
    
    
    @PostMapping()
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
    	customerService.addCustomer(customer);
        return ResponseEntity.ok("Customer added.");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updadateCustermer(@PathVariable Long id,@RequestBody Customer customer) {

    	customerService.updateCustomer(id,customer);
        return ResponseEntity.ok("Customer updated.");
    }

    @GetMapping("/{customerId}/portfolio")
    public Map<Long, Integer> getPortfolio(@PathVariable Long customerId) {
        return customerService.getPortfolio(customerId);
    }
    
    @GetMapping("/customerid/{customerId}")
    public Customer getCustomerById(@PathVariable Long customerId) {
        return customerService.getCustomerById(customerId);
    }
    
    @GetMapping("/email")
    public Customer getCustomerById(@RequestBody String email) {
        return customerService.getCustomerByEmail(email);
    }
    
    @PostMapping("/authentication")
    public Boolean passwordAuthentication(@RequestBody AuthRequest request) {
        return customerService.passwordAuthentication(request.getEmail(),request.getPassword());
    }
    
    @GetMapping("/{customerId}/transaction")
    public List<Transaction> getTransaction(@PathVariable Long customerId) {
        return customerService.getTransaction(customerId);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        // delete logic
    	customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted.");
    } 
    
}
