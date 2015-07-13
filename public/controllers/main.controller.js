/**
 * Created by dannyhaitran on 15-07-08.
 */

// Declare app level module which depends on views, and components

var app = angular.module('rushsalon', ['smoothScroll', 'ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/views/content.jade',
                controller: 'MainController'
            }).
            when('/stylists', {
                templateUrl: '/views/stylists/stylists.jade',
                controller: 'StylistController'
            }).
            otherwise({
                redirectTo: '/views/content.jade'
            });
    }]);
app.controller('MainController', function ($scope) {
    $(document).ready(function () {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        $(".button-collapse").sideNav();
        $('ul.tabs').tabs();
        $('select').material_select();

    });
    $scope.tab = 1;
    this.tabClick = function (tab) {
        console.log("Hello World");
        if (tab == 1) {
            $scope.tab = 1;
            $('ul.tabs').tabs('select_tab', 'tab1');
        } else {
            $scope.tab = 2;
            $('ul.tabs').tabs('select_tab', 'tab2');
        }
    }
});
app.controller('ScrollController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {
        $scope.gotoBottom = function () {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('bottom');

            // call $anchorScroll()
            $anchorScroll();
        };
    }]);
app.controller('ServiceController', ['$http', function ($http) {
    $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    });
    var services = this;
    var icon = false;
    services.services = [];
    $http.get('../services.json').success(function (data) {
        services.services = data;
    });
    this.services = services.services;
    var serviceDescription = null;
    this.getServiceDesc = function (tab) {
        if (tab == 1)
            serviceDescription = this.services[0].description;
        else
            serviceDescription = this.services[1].description;
        return serviceDescription;
    }
    this.openModal = function (id) {
        console.log(id);
        $(document).ready(function () {
            $(id).openModal();
        });
    };
}]);
var testTicket = {
    name: "",
    body: "",
    location: ""
};
app.controller('TestimonialController', ['$http', function ($http) {
    $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    });
    var testimonials = this;
    testimonials.testimonials = [];
    $http.get('../comments.json').success(function (data) {
        testimonials.testimonials = data;
        console.log(data);
    });
    this.testimonials = testimonials.testimonials;
    this.openModal = function (id) {
        console.log(id);
        $(document).ready(function () {
            $(id).openModal();
        });
    };

}]);

app.controller('ContactController', function () {
    this.submit = function (email) {
        console.log(email.firstname);
    };
})
app.directive('backImg', function () {
    return function (scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    }
});
app.controller('GalleryController', ['$http', function () {

}]);
app.controller('StylistController', ['$http', function () {

}])