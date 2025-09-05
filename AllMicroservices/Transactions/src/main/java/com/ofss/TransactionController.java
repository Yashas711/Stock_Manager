package com.ofss;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins="http://localhost:8000")
@RestController
@RequestMapping("/transaction")
public class TransactionController {
	

    @Autowired
    private TransactionService transactionService;
    

    @PostMapping("/{customerId}/buy")
    public ResponseEntity<String> buyStock(@PathVariable Long customerId, @RequestParam Long stockId, @RequestParam int quantity) {
    	transactionService.buyStock(customerId, stockId, quantity);
        return ResponseEntity.ok("Stock purchased successfully");
    }

    @PostMapping("/{customerId}/sell")
    public ResponseEntity<String> sellStock(@PathVariable Long customerId, @RequestParam Long stockId, @RequestParam int quantity) {
        transactionService.sellStock(customerId, stockId, quantity);
        return ResponseEntity.ok("Stock sold successfully");
    }
}

