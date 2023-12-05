
//const fetch = require('node-fetch');
//import Radar from 'radar-sdk-js';
//import 'radar-sdk-js/dist/radar.css';
{
  var string = "";
}
{
  var array = new Array();
}



function getInput(){
  const current = prompt("Enter in your current location (EX. '841 broadway, new york, ny'):");
  geocodes(current);
  const final = prompt("Enter in your destination (EX. '841 broadway, new york, ny'):");
  geocodes_loc(final);
} 

function geocodes(address){
  Radar.initialize('api_key');
  Radar.forwardGeocode({query:address})
  .then((result) => {
    console.log(result);
    home_latitude = result.addresses[0].latitude;
    home_longitude = result.addresses[0].longitude;
    // do something with addresses
  })
  .catch((err) => {
    // handle error
    console.error(err);
  });

}
function geocodes_loc(address){
  Radar.initialize('api_key');
  Radar.forwardGeocode({query:address})
  .then((result) => {
    console.log(result);
    dest_latitude = result.addresses[0].latitude;
    dest_longitude = result.addresses[0].longitude;
    getPlaces(home_latitude,home_longitude,dest_latitude,dest_longitude);
    // do something with addresses
  })
  .catch((err) => {
    // handle error
    console.error(err);
  });
}
function getPlaces(lat,long,lat1,long1){
  const nu = prompt("How many places do you want to search for?:");
  let num = parseInt(nu);
  fetch('https://api.geoapify.com/v2/places?categories='+string+'&filter=rect:'+long+','+lat+','+long1+','+lat1+'&bias=proximity:'+long+','+lat+'&limit='+num+'&apiKey=api_key')
  .then(resp => resp.json())
    .then((places) => {
      for(let i=0; i< num; i++){
        const placeHTML = getAddressHTML(places.features[i],i);
        document.getElementById('addressContainer').innerHTML += placeHTML;
      }
      
    });

}
function edu_library(){
  if(string==""){
    string = 'education.library,building.university';
    console.log(string);
  }
  else{
    string = 'education.library,building.university';
    console.log(string);
  }

}
function natural(){
  string='natural';
  console.log(string);

}
function cafe(){
  string ='commercial.food_and_drink.coffee_and_tea,commercial.food_and_drink.bakery,catering.cafe.coffee_shop';
  console.log(string);

}
function restaurant(){
  string= 'catering.restaurant';
  console.log(string);
}

function tourism(){
  string = "tourism,tourism.sights";
  console.log(string);

}

function park(){
  string = "leisure.park,leisure.playground";
  //natural();
  console.log(string);

}

function entertain(){
  string = "entertainment,entertainment.culture,entertainment.culture.theatre,entertainment.zoo,entertainment.museum";
  console.log(string);

}

function groc(){
  string = "commercial.supermarket";
  console.log(string);

}
//create an event listner wherever you call that function 
function getAddressHTML(place,i) {
  const {
    name,
    address_line1,
    city,
    state,
    country,
    lat,
    lon,
  } = place.properties;
  if(name=="undefined"){
    return false;
  }
  if(arraybool(name)){
    directions(lon,lat);
    return `
    <div>
      <button id="${i}" role="button" onclick="search_results('${address_line1}, ${city}, ${state}')">${name}</button>
      <p id="address">${address_line1}</p>
      <p>${city}, ${state}, ${country}</p>
    </div>
  `;
  

  }

}

function directions(long,lat){
  const mapbox_key = 'api_key';
  fetch('https://api.mapbox.com/directions/v5/mapbox/walking/'+home_longitude+','+home_latitude+';'+long+','+lat+'?access_token='+mapbox_key)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the JSON data received from the API
      console.log(data);
      // Your processing logic here
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., show an error message to the user
    });
    
}

function arraybool(name){
  console.log(array);
  if(name=="undefined"){
    return false;
  }
  if(!array.includes(name)){
    array.push(name);
    return true;
  }
  else{
    return false;
  }
}





const myButton = document.getElementById('loco');
myButton.addEventListener('click', getInput);

const button = document.getElementById('edu');
button.addEventListener('click', edu_library);

const cafebutton = document.getElementById('tea');
cafebutton.addEventListener('click', cafe);

const nature = document.getElementById('nat');
nature.addEventListener('click', park);

const touristy = document.getElementById('tour');
touristy.addEventListener('click', tourism);

const enter = document.getElementById('entertainment');
enter.addEventListener('click', entertain);

const rest = document.getElementById('rest');
rest.addEventListener('click',restaurant);

const tree = document.getElementById('nate');
tree.addEventListener('click',natural);

const sup = document.getElementById('super');
sup.addEventListener('click',groc);





