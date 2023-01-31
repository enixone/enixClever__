package com.enixone.enixClever.core.configuration;

import com.enixone.enixClever.core.interceptors.SessionCheckInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@EnableWebMvc
@Configuration
@ComponentScan("com.enixone")
public class MvcConfiguration extends WebMvcConfigurerAdapter {

    @Bean
    public ViewResolver setInternalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//        resolver.setSuffix(".html");
        resolver.setViewClass(JstlView.class);
        return resolver;
    }

    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        try {
            multipartResolver.setMaxUploadSize(-1); // 20 MB
        } catch (Exception e) {
            e.printStackTrace();
        }
        return multipartResolver;
    }

    @Bean
    public SessionCheckInterceptor sessionCheckInterceptor() {
    	return new SessionCheckInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(sessionCheckInterceptor());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	registry.addResourceHandler("/cms/**").addResourceLocations("/cms/").setCachePeriod(1);
    	registry.addResourceHandler("/assets/**").addResourceLocations("/assets/").setCachePeriod(1);
    	registry.addResourceHandler("/manage/**").addResourceLocations("/manage/").setCachePeriod(1);
        registry.addResourceHandler("/plugins/**").addResourceLocations("/plugins/").setCachePeriod(1);
        
//        registry.addResourceHandler("/assets/**").addResourceLocations("/assets/").setCachePeriod(31556926);
//        registry.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
//        registry.addResourceHandler("/cms/**").addResourceLocations("/cms/").setCachePeriod(31556926);
//        registry.addResourceHandler("/plugins/**").addResourceLocations("/plugins/").setCachePeriod(31556926);
//        registry.addResourceHandler("/sample-page/**").addResourceLocations("/sample-page/").setCachePeriod(31556926);
        
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

}