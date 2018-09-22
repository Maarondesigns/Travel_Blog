const isIphone = navigator.userAgent.indexOf("iPhone") != -1;

window.onload = function() {
  setTimeout(function() {
    d3.selectAll("#tripControls, #budgetButton")
      .transition()
      .duration(400)
      .style("transform", "translateX(0%)");

    if (isIphone) {
      d3.select("#currentLocation").style(
        "transform",
        "scale(2) translateY(-5px)"
      );

      d3.select("#animationButton")
        .style("font-size", "32px")
        .style("left", "5%");

      d3.select("#sliderLegendButton").style("transform", "scale(2)");

      d3.select("#budgetButton").style("font-size", "48px");

      d3.select("#animationSpeed").style("display", "none");

      d3.selectAll("#showControls, #controls")
        .transition()
        .duration(400)
        .style("transform", (d, i) => {
          if (i === 0) {
            return "scale(2) translate(0, 0)";
          } else if (i === 1) {
            return "scale(2) translate(22px, 0)";
          }
        })
        .style("transform-origin", "100% 100%");

      d3.selectAll("#showMenu, #buttonsMenu")
        .transition()
        .duration(400)
        .style("transform", (d, i) => {
          if (i === 0) {
            return "scale(2) translate(0, 0)";
          } else if (i === 1) {
            return "scale(2) translate(-110px, 0)";
          }
        })
        .style("transform-origin", "0 100%");
    }
  }, 1800);
};

d3.select("body")
  .append("div")
  .attr("id", "showControls")
  .on("click", showControls)
  .html("Controls")
  .style("color", "white")
  .style("border-color", "white")
  .style("background-color", "rgb(170, 170, 170)");

function showControls() {
  let thisGuy = d3.select(this);
  if (thisGuy.classed("clicked")) {
    thisGuy
      .classed("clicked", false)
      .transition()
      .duration(400)
      .style("right", "0px");

    d3.select("#controls")
      .transition()
      .duration(400)
      .style("right", "-45px");
  } else {
    thisGuy
      .classed("clicked", true)
      .transition()
      .duration(400)
      .style("right", () => {
        if (isIphone) {
          return "86px";
        } else {
          return "43px";
        }
      });

    d3.select("#controls")
      .transition()
      .duration(400)
      .style("right", () => {
        if (isIphone) {
          return "43px";
        } else {
          return "0px";
        }
      });
  }
}

let controls = d3
  .select("body")
  .append("div")
  .attr("id", "controls")
  .style("right", "-45px");

controls
  .append("div")
  .attr("id", "fullscreen")
  .attr("title", "Fullscreen")
  .on("click", fullscreen)
  .append("div")
  .attr("id", "fs1");

d3.select("#fullscreen")
  .append("div")
  .attr("id", "fs2");

d3.select("#fullscreen")
  .append("div")
  .attr("id", "fs3");

d3.select("#fullscreen")
  .append("div")
  .attr("id", "fs4");

function fullscreen() {
  let elem = document.getElementsByTagName("body")[0];

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  } else if (document.msFullscreenElement) {
    document.msExitFullscreen();
  } else if (document.mozFullscreenElement) {
    document.mozExitFullScreen();
  } else {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
}

var themeCount = 0;
//THEME BUTTON

d3.select("body")
  .append("div")
  .attr("id", "showMenu")
  .attr("class", "menuItem")
  .html("Menu")
  .style("color", "white")
  .style("border-color", "white")
  .style("background-color", "rgb(170, 170, 170)")
  .on("click", showMenu);

function showMenu() {
  let thisGuy = d3.select(this);

  if (thisGuy.classed("clicked")) {
    thisGuy
      .classed("clicked", false)
      .transition()
      .duration(600)
      .style("left", "0px");

    d3.select("#buttonsMenu")
      .transition()
      .duration(600)
      .style("left", "-218px");
  } else {
    thisGuy
      .classed("clicked", true)
      .transition()
      .duration(600)
      .style("left", () => {
        if (isIphone) {
          return "436px";
        } else {
          return "218px";
        }
      });

    d3.select("#buttonsMenu")
      .transition()
      .duration(600)
      .style("left", () => {
        if (isIphone) {
          return "218px";
        } else {
          return "0px";
        }
      });
  }
}

d3.select("body")
  .append("div")
  .attr("id", "buttonsMenu")
  .attr("class", "menuItem")
  .style("color", "white")
  .style("border-color", "white")
  .style("background-color", "rgb(170, 170, 170)");

d3.select("#buttonsMenu")
  .append("div")
  .attr("id", "themeButton")
  .html("Change to Light Mode")
  .style("color", "#4292c6")
  .on("click", changeTheme);

//CHANGE SOME STUFF WHEN THE THEME BUTTON IS PRESSED
function changeTheme() {
  if (themeCount == 0) {
    d3.select("#background")
      .transition()
      .duration(1000)
      .style("background-color", "white");

    d3.select("#globe")
      .transition()
      .duration(600)
      .attr("fill", "#bbcce8");

    setTimeout(function() {
      d3.selectAll(
        "#showMenu, #buttonsMenu, #controls, #zoomIn, #zoomOut"
      ).style("color", "black");

      d3.select("#themeButton").html("Change to Dark Mode");

      d3.selectAll("#zoomIn, #zoomOut").style("border", "solid 1px black");

      d3.selectAll("#fs1, #fs2, #fs3, #fs4").style("border-color", "black");
    }, 800);

    themeCount = 1;
  } else {
    d3.select("#background")
      .transition()
      .duration(1000)
      .style("background-color", "black");

    d3.select("#globe")
      .transition()
      .duration(600)
      .attr("fill", "#070f1c");

    setTimeout(function() {
      d3.selectAll(
        "#showMenu, #buttonsMenu, #controls, #zoomIn, #zoomOut"
      ).style("color", "white");

      d3.select("#themeButton").html("Change to Light Mode");

      d3.selectAll("#zoomIn, #zoomOut").style("border", "solid 1px white");

      d3.selectAll("#fs1, #fs2, #fs3, #fs4").style("border-color", "white");
    }, 800);

    themeCount = 0;
  }
}

// PROJECTION BUTTON

var buttonText = "Orthographic";

var projectionButton = d3
  .select("#buttonsMenu")
  .append("div")
  .attr("id", "buttonOfDoom")
  .on("click", function() {
    projectionButton.on("click", null);
    clearTheInterval();
    refreshType = "projection";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });

projectionButton
  .append("div")
  .attr("id", "changeProjection")
  .html("Change Projection Type");

d3.select("body")
  .append("div")
  .attr("id", "projectionDescription")
  .html(
    `As you may know, <s>I am a nerd</s> the Earth is a sphere. (Sorry flat earthers, but it's true) </br></br> This means that the Earth cannot be represented on a flat surface (also known as a map, duh) without some distortion. This distortion is caused by the method the map is created, which is called a <a href="https://en.wikipedia.org/wiki/Map_projection" target="_blank">map projection</a>, and there are many different types. Every type of map projection serves a different purpose and distorts attributes of objects on the Earth's surface by different amounts. </br></br> The area of an object, </br> the shape or outline of an object, </br> and the distance and angle between objects </br></br> are the main distortions to consider. <a href="https://bl.ocks.org/syntagmatic/ba569633d51ebec6ec6e" target="_blank">This is a really great interactive comparison</a> of map projections and the amount they distort the attributes stated above, which also conviniently is made using the same javascript library (d3.js) that I used to create my map. </br></br> `
  )
  .style("visibility", "hidden");

