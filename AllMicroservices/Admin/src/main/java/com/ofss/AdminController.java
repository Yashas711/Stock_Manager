package com.ofss;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:8000")
@RestController
@RequestMapping("/admin")
public class AdminController<CustomerRepository> {

    @Autowired
    private AdminService adminService;

    @PostMapping("/stock")
    public ResponseEntity<?> addStock(@RequestBody Stock stock) {
    	adminService.addStock(stock);
        return ResponseEntity.ok("Stock added.");
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<?> updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        // update logic
    	adminService.updateStock(id, stock);
        return ResponseEntity.ok("Stock updated.");
    }

    @DeleteMapping("/stock/{id}")
    public ResponseEntity<?> deleteStock(@PathVariable Long id) {
        // delete logic
    	adminService.deleteStock(id);
        return ResponseEntity.ok("Stock deleted.");
    }

    @PutMapping("/stock/price/{id}")
    public ResponseEntity<?> changePrice(@PathVariable Long id, @RequestBody Double newPrice) {
        // change price logic
    	adminService.updatePrice(id,newPrice);
        return ResponseEntity.ok("Price changed.");
    }
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        // delete logic
    	adminService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted.");
    }    
}
