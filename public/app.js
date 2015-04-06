"use strict";

var mainAppModuleName = "mogboc";

//noinspection Eslint
var mainAppModule = angular.module(mainAppModuleName, ["cockpit", "ngResource"]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainAppModuleName]);
});
