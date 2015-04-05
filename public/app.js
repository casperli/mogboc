"use strict";

var mainAppModuleName = "mogboc";

//noinspection Eslint
var mainAppModule = angular.module(mainAppModuleName, []);

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainAppModuleName]);
});
