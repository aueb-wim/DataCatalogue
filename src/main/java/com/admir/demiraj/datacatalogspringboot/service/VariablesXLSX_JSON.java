package com.admir.demiraj.datacatalogspringboot.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidParameterException;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.commons.io.FileUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

/**
 * VariablesXLSX_JSON class creates 2 different JSONs from an XLSX file which contains info about hospitals' variables.
 * In order to load the XLSX run loadXLSXInMemory(). This one outputs a tree with the variables.
 * To generate the Visualisation JSON run createJSONVisualization(). Give the tree as input.
 * To generate the Metadata JSON run createJSONMetadata(). Give the tree as input.
 */

@Service
public class VariablesXLSX_JSON
{
    @Autowired
    private CDEVariableDAO cdeVariableDAO;
    @Autowired
    private VersionDAO versionDAO;
    private String PATHOLOGY_CODE="";//we keepin the code of the pathology here (we might use it in the concept-paths)

    /**
     * @param file: the path of the input XLSX file
     * @return the tree of the variables
     */
  /*  public Node loadXLSXInMemory(String file)
    {
        //private Set<Variables> JSONcodes;
        List<Variables> XLSXcodes=null;
        try{
            XLSXcodes = Read_xlsx(file);
        }catch (FileNotFoundException fnfe)
        {   System.err.println("Xlsx not found...!!!");
        }
        catch (IOException io)
        {   System.err.println("Problem with the xlsx...");
        }
        Node testTree = createTree(XLSXcodes);
        return testTree;
    }
*/
    /**
     * Reads all variables (and categories -optional-) from an xlsx file (has to be structured as expected).
     * Creates Variables (AND Categories -optional-) instances. Adds them in a Hashset.
     * @param ff
     * @return A HashSet with all Variables
     */
/*
    public List<Variables> Read_xlsx(String ff) throws IOException
    {
        List<Variables> xlsxVars = new ArrayList<>();//<Variables>
        FileInputStream fis = null;
        fis = new FileInputStream(ff);
        Workbook workbook = null;
        try {
            workbook = WorkbookFactory.create(fis);
        } catch (InvalidFormatException|EncryptedDocumentException ex) {
            System.err.println("Smthing went wrong.........");
        }
        Sheet sheet = workbook.getSheetAt(0);
        Iterator rowIterator = sheet.iterator();
        while (rowIterator.hasNext())
        {
            Row row = (Row) rowIterator.next();
            if (row.getRowNum() == 0)
                continue;//first row has column names
            Iterator cellIterator = row.cellIterator();
            Variables newVar = null;
            while (cellIterator.hasNext())
            {
                Cell cell = (Cell) cellIterator.next();
                if (cell.getColumnIndex() == 0) //csvFile
                {
                    newVar = new Variables();
                    if (cell.getStringCellValue()!=null) {newVar.setCsvFile(cell.getStringCellValue()); System.out.println("***** Column-A:"+newVar.getCsvFile()+"*****");}

                } else if (cell.getColumnIndex() == 1)//name
                {  newVar.setName(cell.getStringCellValue()); }
                else if (cell.getColumnIndex() == 2)//code
                {   newVar.setCode(cell.getStringCellValue()); }
                else if (cell.getColumnIndex() == 3)//type
                {   newVar.setType(cell.getStringCellValue()); }
                //else if (cell.getColumnIndex() == 4)//sql_type
                //    newVar.setSql_type(cell.getStringCellValue());
                //else if (cell.getColumnIndex() == 5)//isCategorical
                //    newVar.setIsCategorical(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 4)//values
                    newVar.setValues(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 5)//unit
                    newVar.setUnit(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 6)//canBeNull
                    newVar.setCanBeNull(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 7)//description
                    newVar.setDescription(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 8)//comments
                    newVar.setComments(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 9)//conceptPath
                    newVar.setConceptPath(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 10)//methodology
                    newVar.setMethodology(cell.getStringCellValue());

            }
            xlsxVars.add(newVar);
        }
        System.out.println("********* Total of "+xlsxVars.size()+" XLSX elements **********");
        return xlsxVars;
    }
    */
    /**
     *
     * @param xlsxVars: Set of the Variables parsed from the input XLSX
     * @param cdeVars: Set of the CDEs of the version we want
     * @return the Metadata JSON which contains the xlsxVars plus the version of the CDEs we want
     */
    public JSONObject createJSONMetadataWithCDEs(List<Variables> xlsxVars, List<CDEVariables> cdeVars)
    {
        /*Versions lastVersion = versionDAO.getLastCdeVersion();
        System.out.println("cde variables found : "+ cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id()).size());
        List<CDEVariables> cdeVars = cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id());*/
        List<Variables> varsThatRCdes = new ArrayList<>();
        for (CDEVariables cde : cdeVars){
            varsThatRCdes.add(new Variables(cde));
        }
        xlsxVars.addAll(varsThatRCdes);//to the xlsxVars add the Variables that actually are the CDEs
        return createJSONMetadata(createTree(xlsxVars));//return the full Metadata JSON
    }
    /**
     * Creates the Variables Tree from the Set of Variables
     * @param xlsxVars
     * @return The root Node of the Variables Tree
     */
    public Node createTree(List<Variables> xlsxVars)
    {
        Node root = new Node("root_is_no_longer_called_root",null,null);//initializing the code of the root node so as to change it with the pathology code
        Iterator<Variables> it = xlsxVars.iterator();
        while (it.hasNext())
            addPathNodes(it.next(), root);
        return root;
    }
    /**
     * Creates the Variables Tree from the Set of Variables PLUS the Set of the CDEs
     * @param xlsxVars
     * @param cdeVars: Set of the CDEs in the version we want
     * @return The root Node of the Variables Tree
     */
    public Node createTree2(List<Variables> xlsxVars, List<CDEVariables> cdeVars)
    {
        //############# same as in createJSONMetadataWithCDEs() ##########
        List<Variables> varsThatRCdes = new ArrayList<>();
        for (CDEVariables cde : cdeVars){
            varsThatRCdes.add(new Variables(cde));
        }
        xlsxVars.addAll(varsThatRCdes);//to the xlsxVars add the Variables that actually are the CDEs
        //###################### ################## ################## ###
        Node root = new Node("root_is_no_longer_called_root",null,null);//initializing the code of the root node so as to change it with the pathology code
        Iterator<Variables> it = xlsxVars.iterator();
        while (it.hasNext())
            addPathNodes(it.next(), root);
        return root;
    }
    public Node createTree3( List<CDEVariables> cdeVars)
    {
        System.out.println("~~~~~~~~~******** This is me runnin for creating the hierarchy tree when parsin CDEs ********~~~~~~~~~");
        //############# same as in createJSONMetadataWithCDEs() ##########
        List<Variables> varsThatRCdes = new ArrayList<>();
        for (CDEVariables cde : cdeVars){
            varsThatRCdes.add(new Variables(cde));
        }
        List<Variables> xlsxVars = new ArrayList<>();
        xlsxVars.addAll(varsThatRCdes);
        Node root = new Node("root_is_no_longer_called_root",null,new Variables());//initializing the code of the root node so as to change it with the pathology code
        Iterator<Variables> it = xlsxVars.iterator();
        while (it.hasNext())
            addPathNodes(it.next(), root);
        return root;
    }

