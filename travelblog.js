var themeCount = 0;

//THEME BUTTON

d3
  .select("body")
  .append("div")
  .attr("id", "themeButton")
  .html("Change to Light Mode")
  .style("background-color", "#070f1c")
  .style("color", "#bbcce8")
  .style("box-shadow", "0 0 10px white")
  .on("click", changeTheme);

//CHANGE SOME STUFF WHEN THE THEME BUTTON IS PRESSED
function changeTheme() {
  if (themeCount == 0) {
    d3.select("#background").transition().duration(1000)
      .style("background-color", "white");

    d3.select("#globe").transition().duration(600)
      .attr("fill", "#bbcce8");
    
setTimeout(changeButtons, 1000);
    function changeButtons(){
    d3
      .select("#themeButton")
      .html("Change to Dark Mode")
      .style("background-color", "#bbcce8")
      .style("color", "#070f1c")
      .style("box-shadow", "0 0 10px black");

    d3
      .select("#buttonOfDoom")
      .style("background-color", "white")
      .style("color", "black")
      .style("box-shadow", "0 0 10px black");
    }
    themeCount = 1;
  } else {
    d3.select("#background").transition().duration(1000)
      .style("background-color", "black");

    d3.select("#globe").transition().duration(600)
      .attr("fill", "#070f1c");
    
setTimeout(changeButtons2, 1000);
    function changeButtons2(){
    d3
      .select("#themeButton")
      .html("Change to Light Mode")
      .style("background-color", "#070f1c")
      .style("color", "#bbcce8")
      .style("box-shadow", "0 0 10px white");

    d3
      .select("#buttonOfDoom")
      .style("background-color", "black")
      .style("color", "white")
      .style("box-shadow", "0 0 10px white");
    }
    themeCount = 0;
  }
}

// PROJECTION BUTTON

var buttonText = "Orthographic";

var projectionButton = d3
  .select("body")
  .append("div")
  .attr("id", "buttonOfDoom")
  .on("click", refresh);

projectionButton
  .append("div")
  .attr("id", "changeProjection")
  .html("Change Projection Type");

projectionButton
  .append("div")
  .attr("id", "projectionType")
  .html(buttonText);

/***** ALL MATH FUNCTIONS ****/
//_______Copied from Ivy Wang's "Drag to Rotate the Globe" --> http://bl.ocks.org/ivyywang/7c94cb5a3accd9913263

var to_radians = Math.PI / 180;
var to_degrees = 180 / Math.PI;

// Helper function: cross product of two vectors v0&v1
function cross(v0, v1) {
  return [
    v0[1] * v1[2] - v0[2] * v1[1],
    v0[2] * v1[0] - v0[0] * v1[2],
    v0[0] * v1[1] - v0[1] * v1[0]
  ];
}

