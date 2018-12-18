import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';


@Component({
  selector: 'app-mapping-visual',
  templateUrl: './mapping-visual.component.html',
  styleUrls: ['./mapping-visual.component.css']
})
export class MappingVisualComponent implements OnInit, OnChanges {

  constructor(private hospitalService: HospitalService) {
  }


  @Input("versionId") versionId:number;
  @Input("diagramOpen") diagramOpen;
  @Output() diagramOpenChange = new EventEmitter<boolean>();

  margin: any;
  width: number;
  height: number;
  functionsByVariableVersion: Array<any>;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['versionId']) {
      this.hospitalService.getFunctionsByVariableVersionId(this.versionId).subscribe(functions => {this.functionsByVariableVersion = functions});
    }
  }

  changediagramOpen(){
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
      this.changediagramOpen();

    }else{
      this.DrawChart();
    }
  }

  private DrawChart() {

    this.changediagramOpen();

    d3.select('svg').remove();
    this.margin = { top: 100, right: 90, bottom: 30, left: 90 };
    //this.width = 1400 - this.margin.left - this.margin.right;
    this.width = 1100 - this.margin.left - this.margin.right;
    this.height = 1500- this.margin.top - this.margin.bottom;

    d3.select('a.mappings').append('svg')
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      //.attr("class","sankey");


    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    var formatNumber = d3.format(",.0f"),
      color = d3.scaleOrdinal(d3.schemeCategory10);

    var sankey = d3Sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width, height - 6]]);

    var link = svg.append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("path");

    var linkLabels = svg.append("g");

    var node = svg.append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-opacity", 0.2)
      .selectAll("g");

    const energy:DAG = {
      nodes: [],
      links: []
    };


for(let f of this.functionsByVariableVersion){
  let v = f.variables[0];
  let c = f.cdeVariable[0];

  let nodeVariable = {
    nodeId:parseInt(v.variable_id),
    name:v.name,
    csvFile: v.csvFile,
    values: v.values,
    type: v.type,
    code: v.code,
    conceptPath:v.conceptPath,
    unit: v.unit,
    canBeNull: v.canBeNull,
    description: v.description,
    comments: v.comments,
    methodology: v.methodology
  };
  let nodeCde = {
    nodeId:parseInt(c.cdevariable_id),
    name:c.name,
    csvFile: c.csvFile,
    values: c.values,
    type: c.type,
    code: c.code,
    conceptPath:v.conceptPath,
    unit: c.unit,
    canBeNull: c.canBeNull,
    description: c.description,
    comments: c.comments,
    methodology: c.methodology
  };

  //return the index of the nodes
  let cdeIndex = this.presentAt(energy.nodes, nodeCde);
  let variableIndex = this.presentAt(energy.nodes,nodeVariable);
    let link = {
      source:variableIndex,
      target:cdeIndex,
      value:1,
      uom:'Widget(s)',
      rule:f.rule,
      description:f.description
    };
    energy.links.push(link);

}

    sankey(energy);


    link = link
      .data(energy.links)
      .enter().append("path")
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("stroke-width", function (d: any) { return Math.max(1, d.width); })
    .each(addLabels);

    /**
     * Function that appends a text in the middle of each path*/
  function addLabels(link){

    var linkLength = this.getTotalLength();
    let position = this.getPointAtLength(linkLength/2 - 5);
    //let positionPlueOne = this.getPointAtLength(linkLength/2 + 5);
   // let adj = positionPlueOne.x - position.x;
    //let opp = position.y - positionPlueOne.y;
    //let angle = Math.atan(opp/adj) * (90 / Math.PI );
   // let rotation = angle;
    linkLabels.append("text")
        .attr("class", "link-label")
        .text(link.rule)
        .attr("x", position.x)
        .attr("y", position.y)
        .attr("dy", "0.35em")
        .attr("id", link.id)
      .attr( "fill-opacity", .4 )
        .style("fill", "blue")
        .style("text-anchor", "middle")
        .style("font-size", "12")
        //.attr("transform", "rotate(" + rotation + ","+ position.x + "," + position.y + ")")
    }

    link.append("title")
      .text(function (d: any) { return d.source.name + " → " + d.target.name + "\n Mapping Rule: " + d.rule; });


    node = node
      .data(energy.nodes)
      .enter().append("g");

    node.append("rect")
      .attr("x", function (d: any) { return d.x0; })
      .attr("y", function (d: any) { return d.y0; })
      .attr("height", function (d: any) { return d.y1 - d.y0; })
      .attr("width", function (d: any) { return d.x1 - d.x0; })
      .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");



    node.append("text")
      .attr("x", function (d: any) { return d.x0 - 6; })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function (d: any) { return d.name; })
      .filter(function (d: any) { return d.x0 < width / 2; })
      .attr("x", function (d: any) { return d.x1 + 6; })
      .attr("text-anchor", "start");



    node.append("title")
      .text(function (d: any) { return d.name + " "+ d.conceptPath});



    link
      .on("mouseover",function (fd:any,j){

        var currentTargetNode = d3.selectAll("rect").filter(function(d,i){
          return d['name'] == fd.target.name;
        });

        var currentSourceNode = d3.selectAll("rect").filter(function(d,i){
          return d['name'] == fd.source.name;
        });

        var currentText = d3.selectAll(".link-label").filter(function(d,i){
          return i == j;
        });

        currentText
          .style("font-size", "20px")
          .attr( "fill-opacity", .9 );

        currentTargetNode
          .transition()
          .duration(200)
          .attr("stroke-opacity", 0.9);

        currentSourceNode
          .transition()
          .duration(200)
          .attr("stroke-opacity", 0.9);



      });

    link
      .on("mouseout",function (fd:any,j){
      var currentTargetNode= d3.selectAll("rect").filter(function(d,i){
        return d['name']==fd.target.name;
      });

      var currentSourceNode= d3.selectAll("rect").filter(function(d,i){
        return d['name']==fd.source.name;
      });

        var currentText = d3.selectAll(".link-label").filter(function(d,i){
          return i == j;
        });

        currentText
          .attr( "fill-opacity", 0.4 )
          .style("font-size", "12");

      currentTargetNode
        .transition()
        .duration(200)
        .attr("stroke-opacity", 0.2);

        currentSourceNode
          .transition()
          .duration(200)
          .attr("stroke-opacity", 0.2);

    });



  }
