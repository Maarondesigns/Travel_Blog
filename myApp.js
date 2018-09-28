window.onload = function() {
  getDate();
  d3.selectAll("#updateContainer, #budgetContainer").style("display", "none");
  d3.selectAll("#budgetButton, #updateButton").style(
    "transform",
    "translateY(-1px)"
  );
  d3.select("#addButton").style("background-color", "white");
};

function getDate() {
  let dateUTC = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let month = monthNames[dateUTC.getUTCMonth()];
  let dayNum = dateUTC.getDate();
  let year = dateUTC.getFullYear();
  let timeFormat = dateUTC
    .toString()
    .split(" ")
    .slice(4)
    .join(" ");
  let dayFormat = dayNames[dateUTC.getDay()];
  let dateFormat = `${month} ${dayNum}, ${year}`;

  let day = document.getElementById("day");
  day.value = dayFormat;
  let date = document.getElementById("date");
  date.value = dateFormat;
  let time = document.getElementById("time");
  time.value = timeFormat;
}

function switchForm(button) {
  let addStep = document.getElementById("stepContainer");
  let updateStep = document.getElementById("updateContainer");
  let budget = document.getElementById("budgetContainer");

  d3.selectAll(".switchForm")
    .style("background-color", "rgb(220,220,220")
    .style("transform", "translateY(-1px)");

  d3.select("#value").style("display", "none");

  let select = d3.selectAll(
    "#stepContainer, #updateContainer, #budgetContainer"
  );

  select
    .transition()
    .duration(200)
    .style("height", "1px");

  setTimeout(function() {
    if (button === "update") {
      addStep.style.display = "none";
      updateStep.style.display = "";
      budget.style.display = "none";
      d3.select("#updateButton")
        .style("background-color", "white")
        .style("transform", "translateY(0)");
    } else if (button === "add") {
      addStep.style.display = "";
      updateStep.style.display = "none";
      budget.style.display = "none";
      d3.select("#addButton")
        .style("background-color", "white")
        .style("transform", "translateY(0)");
    } else if (button === "budget") {
      addStep.style.display = "none";
      updateStep.style.display = "none";
      budget.style.display = "";
      d3.select("#budgetButton")
        .style("background-color", "white")
        .style("transform", "translateY(0)");
    }
    select
      .transition()
      .duration(200)
      .style("height", "500px");
  }, 300);

  setTimeout(function() {
    select.style("height", "");
    d3.select("#value").style("display", "");
  }, 560);
}

function makeForm() {
  let password = document.getElementById("password");
  if (password.value.length === 0) {
    d3.select("#password")
      .transition()
      .duration(500)
      .style("box-shadow", "0 0 0px rgb(0,0,0) inset");
  }
  if (password.value.length === 1) {
    d3.select("#password")
      .transition()
      .duration(500)
      .style("box-shadow", "0 0 10px rgb(255,0,0) inset");
  }
  if (password.value.length > 13) {
    d3.json(`/input/${password.value}`).then(data => {
      if (data.password === password.value) {
        d3.select("#password")
          .transition()
          .duration(1000)
          .style("box-shadow", "0 0 10px rgb(0,175,50) inset");

        setTimeout(function() {
          d3.select("#passwordContainer")
            .transition()
            .duration(1500)
            .style("opacity", "0");

          d3.select("#stepContainer")
            .transition()
            .duration(2000)
            .style("height", "550px")
            .style("border-radius", "8px");

          d3.select("#updateContainer")
            .transition()
            .duration(2000)
            .style("height", "567px")
            .style("border-radius", "8px");

          d3.select("#budgetContainer")
            .transition()
            .duration(2000)
            .style("height", "399px")
            .style("border-radius", "8px");
        }, 1000);

        setTimeout(function() {
          d3.select("#passwordContainer").style("display", "none");

          d3.select("#photoForm")
            .style("display", "flex")
            .style("opacity", "0");

          d3.selectAll("#photoTitle, #formDestination").style(
            "display",
            "initial"
          );

          d3.select("#photoForm")
            .append("input")
            .attr("type", "submit")
            .attr("id", "uploadPhotoButton")
            .attr("Value", " ")
            .attr("formaction", `/uploadphoto/${data.password}`);

          d3.select("#stepContainer")
            .append("button")
            .attr("id", "stepSubmit")
            .attr("onclick", "submitJSON()")
            .html("Submit Journey Step")
            .style("opacity", "0");

          d3.select("#stepContainer").append("br");

          d3.select("#stepContainer")
            .append("pre")
            .attr("id", "stepArea");

          d3.select("#updateContainer")
            .append("button")
            .attr("id", "updateSubmit")
            .attr("onclick", "updateStep()")
            .html("Update Step:")
            .style("opacity", "0");

          d3.select("#budgetContainer")
            .append("button")
            .attr("id", "budgetSubmit")
            //.attr("onclick", "addBudget()")
            .html("Add Budget Item:")
            .style("opacity", "0");

          d3.selectAll(
            "#photoForm, #stepSubmit, #photoUploadLabel, #updateSubmit, #budgetSubmit"
          )
            .transition()
            .duration(600)
            .style("opacity", "1");

          d3.selectAll(
            "#stepContainer, #updateContainer, #budgetContainer"
          ).style("height", "");
        }, 3200);
      }
    });
  }
}

