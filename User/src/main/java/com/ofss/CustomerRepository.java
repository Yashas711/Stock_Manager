package com.ofss;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Customer findById(Long customerId) {
        String sql = "SELECT * FROM customer WHERE customerid = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{customerId}, (rs, rowNum) -> {
            Customer c = new Customer();
            c.setCustomerId(rs.getLong("customerid"));
            c.setFirstName(rs.getString("firstname"));
            c.setLastName(rs.getString("lastname"));
            c.setMobileNumber(rs.getString("mobilenumber"));
            c.setEmail(rs.getString("email"));
            return c;
        });
    }
}

