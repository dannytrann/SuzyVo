window.onload = function () {
    $('#loader-wrapper').addClass("hide");
}
// public/core.js
var app = angular.module('dannyhaitran', ['projects', 'smoothScroll']);
app.controller("MainController", function () {

});
function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all projects and show them
    $http.get('/api/projects')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createProject = function () {
        $http.post('/api/projects', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.project = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // delete a project after checking it
    $scope.deleteProject = function (id) {
        $http.delete('/api/project/' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}
