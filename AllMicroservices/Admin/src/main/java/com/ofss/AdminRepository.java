package com.ofss;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

	 @Autowired
	    private JdbcTemplate jdbcTemplate;

	    public int addStock(Stock stock) {
	        String sql = "INSERT INTO stock ( stockname, stockprice, listingprice, listingdate, listedexchange) "
	                   + "VALUES ( ?, ?, ?, ?, ?)";
	        return jdbcTemplate.update(sql,  stock.getStockName(), stock.getStockPrice(),
	                                   stock.getListingPrice(), stock.getListingDate(), stock.getListedExchange());
	    }

	    public int updateStock(Long id,Stock stock) {
	    	String sql = "UPDATE Stock SET stockname=?, stockprice=?, listingprice=?, listingdate=?, listedexchange=? WHERE stockid=?";
	    	return jdbcTemplate.update(sql, stock.getStockName(), stock.getStockPrice(), stock.getListingPrice(),
	                                   stock.getListingDate(), stock.getListedExchange(), id);
	    }
	    public int updatePrice(Long id,Double newPrice) {
	    	String sql = "UPDATE Stock SET stockprice=? WHERE stockid=?";
	    	return jdbcTemplate.update(sql, newPrice , id);
	    }
	    

	    public int deleteStock(Long stockId) {
	        String sql = "DELETE FROM stock WHERE stockid = ?";
	        return jdbcTemplate.update(sql, stockId);
	    }

	    @SuppressWarnings("deprecation")
		public Stock findStockById(Long stockId) {
	        String sql = "SELECT * FROM stock WHERE stockid = ?";
	        return jdbcTemplate.queryForObject(sql, new Object[]{stockId}, (rs, rowNum) -> {
	            Stock s = new Stock();
	            s.setStockId(rs.getLong("stockid"));
	            s.setStockName(rs.getString("stockname"));
	            s.setStockPrice(rs.getDouble("stockprice"));
	            s.setListingPrice(rs.getDouble("listingprice"));
	            s.setListingDate(rs.getDate("listingdate").toLocalDate());
	            s.setListedExchange(rs.getString("listedexchange"));
	            return s;
	        });
	    }

	    public List<Stock> findAllStocks() {
	        String sql = "SELECT * FROM stock";
	        return jdbcTemplate.query(sql, (rs, rowNum) -> {
	            Stock s = new Stock();
	            s.setStockId(rs.getLong("stockid"));
	            s.setStockName(rs.getString("stockname"));
	            s.setStockPrice(rs.getDouble("stockprice"));
	            s.setListingPrice(rs.getDouble("listingprice"));
	            s.setListingDate(rs.getDate("listingdate").toLocalDate());
	            s.setListedExchange(rs.getString("listedexchange"));
	            return s;
	        });
	    }
	    
	    public int deleteCustomer(Long customerId) {
	        String sql = "DELETE FROM customer WHERE CUSTOMERID = ?";
	        return jdbcTemplate.update(sql, customerId);
	    }
	    
	    
}