    private void addPathNodes(Variables nextVar, Node root)
    {
        String thisConceptPath = nextVar.getConceptPath();
        System.out.println("variable name: "+nextVar.getName()+" variable concept path: "+nextVar.getConceptPath());
        if (thisConceptPath==null || thisConceptPath.trim().equals("") || thisConceptPath.trim().equals("/") /*|| thisConceptPath.trim().equals("/root") || thisConceptPath.trim().equals("/root/")*/)
        {
            //thisConceptPath=root.getName()+nextVar.getCode();
            thisConceptPath="/"+PATHOLOGY_CODE+"/"+nextVar.getCode();
            nextVar.setConceptPath(thisConceptPath);
        }

        thisConceptPath = thisConceptPath.substring(0,1).equals("/") ? thisConceptPath.substring(1, thisConceptPath.length()) : thisConceptPath;
        thisConceptPath = thisConceptPath.endsWith("/") ? thisConceptPath.substring(0,thisConceptPath.length()-1) : thisConceptPath;

        String[] conceptPath = thisConceptPath.split("/");
        if (root.getCode().equals("root_is_no_longer_called_root"))
        {
            root.setCode(conceptPath[0]);
            PATHOLOGY_CODE = conceptPath[0];//we store the code of the pathology to have it for later...
            System.out.println("~~~~~~******* We are talking about " + PATHOLOGY_CODE + "*******~~~~~~");
        }

        Node parent = root;
        for (int i=0; i<conceptPath.length; i++)
        {
            Node node2Add = findNodeByCode(conceptPath[i],root);
            if (node2Add != null) {
                if (i <= conceptPath.length - 1)
                    continue;//this node has already been added and this time we are not in an xlsx row dedicated to it, so we have nothing more to offer... movin on
                else {
                    node2Add.var = nextVar;//adding all Variables' stuff to the pre-existing Node...
                    parent = findNodeByCode(conceptPath[i - 1], root);//find the parent
                }
            } else
            {//lets create a new Node
                System.out.println("concept path: "+conceptPath+" i: "+i);
                parent = findNodeByCode(conceptPath[i - 1], root);//find the parent
                if (i == conceptPath.length - 1)//last one therefore it s a leaf
                {
                    node2Add = new Node(conceptPath[i], parent, nextVar);
                } else//it s an intermediate node
                {
                    String conceptPathUntilNow = "";
                    for (int ii=0; ii<=i; ii++)
                        conceptPathUntilNow += "/"+conceptPath[ii];
                    Variables newInterCat = new Variables(null,nextVar.getCsvFile(),null,null,null,null,null,null,conceptPath[i],conceptPathUntilNow,null);
                    node2Add = new Node(conceptPath[i], parent, newInterCat);
                }
                addNode(node2Add);
            }
            root=parent;//just to begin searching from the parent in the next iteration n not from the root...
        }
    }
    public void addNode(Node node)
    {   //System.out.println("About to add "+node.name+" with parent "+node.parent.name);
        if (node.parent.children == null)
            node.parent.children = new ArrayList<>();
        node.parent.children.add(node);
        // System.out.println("---$$$$$ Added "+node.code+" under "+node.parent.code+" which has concept_path: "+node.var.getConceptPath()+" $$$$$---");
    }

