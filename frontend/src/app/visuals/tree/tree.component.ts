import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import * as d3 from 'd3';
import {HospitalService} from "../../shared/hospital.service";
import {D3Service} from "../../d3";
import {element} from "protractor";



@Component({
  selector: 'app-tree',
  templateUrl:'./tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit,OnChanges {

  constructor(private hospitalService:HospitalService){

  }

  dataList:any;

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['versionId']) {
      this.hospitalService.getjsonStringVisualizableByVersionId(this.versionId).subscribe(viz => {this.dataList = viz});
    }

  }
  @Input('versionId') versionId;
  hierarchical = true;
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



  setData() {
    if(d3.select('svg').size()){
      this.hierarchical = false;
    }else{
      this.hierarchical = true;
    }

    d3.select('svg').remove();
    this.margin = { top: 20, right: 90, bottom: 30, left: 90 };
    //this.width = 1400 - this.margin.left - this.margin.right;
    this.width = 2400 - this.margin.left - this.margin.right;
    //this.height = 1800 - this.margin.top - this.margin.bottom;
    this.height = 400 - this.margin.top - this.margin.bottom;

////first clear previous component


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

    // Collapse after the second level
     //this.root.children.forEach(collapse);

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
      .on('click', this.click)

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
        div	.html(d.data.description)
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
/*
    nodeEnter.on("mouseover", function(d) {
      let g = d3.select(this); // The node
      // The class is used to remove the additional text later
      let info = g.append('text')
        .classed('info', true)
        .attr('x', 20)
        .attr('y', 10)
        .text(d.data.name);
    })
      .on("mouseout", function() {
        // Remove the info text on mouse out.
        d3.select(this).select('text.info').remove()
      });

*/
    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('stroke-width', '3px')
      .style('stroke', 'steelblue')
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#fff';
      })
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
      .attr('d', (d) => { return diagonal(d, d.parent); });

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
