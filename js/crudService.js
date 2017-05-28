(function () {
    angular
        .module('avalonApp')
        .factory("crudService",["$http","restConst" , function ($http, restConst) {

            function getItems(address) {
                return $http.get(restConst.url + address)
            }
            function updateCompany(address, body) {
                return $http.put(restConst.url + restConst.companiesUrl + address, body )
            }
            function deleteCompany(companyName) {
                return $http.delete(restConst.url + restConst.companiesUrl + companyName)
            }

            return{
                getItems: getItems,
                updateCompany: updateCompany,
                deleteCompany: deleteCompany

            }
        }])
})();