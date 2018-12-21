import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import {HospitalService} from "../../shared/hospital.service";
import {FormControl} from '@angular/forms';
import { Select2OptionData} from 'ng2-select2';



@Component({
  selector: 'app-tree',
  templateUrl:'./tree.component.html',
  styleUrls: ['./tree.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class TreeComponent implements OnInit,OnChanges {

  constructor(private hospitalService:HospitalService){

  }

  dataList:any;



  @Input('versionId') versionId;
  @Input('diagramOpen') diagramOpen;
  @Output() diagramOpenChange = new EventEmitter<boolean>();
  margin: any;
  width: number;
  height: number;
  svg: any;
  duration: number;
  root: any;
  tree: any;
  treeData: any;
  nodes: any;
  links: any;
  data = ["Option 1", "Option 2", "Option 3","AV45","insula"];

  ngOnInit(){
    /* var data = ["Option 1", "Option 2", "Option 3","AV45","insula"];

    var select = d3.select('.trial')
      .append('select')
      .attr('class','select')
      .on('change',onchange);

    var options = select
      .selectAll('option')
      .data(data).enter()
      .append('option')
      .text(function (d) { return d; });
    * */


  }



  ngOnChanges(changes: SimpleChanges){
    if (changes['versionId']) {
      this.hospitalService.getjsonStringVisualizableByVersionId(this.versionId).subscribe(viz => {this.dataList = viz});
    }
  }

  chagediagramOpen(){
    if(this.diagramOpen){
      this.diagramOpen = false;
      this.diagramOpenChange.emit(this.diagramOpen);
    }else{
      this.diagramOpen = true;
      this.diagramOpenChange.emit(this.diagramOpen);
    }
  }

  private handleChart(){
    if(this.diagramOpen){
      d3.select('svg').remove();
      this.chagediagramOpen();

    }else{
      this.setData();
    }
  }

  setData() {
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //basically a way to get the path to an object
    function searchTree(obj,search,path){
      console.log("serach found 0 : object code "+obj.data.code);
      console.log("children of obj: "+obj["children"]);
      if(obj.data.code === search){ //if search is found return, add the object to the path and return it
        path.push(obj);
        console.log("serach found 1");
        return path;
      }
      else if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
        console.log("serach found 2");
        var children = (obj["children"]) ? obj.children : obj["_children"];
        for(var i=0;i<children.length;i++){
          console.log("serach found 3");
          path.push(obj);// we assume this path is the right one
          var found = searchTree(children[i],search,path);
          if(found){// we were right, this should return the bubbled-up path from the first if statement
            console.log("serach found 4");
            return found;
          }
          else{//we were wrong, remove this parent from the path and continue iterating
            console.log("serach found 5");
            path.pop();
          }
        }
      }
      else{//not the right object, return false so it will continue to iterate in the loop
        console.log("serach found 6");
        return false;
      }
    }

    function extract_select2_data(node,leaves,index){
      if (node.children){
        for(var i = 0;i<node.children.length;i++){
          index = extract_select2_data(node.children[i],leaves,index)[0];
        }
      }
      else {
        leaves.push({id:++index,text:node.data.code});
      }
      return [index,leaves];
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////



    this.chagediagramOpen();

////first clearprevious component
    d3.select('svg').remove();
    this.margin = { top: 20, right: 90, bottom: 30, left: 90 };
    //this.width = 1400 - this.margin.left - this.margin.right;
    this.width = 2000 - this.margin.left - this.margin.right;
    this.height = 2000- this.margin.top - this.margin.bottom;
    //this.height = 400 - this.margin.top - this.margin.bottom;




    this.svg = d3.select('a.tree').append('svg')///////////////////////////////////////////tbody
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.duration = 750;

    // declares a tree layout and assigns the size
    this.tree = d3.tree()
      .size([this.height, this.width]);

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.dataList, (d:any) => { return d["children"]});/////changed from children to groups
    this.root.x0 = this.height / 2;
    this.root.y0 = 10;

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
    function openPaths2(paths){
      for(var i =0;i<paths.length;i++){
        if(paths[i].id !== "1"){//i.e. not root
          paths[i].class = 'found';
          if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
            paths[i].children = paths[i]._children;
            paths[i]._children = null;
          }
          this.updateChart(paths[i]).bind(this);
          console.log("Open Paths works");
        }
      }
    }

   let openPaths = (paths) => {
      console.log('click');
     for(var i =0;i<paths.length;i++){
       if(paths[i].id !== "1"){//i.e. not root
         paths[i].class = 'found';
         if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
           paths[i].children = paths[i]._children;
           paths[i]._children = null;
         }
         this.updateChart(paths[i]);
         console.log("Open Paths works");
       }
     }
    };

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



console.log("Root outside onChange"+this.root);
    function onchange2() {
      let selectValue = d3.select('select').property('value');
      //alert("The selected value is : "+selectValue);
      console.log("selected value : "+selectValue);
      //this.root.children.forEach(collapse);
      console.log("Root inside onChange: "+this.root);
      var paths = searchTree(function (d) {
        return d;
      },selectValue,[]);
      if(typeof(paths) !== "undefined"){
        openPaths(paths);
      }
      else{
        console.log(selectValue+" not found!");
      }
    };


    onchange = (d) => {
      let selectValue = d3.select('select').property('value');
      //alert("The selected value is : "+selectValue);
      console.log("selected value : "+selectValue);
      //this.root.children.forEach(collapse);
      console.log("Root inside onChange: "+this.root);
      var paths = searchTree(this.root, selectValue,[]);
      if(typeof(paths) !== "undefined"){
        openPaths(paths);
      }
      else{
        console.log(selectValue+" not found!");
      }
    };

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    // Collapse after the second level
    // this.root.children.forEach(collapse);

    this.updateChart(this.root);

     function collapse(d) {
       if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
          }

     }

  click = (d) => {
    console.log('click');
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(d);
  };


  updateChart(source) {

    let i = 0;
    console.log(source);
    this.treeData = this.tree(this.root);
    this.nodes = this.treeData.descendants();
    this.links = this.treeData.descendants().slice(1);
    this.nodes.forEach((d) => { d.y = d.depth * 180 });

    let node = this.svg.selectAll('g.node')
      .data(this.nodes, (d) => { return d.id || (d.id = ++i); });


    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', this.click);

    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#f5e4ff';
      });

    // Define the div for the tooltip
    var div = d3.select("a.tree").append("div")//////////////////////tbody
      .attr("class", "tooltip")
      .style("opacity", 0);

    nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', (d) => {
        return d.children || d._children ? 'end' : 'start';
      })
      .style('font', '12px sans-serif')
      .text((d) => { return d.data.code; });//changed from 'd.data.name' to d.data.code



    nodeEnter
      .on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div	.html("<b>Name: </b>"+d.data.code+"<br/>"+"<font size=\"-1\"> <b>Description: </b>"+d.data.description+"</font>"
          +"<br/><font size=\"-1\"> <b>Cocept Path: </b>"+d.data.conceptPath+"</font>")
          .style("left", d3.select(this).attr("cx") + "px")
          .style("top", d3.select(this).attr("cy") + "px");
          //.style("left", (d3.event.pageX) + "px")
         // .style("top", (d3.event.pageY) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('stroke-width', '3px')
      .style("stroke", function(d) {
        if(d.class === "found"){
          return "#ff4136"; //red
        }else{
          return 'steelblue';
        }
      })
      //.style('stroke', 'steelblue')///////////////changed
      .style("fill", function(d) {
        if(d.class === "found3"){//// change to found if you want it red when it is found
          return "#ff4136"; //red
        }
        else if(d._children){
          return "lightsteelblue";
        }
        else{
          return "#fff";
        }
      })
      //.style('fill', (d) => {
      //  return d._children ? 'lightsteelblue' : '#fff';
     // })
      .attr('cursor', 'pointer');

    let nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    let link = this.svg.selectAll('path.link')
      .data(this.links, (d) => { return d.id; });

    let linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')
      .attr('d', function (d) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (d) => { return diagonal(d, d.parent); })////added style
  .style("stroke",function(d){
      if(d.class==="found"){
        return "#ff4136";
      }else{
        return '#ccc';
      }
    });

    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function (d) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    this.nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`;
      return path;
    }
  }


}
