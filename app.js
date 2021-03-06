﻿(function () {
    'use strict';

    angular
        .module('app', ['ngRoute','ngCookies'])
        .config(config)
        .run(run)
        
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'hc'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'lc'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'rc'
            })

    	    .when('/about',{
    		      templateUrl: 'about/about.view.html',
                  controller: 'AboutController',
                  controllerAs: 'ac'
    	    })

            .when('/admin',{
                  templateUrl: 'admin/admin.view.html',
                  controller: 'AdminController',
                  controllerAs: 'adc'
            })

	    .when('/buyer', {
                templateUrl: 'buyer/cart.html',
                controller: 'buyer'
            })


            .otherwise({ redirectTo: '/home' });
    }

     run.$inject = ['$rootScope', '$location', '$cookieStore'];
    function run($rootScope, $location, $cookieStore) {
        // keep user logged in after page refresh
        $rootScope.globalUser = $cookieStore.get('globalUser') || {};
        $rootScope.a = 'about';
        $rootScope.b = 'register';
        $rootScope.c = 'login';          
            
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = 1;
            var loggedIn = $rootScope.globalUser.currentUser;                  
        
        
            if($location.path() == '/login' || $location.path() == '/register' || $location.path() == '/about'){
                restrictedPage = 0;
            }
            else {
                restrictedPage = 1;
            }
            if($location.path() == '/admin' && loggedIn && $rootScope.globalUser.currentUser.aType != 'admin'){
                restrictedPage = 1;
                $location.path('/login');
            }
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            if (loggedIn) {
                if($rootScope.globalUser.currentUser.aType == 'buyer'){
                    $rootScope.a = 'buyer';
                    $rootScope.b = 'profile'; 
                } else if($rootScope.globalUser.currentUser.aType == 'admin'){
                    $rootScope.a = 'about';
                    $rootScope.b = 'admin';
                } else if($rootScope.globalUser.currentUser.aType == 'seller'){
                    $rootScope.a = 'seller';
                    $rootScope.b = 'profile';
                } else {
                    $rootScope.a = 'seller';
                    $rootScope.b = 'buyer';
                }             
                $rootScope.c = 'signout';
            }
        });

    }  


})();
