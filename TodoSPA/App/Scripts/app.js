'use strict';
angular.module('todoApp', ['ngRoute', 'AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/App/Views/Home.html",
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/App/Views/TodoList.html",
        requireADLogin: true,
    }).when("/ToGoList", {
        controller: "toGoListCtrl",
        templateUrl: "/App/Views/ToGoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {

        // TODO: Map the location of a request to an API to the identifier of the associated resource
        "https://YourAzureADTenant.azurewebsites.net/": "14e931b6-0fee-4f56-84a2-93b31fadbf32",


    };

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'YourAzureADTenant.onmicrosoft.com', // TODO: Update your tenant name
            clientId: '14e931b6-0fee-4f56-84a2-93b31fadbf32', // TODO: Update with the indentifier for your SPA registration in Azure AD
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.  
            // Also, token acquisition for the To Go API will fail in IE when running on localhost, due to IE security restrictions.
        },
        $httpProvider
        );

}]);
