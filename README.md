# Stock_Manager

## Project name: Stock Manager

Project Overview:
StockManager is a Java-based application designed to manage stocks and customers. It provides functionalities to add, remove, and update stocks, as well as to manage customer information and their interactions with the stock system.
Project Features:

--create an array of stock objects (50 in size)
--use Scanner class, to get inputs from the user
	--Add
	--list
	--Remove(based on id)
	--update(based on id)
--Add is selected
	--Prompt the user to enter the stock details (id,...) and add it to stock array
Stock Management:

Add a new stock: Allows users to add a new stock to the system by providing details such as name, symbol, price, and quantity.
Remove a stock: Enables users to remove a stock from the system based on its symbol.
Update stock details: Allows users to update the price or quantity of an existing stock.
Customer Management:

Add a new customer: Allows users to add a new customer to the system by providing details such as name, ID, and email.
Remove a customer: Enables users to remove a customer from the system based on their ID.
Stock Transactions:

Purchase stocks:

Allows customers to purchase stocks from the available stocks. It updates the stock quantity and maintains purchase history for the customer.
Sell stocks:

Enables customers to sell stocks they own. It updates the stock quantity and maintains sale history for the customer.
Persistence:

Data Storage: Utilizes file handling to store stock and customer information persistently. Data is stored oracle database tables, which are read and written upon program execution.
