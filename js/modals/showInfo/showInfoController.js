(function () {
    angular
        .module('avalonApp')
        .controller('showInfoCtrl', ['$uibModalInstance', 'myData', 'crudService', function ($uibModalInstance, myData, crudService) {
            var vm = this;
            console.log(myData);
            vm.companies = myData.allCompanies.success.slice(((myData.currentPage - 1) * myData.itemsPerPage), ((myData.currentPage) * myData.itemsPerPage));

            vm.companyName = vm.companies[myData.index].companyName;
            vm.companyGoods = vm.companies[myData.index].companyGoods;
            vm.newCompanyName = vm.companyName; /*copy data becouse we need companyName to send request*/

            vm.addGood = function () {
                vm.companyGoods.push(vm.newGood);
                vm.newGood = '';
            };
            vm.send = function () {
                vm.companyName = vm.newCompanyName;
                var body = {
                        companyName: vm.newCompanyName,
                        companyGoods: vm.companyGoods
                    }
                    ;
                var sendBody = JSON.stringify(body);
                crudService.updateCompany(vm.companyName, sendBody).then(function (resp) {
                    console.log(resp);
                    vm.editMode = false;
                    myData.updateCompanies();
                });
            };
            vm.cancel = function () {
                $uibModalInstance.close();
            };
            vm.closeModal = function () {
                $uibModalInstance.close();
            }
        }])


})();