/**
 * Method that checks by name if an object is present in an array of objects.
 * If yes return the index it was found. If not add it to the array and then return the index.
 * */
  presentAt(array,object){
    let isPresent = false;
    let index = null;
    for (let i=0; i<array.length; i++) {
      if(array[i].name == object.name){
        isPresent = true;
        index = i;
      }
    }
    if(!isPresent){
      array.push(object);
      index = array[array.length-1];
    }
    return index;
  }
}

interface SNodeExtra {
  nodeId: number;
  name: String;
  csvFile: String;
  values: String;
  type: String;
  code: String;
  conceptPath:String;
  unit: String;
  canBeNull: String;
  description: String;
  comments: String;
  methodology: String;
}

interface SLinkExtra {
  source: number;
  target: number;
  value: number;
  uom: string;
  rule:String;
  description:String;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface DAG {
  nodes: SNode[];
  links: SLink[];
}


// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    console.log("element tage name : "+el.tagName);
    if (el.tagName == "BODY") {
      console.log("inside of body");
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
      console.log("outside results"+xPos+yPos);
    } else {
      console.log("outside of body"+xPos+yPos);
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

function updatePosition() {
  // add your code to update the position when your browser
  // is resized or scrolled
}

/*
*
       // console.log("Current node attributes x0:"+function (d: any) { return d.x0; });
d3.select('rect')
  .attr("x", function (d: any) {console.log("d.x0 is: "+d.x0); return d.x0; })
  .attr("y", function (d: any) {console.log("d.y0 is: "+d.x0); return d.y0; });
        /////////////////////////////////////////////////////////////

        var t = 50, k = 15;
        var tip = {'w': (3/4 * t), 'h': k};
        var foWidth = 300;
        var anchor = {'w': width/3, 'h': height/3};
        //var x = currentNode.getBoundingClientRect();
        var x = 10;
        var y = getPosition(currentNode)[1];

//console.log("Current position is: x-->"+x+" y-->"+y);
        currentNode = svg.append('foreignObject')
          .attr( 'x', width)
          //.attr( 'x', anchor.w - tip.w)
        .attr('y', height)
         //  .attr('y', anchor.h + tip.h)
          .attr("width",foWidth)
          .attr("class","svg-tooltip");

        var div = currentNode.append('xhtml:div')
          .append('div')
          .attr("class","tooltip");

        div.append('p')
          .attr('class', 'lead')
          .html('Holmes was certainly not a difficult man to live with.');
        div.append('p')
          .html('He was quiet in his ways, and his habits were regular. It was rare ing.');
        //var foHeight = div[0][0].getBoundingClientRect().height;
       // let coordinates = (currentNode[0] as any).getBBox();
       // console.log("coordinates are 0: "+(currentNode[0] as any).getBBox());
        //console.log("coordinates are 1: "+(currentNode[1] as any).getBBox());
       // console.log("coordinates are 2: "+(currentNode[2] as any).getBBox());
       // console.log("coordinates are 3: ");
        //console.log("coordinates are 4: "+(currentNode[4] as any).getBBox());
        //console.log("div is at: "+ (div as any)[0][0].getBoundingClientRect().height);
        //console.log("currentnode is at x: "+ div.attr("x"));
        //console.log("currentnode is at y: "+ div.attr("y"));
        var foHeight = 200;
        //node.attr('height', foHeight);
        svg.insert('polygon', '.svg-tooltip')
          .attr('points', "0,0 0," + foHeight + " " + foWidth + "," + foHeight + " " + foWidth + ",0 " + (t) + ",0 " + tip.w + "," + (-tip.h) + " " + (t/2) + ",0")
          .attr('height', foHeight + tip.h)
          .attr('width', foWidth)
          .attr('fill', '#D8D8D8')
          .attr('opacity', 0.75)
          .attr('transform', 'translate(' + (anchor.w - tip.w) + ',' + (anchor.h + tip.h) + ')');*/