    public Node findNodeByCode(String NodeCode,Node node)
    {
        if (node.code.equals(NodeCode))
        {
            return node;
        }
        //lets look in its children...
        if (node.children != null && !node.children.isEmpty())
            for (Node child : node.children)
            {
                Node child_node = findNodeByCode(NodeCode,child);
                if (child_node != null)
                    return child_node;
            }

        return null;
    }
    public void printVariablesTree(Node root)
    {
        String message = "--- Node: "+root.code;
        if (root.var==null)
            message += ", conceptPath: NULL";
        else
            message += ", conceptPath: "+root.getConceptPath();
        if (root.parent==null)
            message += ", parent: NULL ---";
        else
            message += ", parent:"+root.parent.code+" ---";
        System.out.println(message);
        if (root.children!=null)
            for (Node child : root.children)
                printVariablesTree(child);
    }
    /**
     * creates the visualization JSON from the Variables Tree
     * @param root: the root of the Variables Tree
     * @return
     */
    public JSONObject createJSONVisualization(Node root)
    {
        JSONObject outerNode = new JSONObject();//the visualisation JSON wants the outer JSONObject to be inside a JSONArray
        root.fillJSONVisObject(outerNode);
        if (root.children != null)
        {
            addVisChildren(root, outerNode);
        }
        return outerNode;
    }

