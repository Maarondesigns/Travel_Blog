
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