function changeLabel(files) {
  let label = document.getElementById("photoUploadLabel");
  label.innerHTML = files.length + " files selected:";
  let fileList = "";
  for (let i = 0; i < files.length; i++) {
    if (i > 0) {
      fileList += ", ";
    }
    fileList += files[i].name.split(" ").join("_");
  }
  label.setAttribute("aria-label", fileList);

  d3.select("#stepContainer").style("height", "auto");
}

function onLoadHandler() {
  let iframeHTML = document.getElementById("formDestination").contentWindow
    .document.body.innerText;

  let textSplit = iframeHTML.split(/\"/);
  let imageURL = textSplit.filter(x => x.length > 1);

  let photoContainer = document.getElementById("photoContainer");
  if (iframeHTML === "") {
    return;
  } else if (iframeHTML === "[]" || iframeHTML === "[object Object]") {
    photoContainer.innerHTML = "There was an error.";
  } else {
    photoContainer.innerHTML =
      "Successfully uploaded " +
      imageURL.length +
      " photos:</br></br>" +
      imageURL.map(x => `<img src="${x}" width="100px">`);
    d3.select("#photoForm").remove();
  }
}

function removeAutofill() {
  d3.selectAll("#autoContainer").remove();
}

function getCityInfo() {
  let lat = document.getElementById("lattitude");
  let long = document.getElementById("longitude");
  let city = document.getElementById("city");
  let region = document.getElementById("region");
  let country = document.getElementById("country");
  let password = document.getElementById("password");

  if (city.value.length <= 3) {
    d3.select("#autoContainer").remove();
  }

  if (city.value.length > 3) {
    d3.json(`/mapbox/${password.value}`).then(data => {
      d3.json(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          city.value
        }.json?access_token=${data.token}`
      ).then(function(data) {
        let y = document.getElementById("city").getBoundingClientRect().top;

        d3.selectAll("#autoContainer").remove();

        let autoContainer = d3
          .select("#autofill")
          .append("div")
          .attr("id", "autoContainer");

        autoContainer
          .selectAll(".autocomplete")
          .data(data.features)
          .enter()
          .append("div")
          .attr("class", "autocomplete")
          .html((d, i) => data.features[i].place_name)
          .on("click", autoSelect);

        function autoSelect(d, i) {
          let context = data.features[i].context;
          let countryValue = context.filter(x => x.id.includes("country"));
          let regionValue;
          if (context.length > 1)
            regionValue = context.filter(x => x.id.includes("region"));

          d3.select(this)
            .style("background-color", "gray")
            .style("cursor", "pointer");

          let placeInfo = data.features[i].place_name.split(", ");
          city.value = placeInfo[0];
          if (regionValue) {
            region.value = regionValue[0].text;
          } else region.value = city.value;
          country.value = countryValue[0].text;
          long.value = data.features[i].center[0];
          lat.value = data.features[i].center[1];

          d3.selectAll("#autoContainer").remove();
        }
      });
    });
  }
}

function submitJSON() {
  let dayName = document.getElementById("day");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let city = document.getElementById("city");
  let region = document.getElementById("region");
  let country = document.getElementById("country");
  let lat = document.getElementById("lattitude");
  let long = document.getElementById("longitude");
  let password = document.getElementById("password");
  let iFrameText = document.getElementById("formDestination").contentWindow
    .document.body.innerText;
  let textSplit = iFrameText.split(/\"/);
  let imageURL = textSplit.filter(x => x.length > 1);

  d3.json(`/add`, {
    method: "POST",
    body: JSON.stringify({
      dayName: dayName.value,
      date: date.value,
      time: time.value,
      city: city.value,
      region: region.value,
      country: country.value,
      lattitude: Number(lat.value),
      longitude: Number(long.value),
      image: imageURL,
      password: password.value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(
    json => {
      d3.select("#stepContainer").style("height", "auto");
      let stepArea = document.getElementById("stepArea");
      let text = JSON.stringify(json, null, 4);

      stepArea.innerHTML = "Successfully Added Step:<br><br>" + text;

      document.getElementById("photoContainer").innerHTML = "";
      day.value = dayName.value = date.value = time.value = city.value = region.value = country.value = lat.value = long.value = password.value =
        "";
      //d3.selectAll(".inputContainer, #stepSubmit").style("display", "none");
    },
    error => {
      d3.select("#stepContainer").style("height", "auto");
      let stepArea = document.getElementById("stepArea");
      stepArea.innerHTML = "All fields must be filled in correct format.";
    }
  );
}

function searchStep() {
  let key = document.getElementById("key");
  let value = document.getElementById("value");
  let password = document.getElementById("password");

  d3.selectAll("#autoContainer").remove();
  d3.select("#searchSteps")
    .transition()
    .duration(500)
    .style("border", "dotted 2px rgb(255,0,0)");

  d3.json(`/search/${key.value}/${value.value}/${password.value}`).then(
    data => {
      if (data.error) {
        return;
      }
      d3.select("#searchSteps")
        .transition()
        .duration(500)
        .style("border", "dotted 2px rgb(0,155,0)");

      let autoContainer = d3
        .select("#stepAutofill")
        .append("div")
        .attr("id", "autoContainer");

      autoContainer
        .selectAll(".autocomplete")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "autocomplete")
        .html(
          (d, i) =>
            `${data[i].city}, ${data[i].region}, ${data[i].country}
          <br>
          ${data[i].date}`
        )
        .on("click", autoSelect);

      function autoSelect(d, i) {
        document.getElementById("oldDay").innerHTML =
          "(" + data[i].dayName + ")";
        document.getElementById("oldDate").innerHTML = "(" + data[i].date + ")";
        document.getElementById("oldTime").innerHTML = "(" + data[i].time + ")";
        document.getElementById("oldCity").innerHTML = "(" + data[i].city + ")";
        document.getElementById("oldRegion").innerHTML =
          "(" + data[i].region + ")";
        document.getElementById("oldCountry").innerHTML =
          "(" + data[i].country + ")";
        document.getElementById("oldLattitude").innerHTML =
          "(" + data[i].lattitude + ")";
        document.getElementById("oldLongitude").innerHTML =
          "(" + data[i].longitude + ")";

        key.value = "_id";
        value.value = data[i]._id;
        d3.selectAll("#autoContainer").remove();
      }
    }
  );
}

function updateStep() {
  let key = document.getElementById("key");
  let value = document.getElementById("value");
  let password = document.getElementById("password");
  let domObject = {};
  domObject.dayName = document.getElementById("newDay");
  domObject.date = document.getElementById("newDate");
  domObject.time = document.getElementById("newTime");
  domObject.city = document.getElementById("newCity");
  domObject.region = document.getElementById("newRegion");
  domObject.country = document.getElementById("newCountry");
  domObject.lattitude = document.getElementById("newLattitude");
  domObject.longitude = document.getElementById("newLongitude");

  let updateObject = {};

  for (x in domObject) {
    if (domObject[x].value !== "") {
      updateObject[x] = domObject[x].value;
    }
  }

  d3.json(`/update/${key.value}/${value.value}/${password.value}`, {
    method: "PUT",
    body: JSON.stringify(updateObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(data => {
    d3.selectAll("#updateResponse").remove();

    let text;
    if (data.error) {
      text = data.error;
    } else {
      text =
        "Successfully updated step:<br><br>" + JSON.stringify(data, null, 2);
    }

    d3.select("#updateContainer")
      .append("pre")
      .attr("id", "updateResponse")
      .style("text-align", "left")
      .style("font", "normal 12px verdana")
      .html(text);

    for (x in domObject) {
      domObject[x].value = "";
    }
    d3.selectAll(".oldValues").html("");
    key.value = value.value = "";
  });
}
