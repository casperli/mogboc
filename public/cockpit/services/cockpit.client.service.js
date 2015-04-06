"use strict";

angular.module("cockpit").factory("CurrentMachineValues", ["$resource", function ($resource) {
    return $resource("api/currentmachinevalues", null,
        {
            "set": {method: "PUT"}
        });
}]);
