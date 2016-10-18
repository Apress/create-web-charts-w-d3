function draw_barchart(s,w,h){

var margin = {top: 70, right: 20, bottom: 30, left: 40},
    w = w - margin.left - margin.right,
    h = h - margin.top - margin.bottom;

var color =  d3.scale.category10();

var x = d3.scale.ordinal()
    .rangeRoundBands([0, w], .1);
var y = d3.scale.linear()
    .range([h, 0]);

var formatPercent = d3.format(".0%");

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    //.tickFormat(formatPercent);
    .tickFormat(d3.format(".0%"));  

var yGrid = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-w, 0, 0)
    .tickFormat("")  

var svg = d3.select(s).append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data_04.csv", function(error, data) {
	
  var sum = 0;
  data.forEach(function(d) {
    d.income = +d.income;
    sum += d.income;
  });
  
  x.domain(data.map(function(d) { return d.country; }));
  y.domain([0, d3.max(data, function(d) { return d.income/sum; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  svg.append("g")         
      .attr("class", "grid")
      .call(yGrid);      

var labels = svg.append("g")
       .attr("class","labels")
     
  labels.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Income [%]");
      
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.income/sum); })
      .attr("height", function(d) { return h - y(d.income/sum); })
      .attr("fill", function(d) { return color(d.country); });

});

};
