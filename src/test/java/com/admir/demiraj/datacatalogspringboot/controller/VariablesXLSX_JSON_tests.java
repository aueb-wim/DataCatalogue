package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.service.VariablesXLSX_JSON;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.*;
//import junit.framework.Assert;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.service.VariablesXLSX_JSON.*;


//@RunWith(SpringRunner.class)
//@SpringBootTest
public class VariablesXLSX_JSON_tests
{
    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";

    private Set<Variables> JSONcodes;
    private Set<Variables> XLSXcodes1;
    private Set<Variables> XLSXcodes2;
    VariablesXLSX_JSON xlsx_json = new VariablesXLSX_JSON();

    @BeforeClass
    public static void setUpClass() {

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
        String file_path = FOLDER_NAME + "cdes_v1.xlsx";
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
        System.out.println("---1.2-- And now the Metadata JSON ---------");
        JSONObject testJSONMeta = xlsx_json.createJSONMetadata(testTree);
        System.out.println(testJSONMeta.toString());
        System.out.println("--------- --------- --------- --------- ---------");
    }
    @Test
    public void testVariablesXLSX_JSON_v1_2()
    {
        String file_path = FOLDER_NAME + "cdes_v2.xlsx";
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
        System.out.println("--------- --------- --------- --------- ---------");
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

}
