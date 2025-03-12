package com.refacty.aspismed.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:local.properties")
public class LocalPropertiesConfig {
}
