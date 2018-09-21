
window.onload = getDate;

function getDate(){
let dateUTC = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday"
];
let month = monthNames[dateUTC.getUTCMonth()];
let dayNum = dateUTC.getDate();
let year = dateUTC.getFullYear();
let timeFormat = dateUTC.toString().split(" ").slice(4).join(" ");
let dayFormat = dayNames[dateUTC.getDay()];
let dateFormat = `${month} ${dayNum}, ${year}`

let day = document.getElementById("day");
day.value = dayFormat;
let date = document.getElementById("date");
date.value = dateFormat;
let time = document.getElementById("time");
time.value = timeFormat;
}

function makeForm(){
    
    let password = document.getElementById("password");

    if(password.value.length>10){

        d3.json(`/input/${password.value}`)
        .then( (data) => {
            if (data.password === password.value){
                d3.select("#photoForm").attr("action", `/uploadphoto/${data.password}`);
                d3.select("#photoForm")
                .append("input")
                .attr("type", "submit")
                .attr("Value", "Upload Photos");
                d3.select("#stepContainer")
                .append("br");
                d3.select("#stepContainer")
                .append("button")
                .attr("id", "stepSubmit")
                .attr("onclick", "submitJSON()")
                .html("Submit Step");
                d3.select("#stepContainer")
                .append("br");
                d3.select("#stepContainer")
                .append("pre")
                .attr("id", "stepArea");
                d3.select("#passwordContainer")
                .style("display", "none");
            }
        })
    }
}

function onLoadHandler(){
    let iframeHTML = document.getElementById("formDestination").contentWindow.document.body.innerText;
    if(iframeHTML === "[]" || iframeHTML === "[object Object]"){
        document.getElementById("formDestination").contentWindow.document.body.innerHTML = "There was an error.";
    }

 
}

function getCityInfo(){
    
    let lat = document.getElementById("lattitude");
    let long = document.getElementById("longitude");    
    let city = document.getElementById("city");  
    let region = document.getElementById("region");
    let country = document.getElementById("country");  
    let password = document.getElementById("password");

    if(city.value.length <= 3){
   d3.select("#autoContainer").remove();
    }

if (city.value.length>3){

    

    d3.json(`/mapbox/${password.value}`).then( (data) => {
        
    d3.json(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city.value}.json?access_token=${data.token}`)
    .then(function (data){
 
        let y = document.getElementById("city").getBoundingClientRect().top;

        d3.selectAll("#autoContainer").remove();

        let autoContainer = d3.select("body")
        .append("div")
        .attr("id", "autoContainer")
        .style("position", "absolute")
        .style("background-color", "lightgray")
        .style("left", "50%")
        .style("transform", "translate(-50%,0)")
        .style("top", (d,i) => y+25+"px")
        .style("padding", "5px 5px 1px 5px")
        .style("border-radius", "4px")
        .style("box-shadow", "0 0 10px");

        autoContainer.selectAll(".autocomplete")
        .data(data.features)
        .enter()
        .append("div")
        .attr("class", "autocomplete")
        .style("background-color", "white")
        .style("padding", "2px")
        .style("border-radius", "4px")
        .style("margin-bottom", "4px")
        .html((d,i) => data.features[i].place_name)
        .on("mouseover", autoHover)
        .on("mouseout", autoOut)
        .on("click", autoSelect);

        function autoHover(){
            d3.select(this).style("box-shadow", "0 0 10px black").style("cursor", "pointer");
        }
        function autoOut(){
            d3.select(this).style("box-shadow", "none");
        }
        function autoSelect(d,i){
            let context = data.features[i].context;
            let countryValue = context.filter( x => x.id.includes("country")); 
            let regionValue;
            if (context.length>1) regionValue = context.filter( x => x.id.includes("region"));
     
        d3.select(this).style("background-color", "gray").style("cursor", "pointer");
        
         let placeInfo = data.features[i].place_name.split(", ");
         city.value = placeInfo[0];
         if (regionValue) {region.value = regionValue[0].text} else region.value = city.value;
         country.value = countryValue[0].text;
         long.value = data.features[i].center[0];
         lat.value = data.features[i].center[1];

         d3.selectAll("#autoContainer").remove();

        }
    });
});
}
}

function submitJSON(){
    
    let dayName = document.getElementById("day");
    let date = document.getElementById("date");  
    let time = document.getElementById("time"); 
    let city = document.getElementById("city");   
    let region = document.getElementById("region");
    let country = document.getElementById("country"); 
    let lat = document.getElementById("lattitude");
    let long = document.getElementById("longitude");
    let password = document.getElementById("password");
    let iFrameText = document.getElementById("formDestination").contentWindow.document.body.innerText;
    let textSplit = iFrameText.split(/\"/);
    let imageURL = textSplit.filter( (x) => x.length > 1);

  d3.json(`/add`, {
      method: "POST",
      body: JSON.stringify({
  "dayName": dayName.value,
  "date": date.value,
  "time": time.value,
  "city": city.value,
  "region": region.value,
  "country": country.value,
  "lattitude": Number(lat.value),
  "longitude": Number(long.value),
  "image": imageURL,
  "password": password.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(json => {
    let stepArea = document.getElementById("stepArea");
    let text = JSON.stringify(json, null, 4);

    stepArea.innerHTML = "Successfully Added Step:<br><br>" + text;
    
    day.value = dayName.value = date.value = time.value = city.value = region.value = country.value = lat.value = long.value = password.value = '';
    document.getElementById('formDestination').contentDocument.location.reload(true);

  }, error => {
    let stepArea = document.getElementById("stepArea");
    stepArea.innerHTML = "All fields must be filled in correct format.";
  });

}