//Helper function: dot product of two vectors v0&v1
function dot(v0, v1) {
  for (var i = 0, sum = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
  return sum;
}

// Helper function:
// This function converts a [lon, lat] coordinates into a [x,y,z] coordinate
// the [x, y, z] is Cartesian, with origin at lon/lat (0,0) center of the earth
function lonlat2xyz(coord) {
  var lon = coord[0] * to_radians;
  var lat = coord[1] * to_radians;

  var x = Math.cos(lat) * Math.cos(lon);

  var y = Math.cos(lat) * Math.sin(lon);

  var z = Math.sin(lat);

  return [x, y, z];
}

// Helper function:
// This function computes a quaternion representation for the rotation between to vectors
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function quaternion(v0, v1) {
  if (v0 && v1) {
    var w = cross(v0, v1), // vector pendicular to v0 & v1
      w_len = Math.sqrt(dot(w, w)); // length of w

    if (w_len == 0) return;

    var theta = 0.5 * Math.acos(Math.max(-1, Math.min(1, dot(v0, v1)))),
      qi = w[2] * Math.sin(theta) / w_len;
    qj = -w[1] * Math.sin(theta) / w_len;
    qk = w[0] * Math.sin(theta) / w_len;
    qr = Math.cos(theta);

    return theta && [qr, qi, qj, qk];
  }
}

// Helper function:
// This functions converts euler angles to quaternion
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function euler2quat(e) {
  if (!e) return;

  var roll = 0.5 * e[0] * to_radians,
    pitch = 0.5 * e[1] * to_radians,
    yaw = 0.5 * e[2] * to_radians,
    sr = Math.sin(roll),
    cr = Math.cos(roll),
    sp = Math.sin(pitch),
    cp = Math.cos(pitch),
    sy = Math.sin(yaw),
    cy = Math.cos(yaw),
    qi = sr * cp * cy - cr * sp * sy,
    qj = cr * sp * cy + sr * cp * sy,
    qk = cr * cp * sy - sr * sp * cy,
    qr = cr * cp * cy + sr * sp * sy;

  return [qr, qi, qj, qk];
}

// This functions computes a quaternion multiply
// Geometrically, it means combining two quant rotations
// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/arithmetic/index.htm
function quatMultiply(q1, q2) {
  if (!q1 || !q2) return;

  var a = q1[0],
    b = q1[1],
    c = q1[2],
    d = q1[3],
    e = q2[0],
    f = q2[1],
    g = q2[2],
    h = q2[3];

  return [
    a * e - b * f - c * g - d * h,
    b * e + a * f + c * h - d * g,
    a * g - b * h + c * e + d * f,
    a * h + b * g - c * f + d * e
  ];
}

// This function computes quaternion to euler angles
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function quat2euler(t) {
  if (!t) return;

  return [
    Math.atan2(
      2 * (t[0] * t[1] + t[2] * t[3]),
      1 - 2 * (t[1] * t[1] + t[2] * t[2])
    ) * to_degrees,
    Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) *
      to_degrees,
    Math.atan2(
      2 * (t[0] * t[3] + t[1] * t[2]),
      1 - 2 * (t[2] * t[2] + t[3] * t[3])
    ) * to_degrees
  ];
}

/*  This function computes the euler angles when given two vectors, and a rotation
	This is really the only math function called with d3 code.

	v0 - starting pos in lon/lat, commonly obtained by projection.invert
	v1 - ending pos in lon/lat, commonly obtained by projection.invert
	o0 - the projection rotation in euler angles at starting pos (v0), commonly obtained by projection.rotate
*/

function eulerAngles(v0, v1, o0) {
  /*
		The math behind this:
		- first calculate the quaternion rotation between the two vectors, v0 & v1
		- then multiply this rotation onto the original rotation at v0
		- finally convert the resulted quat angle back to euler angles for d3 to rotate
	*/

  var t = quatMultiply(
    euler2quat(o0),
    quaternion(lonlat2xyz(v0), lonlat2xyz(v1))
  );
  return quat2euler(t);
}

/**************end of math functions**********************/

//DECLARE SOME VARIABLES

var width, height, canvas, projection, svg, r;

// FUNCTION TO REDRAW EVERYTHING WHEN WINDOW SIZE CHANGES BUT TOO GLITCHY AT THE MOMENT

// function resizeCanvas(){

//     d3.selectAll("#tooltip").remove();
//     d3.selectAll("#globe").remove();
//     svg.selectAll("path.travelPath").remove();
//     d3.select("#world").remove();

// SET SIZE OF SVG EARTH BASED ON HEIGHT OR WIDTH, WHICHEVER IS SMALLER

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
if (windowHeight <= windowWidth) {
  (width = windowHeight), (height = windowHeight);
} else if (windowHeight > windowWidth) {
  (width = windowWidth), (height = windowWidth);
}

// ORTHOGRAPHIC PROJECTION TO START WITH

projection = d3.geoOrthographic()
  .translate([width / 2, height / 2])
  .scale(width / 2 - 20)
  .clipAngle(90)
  .precision(0.6)
  .rotate([-40, -30]);

// INITIALIZE EVERYTHING (RUNS AGAIN WHEN PROJECTION BUTTON IS CLICKED)

initialize();