d3.select("#projectionDescription")
  .append("div")
  .attr("id", "currentProjDescript")
  .html(
    `You are currently viewing the <a href="https://en.wikipedia.org/wiki/${buttonText}_projection" target="_blank">${buttonText}</a> projection.`
  );

d3.select("#buttonsMenu")
  .append("div")
  .attr("id", "projectionHelp")
  .html("?")
  .on("click", () => {
    let viz = document.getElementById("projectionDescription").style.visibility;

    if (viz === "hidden") {
      d3.select("#projectionDescription").style("visibility", "visible");
    } else {
      d3.select("#projectionDescription").style("visibility", "hidden");
    }
  });

projectionButton
  .append("div")
  .attr("id", "projectionType")
  .html(buttonText);

//OPACITY HIDE/SHOW TRIP BUTTONS AND FUNCTIONS

var icelandOpacity = 0;
var icelandVisibility = "hidden";
var worldTripOpacity = 1;
var worldTripVisibility = "visible";
var viewingTrip = "World";

d3.select("#buttonsMenu")
  .append("div")
  .attr("id", "viewAllTrips")
  .html("Go To All Trips")
  .on("click", () => {
    clearTheInterval();
    viewingTrip = "All";
    changeViewingCountry();
  });

d3.select("#buttonsMenu")
  .append("div")
  .attr("id", "viewIceland")
  .html("Go To Iceland Trip")
  .style("color", "darkred")
  .on("click", () => {
    clearTheInterval();
    viewingTrip = "Iceland";
    changeViewingCountry();
  });

d3.select("#buttonsMenu")
  .append("div")
  .attr("id", "viewWorldTrip")
  .html("Viewing World Trip")
  .style("color", "#4292c6")
  .style("border", "dashed 1px gray")
  .on("click", () => {
    clearTheInterval();
    viewingTrip = "World";
    changeViewingCountry();
  });

function changeViewingCountry() {
  if (viewingTrip === "Iceland") {
    icelandOpacity = 1;
    icelandVisibility = "visible";
    worldTripOpacity = 0;
    worldTripVisibility = "hidden";

    d3.select("#viewIceland")
      .html("Viewing Iceland Trip")
      .style("border", "dashed 1px gray");

    d3.select("#viewWorldTrip")
      .html("Go To World Trip")
      .style("border", "none");

    d3.select("#viewAllTrips")
      .html("Go To All Trips")
      .style("border", "none");

    d3.selectAll("#tripControls, #budgetButton")
      .transition()
      .duration(400)
      .style("transform", "translateX(-100%)");
  }

  if (viewingTrip === "World") {
    icelandOpacity = 0;
    icelandVisibility = "hidden";
    worldTripOpacity = 1;
    worldTripVisibility = "visible";

    d3.select("#viewWorldTrip")
      .html("Viewing World Trip")
      .style("border", "dashed 1px gray");

    d3.select("#viewIceland")
      .html("Go To Iceland Trip")
      .style("border", "none");

    d3.select("#viewAllTrips")
      .html("Go To All Trips")
      .style("border", "none");

    d3.selectAll("#tripControls, #budgetButton")
      .transition()
      .duration(400)
      .style("transform", "translateX(0%)");
  }

  if (viewingTrip === "All") {
    icelandOpacity = 1;
    icelandVisibility = "visible";
    worldTripOpacity = 1;
    worldTripVisibility = "visible";

    d3.select("#viewAllTrips")
      .html("Viewing All Trips")
      .style("border", "dashed 1px gray");

    d3.select("#viewWorldTrip")
      .html("Go To World Trip")
      .style("border", "none");

    d3.select("#viewIceland")
      .html("Go To Iceland Trip")
      .style("border", "none");

    d3.selectAll("#tripControls, #budgetButton")
      .transition()
      .duration(400)
      .style("transform", "translateX(-100%)");
  }

  d3.selectAll(".icelandTravelPath, .icelandPins")
    .transition()
    .duration(500)
    .style("opacity", icelandOpacity);

  function changeIcelandVisibility() {
    d3.selectAll(".icelandTravelPath, .icelandPins").style(
      "visibility",
      icelandVisibility
    );
  }

  if (icelandVisibility === "visible") {
    changeIcelandVisibility();
  }

  if (icelandVisibility === "hidden") {
    setTimeout(() => {
      changeIcelandVisibility();
    }, 500);
  }

  d3.selectAll(".travelPath, .pin")
    .transition()
    .duration(500)
    .style("opacity", worldTripOpacity);

  function changeWorldVisibility() {
    d3.selectAll(".travelPath, .pin").style("visibility", worldTripVisibility);
  }

  if (worldTripVisibility === "visible") {
    changeWorldVisibility();
  }
  if (worldTripVisibility === "hidden") {
    setTimeout(() => {
      changeWorldVisibility();
    }, 500);
  }
} //<---END OF CHANGE VIEWING COUNTRY FUNCTION

//CLOSE THE MENU BUTTON AND FUNCTION
// d3.select("#buttonsMenu")
//   .append("div")
//   .attr("id", "closeMenu")
//   .html("^")
//   .style("text-align", "center")
//   .style("font", "bold 18px verdana")
//   .style("color", "white")
//   .style("margin-top", "10px")
//   .style("cursor", "pointer")
//   .on("click", closeMenu);

function closeMenu() {
  d3.select("#buttonsMenu")
    .transition()
    .duration(500)
    .style("visibility", "hidden");

  d3.select("#showMenu")
    .transition()
    .duration(500)
    .style("visibility", "visible");
}

// ZOOM BUTTONS AND FUNCTIONS

let zoom = controls
  .append("div")
  .attr("id", "zoom")
  .attr("class", "menuItem");

zoom
  .append("div")
  .attr("id", "zoomFactor")
  .html("Zoom")
  .style("font", "12px verdana")
  .style("margin-bottom", "4px")
  .style("transform", "translateX(-3px)");

zoom
  .append("input")
  .attr("id", "zoomInput")
  .attr("value", "1")
  .on("input", function() {
    d3.select("#zoomInput").on("click", null);
    clearTheInterval();
    refreshType = "zoomArb";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });

zoom
  .append("div")
  .attr("id", "zoomIn")
  .html("+")
  .on("click", function() {
    d3.select("#zoomIn").on("click", null);
    clearTheInterval();
    refreshType = "zoomIn";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });

zoom
  .append("div")
  .attr("id", "zoomOut")
  .html("-")
  .on("click", function() {
    d3.select("#zoomOut").on("click", null);
    clearTheInterval();
    refreshType = "zoomOut";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });

