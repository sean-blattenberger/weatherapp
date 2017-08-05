var app = angular.module('weatherApp', []);

app.controller('weatherController', function($scope, $http) {
  $scope.weather = {}
  $scope.location = {};
  var apiKey = "3795f4e1a5a7d96d565aa6d6daf77fe3";
  function getWeather() {
    $http.get("https://freegeoip.net/json/").success(function(data) {
      $scope.location.lat = data.latitude;
      $scope.location.lon = data.longitude;
      $scope.location.city = data.city;
      $scope.location.state = data.region_code;
      console.log($scope.location);
      $.ajax({
           url: "https://api.darksky.net/forecast/" + apiKey + "/" + $scope.location.lat + "," + $scope.location.lon,
           dataType: "jsonp",
           success: function(data) {
             $scope.weather.temp = Math.round(data.currently.temperature);
             $scope.weather.icon = data.currently.icon;
             $scope.weather.description = data.currently.summary;
             $scope.$apply()
             console.log($scope.weather.temp, $scope.weather.icon, $scope.weather.description);
           },
           error: function() {
             console.log("error");
           }
         });
    });
  }
  getWeather();
});

var icons = new Skycons({"color": "white"});

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("sleet", Skycons.SLEET);
icons.set("snow", Skycons.SNOW);
icons.set("wind", Skycons.WIND);
icons.set("fog", Skycons.FOG);

icons.play();