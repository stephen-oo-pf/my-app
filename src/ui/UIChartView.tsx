// File: ui/UIChartView.tsx
// Date: 06/04/2020
// Note: Event Response Drill Chart Prototype: BarChart | DonutChart | PieChart
//..............................................................................
import React, { createRef, Component } from "react";
import * as d3 from "d3";
import './UIChartView.sass';

console.log( "ui/UIChartView.tsx..." );

interface IUIChartViewProps extends React.HTMLAttributes<Element> {
  width?: any;
  height?: any;
  innerRadius?: any;
  outerRadius?: any;
  data?: any;
  value?: number | { valueOf(): number; };
}

class UIChartView extends Component<IUIChartViewProps, {}> {
  colors: any;
  createArc: any;
  createPie: any;
  format: any;
  ref: any;
  
  constructor(props: any) {
    super(props);
    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value((d: any) => {
        return d.value;
      })
      .sort(null);
    this.createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);
    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.format = d3.format(".2f");
  }
  
  componentDidMount() {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(this.props.data);
    const { width, height, innerRadius, outerRadius } = this.props;
    svg
      .attr("class", "chart")
      .attr("width", width)
      .attr("height", height);
    const group = svg
      .append("g")
      .attr("transform", `translate(${outerRadius} ${outerRadius})`);
    const groupWithEnter = group
      .selectAll("g.arc")
      .data(data)
      .enter();
    const path = groupWithEnter.append("g").attr("class", "arc");
    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d: any, i) => {
        return this.colors(d.index);
      });
    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text((d: any) => {
        return this.format(d.value);
      });
  }
  
  componentWillUpdate(nextProps: any, nextState: any) {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(nextProps.data);
    const group = svg
      .select("g")
      .selectAll("g.arc")
      .data(data);
    group.exit().remove();
    const groupWithUpdate = group
      .enter()
      .append("g")
      .attr("class", "arc");
    const path = groupWithUpdate.append("path").merge(group.select("path.arc"));
    path
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(i));
    const text = groupWithUpdate.append("text").merge(group.select("text"));
    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .text((d: any) => {
        return this.format(d.value);
      });
  }
  
  componentWillUnmount() {
  	// todo...
  }
  
  render() {
    return (
    	<div className="ui-chart-view svg-container">
    		<svg ref={this.ref} viewBox="0 0 200 200" />
    	</div>
    )
  }
}

export default UIChartView;

// eof