function resetOnClick() {
  projectionButton.on("click", function() {
    projectionButton.on("click", null);
    clearTheInterval();
    refreshType = "projection";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });
  d3.select("#zoomIn").on("click", function() {
    d3.select("#zoomIn").on("click", null);
    clearTheInterval();
    refreshType = "zoomIn";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });
  d3.select("#zoomOut").on("click", function() {
    d3.select("#zoomOut").on("click", null);
    clearTheInterval();
    refreshType = "zoomOut";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });
  d3.select("#zoomInput").on("click", function() {
    d3.select("#zoomInput").on("input", null);
    clearTheInterval();
    refreshType = "zoomArb";
    setTimeout(function() {
      resetOnClick();
    }, 800);
    refresh();
  });
}

//TIMEOUT AND INTERVAL VARIABLES
let day = 1;
let interval;
let timeouts = [];
let speed = 3000;

function clearTheInterval() {
  for (let i = 0; i < timeouts.length; i++) {
    window.clearTimeout(timeouts[i]);
  }
  let mouseout = new Event("mouseout");
  for (let i = day; i > day - 20; i--) {
    let thisPin = document.querySelector(`.pin[data-day="${i}"]`);
    if (thisPin !== null) {
      thisPin.dispatchEvent(mouseout);
    }
  }

  d3.select("#animationButton")
    .classed("clicked", false)
    .html("►");
  clearInterval(interval);
}

let tripControls = d3
  .select("body")
  .append("div")
  .attr("id", "tripControls")
  .style("height", () => {
    if (isIphone) {
      return "60px";
    } else {
      return "30px";
    }
  })
  .style("transform", "translateX(-100%)");
//CREATE SLIDER
let slider = tripControls
  .append("input")
  .attr("type", "range")
  .attr("min", "1")
  .attr("value", "1")
  .attr("class", "slider")
  .attr("id", "myRange")
  .style("width", "75%"); //() => {
//   if (isIphone) {return "60%"}
//   else {return "75%"}
// });

tripControls
  .append("div")
  .attr("id", "currentLocation")
  .html("Day: <br><span>0</span>")
  .style("left", "12%"); //() => {
//   if (isIphone) {
//     return "19.5%";
//   } else {
//     return "12%";
//   }
// });

tripControls
  .append("div")
  .attr("id", "sliderLegendButton")
  .on("mouseover", () => {
    d3.select("#sliderLegend").style("visibility", "visible");
  })
  .on("mouseout", () => {
    d3.select("#sliderLegend").style("visibility", "hidden");
  });

//CREATE BUDGET STUFF
d3.select("body")
  .append("div")
  .attr("id", "budgetButton")
  .style("transform", "translate(-" + window.innerWidth + "px, 0)")
  .html("$")
  .on("click", () => {
    let visibility = document.getElementById("budgetBody").style.visibility;

    if (visibility === "hidden") {
      d3.select("#budgetButton")
        .transition()
        .duration(400)
        .style("transform", "scale(2)");

      d3.select("#budgetBody")
        .style("transform", "scale(.01)")
        .style("opacity", 1)
        .style("visibility", "visible");

      d3.select("#budgetBody")
        .transition()
        .duration(400)
        .style("opacity", 1)
        .style("transform", "scale(1)");
    } else {
      d3.select("#budgetButton")
        .transition()
        .duration(400)
        .style("transform", "scale(1)");

      d3.select("#budgetBody")
        .transition()
        .duration(400)
        .style("transform", "scale(.01)")
        .style("opacity", 0);

      setTimeout(() => {
        d3.select("#budgetBody").style("visibility", "hidden");
      }, 500);
    }
  });

//LEGEND SHOWN WHEN HOVERING ON SLIDER BUTTON
d3.select("body")
  .append("div")
  .attr("id", "sliderLegend")
  .style("visibility", "hidden");

d3.select("#sliderLegend")
  .append("div")
  .attr("id", "sliderLegTitle")
  .html("World Trip Slider Legend");

//CONTAINER FOR COUNTRY COLORS
tripControls
  .append("div")
  .attr("class", "slider-background-container")
  .style("height", () => {
    if (isIphone) {
      return "20px";
    } else {
      return "6px";
    }
  })
  .style("width", "75%"); //() => {
//   if (isIphone) {return "60%"}
//   else {return "75%"}
// });

//SLIDER ANIMATION
tripControls.append("div").attr("id", "animationButton");

tripControls
  .append("div")
  .attr("id", "animationSpeed")
  .html("Speed")
  .append("input")
  .attr("value", "3")
  .on("input", changeSpeed);

function changeSpeed() {
  clearTheInterval();
  speed = this.value * 1000;
}

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
      qi = (w[2] * Math.sin(theta)) / w_len;
    qj = (-w[1] * Math.sin(theta)) / w_len;
    qk = (w[0] * Math.sin(theta)) / w_len;
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

// SET SIZE OF SVG EARTH BASED ON HEIGHT OR WIDTH, WHICHEVER IS SMALLER

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
if (windowHeight <= windowWidth) {
  (width = windowHeight), (height = windowHeight);
} else if (windowHeight > windowWidth) {
  (width = windowWidth), (height = windowWidth);
}

// ORTHOGRAPHIC PROJECTION TO START WITH

projection = d3
  .geoOrthographic()
  .translate([windowWidth / 2, windowHeight / 2])
  .scale(width / 2 - 20)
  .clipAngle(90)
  .precision(0.6);
//  .rotate([-40, -30]);

if (Math.abs(window.orientation) === 90) {
  windowHeight *= 1.01;
  setTimeout(() => {
    alert("Turn to portrait mode and then back to landscape again.");
  }, 500);
}
// if (Math.abs(window.orientation) === 90 || window.orientation === 0) {
//   d3.select("#zoom").style("transform", "translate(0px, -150%) scale(2)");
//   d3.selectAll("#buttonsMenu, #showMenu").style(
//     "transform",
//     "translate(50%, 100px) scale(2)"
//   );
//   d3.select("#fullscreen").style("visibility", "hidden");
// }

// INITIALIZE EVERYTHING (RUNS AGAIN WHEN PROJECTION BUTTON IS CLICKED)

initialize();

