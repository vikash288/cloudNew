package app.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import config.root.AppSecurityConfig;
import config.root.DevelopmentConfiguration;
import config.root.ProductionConfiguration;
import config.servlet.ServletContextConfig;
import config.root.RootContextConfig;
  
 
/**
*
* Replacement for most of the content of web.xml, sets up the root and the servlet context config.
*
*/
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	 

	 @Override
    protected Class<?>[] getRootConfigClasses() {
		  return new Class<?>[]{  RootContextConfig.class,ProductionConfiguration.class, DevelopmentConfiguration.class, AppSecurityConfig.class
              };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] {ServletContextConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    } 


}
