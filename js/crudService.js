(function () {
    angular
        .module('avalonApp')
        .factory("crudService",["$http","restConst" , function ($http, restConst) {

            function getItems(address) {
              return $http.get(restConst.url + address).then(function (resp) {
                   return resp.data.success[1]
                })
            }

            return{
                getItems: getItems

            }
        }])
})();