    /**
     * used by createJSONVisualization to fill in all levels recursively
     * @param root
     * @param outerNode
     */
    private void addVisChildren(Node root, JSONObject outerNode)
    {
        JSONArray childrenArray = new JSONArray();
        outerNode.put("children",childrenArray);
        for (Node child : root.children)
        {
            JSONObject childNode = new JSONObject();
            child.fillJSONVisObject(childNode);
            childrenArray.put(childNode);
            if (child.children != null)
                addVisChildren(child, childNode);
        }
    }
    /**
     * creates the metadata JSON from the Variables Tree
     * @param root
     * @return
     */
    public JSONObject createJSONMetadata(Node root)
    {
        JSONObject outerNode = new JSONObject();
        boolean isLeaf =  (root.children == null ? true : false);
        try {
            outerNode.put("label", "/");
            root.fillJSONMetaObject(outerNode, isLeaf);
        }catch (InvalidParameterException ipe)
        {   System.err.println(ipe.getMessage());}
        //System.out.println("Root has a total of "+root.children.size()+" children -both groups n variables-.");
        if (!isLeaf)
        {
            addMetaChildren(root, outerNode);
        }
        return outerNode;
    }


    /**
     * used by createJSONMetadata to fill in all levels recursively
     * @param root
     * @param outerNode
     */
    private void addMetaChildren(Node root, JSONObject outerNode)
    {
        JSONArray groupsArray = new JSONArray();
        JSONArray variablesArray = new JSONArray();
        for (Node child : root.children)//some of them might be groups, others might be variables
            if (child.children != null)//groups
            {
                JSONObject childNode = new JSONObject();
                child.fillJSONMetaObject(childNode, false);
                groupsArray.put(childNode);
                addMetaChildren(child, childNode);
            }
            else//variables
            {
                JSONObject varNode = new JSONObject();
                child.fillJSONMetaObject(varNode, true);
                variablesArray.put(varNode);
            }
        if (groupsArray.length()!=0)
        {
            JSONObject groups = new JSONObject();
            outerNode.put("groups", groupsArray);
        }
        if (variablesArray.length()!=0)
        {
            JSONObject variables = new JSONObject();
            outerNode.put("variables", variablesArray);
        }
    }

    public class Node
    {/**
     * structure for the Nodes (both intermediate and leaves) in the Variables Tree
     */
    protected String code;
        protected Node parent;
        protected Variables var;//contains name and all the rest...
        protected List<Node> children;//if a leaf then null
        protected Node(String code,Node parent,Variables var)
        {
            this.code=code; this.parent=parent; this.var=var;//this.children=new ArrayList<>();
        }
        public String getParentCode()
        {   //return this.parent!=null ? this.parent.name : ""; //all these getters were like this.. returning "" when there was no value.. but things changed..
            return this.parent!=null ? this.parent.code : null; }//..so now returning null instead (default behaviour)
        public String getCode()
        {   return this.code;}
        public void setCode(String code)
        {   this.code=code;}
        public String getCsvFile()
        {   return this.var.getCsvFile()!=null ? this.var.getCsvFile() : null;}
        public String getName()
        {   return this.var.getName()!=null ? this.var.getName() : null;}
        public void setName(String name)
        {   this.var.setName(name);}
        public String getValues()
        {   return this.var.getValues()!=null ? this.var.getValues() : null;}
        public String getType()
        {   return this.var.getType()!=null ? this.var.getType() : null;}
        public void setType(String type)
        {   this.var.setType(type);}
        public String getUnit()
        {   return this.var.getUnit()!=null ? this.var.getUnit() : null;}
        public String getCanBeNull()
        {   return this.var.getCanBeNull()!=null ? this.var.getCanBeNull() : null;}
        public String getDescription()
        {   return this.var.getDescription()!=null ? this.var.getDescription() : null;}
        public String getComments()
        {   return this.var.getComments()!=null ? this.var.getComments() : null;}
        public String getConceptPath()
        {   return this.var.getConceptPath()!=null ? this.var.getConceptPath() : null;}
        public String getMethodology()
        {   return this.var.getMethodology()!=null ? this.var.getMethodology() : null;}
        public String getIsCategorical()
        {   return this.var.getIsCategorical();}
        public String getSql_type()
        {   return this.var.getSql_type();}
        public List<String> getMapfunctions()
        {
            List<String> functions = null;
            if (this.var.getFunction() != null)
                functions = new ArrayList<String>();
            else return null;
            for (Functions s : this.var.getFunction())
                functions.add(s.getRule());
            return functions;
        }
        public List<String> getMapCDEs()
        {
            List<String> cdes = null;
            if (this.var.getFunction() != null)
                cdes = new ArrayList<String>();
            else return null;
            for (Functions s : this.var.getFunction())
                if (s.getCdeVariables()!=null && s.getCdeVariables().size()==1)
                    cdes.add(s.getCdeVariables().get(0).getCode());//we said it makes no sense for Functions class to have a List of CDEs n not one CDE...
            return cdes;
        }

