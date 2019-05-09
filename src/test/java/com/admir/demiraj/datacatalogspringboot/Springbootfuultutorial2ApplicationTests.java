package com.admir.demiraj.datacatalogspringboot;

import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.service.VariablesXLSX_JSON;
import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runner.Runner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

@SpringBootTest
@RunWith(SpringRunner.class)
//@RunWith(SpringJUnit4ClassRunner.class)
@EnableConfigurationProperties
@EnableJpaAuditing
@RestController
@ComponentScan
@WebAppConfiguration
public class Springbootfuultutorial2ApplicationTests{
	private static final String FOLDER_NAME_CDES = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";
	private static final String FOLDER_NAME_VARS = System.getProperty("user.dir") + "/src/main/resources/data/variables/";

	private Set<Variables> JSONcodes;
	private Set<Variables> XLSXcodes1;
	private Set<Variables> XLSXcodes2;
	//VariablesXLSX_JSON xlsx_json = new VariablesXLSX_JSON();

	@Autowired
	private CDEVariableDAO variableDao;
	@Autowired
	private UploadCdes uploadCDEs;

	@Test
	public void contextLoads() {
		//uploadCDEs = new UploadCdes();
		//SpringBootTest..run(DataCatalogueSpringBootApplication.class, args);
		System.out.println("--------- Saving cdes_v1 to the DB ---------");
		String file_path = FOLDER_NAME_CDES + "cdes_v1.xlsx";
		Versions version1 = new Versions("v1");
		uploadCDEs.readExcelSaveToVariabe(file_path, version1);
		System.out.println("--------- --------- --------- --------- ---------");
		System.out.println("--------- Saving cdes_v2 to the DB ---------");
		file_path = FOLDER_NAME_CDES + "cdes_v2.xlsx";
		Versions version2 = new Versions("v2");
		uploadCDEs.readExcelSaveToVariabe(file_path, version2);

	}

}
