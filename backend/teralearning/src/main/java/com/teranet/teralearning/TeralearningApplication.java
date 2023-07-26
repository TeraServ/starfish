package com.teranet.teralearning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TeralearningApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeralearningApplication.class, args);
	}
}