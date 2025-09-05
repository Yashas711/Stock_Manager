package com.ofss;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerRepository {
	

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    
 // Add a new customer
    public void addCustomer( Customer updatedCustomer) {    	
    	String sql = "INSERT INTO Customer (FirstName, LastName, MobileNumber, Email, PANNumber, Password) " +
                "VALUES (?, ?, ?, ?, ?,?)";

   jdbcTemplate.update(sql,
       updatedCustomer.getFirstName(),
       updatedCustomer.getLastName(),
       updatedCustomer.getMobileNumber(),
       updatedCustomer.getEmail(),
       updatedCustomer.getPanNumber(),
       updatedCustomer.getPassword());

    }


    // Update a customer
    public void updateCustomer(Long customerId, Customer updatedCustomer) {
        String sql = "UPDATE CUSTOMER SET FirstName=?, LastName=?, MobileNumber=?, Email=?, PANNumber=?,Password=? WHERE CustomerId=?";
        jdbcTemplate.update(sql, updatedCustomer.getFirstName(), updatedCustomer.getLastName(),
            updatedCustomer.getMobileNumber(), updatedCustomer.getEmail(),updatedCustomer.getPanNumber(),updatedCustomer.getPassword(), customerId);
    }

    // Delete a customer
    public void deleteCustomer(Long customerId) {
        String sql = "DELETE FROM CUSTOMER WHERE CustomerId=?";
        jdbcTemplate.update(sql, customerId);
    }


    @SuppressWarnings("deprecation")
	public Customer getCustomerById(Long customerId) {
        String sql = "SELECT * FROM customer WHERE customerid = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{customerId}, (rs, rowNum) -> {
             Customer c = new Customer();
            c.setCustomerId(rs.getLong("customerid"));
            c.setFirstName(rs.getString("firstname"));
            c.setLastName(rs.getString("lastname"));
            c.setMobileNumber(rs.getString("mobilenumber"));
            c.setEmail(rs.getString("email"));
            c.setPanNumber(rs.getString("pannumber")); // Column name should be all lowercase if your schema is case-insensitive
            // c.setPassword(rs.getString("password")); // Not set, as password isn't in the customer table (recommended)
            return c;
        });
    }
    
    @SuppressWarnings("deprecation")
	public Customer getCustomerByEmail(String email) {
        String sql = "SELECT * FROM customer WHERE email = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{email}, (rs, rowNum) -> {
            Customer c = new Customer();
            c.setCustomerId(rs.getLong("customerid"));
            c.setFirstName(rs.getString("firstname"));
            c.setLastName(rs.getString("lastname"));
            c.setMobileNumber(rs.getString("mobilenumber"));
            c.setEmail(rs.getString("email"));
            c.setPanNumber(rs.getString("pannumber")); // Column name should be all lowercase if your schema is case-insensitive
            // c.setPassword(rs.getString("password")); // Not set, as password isn't in the customer table (recommended)
            return c;
        });
    }
    
    @SuppressWarnings("deprecation")
	public boolean passwordAuthentication(String email, String password) {
        String sql = "SELECT * FROM customer WHERE email = ?";
    	Customer cl= jdbcTemplate.queryForObject(sql, new Object[]{email}, (rs, rowNum) -> {
            Customer c = new Customer();
            c.setCustomerId(rs.getLong("customerid"));
            c.setFirstName(rs.getString("firstname"));
            c.setLastName(rs.getString("lastname"));
            c.setMobileNumber(rs.getString("mobilenumber"));
            c.setEmail(rs.getString("email"));
            c.setPanNumber(rs.getString("pannumber")); // Column name should be all lowercase if your schema is case-insensitive
            c.setPassword(rs.getString("password")); // Not set, as password isn't in the customer table (recommended)
            return c;
        });   
    	
    	return(password.equals(cl.getPassword()));
    	
    }
    
}

