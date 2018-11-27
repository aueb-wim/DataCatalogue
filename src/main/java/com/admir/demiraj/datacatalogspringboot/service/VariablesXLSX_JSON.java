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

import com.admir.demiraj.datacatalogspringboot.resources.Variables;
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
import org.springframework.stereotype.Service;

/**
 * VariablesXLSX_JSON class creates 2 different JSONs from an XLSX file which contains info about hospitals' variables.
 * In order to load the XLSX run loadXLSXInMemory(). This one outputs a tree with the variables.
 * To generate the Visualisation JSON run createJSONVisualization(). Give the tree as input.
 * To generate the Metadata JSON run createJSONMetadata(). Give the tree as input.
 */
@Service
public class VariablesXLSX_JSON
{
    /**
     * @param file: the path of the input XLSX file
     * @return the tree of the variables
     */
    public Node loadXLSXInMemory(String file)
    {
        //private Set<Variables> JSONcodes;
        Set<Variables> XLSXcodes=null;
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

    /**
     * Reads all variables (and categories -optional-) from an xlsx file (has to be structured as expected).
     * Creates Variables (AND Categories -optional-) instances. Adds them in a Hashset.
     * @param ff
     * @return A HashSet with all Variables
     */
    public Set<Variables> Read_xlsx(String ff) throws IOException
    {
        Set<Variables> xlsxVars = new HashSet<>();//<Variables>
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
                if (cell.getColumnIndex() == 0) //
                {
                    newVar = new Variables();
                    newVar.setCsvFile(cell.getStringCellValue());
                } else if (cell.getColumnIndex() == 1)
                    newVar.setName(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 2)
                    newVar.setCode(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 3)
                    newVar.setType(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 4)
                    newVar.setValues(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 5)
                    newVar.setUnit(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 6)
                    newVar.setCanBeNull(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 7)
                    newVar.setDescription(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 8)
                    newVar.setComments(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 9)
                    newVar.setConceptPath(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 10)
                    newVar.setMethodology(cell.getStringCellValue());
            }
            xlsxVars.add(newVar);
        }
        System.out.println("********* Total of "+xlsxVars.size()+" XLSX elements **********");
        return xlsxVars;
    }

    /**
     * Creates the Variables Tree from the Set of Variables
     * @param xlsxVars
     * @return The root Node of the Variables Tree
     */
    public Node createTree(Set<Variables> xlsxVars)
    {
        Node root = new Node("root",null,null);
        Iterator<Variables> it = xlsxVars.iterator();
        while (it.hasNext())
            addPathNodes(it.next(), root);
        return root;
    }
    private void addPathNodes(Variables nextVar, Node root)
    {

        String thisConceptPath = nextVar.getConceptPath();
        if (thisConceptPath==null || thisConceptPath.trim().equals("") || thisConceptPath.trim().equals("/"))
        {
            thisConceptPath="/root/"+nextVar.getCode();
            nextVar.setConceptPath(thisConceptPath);
        }
        thisConceptPath = thisConceptPath.substring(0,1).equals("/") ? thisConceptPath.substring(1,thisConceptPath.length()) : thisConceptPath;
        thisConceptPath = thisConceptPath.endsWith("/") ? thisConceptPath.substring(0,thisConceptPath.length()-1) : thisConceptPath;

        String[] conceptPath = thisConceptPath.split("/");
        Node parent = root;
        for (int i=0; i<conceptPath.length; i++)
        {
            Node node2Add = findNodeByCode(conceptPath[i],root);
            if (node2Add != null)
                if (i < conceptPath.length - 1)
                    continue;//this node has already been added and this time we are not in an xlsx row dedicated to it, so we have nothing more to offer... movin on
                else
                {  // System.out.println("~~~~~~~~~~ FOUND NODE "+node2Add.code+" N WE UPDATING ITS STUFF!!! ~~~~~~~~");
                   // System.out.println("~~~~~~~~ IT HAD "+node2Add+"~~~~~~");
                    node2Add.var = nextVar;//adding all Variables' stuff to the pre-existing Node...
                   // System.out.println("~~~~~~~~ NOW IT S "+node2Add+"~~~~~");
                    parent = findNodeByCode(conceptPath[i - 1], root);//find the parent
                }
            else
            {//lets create a new Node
                parent = findNodeByCode(conceptPath[i - 1], root);//find the parent
                if (i == conceptPath.length - 1)//last one therefore it s a leaf
                {
                    node2Add = new Node(conceptPath[i], parent, nextVar);
                } else//it s an intermediate node
                {
                    String conceptPathUntiNow = "";
                    for (int ii=0; ii<=i; ii++)
                        conceptPathUntiNow += "/"+conceptPath[ii];
                    Variables newInterCat = new Variables(null,nextVar.getCsvFile(),null,null,null,null,null,null,conceptPath[i],conceptPathUntiNow,null);
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
        //JSONObject visTree = new JSONObject();
        JSONObject outerNode = new JSONObject();//the visualisation JSON wants the outer JSONObject to be inside a JSONArray
        /*System.out.println("____________ root has code "+root.code+", "+root.children.size()+" children_________");
        for (int jj=0; jj<root.children.size(); jj++)
            System.out.println("_____"+jj+"."+root.children.get(jj).code+"___"+root.children.get(jj).getConceptPath()+"____");*/
        root.fillJSONVisObject(outerNode);
        //visTree.put(outerNode);
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
        try {
            root.fillJSONMetaObject(outerNode);
            outerNode.put("label", "/");
        }catch (InvalidParameterException ipe)
        {   System.err.println(ipe.getMessage());}
        System.out.println("Root has a total of "+root.children.size()+" children -both groups n variables-.");
        if (root.children != null)
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
                child.fillJSONMetaObject(childNode);
                groupsArray.put(childNode);
                addMetaChildren(child, childNode);
            }
            else//variables
            {
                JSONObject varNode = new JSONObject();
                child.fillJSONMetaObject(varNode);
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
        public String getCsvFile()
        {   return this.var.getCsvFile()!=null ? this.var.getCsvFile() : null;}
        public String getName()
        {   return this.var.getName()!=null ? this.var.getName() : null;}
        public String getValues()
        {   return this.var.getValues()!=null ? this.var.getValues() : null;}
        public String getType()
        {   return this.var.getType()!=null ? this.var.getType() : null;}
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
                if (this.getConceptPath()!=null) varNode.put("conceptPath", this.getConceptPath());
                if (this.getMethodology()!=null) varNode.put("methodology", this.getMethodology());
            }
        }

        /**
         * Function to fill in a JSONObject of the Metadata JSON from the current Node's attributes
         * @param varNode
         */
        public void fillJSONMetaObject(JSONObject varNode) throws InvalidParameterException
        {
            varNode.put("code", this.code);
            if (this.var != null)
            {
                if (this.getDescription()!=null) varNode.put("description", this.getDescription());
                if (this.getName()!=null) varNode.put("label", this.getName());
                if (this.getMethodology()!=null) varNode.put("methodology", this.getMethodology());
                if (this.getType()!=null)
                {
                    varNode.put("type", this.getType());
                    if ((this.getType().equals("polynominal")||this.getType().equals("binominal")))
                    {
                        if (this.getValues()==null)
                            throw new InvalidParameterException("Variable "+this.code+" is of polynominal type but does not have information about its values...");
                        //have 2 present the Values in an enumeration list
                        JSONArray enumArray = new JSONArray();
                        varNode.put("enumerations", enumArray);
                        Pattern pattern = Pattern.compile("\\{([^}]*)\\s?,\\s?([^}]*)}");
                        Matcher matcher = pattern.matcher(this.getValues());
                        boolean isInt = true;//check if it is int so as to put "sql_type":"int" or not...
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
                            {   isInt = false;}
                        }
                        if (countEnums==0)
                            throw new InvalidParameterException("Variable "+this.code+" has polynominal type but its value is not written correctly...");
                        if (isInt)
                        {
                            varNode.put("sql_type", "int");
                            enumm.put("code", Integer.parseInt(enumCode));
                            enumm.put("label", Integer.parseInt(enumLabel));
                        }
                        else
                        {
                            enumm.put("code", enumCode);
                            enumm.put("label", enumLabel);
                        }
                        enumArray.put(enumm);
                    }
                    else if (this.getValues()!=null)
                    {
                        Pattern pattern = Pattern.compile("([0-9\\.,]*)\\s?-\\s?([0-9\\.,]*)");
                        Matcher matcher = pattern.matcher(this.getValues());
                        if (matcher.find())
                        {
                            int bottom = Integer.parseInt(matcher.group(1));
                            int top = Integer.parseInt(matcher.group(2));
                            varNode.put("minValue", bottom);
                            varNode.put("maxValue", top);
                        }
                    }
                }
                if (this.getUnit()!=null) varNode.put("units", this.getUnit());

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

