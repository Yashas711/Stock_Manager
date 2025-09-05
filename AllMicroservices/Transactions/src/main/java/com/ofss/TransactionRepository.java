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
        String sql = "INSERT INTO transaction ( stockid, customerid, transactiontype, stockquantity, transactionprice, transactiondate) "
                   + "VALUES ( ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,  transaction.getStockId(), transaction.getCustomerId(),
                                    transaction.getTransactionType(), transaction.getStockQuantity(),
                                    transaction.getTransactionPrice(), Timestamp.valueOf(transaction.getTransactionDate()));
    }

    @SuppressWarnings("deprecation")
	public List<Transaction> findByCustomerId(Long customerId) {
        String sql = "SELECT * FROM \"TRANSACTION\" WHERE CUSTOMERID = ?";

        return jdbcTemplate.query(sql, new Object[]{customerId}, (rs, rowNum) -> {
            Transaction txn = new Transaction();
            txn.setTransactionId(rs.getLong("TRANSACTIONID"));
            txn.setStockId(rs.getLong("STOCKID"));
            txn.setCustomerId(rs.getLong("CUSTOMERID"));
            txn.setTransactionType(rs.getString("TRANSACTIONTYPE"));
            txn.setStockQuantity(rs.getInt("STOCKQUANTITY"));
            txn.setTransactionPrice(rs.getDouble("TRANSACTIONPRICE"));

            java.sql.Timestamp timestamp = rs.getTimestamp("TRANSACTIONDATE");
            if (timestamp != null) {
                txn.setTransactionDate(timestamp.toLocalDateTime()); 
                }

            return txn;
        });
    }


}
