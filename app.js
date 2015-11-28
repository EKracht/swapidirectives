'use strict';

var app = angular.module('swapi', []);

app.controller('mainCtrl', function($scope, $http, savePlanetsSvc){
  savePlanetsSvc.getPlanets(function(planets){
    $scope.planets = planets;
  });
  $scope.getResidents = function(index){
    var arrResidents = [];
    var arrResidentsLinks = $scope.planets[index].residents;
    for (var i = 0; i < arrResidentsLinks.length; i++) {
      console.log(arrResidentsLinks[i] + '?format=json');
      $http.get(arrResidentsLinks[i] + '?format=json')
      .then(resp => {
        arrResidents.push(resp.data);
        $scope.planet = $scope.planets[index];
        $scope.residents = arrResidents;
      })
      .catch(error => console.error(error.status));
    }
  }; 
  $scope.residentCount = 0;
});

app.directive("swapiPlanets", function(){
  return {
    templateUrl: (elem, attr) => `dropdownPlanets.html`,
    controller: function ($scope, $http, savePlanetsSvc){
    }
  }
})

app.directive("swapiResident", function(){
  return {
    templateUrl: (elem, attr) => `cardResidents.html`,
    controller: function ($scope, $http, savePlanetsSvc){
    }
  }
})

app.service("savePlanetsSvc", function($http){
  var planets = [];
  this.getPlanets = function(cb){
    for (var i = 1; i <= 7; i++) {
      $http.get("http://swapi.co/api/planets/?format=json&page=" + i)
      .then(resp => {
         planets = planets.concat(resp.data.results);
         cb(planets);
      })
      .catch(error => console.error(error.status));
    }
  };
})