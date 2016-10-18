function draw_piechart(s,w,h){

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    w = w - margin.left - margin.right,
    h = h - margin.top - margin.bottom;

var color =  d3.scale.category10();

var radius = Math.min(w, h) / 2;

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.income; });

var svg = d3.select(s).append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" +(w/2+margin.left)+
                   "," +(h/2+margin.top)+ ")");

d3.csv("data_04.csv", function(error, data) {
  
  data.forEach(function(d) {
    d.income = +d.income;
  });

var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.country); });

  g.append("text")
      .attr("transform", function(d) { 
              return "translate(" + arc.centroid(d) + ")"; })
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.country; });

});

};