function initialize() {
  // VARIABLE USED TO CONVERT PATHS TO LONG,LAT AND RUN THROUGH PROJECTION
  var path = d3.geoPath().projection(projection);

  //CREATE BACKGROUND

  d3
    .select("body")
    .append("div")
    .attr("id", "background")
    .style("background-color", function() {
      if (themeCount == 0) return "black";
      else return "white";
    });

  // CREATE THE SVG

  
  var svg = d3
    .select("body")
    .append("svg")
    .attr("id", "world")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", zoomed));
  
   svg.on("mousedown.zoom", null)
      .on("touchstart.zoom", null)
      .on("touchmove.zoom", null)
      .on("touchend.zoom", null);
  

 
  
  function zoomed() {

  let k = d3.event.transform.k;
    d3.selectAll("#world").attr("transform", "scale(" + k + ")");
console.log(k);
    //STILL TRYING TO FIGURE OUT HOW TO SCALE MAP PINS AS YOU ZOOM. TRANSLATING SVG TO WINDOW COORDINATES IS A NIGHTMARE. POSSIBLE TO USE D3 SEMATNTIC ZOOMING IF I CAN FIGURE IT OUT.
    //      d3.select(".pin")
    //        .attr("transform", d => {
    //              return "scale(" + 1/k + ")"})
    //        .attr("transform-origin", "center");
    // console.log(document.getElementsByClassName('pin')[0].getBoundingClientRect())

     d3.selectAll(".graticule").attr("stroke-width", 0.5 / k);
     d3.selectAll(".pin").attr("stroke-width", 2 / k);
     d3.selectAll(".travelPath").attr("stroke-width", 2 / k);
     d3.selectAll(".land").attr("stroke-width", 1 / k);
     d3.selectAll(".border").attr("stroke-width", 1 / k);
   }
  
  // QUEUE MY JSON FILES --> MAP, COUNTRY NAMES, AND TRAVEL INFO

  queue()
    .defer(
      d3.json,
      "https://raw.githubusercontent.com/Maarondesigns/Polarsteps_JSON/master/WorldCountries.json"
    )
    .defer(
      d3.tsv,
      "https://raw.githubusercontent.com/Maarondesigns/Polarsteps_JSON/master/WorldCountryNames.tsv"
    )
    .defer(
      d3.json,
      "https://raw.githubusercontent.com/Maarondesigns/Polarsteps_JSON/master/wequitourjobs.json"
    )
    .await(ready);

  function ready(error, world, names, data) {
    if (error) throw error;

    // DRAG FUNCTIONS TAKEN FROM IVY WANG

    var drag = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    svg.call(drag);

    var gpos0, o0;

    function dragstarted() {
      console.log("dragstarted");
      gpos0 = projection.invert(d3.mouse(this));
      o0 = projection.rotate();

      svg
        .insert("path")
        .datum({ type: "Point", coordinates: gpos0 })
        .attr("class", "point")
        .attr("d", path);
    }

    function dragged() {
      console.log("dragged");
      var gpos1 = projection.invert(d3.mouse(this));

      o0 = projection.rotate();

      var o1 = eulerAngles(gpos0, gpos1, o0);
      projection.rotate(o1);

      svg.selectAll(".point").datum({ type: "Point", coordinates: gpos1 });

      d3.selectAll(".graticule").attr("d", path);
      d3.selectAll(".land").attr("d", path);
      d3.selectAll(".border").attr("d", path);
      svg.selectAll(".pin").attr("d", path);
      svg.selectAll(".travelPath").attr("d", path);
    }

    function dragended() {
      console.log("dragended");
      svg.selectAll(".point").remove();
    }



    // BLUR I HAD PLANNED FOR EARTH ATMOSPHERE EFFECT BUT COULDN'T FIGURE OUT

    // var defs = svg.append("defs");

    // var filter = defs.append("filter")
    //     .attr("id", "drop-shadow")
    //     .attr("height", "130%");

    // filter.append("feGaussianBlur")
    //     .attr("in", "SourceAlpha")
    //     .attr("stdDeviation", 5)
    //     .attr("result", "blur");

    // SPHERE VARIABLE TO FILL IN OCEAN AND EARTH BORDER
    var globe = { type: "Sphere" };
    
    d3
      .select("#world")
      .datum(globe)
      .append("path")
      .attr("id", "globe")
      .attr("d", path)
      .attr("fill", function() {
        if (themeCount == 0) return "#070f1c";
        else return "#bbcce8";
      });

 // LAT, LONG, MERIDIAN LINES
    var graticule = d3.geoGraticule();

    svg
      .append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path)
      .attr("stroke-width", 0.5);
    
    // DRAW ALL THE COUNTRIES
    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter()
      .append("path")
      .attr("class", "land")
      .attr("d", path)
      .on("mouseover", showCountryName)
      .on("mouseout", hideCountryName)
      .on("click", goToCountry);

    // COUNTRY HOVER FUNCTIONS
    function showCountryName(d, i) {
      d3
        .select("#tooltip")
        .style("visibility", "visible")
        .html(function() {
          let countryName = names.filter(x => x.id == d.id);
          return countryName[0].name;
        })
        .style("left", d3.event.pageX + 25 + "px")
        .style("top", d3.event.pageY - 28 + "px");

      d3.select(this).classed("landHover", true);
    }

    function hideCountryName() {
      d3.select("#tooltip").style("visibility", "hidden");
      d3.select(this).classed("landHover", false);
    }

    //COUNTRY BORDERS

    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter()
      .append("path")
      .attr("class", "border")
      .attr("d", path);

    //EMPTY ARRAYS TO PUSH TO IN A MINUTE

    var locations = [];

    // GO THROUGH JSON DATA AND CREATE OBJECTS WITH [LONGITUDE, LATITUDE] AND OTHER INFO
    for (let i = 0; i < data.all_steps.length; i++) {
      
      // CONVERT JSON TIME DATA INTO MONTH, DAY, YEAR

      let utcTime = new Date(data.all_steps[i].start_time * 1000);
      const formatMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octover",
        "November",
        "December"
      ];
      let month = formatMonth[utcTime.getMonth()];
      let day = utcTime.getDate();
      let year = utcTime.getFullYear();

      //OBJECT WITH COORDINATES AND PERTINANT INFO AS HTML TO BE PUT INTO TOOLTIP

      locations[i] = {
        coordinates: [
          data.all_steps[i].location.lon,
          data.all_steps[i].location.lat
        ],
        locationInfo: `Step ${i}</br>${data.all_steps[i].location.name}, ${
          data.all_steps[i].location.detail
        }</br>${month} ${day}, ${year}`,
        locationImage: `<img src=${data.all_steps[i].main_media_item_path} />`
      };
    }

     //TRAVEL PATH ARRAY, POINT COORDINATES TO NEXT POINT, IF ITS THE LAST ONE, CONNECT TO FIRST ONE
    let locationsPaths = [];
    for (let i = 0; i < locations.length - 1; i++) {
      if (i == locations.length - 1) {
        locationsPaths.push([
          locations[i].coordinates,
          locations[0].coordinates
        ]);
      } else {
        locationsPaths.push([
          locations[i].coordinates,
          locations[i + 1].coordinates
        ]);
      }
    }

     //CONVERT LOCATION PATHS TO GEOJSON FORMAT
    
    function geoPaths(places) {
      return places.map(function(d) {
        return {
          type: "LineString",
          coordinates: d
        };
      });
    }
    
    //CREATE TRAVEL PATH OF TRIP

    svg
      .append("g")
      .selectAll(".travelPath")
      .data(geoPaths(locationsPaths))
      .enter()
      .append("path")
      .attr("class", "travelPath")
      .attr("stroke", "#4292c6")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("d", path);

 //CONVERT LOCATION POINTS TO GEOJSON FORMAT

    function geoLocations(locations) {
      //radius
      //let r = .5;

      //hypotenuse
      //let a = Math.sqrt(Math.pow(r, 2) / 2);

      return locations.map(function(d) {
          
        return {
           //CONVERT LOCATION POINTS TO "CIRCLES" (OCTAGONS)
          // type: "Polygon",
          // coordinates: [[
          //     [d[0] + r, d[1]],
          //     [d[0] + a, d[1] - a],
          //     [d[0], d[1] - r],
          //     [d[0] - a, d[1] - a],
          //     [d[0] - r, d[1]],
          //     [d[0] - a, d[1] + a],
          //     [d[0], d[1] + r],
          //     [d[0] + a, d[1] + a],
          //     [d[0] + r, d[1]]
          //   ]]
          type: "Point",
          coordinates: d.coordinates,
          info: d.locationInfo,
          image: d.locationImage
        };
      });
    }

    // PLOT THE POINTS ON THE MAP

    svg
      .selectAll(".pin")
      .data(geoLocations(locations))
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "pin")
      .attr("fill", "white")
      .attr("stroke", "#4292c6")
      .attr("stroke-width", "2px")
      .on("mouseover", locationData)
      .on("mouseout", locationDataOff)
      .on("click", showImage);

    function showImage(d, i) {
      let container = d3
        .select("body")
        .append("div")
        .attr("id", "imageContainer")
        .on("click", hideImage);

      container
        .append("div")
        .attr("id", "stepImage")
        .html(d.image);
    }

    function hideImage() {
      d3.select("#imageContainer").remove();
    }

    // CIRCLE HOVER FUNCTIONS

    function locationData(d, i) {
      
      let thisX = Number(this.getAttribute("d").split(/[MLm,]/)[1]);
      let thisY = Number(this.getAttribute("d").split(/[MLm,]/)[2]);

      let x = this.getBoundingClientRect().x;
      let y = this.getBoundingClientRect().y;

      d3.selectAll(".pinAfter").classed("pinAfter", false);

      d3.select(this).classed("pinAfter", true);

      d3
        .select(".pinAfter")
        .style("transform-origin", `${thisX}px  ${thisY}px`)
        .style("animation-name", "pinGrow");

      d3
        .select("#tooltip")
        .attr("class", "showBefore")
        .style("visibility", "visible")
        .html(d.info)
        .style("left", x + 87 + "px")
        .style("top", y - 30 + "px");
      // }
    }

    function locationDataOff(d, i) {
      d3.selectAll(".pinAfter").style("animation-name", "pinShrink");

      d3.selectAll("#tooltipLine").remove();

      d3
        .select("#tooltip")
        .attr("class", "dontshowBefore")
        .style("visibility", "hidden");
    }

    // FUNCTION FOR CREATING  NEW FULL SCREEN COUNTRY

    function goToCountry(d, i) {
      let newProj;

      if (d.id == 840) {
        newProj = d3.geoAlbersUsa()
          .scale(width)
          .translate([width / 2, height / 2]);
      } else {
        newProj = d3.geoOrthographic()
          .scale(
              d.id == 643  // RUSSIA
              ? width * 0.8
              : d.id == 152 || d.id == 32 || d.id == 360 || d3.geoArea(d) > 0.1 //CHILE, ARGENTINA, AND INDONESIA ARE AWKWARD
              ? width
              : d.id == 356 //INDIA 
              ? width * 1.5 
              : d3.geoArea(d) > 0.03 
              ? width * 2 
              : d3.geoArea(d) > 0.008 //BECAUSE VIETNAM IS .077
              ? width * 3 
              : width * 5
          )
          .translate([width / 2, height / 2])
          .rotate([-d3.geoCentroid(d)[0], -d3.geoCentroid(d)[1]]);
      }

      let newPath = d3.geoPath().projection(newProj);

      let thisGuy = topojson.feature(
        world,
        world.objects.countries.geometries[i]
      );
      d3
        .select("body")
        .append("div")
        .attr("id", "svg2")
        .style("height", "100vh")
        .style("width", "100vw")
        .style("position", "absolute")
        .on("click", close);

      let svg2 = d3
        .select("body")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .style("position", "absolute");

      svg2
        .append("rect")
        .attr("height", "99%")
        .attr("width", "100%")
        .attr("fill", "none");

      let countryFocus = svg2
        .append("g")
        .datum(thisGuy)
        .append("path")
        .attr("class", "countryFocus")
        .attr("d", newPath);

      let textBox = d3
        .select("body")
        .append("div")
        .attr("class", "countryFocusInfo");

      textBox
        .append("div")
        .attr("id", "countryFocusName")
        .html(function() {
          let countryName = names.filter(x => x.id == d.id);
          return countryName[0].name;
        });

      let closeButton = d3
        .select("body")
        .append("div")
        .attr("class", "countryFocusClose")
        .html(
          '<img src="http://i1084.photobucket.com/albums/j404/michael_aaron/X_zpshapafqmk.png">'
        )
        .on("click", close);

      function close() {
        svg2.remove();
        closeButton.remove();
        d3.select("#svg2").remove();
        d3.select(".countryFocusInfo").remove();
      }

      let locationFilter = locations.filter(x =>
        d3.geoContains(d, x.coordinates)
      );

      svg2
        .selectAll(".newPin")
        .data(geoLocations(locationFilter))
        .enter()
        .append("path")
        .attr("d", newPath)
        .attr("class", "newPin")
        .attr("fill", "white")
        .attr("stroke", "#4292c6")
        .attr("stroke-width", "3px")
        .on("mouseover", locationData)
        .on("mouseout", locationDataOff)
        .on("click", showImage);

      let locationRangeFirst = locationFilter[0].locationInfo.split("</br>");
      let locationRangeLast = locationFilter[
        locationFilter.length - 1
      ].locationInfo.split("</br>");

      textBox
        .append("div")
        .html(
          `FROM</br>${locationRangeFirst[2]}</br>TO</br>${locationRangeLast[2]}`
        );
    } // <--- END OF GOTOCOUNTRY FUNCTION

    // CREATE TOOLTIP
    d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("z-index", "99");
  } // <--- END OF READY FUNCTION
} //<------END OF INITIALIZE FUNCTION

