const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = 'pk.eyJ1IjoieXlubm9vb3QiLCJhIjoiY2o4YnFxM2toMDBxOTJ3bzV2c2p4em5yNSJ9.rzQg6zxVZP9qQ6-OZT2enw';

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);

fetch('/api')
.then(result => result.json())
.then(data => {
  let allHotels = data.hotels;
  let allRestaurants = data.restaurants;
  let allActivities = data.activities;
  
  let hotelChoices = document.getElementById('hotels-choices');
  allHotels.forEach(hotel => {
    let thisHotel = document.createElement('option');
    let name = document.createTextNode(`${hotel.name}`);
    thisHotel.appendChild(name);
    hotelChoices.appendChild(thisHotel);
  })
  
  let restaurantChoices = document.getElementById('restaurants-choices');
  allRestaurants.forEach(restaurant => {
    let thisRestaurant = document.createElement('option');
    let name = document.createTextNode(`${restaurant.name}`);
    thisRestaurant.appendChild(name);
    restaurantChoices.appendChild(thisRestaurant);
  })
  
  let activityChoices = document.getElementById('activities-choices');
  allActivities.forEach(activity => {
    let thisActivity = document.createElement('option');
    let name = document.createTextNode(`${activity.name}`);
    thisActivity.appendChild(name);
    activityChoices.appendChild(thisActivity);
  })
  
})
.catch(console.error);