function initialize() {
  // VARIABLE USED TO CONVERT PATHS TO LONG,LAT AND RUN THROUGH PROJECTION
  var path = d3.geoPath().projection(projection);

  //CREATE BACKGROUND

  d3.select("body")
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
    .attr("width", function() {
      if (window.chrome) {
        return "100vw";
      } else return "100%";
    })
    .attr("height", function() {
      if (window.chrome) {
        return "100vh";
      } else return windowHeight;
    });

  // QUEUE MY JSON FILES --> MAP, COUNTRY NAMES, AND TRAVEL INFO

  queue()
    .defer(d3.json, "WorldCountries.json")
    .defer(d3.tsv, "WorldCountryNames.tsv")
    .defer(d3.json, "wequitourjobs.json")
    .defer(d3.json, "/all")
    .await(ready);

  function ready(error, world, names, data, dataIceland) {
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
      clearTheInterval();

      gpos0 = projection.invert(d3.mouse(this));
      o0 = projection.rotate();

      svg
        .insert("path")
        .datum({ type: "Point", coordinates: gpos0 })
        .attr("class", "point")
        .attr("d", path);
    }

    function dragged() {
      var gpos1;

      gpos1 = projection.invert(d3.mouse(this));

      o0 = projection.rotate();

      var o1 = eulerAngles(gpos0, gpos1, o0);
      o1[2] = 0; //<--added tthis to keep the poles always in the center (north is always up unless you keep rotating until the globe is upside down)

      projection.rotate(o1);

      svg.selectAll(".point").datum({ type: "Point", coordinates: gpos1 });
      //update all of the map features
      d3.selectAll(".graticule").attr("d", path);
      d3.selectAll(".land").attr("d", path);
      d3.selectAll(".border").attr("d", path);
      svg.selectAll(".pin").attr("d", path);
      svg.selectAll(".icelandPins").attr("d", path);
      svg.selectAll(".travelPath").attr("d", path);
      svg.selectAll(".icelandTravelPath").attr("d", path);
    }

    function dragged2(input) {
      //FOR SLIDER AND ANIMATION ROTATION

      var gpos1;

      gpos0 = input;
      gpos1 = projection.invert([
        window.innerWidth / 2,
        window.innerHeight / 2
      ]);

      o0 = projection.rotate();

      var o1 = eulerAngles(gpos0, gpos1, o0);
      if (o1 === undefined) return;
      o1[2] = 0; //<--added tthis to keep the poles always in the center (north is always up unless you keep rotating until the globe is upside down)

      d3.transition()
        .duration(speed / 4)
        .tween("rotate", function() {
          var r = d3.interpolate(o0, o1);
          return function(t) {
            projection.rotate(r(t));
            d3.selectAll(".graticule").attr("d", path);
            d3.selectAll(".land").attr("d", path);
            d3.selectAll(".border").attr("d", path);
            svg.selectAll(".pin").attr("d", path);
            svg.selectAll(".icelandPins").attr("d", path);
            svg.selectAll(".travelPath").attr("d", path);
            svg.selectAll(".icelandTravelPath").attr("d", path);
          };
        });
    }

    function dragended() {
      svg.selectAll(".point").remove();
    }

    // OCEAN AND EARTH BORDER
    var globe = { type: "Sphere" };

    d3.select("#world")
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
    graticule.step([10, 11.75]);
    graticuleObj = graticule.lines();

    svg
      .selectAll(null)
      .data(graticuleObj)
      .enter()
      .append("path")
      .attr("class", "graticule")
      .attr("id", (d, i) => "graticule" + i)
      .attr("d", path);

    // DRAW ALL THE COUNTRIES
    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter()
      .append("path")
      .attr("class", "land")
      .attr("stroke", "#515151")
      .attr("d", path)
      .on("mouseover", showCountryName)
      .on("mouseout", hideCountryName)
      .on("click", goToCountry);

    // COUNTRY HOVER FUNCTIONS
    function showCountryName(d, i) {
      d3.select("#tooltip")
        .style("visibility", "visible")
        .html(function() {
          let countryName = names.filter(x => x.id == d.id);
          return countryName[0].name;
        })
        .style("left", d3.event.pageX + 25 + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .style("transform", "translate(0,0")
        .style("box-shadow", "0px 0px 8px 4px" + this.getAttribute("stroke"));

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

    //LOCATIONS TO CREATE MAP POINTS AND PATHS FROM

    let locations = [];

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

    // FOR LOOP TO SET LOCATIONS ARRAY INDEXES
    for (let i = 1; i < data.all_steps.length; i++) {
      // create date object with start time and get variables from it

      let utcTime = new Date(data.all_steps[i].start_time * 1000);
      let firstDay = new Date(data.all_steps[0].start_time * 1000);
      let dayNum = Math.floor((utcTime - firstDay) / 86400000); //difference (86,400,000 milliseconds in a day)
      let month = formatMonth[utcTime.getMonth()];
      let day = utcTime.getDate();
      let year = utcTime.getFullYear();

      //can't set days_at_location until we know time of next index
      if (i > 1) {
        locations[i - 1].days_at_location =
          (utcTime.getTime() - locations[i - 1].date.getTime()) / 86400000;
      }

      // let imageArray;
      // if (Array.isArray(data.all_steps[i].main_media_item_path)){
      //   imageArray = data.all_steps[i].main_media_item_path
      // } else imageArray = [data.all_steps[i].main_media_item_path];

      //location object used throughout code
      locations[i] = {
        date: utcTime,
        day_of_trip: dayNum,
        days_at_location: 0,
        country: data.all_steps[i].location.detail,
        city: data.all_steps[i].location.name,
        coordinates: [
          data.all_steps[i].location.lon,
          data.all_steps[i].location.lat
        ],
        locationInfo: `${data.all_steps[i].location.name}, ${
          data.all_steps[i].location.detail
        }</br><span>Arrived:</br>${month} ${day}, ${year}, day ${dayNum}</span>`,
        locationImage: data.all_steps[i].main_media_item_path
      };
    } //<---END OF FOR LOOP

    // FILL SLIDER CONTAINER WITH COLORED COUNTRY UNITS

    let sliderRange = document.getElementById("myRange").offsetWidth;

    let maxRange = locations[locations.length - 1].day_of_trip;

    let sliderUnits = document.getElementsByClassName("slider-units");

    if (sliderUnits.length === 0) {
      let locationsList = [];

      locations.forEach(x => {
        d3.select(".slider-background-container")
          .append("div")
          .attr("class", "slider-units")
          .attr("id", () => {
            if (x.country === "United States") {
              return "slider-United-States";
            } else return "slider-" + x.country;
          })
          .style("width", (sliderRange / maxRange) * x.days_at_location + "px");

        if (!locationsList.includes(x.country)) {
          locationsList.push(x.country);
        }
      });

      locationsList.forEach((x, i) => {
        d3.select("#sliderLegendButton")
          .append("div")
          .style("height", "15px")
          .style("width", "1px")
          .attr("id", () => {
            if (x === "United States") {
              return "slider-United-States";
            } else return "slider-" + x;
          });

        d3.select("#sliderLegend")
          .append("div")
          .attr("id", "sliderLegContainer" + i)
          .style("display", "flex")
          .style("margin", "5px 0 0 20px")
          .style("font", "bold 14px verdana")
          .append("div")
          .style("height", "15px")
          .style("width", "15px")
          .attr("id", () => {
            if (x === "United States") {
              return "slider-United-States";
            } else return "slider-" + x;
          });

        d3.select("#sliderLegContainer" + i)
          .append("div")
          .style("margin-left", "20px")
          .html(x);
      }); //<---END OF LOCATIONSLIST.FOREACH
    } //<---END OF IF SLIDER UNITS LENGTH STATEMENT

    //SLIDER FUNCTIONS/ANIMATIONS AND PLAY BUTTON

    d3.select("#myRange")
      .attr("max", maxRange)
      .on("input", myRangeInput)
      .on("change", myRangeChange);

    d3.select("#animationButton")
      .html("►")
      .on("click", () => {
        if (d3.select("#animationButton").classed("clicked")) {
          clearTheInterval();
        } else {
          d3.select("#animationButton")
            .classed("clicked", true)
            .html("||");
          worldTour();
          interval = setInterval(function() {
            worldTour();
          }, speed);
        }
      });

      //ANIMATION
    function worldTour() {
      if (day === 260 || day === undefined) {
        day = 1;
      }
      document.getElementById("myRange").value = day;
      myRangeChange(document.getElementById("myRange"));
      day++;
    }

    //CHANGE CURRENTLOCATION ON INPUT
    function myRangeInput() {
      let thisGuy = document.getElementById("myRange");
      d3.select("#currentLocation").style(
        "left",
        (thisGuy.offsetWidth / Number(thisGuy.max)) * Number(thisGuy.value) +
          window.innerWidth / 8 +
          "px"
      )
      .html("Day: <br><span>" + thisGuy.value + "</span>");
    };

    //ROTATE EARTH AND ACTIVATE HOVER STATE ON SLIDER INPUT (OR ANIMATION)
    function myRangeChange() {
      let thisGuy = document.getElementById("myRange");

      day = thisGuy.value; //if slider changed manually animation will continue from its new value

      let filterLocation = locations.filter(
        x => x.day_of_trip <= Number(thisGuy.value)
      );

      let lastLocation = filterLocation[filterLocation.length - 2];
      let currentLocation = filterLocation[filterLocation.length - 1];

      let select = d3.select("#currentLocation");

      select
        .style(
          "left",
          (thisGuy.offsetWidth / Number(thisGuy.max)) * Number(thisGuy.value) +
            window.innerWidth / 8 +
            "px"
        )
        .html("Day: <br><span>" + thisGuy.value + "</span>");

      // select
      //   .transition()
      //   .duration(1)
      //   .style("opacity", 1);

      let oldCoords = currentLocation.coordinates.map(
        x => Math.floor(x * 100) / 100
      );
      let newCoords = projection
        .invert([window.innerWidth / 2, window.innerHeight / 2])
        .map(x => Math.floor(x * 100) / 100);
      var mouseout = new Event("mouseout");
      var mouseover = new Event("mouseover");

      if (newCoords[0] !== oldCoords[0] || newCoords[1] !== oldCoords[1]) {
        if (lastLocation) {
          document
            .querySelectorAll(`.pin[data-day="${lastLocation.day_of_trip}"]`)
            .forEach(x => x.dispatchEvent(mouseout));
        }

        dragged2(currentLocation.coordinates);
        let delay = speed / 4 + 300;
        let pins = document.querySelectorAll(
          `.pin[data-day="${currentLocation.day_of_trip}"]`
        );

        if (pins.length === 1) {
          setTimeout(function() {
            document
              .querySelector(`.pin[data-day="${currentLocation.day_of_trip}"]`)
              .dispatchEvent(mouseover);
          }, delay);
        } else {
          pins.forEach((x, i) => {
            timeouts.push(
              setTimeout(function() {
                x.dispatchEvent(mouseover);
              }, ((speed - delay) / pins.length) * i + delay)
            );
          });
        } //<--END OF ELSE STATEMENT
      } //<---END OF IF(NEW COORDS...) STATEMENT

      // select
      //   .transition()
      //   .duration(6000)
      //   .style("opacity", 0);
    } //<---END OF myRangeChange FUNCTION

    //TRAVEL PATH LINES
    let locationsPaths = [];
    for (let i = 1; i < locations.length - 1; i++) {
      locationsPaths.push([
        locations[i].coordinates,
        locations[i + 1].coordinates
      ]);
    }

    //geojson format

    function geoPaths(places) {
      return places.map(function(d) {
        return {
          type: "LineString",
          coordinates: d
        };
      });
    }

    //create the paths

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
      .attr("d", path)
      .style("opacity", worldTripOpacity)
      .style("visibility", worldTripVisibility);

    //CONVERT LOCATION POINTS TO GEOJSON FORMAT

    function geoLocations(locations) {
      //radius
      //let r = .5;

      //hypotenuse
      //let a = Math.sqrt(Math.pow(r, 2) / 2);

      return locations.map(function(d) {
        return {
          //CONVERT LOCATION POINTS TO OCTAGONS
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
          days_at_location: Math.floor(d.days_at_location),
          day: d.day_of_trip,
          image: function() {
            let images = [];
            d.locationImage.forEach(x => {
              if (x.match(/\.mp4/)) {
                images.push(`<video src=${x} controls>
                  Your browser does not support the video tag.
                </video>`);
              } else {
                images.push(`<img src=${x}>`);
              }
            });
            return images;
          },
          image_thumbnail: `<img src=${
            d.locationImage[0]
          } style= "max-width:200px; max-height:200px; border-radius: 20px;" />`
        };
      });
    }

    // PLOT THE POINTS ON THE MAP

    svg
      .selectAll(null)
      .data(geoLocations(locations))
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "pin")
      .attr("fill", "white")
      .attr("data-day", (d, i) => {
        if (i !== 0) return d.day;
      })
      .attr("stroke", "#4292c6")
      .attr("stroke-width", "2px")
      .style("opacity", worldTripOpacity)
      .style("visibility", worldTripVisibility)
      .on("mouseover", locationData)
      .on("mouseout", locationDataOff)
      .on("click", showImage);

    // CREATE ARRAYS FOR ICELAND TRIP LOCATIONS AND PATHS
    dataIceland.sort((a, b) => {
      let aTime = a.time.substring(0, 8).split(":");
      let bTime = b.time.substring(0, 8).split(":");
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      if (Number(aTime[0]) > Number(bTime[0])) {
        return 1;
      }
      if (Number(aTime[0]) < Number(bTime[0])) {
        return -1;
      }
    });

    let icelandLocations = [];

    for (let i = 0; i < dataIceland.length; i++) {
      let utcTime = new Date(dataIceland[i].date + " " + dataIceland[i].time);

      let dayNum;
      if (i === 0) {
        dayNum = 0;
      } else {
        dayNum =
          (utcTime.getTime() - icelandLocations[0].date.getTime()) / 86400000;
      }

      icelandLocations[i] = {
        country: dataIceland[i].country,
        city: dataIceland[i].city,
        coordinates: [dataIceland[i].longitude, dataIceland[i].lattitude],
        locationInfo: `${dataIceland[i].city}, ${
          dataIceland[i].country
        }</br><span>Arrived:</br>${dataIceland[i].date}, day ${Math.round(
          dayNum
        )}`,
        day_of_trip: dayNum,
        days_at_location: 0,
        date: utcTime,
        time: dataIceland[i].time,
        locationImage: dataIceland[i].image
      };
    }

    for (let i = 0; i < icelandLocations.length - 1; i++) {
      icelandLocations[i].days_at_location =
        (icelandLocations[i + 1].date.getTime() -
          icelandLocations[i].date.getTime()) /
        86400000;
    }

    let icelandLocationsPaths = [];
    for (let i = 0; i < icelandLocations.length - 1; i++) {
      icelandLocationsPaths.push([
        icelandLocations[i].coordinates,
        icelandLocations[i + 1].coordinates
      ]);
    }

    //CREATE TRAVEL PATH AND PINS OF ICELAND TRIP

    svg
      .append("g")
      .selectAll(".IcelandTravelPath")
      .data(geoPaths(icelandLocationsPaths))
      .enter()
      .append("path")
      .attr("class", "icelandTravelPath")
      .attr("stroke", "red")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("d", path)
      .style("opacity", icelandOpacity)
      .style("visibility", icelandVisibility);

    svg
      .selectAll(".icelandPins")
      .data(geoLocations(icelandLocations))
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "icelandPins")
      .attr("fill", "white")
      .attr("stroke", "#ff0000")
      .attr("stroke-width", "2px")
      .style("opacity", icelandOpacity)
      .style("visibility", icelandVisibility)
      .on("mouseover", locationData)
      .on("mouseout", locationDataOff)
      .on("click", showImage);

    // FUNCTIONS WHEN PIN IS CLICKED

    function showImage(d, i) {
      let container = d3
        .select("body")
        .append("div")
        .attr("id", "imageContainer")
        .on("click", hideImage);

      d.image().forEach((image, index) => {
        container
          .append("div")
          .attr("id", "stepImage" + index)
          .attr("class", "stepImage")
          .style("opacity", () => {
            if (index === 0) {
              return 1;
            } else return 0;
          })
          .html(image);
      });

      if (d.image().length > 1) {
        d3.select("body")
          .append("div")
          .attr("id", "nextImage")
          .html(">")
          .on("click", () => {
            nextImage("next");
          });
        d3.select("body")
          .append("div")
          .attr("id", "prevImage")
          .html("<")
          .on("click", () => {
            nextImage("prev");
          });
      }
      let count = 0;
      function nextImage(input) {
        d3.select("#stepImage" + count)
          .transition()
          .duration(400)
          .style("opacity", 0);
        if (input === "next") {
          count++;
        } else if (input === "prev") {
          count--;
        }
        d3.select("#stepImage" + count)
          .transition()
          .duration(400)
          .style("opacity", 1);
      }
    } //<---END OF SHOW IMAGE

    function hideImage() {
      d3.selectAll("#imageContainer, #nextImage, #prevImage").remove();
    }

    // PIN HOVER FUNCTIONS

    function locationData(d, i) {
      let thisX = Number(this.getAttribute("d").split(/[MLm,]/)[1]);
      let thisY = Number(this.getAttribute("d").split(/[MLm,]/)[2]);

      let x = this.getBoundingClientRect().x;
      let y = this.getBoundingClientRect().y;

      d3.selectAll(".pinAfter").classed("pinAfter", false);

      d3.select(this).classed("pinAfter", true);

      d3.select(".pinAfter")
        .style("transform-origin", `${thisX}px  ${thisY}px`)
        .style("animation-name", "pinGrow");

      let color = this.getAttribute("stroke");

      d3.select(".pinAfter").attr("fill", "orange");
      d3.select("#tooltip")
        //.classed("showBefore", true)
        .style("visibility", "visible")
        .html(
          `${d.info}</br><span>Days at location: ${d.days_at_location}</span>`
        )
        .style("left", x + "px")
        .style("transform", "translate(50px, -50%")
        .style("top", y + "px")
        .style("border-color", color)
        .style("box-shadow", "0px 0px 8px 4px" + color);

      //setTimeout(function(){

      d3.select("#tooltip")
        .append("div")
        .attr("id", "tooltip-thumbnail-image")
        .html(d.image_thumbnail)
        .style("border-color", color);
      // .style("box-shadow", "0px 0px 8px 4px"+color);

      //}, 400)
    }

    function locationDataOff(d, i) {
      d3.selectAll(".pinAfter")
        .attr("fill", "white")
        .style("animation-name", "pinShrink");

      d3.select("#tooltip")
        .classed("showBefore", false)
        .style("visibility", "hidden");
    }

    // FUNCTION WHEN COUNTRY IS CLICKED

    function goToCountry(d, i) {
      let newProj;

      if (d.id == 840) {
        newProj = d3
          .geoAlbersUsa()
          .scale(width)
          .translate([width / 2, width / 2]);
      } else {
        newProj = d3
          .geoOrthographic()
          .scale(
            d.id == 643 // RUSSIA
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
          .translate([width / 2, width / 2])
          .rotate([-d3.geoCentroid(d)[0], -d3.geoCentroid(d)[1]]);
      }

      let newPath = d3.geoPath().projection(newProj);

      let thisGuy = topojson.feature(
        world,
        world.objects.countries.geometries[i]
      );
      d3.select("body")
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

      let countryName = names.filter(x => x.id == d.id);

      textBox
        .append("div")
        .attr("id", "countryFocusName")
        .html(countryName[0].name);

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

      let locationFilter = locations.filter(
        x => x.country === countryName[0].name
      );

      let icelandLocationFilter = icelandLocations.filter(
        x => x.country === countryName[0].name
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

      // svg2
      // .append("g")
      // .selectAll(".newTravelPath")
      // .data(geoPaths(locationsPaths))
      // .enter()
      // .append("path")
      // .attr("class", "newTravelPath")
      // .attr("stroke", "#4292c6")
      // .attr("stroke-width", "2px")
      // .attr("fill", "none")
      // .attr("d", newPath)
      // .style("opacity", worldTripOpacity);

      svg2
        .selectAll(".newIcelandPin")
        .data(geoLocations(icelandLocationFilter))
        .enter()
        .append("path")
        .attr("d", newPath)
        .attr("class", "newIcelandPin")
        .attr("fill", "white")
        .attr("stroke", "#ff0000")
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
    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("z-index", "99");
  } // <--- END OF READY FUNCTION_________________
} //<------END OF INITIALIZE FUNCTION_________________________________

//BUDGET STUFF_________________________________
function doStuff(err, data) {
  let budgetInfo = data.Sheet1;

  // SPLIT OUT ALL OF THE COUNTRIES

  let countriesArray = [];

  budgetInfo.forEach(d => {
    if (countriesArray.indexOf(d.Country) === -1) {
      countriesArray.push(d.Country);
    }
  });

  // TURN ARRAY OF COUNTRIE INTO OBJECTS WITH PERTINENT INFO

  countriesArray.forEach((d, i) => (countriesArray[i] = dailyAverage(d)));

  function dailyAverage(country) {
    let budgetCountry = budgetInfo.filter(d => d.Country === country);
    let totalCountry = 0;
    budgetCountry.forEach(d => (totalCountry += d.Cost));

    let categoryTotals = {};
    budgetCountry.forEach(d => {
      let category = d["Category "];
      categoryTotals[category] = 0;
    });

    budgetCountry.forEach(d => {
      let category = d["Category "];
      categoryTotals[category] += d.Cost;
      categoryTotals[category] =
        Math.round(categoryTotals[category] * 100) / 100;
    });

    let totalAirfare = 0;
    budgetCountry.forEach(d => {
      if (d["Category "] === "Airfare") {
        totalAirfare += d.Cost;
      }
    });

    let firstDate = new Date(budgetCountry[0].Date);

    let lastDate = new Date(budgetCountry[budgetCountry.length - 1].Date);
    let daysNum = (lastDate.getTime() - firstDate.getTime()) / 86400000;
    let daysNum2 = [];

    budgetCountry.forEach(d => {
      if (daysNum2.indexOf(d.Date) === -1) {
        daysNum2.push(d.Date);
      }
    });

    return {
      country: country,
      total_expenses: Math.floor(totalCountry * 100) / 100,
      total_airfare: totalAirfare,
      category_totals: categoryTotals,
      days_in_country: daysNum2.length,
      date_range: { from: firstDate.toString(), to: lastDate.toString() },
      daily_average: Math.floor((totalCountry / daysNum2.length) * 100) / 100,
      first_day: firstDate.getTime()
    };
  }

  //CREATE SORTING BUTTONS

  d3.select("body")
    .append("div")
    .attr("id", "budgetBody")
    .style("visibility", "hidden");

  let buttonsContainer = d3
    .select("#budgetBody")
    .append("div")
    .attr("id", "buttonsContainer");

  buttonsContainer
    .append("div")
    .classed("sortButton sortByAvg", true)
    .on("click", sortByAvg)
    .append("div")
    .html("Daily Average");

  buttonsContainer
    .append("div")
    .classed("sortButton sortChrono", true)
    .on("click", sortChrono)
    .style("box-shadow", "0 0 10px red")
    .append("div")
    .html("Chronologically");

  buttonsContainer
    .append("div")
    .classed("sortButton sortTotExp", true)
    .on("click", sortTotExp)
    .append("div")
    .html("Total Expenses");

  buttonsContainer
    .append("div")
    .classed("sortButton sortDays", true)
    .on("click", sortDays)
    .append("div")
    .html("Days in Country");

  //CHOOSE SORTING PARAMETER AND EXECUTE sortStuff()

  let sortType = "chronological";

  function sortChrono() {
    countriesArray.sort((a, b) => {
      if (a.first_day < b.first_day) {
        return -1;
      } else {
        return 1;
      }
    });

    d3.selectAll(".sortButton").style("box-shadow", "none");
    d3.select(".sortChrono").style("box-shadow", "0 0 10px red");

    sortType = "chronological";
    sortStuff();
  }

  function sortByAvg() {
    countriesArray.sort((a, b) => {
      if (a.daily_average < b.daily_average) {
        return -1;
      } else {
        return 1;
      }
    });

    d3.selectAll(".sortButton").style("box-shadow", "none");
    d3.select(".sortByAvg").style("box-shadow", "0 0 10px red");

    sortType = "average";
    sortStuff();
  }

  function sortTotExp() {
    countriesArray.sort((a, b) => {
      if (a.total_expenses < b.total_expenses) {
        return -1;
      } else {
        return 1;
      }
    });

    d3.selectAll(".sortButton").style("box-shadow", "none");
    d3.select(".sortTotExp").style("box-shadow", "0 0 10px red");

    sortType = "total expenses";
    sortStuff();
  }

  function sortDays() {
    countriesArray.sort((a, b) => {
      if (a.days_in_country < b.days_in_country) {
        return -1;
      } else {
        return 1;
      }
    });

    d3.selectAll(".sortButton").style("box-shadow", "none");
    d3.select(".sortDays").style("box-shadow", "0 0 10px red");

    sortType = "days in country";
    sortStuff();
  }

  //DO THE SORTING WITH ANIMATION____________

  function sortStuff() {
    d3.select("#budgetTooltip").remove();

    setTimeout(function() {
      d3.selectAll(".barName").remove();
    }, 400);

    d3.selectAll(".bars")
      .transition()
      .duration(600)
      .style("width", "1px");

    setTimeout(function() {
      removeBars();
    }, 700);

    function removeBars() {
      d3.selectAll(".barContainer").remove();
      createBars();
    }
  }

  //CONTAINER AND FUNCTION CREATING BAR CHART WITH ANIMATION____________

  let container = d3
    .select("#budgetBody")
    .append("div")
    .attr("id", "budgetContainer");

  let colors = d3.schemeSpectral[7];

  function createBars() {
    container
      .selectAll(null)
      .data(countriesArray)
      .enter()
      .append("div")
      .attr("class", "barContainer")
      .style("margin-top", "15px")
      .append("div")
      .attr("class", "bars")
      .style("background-color", "gray")
      .style("width", "1px")
      .style("height", "20px")
      .on("mouseover", showTooltip)
      .on("click", showTooltip);

    container
      .append("div")
      .attr("id", "budgetTooltip")
      .style("visibility", "hidden");

    let categories = [
      "Country",
      "Date-Range",
      "Totals",
      "Airfare",
      "Food",
      "Transportation",
      "Accommodation",
      "Entertainment",
      "Beer",
      "Other"
    ];

    categories.forEach(x => {
      d3.select("#budgetTooltip")
        .append("div")
        .classed("tooltip-" + x, true);
    });

    d3.select("#budgetTooltip").on("click", hideTooltip);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "airfare")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.total_airfare / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country * (d.total_airfare / d.total_expenses) * 11 + "px"
          );
        } else return (d.total_airfare / d.days_in_country) * 6 + "px";
      })
      .style("background-color", colors[0]);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "food")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.category_totals.Food / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country *
              (d.category_totals.Food / d.total_expenses) *
              11 +
            "px"
          );
        } else return (d.category_totals.Food / d.days_in_country) * 6 + "px";
      })
      .style("background-color", colors[1]);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "transportation")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.category_totals.Transportation / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country *
              (d.category_totals.Transportation / d.total_expenses) *
              11 +
            "px"
          );
        } else
          return (
            (d.category_totals.Transportation / d.days_in_country) * 6 + "px"
          );
      })
      .style("background-color", colors[2]);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "accommodation")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.category_totals.Accommodation / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country *
              (d.category_totals.Accommodation / d.total_expenses) *
              11 +
            "px"
          );
        } else
          return (
            (d.category_totals.Accommodation / d.days_in_country) * 6 + "px"
          );
      })
      .style("background-color", colors[3]);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "entertainment")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.category_totals.Entertainment / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country *
              (d.category_totals.Entertainment / d.total_expenses) *
              11 +
            "px"
          );
        } else
          return (
            (d.category_totals.Entertainment / d.days_in_country) * 6 + "px"
          );
      })
      .style("background-color", colors[4]);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "alcohol")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.category_totals.Beer / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country *
              (d.category_totals.Beer / d.total_expenses) *
              11 +
            "px"
          );
        } else return (d.category_totals.Beer / d.days_in_country) * 6 + "px";
      })
      .style("background-color", colors[5]);

    d3.selectAll(".bars")
      .append("div")
      .attr("class", "other")
      .style("height", "30px")
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.category_totals.Other / 3 + "px";
        } else if (sortType === "days in country") {
          return (
            d.days_in_country *
              (d.category_totals.Other / d.total_expenses) *
              11 +
            "px"
          );
        } else return (d.category_totals.Other / d.days_in_country) * 6 + "px";
      })
      .style("background-color", colors[6]);

    //ANIMATE TO CORRECT WIDTH
    d3.selectAll(".bars")
      .transition()
      .duration(600)
      .style("width", d => {
        if (sortType === "total expenses") {
          return d.total_expenses / 3 + "px";
        } else if (sortType === "days in country") {
          return d.days_in_country * 11 + "px";
        } else return d.daily_average * 6 + "px";
      });

    setTimeout(function() {
      d3.selectAll(".bars")
        .append("div")
        .attr("class", "barName")
        .style("margin-left", "5px")
        .html(d => `${d.country}`);
    }, 600);
  }

  //RUN THE FUNCTION
  createBars();

  //TOOLTIP FUNCTIONS

  function showTooltip(d) {
    let from =
      d.date_range.from.substring(4, 10) +
      "," +
      d.date_range.from.substring(10, 15);
    let to =
      d.date_range.to.substring(4, 10) +
      "," +
      d.date_range.to.substring(10, 15);

    d3.selectAll(".bars")
      .style("border", "none")
      .style("box-shadow", "none");

    d3.select(this)
      .style("border", "dashed 1px black")
      .style("box-shadow", "0 0 10px black");

    d3.select("#budgetTooltip").style("visibility", "visible");

    d3.select(".tooltip-Country").html(() => d.country);

    d3.select(".tooltip-Date-Range").html(() => from + " - " + to);

    d3.select(".tooltip-Totals").html(
      () =>
        `Total Expenses: $${d.total_expenses}</br>Days in Country: ${
          d.days_in_country
        }</br>Daily Average: $${d.daily_average}`
    );

    d3.select(".tooltip-Airfare")
      .style("background-color", colors[0])
      .html(
        () =>
          `Airfare: $${d.total_airfare} (${Math.floor(
            (d.total_airfare / d.total_expenses) * 10000
          ) / 100}%)`
      );

    d3.select(".tooltip-Food")
      .style("background-color", colors[1])
      .html(
        () =>
          `Food: $${d.category_totals.Food} (${Math.floor(
            (d.category_totals.Food / d.total_expenses) * 10000
          ) / 100}%)`
      );

    d3.select(".tooltip-Accommodation")
      .style("background-color", colors[3])
      .html(
        () =>
          `Accommodation: $${d.category_totals.Accommodation} (${Math.floor(
            (d.category_totals.Accommodation / d.total_expenses) * 10000
          ) / 100}%)`
      );

    d3.select(".tooltip-Transportation")
      .style("background-color", colors[2])
      .html(
        () =>
          `Transportation: $${d.category_totals.Transportation} (${Math.floor(
            (d.category_totals.Transportation / d.total_expenses) * 10000
          ) / 100}%)`
      );

    d3.select(".tooltip-Entertainment")
      .style("background-color", colors[4])
      .html(
        () =>
          `Entertainment: $${d.category_totals.Entertainment} (${Math.floor(
            (d.category_totals.Entertainment / d.total_expenses) * 10000
          ) / 100}%)`
      );

    d3.select(".tooltip-Beer")
      .style("background-color", colors[5])
      .html(
        () =>
          ` Alcohol: $${d.category_totals.Beer} (${Math.floor(
            (d.category_totals.Beer / d.total_expenses) * 10000
          ) / 100}%)`
      );

    d3.select(".tooltip-Other")
      .style("background-color", colors[6])
      .html(() => {
        if (d.category_totals.Other) {
          return `Other: $${d.category_totals.Other} (${Math.floor(
            (d.category_totals.Other / d.total_expenses) * 10000
          ) / 100}%)`;
        } else return "Other: $0 (0%)";
      });
  }

  function hideTooltip() {
    d3.selectAll(".bars")
      .style("border", "none")
      .style("box-shadow", "none");

    d3.select("#budgetTooltip").style("visibility", "hidden");
  }
} //END OF doStuff()

