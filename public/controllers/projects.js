/**
 * Created by dtran on 15-02-19.
 */
var app = angular.module('projects', {});
app.controller("ProjectController", ['$http', function ($http) {

    var project = this;
    project.projects = [];
    setTimeout(function () {
        $http.get('../projects.json').success(function (data) {
            project.projects = data;
        });
    }, 3000);


    $(document).ready(function () {

    });

    var bgArray = ['city.png', 'guitar.jpg', 'music.jpg'];
    var chosenBG = bgArray[Math.floor(Math.random() * bgArray.length)];
    $('.parallax-window').parallax({imageSrc: 'img/bg/' + chosenBG});

}]);