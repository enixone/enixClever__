package com.enixone.enixClever.core.mybatis;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

@EnableTransactionManagement
@Configuration
@MapperScan("com.enixone.enixClever.cms.was.dao")
@ComponentScan(basePackages = {"com.enixone.enixClever.cms.was.service"}, useDefaultFilters = false, includeFilters = {@ComponentScan.Filter(Service.class)})
@PropertySource("classpath:resources/configuration.properties")
public class MybatisConfiguration implements TransactionManagementConfigurer {
    private @Value("${db.dbms}") String dbms;
    private @Value("${db.driver}") String driver;
    private @Value("${db.url}") String url;
    private @Value("${db.userName}") String userName;
    private @Value("${db.password}") String password;

    /**
     * 데이터 소스 설정 빈
     * @return
     * @throws ClassNotFoundException
     */
    @Bean
    public DataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();

        //설정값에 있는 암호화된 DB패스워드를 복호화 한다.
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();  
		encryptor.setAlgorithm("PBEWITHMD5ANDDES");  
		encryptor.setPassword("enixClever-ESM");
		
        dataSource.setDriverClassName(driver);
        dataSource.setUsername(encryptor.decrypt(userName));
        dataSource.setPassword(encryptor.decrypt(password));
        dataSource.setUrl(url);
        dataSource.setDefaultAutoCommit(false);
        dataSource.setMaxActive(10);
        dataSource.setMinIdle(5);

        return dataSource;
    }

    /**
     * 트랜잭션 매니저 빈
     * @return
     * @throws ClassNotFoundException
     */
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    /**
     * 세션 팩토리 빈
     * @return
     * @throws Exception
     */
    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource());
        factoryBean.setConfigLocation(new PathMatchingResourcePatternResolver().getResource("classpath:mybatis/MybatisConfig.xml"));
        return factoryBean.getObject();
    }

    @Bean
    public SqlSession sqlSession() throws Exception {
        SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
        return sqlSessionTemplate;
    }

    @Override
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        return transactionManager();
    }
}