        /**
         * Function to fill in a JSONObject of the Visualisation JSON from the current Node's attributes
         * @param varNode
         */
        public void fillJSONVisObject(JSONObject varNode)
        {
            varNode.put("code", this.code);
            if (this.parent!=null) varNode.put("parent", this.getParentCode());
            if (this.var != null)
            {
                if (this.getName()!=null) varNode.put("name", this.getName());
                if (this.getCsvFile()!=null) varNode.put("csvFile", this.getCsvFile());
                if (this.getValues()!=null) varNode.put("values", this.getValues());
                if (this.getType()!=null) varNode.put("type", this.getType());
                if (this.getUnit()!=null) varNode.put("unit", this.getUnit());
                if (this.getCanBeNull()!=null) varNode.put("canBeNull", this.getCanBeNull());
                if (this.getDescription()!=null) varNode.put("description", this.getDescription());
                if (this.getComments()!=null) varNode.put("comments", this.getComments());
                if (this.getConceptPath()!=null)
                {
                    varNode.put("conceptPath", this.getConceptPath());
                }
                if (this.getMethodology()!=null) varNode.put("methodology", this.getMethodology());
            }
        }

        /**
         * Function to fill in a JSONObject of the Metadata JSON from the current Node's attributes
         * @param varNode
         */
        public void fillJSONMetaObject(JSONObject varNode, boolean isLeaf) throws InvalidParameterException
        {
            varNode.put("code", this.code);
            if (isLeaf)
            {
                varNode.put("description", "");
                varNode.put("label", "");
                varNode.put("methodology", "");
                varNode.put("type", "");
                varNode.put("units", "");
                varNode.put("sql_type", "text");
                //varNode.put("isCategorical", "");
            }
            boolean isCategorical = false;
            if (this.var != null)
            {
                if (this.getDescription()!=null) varNode.put("description", this.getDescription());
                if (this.getName()!=null) varNode.put("label", this.getName());
                else if (!isLeaf)
                {
                    String label = this.code;
                    if (label.substring(0,1).matches("[a-z]"))
                        label=label.substring(0,1).toUpperCase()+label.substring(1);
                    varNode.put("label", label);//new instruction: if it is a group, it HAS to have a label... won't leave it without one... So just put code's value beginning with an Uppercase..
                }
                if (this.getMethodology()!=null) varNode.put("methodology", this.getMethodology());
                if (this.getType()!=null)
                {
                    boolean isInt = false;
                    if (this.getType().toLowerCase().trim().equals("int") || this.getType().toLowerCase().trim().equals("integer"))
                    {
                        varNode.put("sql_type", "int");
                        isInt = true;
                    }
                    else if (this.getType().toLowerCase().trim().equals("real") || this.getType().toLowerCase().trim().equals("numeric"))
                        varNode.put("sql_type", "real");
                    else if ((this.getType().equals("polynominal")||this.getType().equals("multinominal")||this.getType().equals("binominal")||this.getType().equals("nominal")))
                    {
                        this.setType("multinominal");//we want all these variations of the multinominal type to become 'multinominal' in the end...
                        isCategorical = true;
                        if (this.getValues()==null)
                            throw new InvalidParameterException("Variable "+this.code+" is of polynominal type but does not have information about its values...");
                        //have 2 present the Values in an enumeration list
                        JSONArray enumArray = new JSONArray();
                        varNode.put("enumerations", enumArray);
                        Pattern pattern = Pattern.compile("\\{([^}]*)\\s?,\\s?([^}]*)}");
                        Matcher matcher = pattern.matcher(this.getValues());
                        boolean isPolInt = true;//check if it is int so as to put "sql_type":"int" or not...
                        int countEnums=0;
                        String enumCode=null; String enumLabel=null; JSONObject enumm=null;
                        while (matcher.find())
                        {//put code and label of the enumeration option
                            enumCode = matcher.group(1).trim();
                            enumCode = (enumCode.substring(0,1).equals("\"")||enumCode.substring(0,1).equals("“")||enumCode.substring(0,1).equals("”")) ? enumCode.substring(1,enumCode.length()) : enumCode;
                            enumCode = (enumCode.endsWith("\"")||enumCode.endsWith("”")||enumCode.endsWith("“")) ? enumCode.substring(0,enumCode.length()-1) : enumCode;
                            enumLabel = matcher.group(2).trim();
                            enumLabel = (enumLabel.substring(0,1).equals("\"")||enumLabel.substring(0,1).equals("”")||enumLabel.substring(0,1).equals("“")) ? enumLabel.substring(1,enumLabel.length()) : enumLabel;
                            enumLabel = (enumLabel.endsWith("\"")||enumLabel.endsWith("”")||enumLabel.endsWith("“")) ? enumLabel.substring(0,enumLabel.length()-1) : enumLabel;
                            enumm = new JSONObject();
                            countEnums++;
                            try {
                                int one = Integer.parseInt(enumCode);
                                int two = Integer.parseInt(enumLabel);
                            }catch (NumberFormatException nfe)
                            {   isPolInt = false;}
                            enumm.put("code", enumCode);
                            enumm.put("label", enumLabel);
                            enumArray.put(enumm);
                        }
                        if (countEnums==0)
                            throw new InvalidParameterException("Variable "+this.code+" has polynominal type but its value is not written correctly...");
                        /*if (isPolInt)
                        {
                            varNode.put("sql_type", "int");
                            enumm.put("code", Integer.parseInt(enumCode));
                            enumm.put("label", Integer.parseInt(enumLabel));
                        }*/

                    }

                    if (this.getValues()!=null && !isCategorical)
                    {
                        Pattern pattern = Pattern.compile("([0-9\\.,]*)\\s?-\\s?([0-9\\.,]*)");
                        Matcher matcher = pattern.matcher(this.getValues());
                        if (matcher.find())//got values with range
                        {
                            int bottom = Integer.parseInt(matcher.group(1));
                            int top = Integer.parseInt(matcher.group(2));
                            varNode.put("minValue", bottom);
                            varNode.put("maxValue", top);
                           /* if (isInt)    //Back in the day... Someone, someday, said: "I got an idea! If for an integer variable we have less than 31 possible values
                            {           // /(due to range constrains) lets consider it to be categorical!".
                                int int_range = top-bottom;//Nowadays we do not want that... But don't delete it, keep it in comments cause u never know...
                                if (++int_range <= 31)//Someone, someday, might ask it again...
                                {
                                    isCategorical = true;
                                    JSONArray enumArray = new JSONArray();
                                    varNode.put("enumerations", enumArray);
                                    JSONObject enumm = null;
                                    for (int i=bottom; i<=top; i++)
                                    {
                                        enumm = new JSONObject();
                                        enumm.put("code", i);
                                        enumm.put("label", i);
                                        enumArray.put(enumm);
                                    }
                                }
                            }*/
                        }
                    }
                    varNode.put("type", this.getType());
                }

                if (this.getUnit()!=null) varNode.put("units", this.getUnit());
                //if (this.getSql_type()!=null) varNode.put("sql_type", "");
                if (isLeaf)
                    varNode.put("isCategorical", isCategorical);
            }
        }

        public String toString()
        {
            String par="";
            if (this.parent==null)
                par="NONE";
            else
                par=this.parent.code;
            if (var!=null)
                return this.code+"||"+par+"||"+this.getConceptPath()+"||"+this.getCsvFile()+"||"+this.getValues()+"||"+this.getUnit();
            else
                return this.code+"||"+par+"||"+"NULLLL";
        }
    }


}
