package com.ofss;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DbConnectionChecker implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Checking database connection...");

        try {
            // Simple test query to check DB connection
            jdbcTemplate.execute("SELECT 1 FROM DUAL");
            System.out.println("Database connection is active.");

            // Query to fetch all stocks
            List<Stock> stocks = jdbcTemplate.query(
                "SELECT StockId, StockName, StockPrice, ListingPrice, ListingDate, ListedExchange FROM Stock",
                (rs, rowNum) -> {
                    Stock stock = new Stock();
                    stock.setStockId(rs.getLong("StockId"));
                    stock.setStockName(rs.getString("StockName"));
                    stock.setStockPrice(rs.getDouble("StockPrice"));
                    stock.setListingPrice(rs.getDouble("ListingPrice"));
                    stock.setListingDate(rs.getDate("ListingDate").toLocalDate());
                    stock.setListedExchange(rs.getString("ListedExchange"));
                    return stock;
                });

            System.out.println("Stocks fetched from database:");
            for (Stock s : stocks) {
                System.out.println(s.getStockId() + " - " + s.getStockName() + " - " + s.getStockPrice());
            }

        } catch (Exception e) {
            System.err.println("Failed to connect to the database: " + e.getMessage());
        }
    }
}