//COUNTER FOR PROJECTION TYPE
var count = 0;

// REFRESH RUNS WHEN PROJECTION BUTTON IS PRESSED
function refresh() {
  count++;

  // REMOVE EVERYTHING EXCEPT BUTTON
  let myNode = document.getElementsByTagName("BODY")[0];
  let doom = document.getElementById("buttonOfDoom");
  let theme = document.getElementById("themeButton");

  while (myNode.childElementCount > 2) {
    if (myNode.firstChild !== doom && myNode.firstChild !== theme) {
      myNode.removeChild(myNode.firstChild);
    } else if (
      myNode.childNodes[1] !== doom &&
      myNode.childNodes[1] !== theme
    ) {
      myNode.removeChild(myNode.childNodes[1]);
    } else {
      myNode.removeChild(myNode.childNodes[2]);
    }
  }

  // CHANGE PROJECTION TYPE
  if (count == 1) {
    buttonText = "Natural Earth";

    d3.select("#projectionType").html(buttonText);

    projection = d3.geoNaturalEarth1()
      .translate([width / 2, height / 2])
      .scale(width / 5 - 20)
      .precision(0.1);
  }

  if (count == 2) {
    buttonText = "Baker Dinomic";

    d3.select("#projectionType").html(buttonText);

    projection = d3.geoBaker()
      .scale(width / 6 - 20)
      .translate([width / 2, height / 2])
      .precision(0.1);
  }

  if (count == 3) {
    buttonText = "Mollweide";

    d3.select("#projectionType").html(buttonText);

    projection = d3.geoMollweide()
      .scale(width / 5 - 30)
      .translate([width / 2, height / 2])
      .precision(0.1);
  }

  if (count == 4) {
    buttonText = "Stereographic";

    d3.select("#projectionType").html(buttonText);

    projection = d3.geoStereographic()
    .scale(width/5)
    .translate([width / 2, height / 2])
    .rotate([-20, 0])
    .clipAngle(180 - 1e-4)
    .clipExtent([[0, 0], [width, height]])
    .precision(0.1);
  }
  
  if (count == 5) {
    buttonText = "Eisenlohr";

    d3.select("#projectionType").html(buttonText);
    
  projection = d3.geoEisenlohr()
    .scale(width/13)
    .translate([width / 2, height / 2])
    .precision(0.1);
  }
  
  if (count == 6) {
    buttonText = "Mercator";

    d3.select("#projectionType").html(buttonText);

    projection = d3.geoMercator()
      .scale((width - 3) / (2 * Math.PI))
      .translate([width / 2, height / 2]);
  }

  if (count == 7) {
    count = 0;

    buttonText = "Orthographic";

    d3.select("#projectionType").html(buttonText);

    projection = d3.geoOrthographic()
      .translate([width / 2, height / 2])
      .scale(width / 2 - 20)
      .clipAngle(90)
      .precision(0.6);
  }

  // REDRAW EVERYTHING
  initialize();
}
