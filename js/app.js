
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
	})
	.directive('projectsRenderedDirective', function(){
		return function(scope, element, attrs){
	        if(scope.$last){
	        	element.parent().mixitup({
					targetSelector: '.portfolio',
					filterSelector: '.filter',
					effects: ['fade'],
					easing: 'snap'
				});		
	        }
	        element.hover(
					function () {
						$(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
						$(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');				
					},
					function () {
						$(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
						$(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
					}		
				);
	    };
	});