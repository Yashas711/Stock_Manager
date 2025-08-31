package com.ofss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling 
@SpringBootApplication
@EnableDiscoveryClient
public class StocksManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StocksManagerApplication.class, args);
		System.out.println("Stocks up and running...");
	}

}