//GET BUDGET JSON DATA AND RUN doStuff()

d3.json("/World Trip Budget Formatted .json", doStuff);

//END OF BUDGET STUFF__________________________

//COUNTER FOR PROJECTION TYPE
var count = 0;

// REFRESH RUNS WHEN PROJECTION BUTTON IS PRESSED
function refresh() {
  let center = projection.rotate();

  d3.select("#world").remove();
  d3.select("#background").remove();

  let doom = document.getElementById("buttonOfDoom");
  let zoomIn = document.getElementById("zoomIn");
  let zoomOut = document.getElementById("zoomOut");

  let zoomInputVal = document.getElementById("zoomInput");
  let zoomCount = Number(zoomInputVal.value);

  if (refreshType === "projection") {
    count++;
  }
  if (refreshType === "zoomIn") {
    zoomCount = Math.round(zoomCount * 13) / 10;
    zoomInputVal.value = zoomCount;
  }
  if (refreshType === "zoomOut") {
    zoomCount = Math.round((zoomCount / 1.3) * 10) / 10;
    zoomInputVal.value = zoomCount;
  }

  // CHANGE PROJECTION TYPE
  if (count === 0) {
    buttonText = "Orthographic";

    d3.select("#projectionType").html(buttonText);

    projection = d3
      .geoOrthographic()
      .translate([windowWidth / 2, windowHeight / 2])
      .scale((width / 2 - 20) * zoomCount)
      .rotate(center)
      .clipAngle(90)
      .precision(0.6);
  }

  if (count === 1) {
    buttonText = "Natural Earth";

    d3.select("#projectionType").html(buttonText);

    projection = d3
      .geoNaturalEarth1()
      .translate([windowWidth / 2, windowHeight / 2])
      .scale((width / 5 - 20) * zoomCount)
      .rotate(center)
      .precision(0.1);
  }

  //   if (count === 2) {
  //     buttonText = "Baker Dinomic";

  //     d3.select("#projectionType").html(buttonText);

  //     projection = d3.geoBaker()
  //       .scale((width / 6 - 20)*zoomCount)
  //       .translate([windowWidth / 2, windowHeight / 2])
  //       .rotate(center)
  //       .precision(0.1);
  //   }

  if (count === 2) {
    buttonText = "Mollweide";

    d3.select("#projectionType").html(buttonText);

    projection = d3
      .geoMollweide()
      .scale((width / 5 - 30) * zoomCount)
      .translate([windowWidth / 2, windowHeight / 2])
      .rotate(center)
      .precision(0.1);
  }

  if (count === 3) {
    buttonText = "Stereographic";

    d3.select("#projectionType").html(buttonText);

    projection = d3
      .geoStereographic()
      .scale((width / 5) * zoomCount)
      .translate([windowWidth / 2, windowHeight / 2])
      .rotate(center)
      .clipAngle(180 - 1e-4)
      .clipExtent([[0, 0], [windowWidth, windowHeight]])
      .precision(0.1);
  }

  //   if (count === 5) {
  //     buttonText = "Eisenlohr";

  //     d3.select("#projectionType").html(buttonText);

  //   projection = d3.geoEisenlohr()
  //     .scale((width/13)*zoomCount)
  //     .translate([windowWidth / 2, windowHeight / 2])
  //     .rotate(center)
  //     .precision(0.1);
  //   }

  if (count === 4) {
    buttonText = "Mercator";

    d3.select("#projectionType").html(buttonText);

    projection = d3
      .geoMercator()
      .scale(((width - 20) / (2 * Math.PI)) * zoomCount)
      .rotate(center)
      .translate([windowWidth / 2, windowHeight / 2]);
  }

  if (count === 5) {
    count = 0;

    buttonText = "Orthographic";

    d3.select("#projectionType").html(buttonText);

    projection = d3
      .geoOrthographic()
      .translate([windowWidth / 2, windowHeight / 2])
      .scale((width / 2 - 20) * zoomCount)
      .rotate(center)
      .clipAngle(90)
      .precision(0.6);
  }

  d3.select("#currentProjDescript").html(
    `You are currently viewing the <a href="https://en.wikipedia.org/wiki/${buttonText}_projection" target="_blank">${buttonText}</a> projection.`
  );

  // REDRAW EVERYTHING
  initialize();
} //<------END OF REFRESH FUNCTION
