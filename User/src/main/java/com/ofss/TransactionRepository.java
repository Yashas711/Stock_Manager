package com.ofss;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TransactionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void save(Transaction transaction) {
        String sql = "INSERT INTO transactions (transactionid, stockid, customerid, transactiontype, stockquantity, transactionprice, transactiondate) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, transaction.getTransactionId(), transaction.getStockId(), transaction.getCustomerId(),
                                    transaction.getTransactionType(), transaction.getStockQuantity(),
                                    transaction.getTransactionPrice(), Timestamp.valueOf(transaction.getTransactionDate()));
    }

    public List<Transaction> findByCustomerId(Long customerId) {
        String sql = "SELECT * FROM transactions WHERE customerid = ?";
        return jdbcTemplate.query(sql, new Object[]{customerId}, (rs, rowNum) -> {
            Transaction t = new Transaction();
            t.setTransactionId(rs.getLong("transactionid"));
            t.setStockId(rs.getLong("stockid"));
            t.setCustomerId(rs.getLong("customerid"));
            t.setTransactionType(rs.getString("transactiontype"));
            t.setStockQuantity(rs.getInt("stockquantity"));
            t.setTransactionPrice(rs.getDouble("transactionprice"));
            t.setTransactionDate(rs.getTimestamp("transactiondate").toLocalDateTime());
            return t;
        });
    }
}
