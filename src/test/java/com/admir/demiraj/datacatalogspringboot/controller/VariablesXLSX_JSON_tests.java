package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.service.VariablesXLSX_JSON;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.*;
//import junit.framework.Assert;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.service.VariablesXLSX_JSON.*;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import com.admir.demiraj.datacatalogspringboot.repository.CDEVariablesRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.annotation.Resource;

import static org.mockito.Mockito.*;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class VariablesXLSX_JSON_tests
{
    private static final String FOLDER_NAME_CDES = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";
    private static final String FOLDER_NAME_VARS = System.getProperty("user.dir") + "/src/main/resources/data/variables/";

    private List<Variables> JSONcodes;
    private List<Variables> XLSXcodes1;
    private List<Variables> XLSXcodes2;
    VariablesXLSX_JSON xlsx_json = new VariablesXLSX_JSON();

    //@Mock private CDEVariableDAO variableDao;
    //@InjectMocks @Resource private static UploadCdes uploadCDEs = new UploadCdes();


    @BeforeClass
    public static void setUpClass() {
        //uploadCDEs.cdeVariableDAO = new CDEVariableDAO();
        //uploadCDEs.cdeVariableDAO.cdeVariablesRepository = new CDEVariablesRepository();
        //CDEVariableDAO variableDAO = mock(CDEVariableDAO.class);
        //MockitoAnnotations.initMocks(this);
      /*  System.out.println("--------- --------- --------- --------- ---------");
        System.out.println("--------- Saving cdes_v1 to the DB ---------");
        String file_path = FOLDER_NAME_CDES + "cdes_v1.xlsx";
        Versions version1 = new Versions("v1");
        uploadCDEs.readExcelSaveToVariabe(file_path, version1);
        System.out.println("--------- --------- --------- --------- ---------");
        System.out.println("--------- Saving cdes_v2 to the DB ---------");
        file_path = FOLDER_NAME_CDES + "cdes_v4.xlsx";
        Versions version2 = new Versions("v2");
        uploadCDEs.readExcelSaveToVariabe(file_path, version2);
     */
    }

    @AfterClass
    public static void tearDownClass() {
    }

    //runs before every test...
    @Before
    public void setUp() {

    }

    @After
    public void tearDown() {
    }

    @Test
    public void testVariablesXLSX_JSON_v1_1()
    {
        String file_path = FOLDER_NAME_CDES + "cdes_v1.xlsx";
        System.out.println(file_path);
        try{
            XLSXcodes1 = xlsx_json.Read_xlsx(file_path);
        }catch (FileNotFoundException fnfe)
        {   System.err.println("Xlsx not found...!!!");
        }
        catch (IOException io)
        {   System.err.println("Problem with the xlsx...");
        }
        Assert.assertEquals(XLSXcodes1.size(), 172);
        Node testTree = xlsx_json.createTree(XLSXcodes1);
        //xlsx_json.printVariablesTree(testTree);
        JSONObject testJSONVis = xlsx_json.createJSONVisualization(testTree);
        System.out.println("---1.1-- Here comes the visualization JSON ---------");
        System.out.println(testJSONVis.toString());
        System.out.println("--------- --------- --------- --------- ---------");
        System.out.println("---1.2-- And now the Metadata JSON... enriched with the 2 new columns: isCategorical & sql_type ---------");
        JSONObject testJSONMeta = xlsx_json.createJSONMetadata(testTree);
        System.out.println(testJSONMeta.toString());


    }
    @Test
    public void testVariablesXLSX_JSON_v1_2()
    {
        String file_path = FOLDER_NAME_CDES + "cdes_v2.xlsx";
        System.out.println(file_path);
        try{
            XLSXcodes2 = xlsx_json.Read_xlsx(file_path);
        }catch (FileNotFoundException fnfe)
        {   System.err.println("Xlsx not found...!!!");
        }
        catch (IOException io)
        {   System.err.println("Problem with the xlsx...");
        }
        Assert.assertEquals(XLSXcodes2.size(), 197);//172 variables + 25 variables' categories
        Node testTree = xlsx_json.createTree(XLSXcodes2);
        //xlsx_json.printVariablesTree(testTree);
        JSONObject testJSONVis = xlsx_json.createJSONVisualization(testTree);
        System.out.println("---2.1-- Here comes the visualization JSON ---------");
        System.out.println(testJSONVis.toString());
        System.out.println("--------- --------- --------- --------- ---------");
        System.out.println("---2.2-- And now the Metadata JSON ---------");
        JSONObject testJSONMeta = xlsx_json.createJSONMetadata(testTree);
        System.out.println(testJSONMeta.toString());


    }
    /*@Test
    public void testVariablesXLSX_JSON_cdes_newColumns()
    {
        String file_path = FOLDER_NAME_CDES + "cdes_newColumns.xlsx";
        System.out.println(file_path);
        try{
            XLSXcodes2 = xlsx_json.Read_xlsx(file_path);
        }catch (FileNotFoundException fnfe)
        {   System.err.println("Xlsx not found...!!!");
        }
        catch (IOException io)
        {   System.err.println("Problem with the xlsx...");
        }
        Assert.assertEquals(XLSXcodes2.size(), 179);//172 variables + 7 variables' categories (just a few of them...)
        Node testTree = xlsx_json.createTree(XLSXcodes2);
        //xlsx_json.printVariablesTree(testTree);
        JSONObject testJSONVis = xlsx_json.createJSONVisualization(testTree);
        System.out.println("--- CDEs new columns -- Here comes the visualization JSON ---------");
        System.out.println(testJSONVis.toString());
        System.out.println("--------- --------- --------- --------- ---------");
        System.out.println("--- CDEs new columns -- And now the Metadata JSON ---------");
        JSONObject testJSONMeta = xlsx_json.createJSONMetadata(testTree);
        System.out.println(testJSONMeta.toString());


    }*/
    /*@Test
    public void testVariablesXLSX_JSON_test()
    {
        String file_path = FOLDER_NAME_CDES + "cdes_v3_test.xlsx";
        Node testTree = xlsx_json.loadXLSXInMemory(file_path);
        JSONObject testJSONVis = xlsx_json.createJSONVisualization(testTree);
        System.out.println("---TESTIN CDEs-- Here comes the visualization JSON ---------");
        System.out.println(testJSONVis.toString());
        System.out.println("--------- --------- --------- --------- ---------");
        System.out.println("---TESTIN CDEs-- And now the Metadata JSON ---------");
        JSONObject testJSONMeta = xlsx_json.createJSONMetadata(testTree);
        System.out.println(testJSONMeta.toString());
        System.out.println("--------- --------- --------- --------- ---------");
    }*/
    @Test
    public void testVariablesXLSX_JSON_Visualization_Niguarda()
    {
        String file_path = FOLDER_NAME_VARS + "Niguarda_v3.xlsx";
        System.out.println(file_path);
        XLSXcodes2 = null;
        try{
            XLSXcodes2 = xlsx_json.Read_xlsx(file_path);
        }catch (FileNotFoundException fnfe)
        {   System.err.println("Xlsx not found...!!!");
        }
        catch (IOException io)
        {   System.err.println("Problem with the xlsx...");
        }
        Node testTree = xlsx_json.createTree(XLSXcodes2);
        JSONObject testJSONVis = xlsx_json.createJSONVisualization(testTree);
        System.out.println("---2.1-- Here comes the visualization JSON for Niguarda where there seems to be a problem with a null node... ---------");
        System.out.println(testJSONVis.toString());
        System.out.println("--------- --------- --------- --------- ---------");
        /*System.out.println("---2.2-- And now the Metadata JSON ---------");
        JSONObject testJSONMeta = xlsx_json.createJSONMetadata(testTree);
        System.out.println(testJSONMeta.toString());*/
    }
    @Test
    public void testQuotesRemoval()
    {
        String message = "{\"edsd\",\"EDSD\"}";
        Pattern pattern = Pattern.compile("\\{([^}]*)\\s?,\\s?([^}]*)}");
        Matcher matcher = pattern.matcher(message);
        matcher.find();
        String enumCode = matcher.group(2).trim();
        enumCode = enumCode.substring(0,1).equals("\"") ? enumCode.substring(1,enumCode.length()) : enumCode;
        enumCode = enumCode.endsWith("\"") ? enumCode.substring(0,enumCode.length()-1) : enumCode;
        Assert.assertEquals("EDSD",enumCode);
    }
    /*@Test
    public void testVariablesXLSX_JSON_withDAOCDEs()
    {
        String file_path = FOLDER_NAME_VARS + "Freiburg_v1.xlsx";
        Set setOfVars=null;
        try {
            setOfVars = xlsx_json.Read_xlsx(file_path);
        } catch (IOException e)
        {   e.printStackTrace();}
        JSONObject testFullMetadataJSON = xlsx_json.createJSONMetadataWithCDEs(setOfVars);
        System.out.println("---TESTIN CDEs-- Here comes the Metadata JSON for file Freiburg_v1.xslx WITH the CDEs from the DB---------");
        System.out.println(testFullMetadataJSON.toString());
        System.out.println("--------- --------- --------- --------- --------- --------- --------- --------- --------- --------- ---------");
    }*/

  @Test
    public void testStringProcessinStuff()
    {
        String cpath = "/root/oneTwo/threeFour/iAmAtYoDo";////////////////////////////two
        cpath = cpath.substring(0, cpath.lastIndexOf("/"))+"/"+"knockKnock";
        Assert.assertEquals("/root/oneTwo/threeFour/knockKnock", cpath);
    }
}
