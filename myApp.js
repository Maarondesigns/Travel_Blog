


function submitJSON(){
    var step = document.getElementById("step").value;
    var day = document.getElementById("day_of_trip").value;
    var date = document.getElementById("date").value;
    var lat = document.getElementById("lattitude").value;
    var long = document.getElementById("longitude").value;
    var country = document.getElementById("country").value;    
    var city = document.getElementById("city").value;
    
    d3.json(`add/${step}/${day}/${date}/${lat}/${long}/${country}/${city}/`, finished);

    function finished(data){
        console.log(data);
    }

    
}



// d3.json('/all', allTheStuff);


//   function allTheStuff(data){
//       var dataArray = Object.entries(data);

//       var svg = d3.select("body")
//       .append("svg")
//       .style("margin-top", "20px");

//       svg.selectAll("rect")
//       .data(dataArray)
//       .enter()
//       .append("rect")
//       .attr("height", d => d[1]*10)
//       .attr("width", 10)
//       .attr("x", d => d[1]*11)
//       .text(d => d);
//   }