package config.root;


import java.util.HashMap;
import java.util.Map;
//import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//import syra.etl.app.scheduler.AutowiringSpringBeanJobFactory;

/**
 *
 * Production specific configuration - creates a localhost postgresql datasource,
 * sets hibernate on create drop mode and inserts some test data on the database.
 *
 * Set -Dspring.profiles.active=production to activate this config.
 *
 */
@Configuration
@Profile("production")
@EnableTransactionManagement
public class ProductionConfiguration {

	@Autowired
	//private ApplicationContext applicationContext;

    /*@Bean(initMethod = "init")
    public TestDataInitializer initTestData() {
        return new TestDataInitializer();
    }*/

    @Bean(name = "datasource")
    public DriverManagerDataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
      
        dataSource.setUrl("jdbc:mysql://localhost/insightNow?loglevel=0");
        dataSource.setUsername("root");
        dataSource.setPassword("root"); 
        
       /*  dataSource.setUrl("jdbc:mysql://cloudhiti.ccisxph2nigh.us-west-2.rds.amazonaws.com:3306/cloudhiti?loglevel=0");
        dataSource.setUsername("cloudhiti");
        dataSource.setPassword("cloudhiti"); */
        
      /*  dataSource.setUrl("jdbc:mysql://107.180.2.11:3306/insightnow?loglevel=0");
        dataSource.setUsername("cloudhitiadmin");
        dataSource.setPassword("cloudhitiadmin2017");*/  
        return dataSource;
    }
	
    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DriverManagerDataSource dataSource) {

        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource);
        entityManagerFactoryBean.setPackagesToScan(new String[]{"app.model"});
        entityManagerFactoryBean.setLoadTimeWeaver(new InstrumentationLoadTimeWeaver());
        entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Map<String, Object> jpaProperties = new HashMap<String, Object>();
        jpaProperties.put("hibernate.hbm2ddl.auto", "validate");
        jpaProperties.put("hibernate.show_sql", "false");
        jpaProperties.put("hibernate.format_sql", "true");
        jpaProperties.put("hibernate.use_sql_comments", "true");
        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        entityManagerFactoryBean.setJpaPropertyMap(jpaProperties);

        return entityManagerFactoryBean;
    }
    
    
     
}
