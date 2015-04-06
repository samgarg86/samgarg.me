/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


var myApp = angular.module('samgargsWebsite', []);
myApp.controller('PortfolioController', function($scope, ProjectsFactory){
    function init(){
        ProjectsFactory.getProjects()
            .success(function(data){
                $scope.projects = data;
            })
            .error(function(data, status){
                alert(status);
            });
    }
    init();
})
    .factory('ProjectsFactory', function($http){
        var factory = {}
        factory.getProjects = function(){
            return $http.get('projects.json')
        }
        return factory;
    });
    //.directive('projectsRenderedDirective', function(){
    //    return function(scope, element, attrs){
    //        if(scope.$last){
    //            element.parent().mixitup({
    //                targetSelector: '.portfolio',
    //                filterSelector: '.filter',
    //                effects: ['fade'],
    //                easing: 'snap'
    //            });
    //        }
    //        element.hover(
    //            function () {
    //                $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
    //                $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');
    //            },
    //            function () {
    //                $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
    //                $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');
    //            }
    //        );
    //    };
    //});
