package com.ofss;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
	

    @Autowired
    private UserService userService;

    @GetMapping("/{customerId}/portfolio")
    public Map<Long, Integer> getPortfolio(@PathVariable Long customerId) {
        return userService.getPortfolio(customerId);
    }

    @PostMapping("/{customerId}/buy")
    public ResponseEntity<String> buyStock(@PathVariable Long customerId, @RequestParam Long stockId, @RequestParam int quantity) {
        userService.buyStock(customerId, stockId, quantity);
        return ResponseEntity.ok("Stock purchased successfully");
    }

    @PostMapping("/{customerId}/sell")
    public ResponseEntity<String> sellStock(@PathVariable Long customerId, @RequestParam Long stockId, @RequestParam int quantity) {
        userService.sellStock(customerId, stockId, quantity);
        return ResponseEntity.ok("Stock sold successfully");
    }
}
