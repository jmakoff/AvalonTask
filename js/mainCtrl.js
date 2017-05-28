(function () {
    angular
        .module('avalonApp')
        .controller('mainCtrl', ['crudService', '$uibModal', '$scope', mainCtrl]);


    function mainCtrl(crudService, $uibModal, $scope) {
        var vm = this;

        function getCompanies() {
            crudService.getItems('/companies').then(function (resp) {
                vm.companies = resp.data;
                vm.totalCompanies = resp.data.success.length;
            });
        }

        getCompanies();
        vm.findByName = function () {/*filtration here becouse had problems with pagination when tried to resolve with "| filter"*/
            if (vm.nameToFilter) {
                var expr = new RegExp(vm.nameToFilter, 'i');
                var filteredArray = [];
                for (i = 0; i < vm.companies.success.length; i++) {
                    if (expr.test(vm.companies.success[i].companyName)) {
                        filteredArray.push(vm.companies.success[i]);
                    }
                }
                vm.companies.success = filteredArray
            } else {
                getCompanies()
            }
        };

        vm.deleteCompany = function (index) {
            var companiesOnPage = vm.companies.success.slice(((vm.currentPage - 1) * vm.itemsPerPage), ((vm.currentPage) * vm.itemsPerPage));
            var companyToDelete = companiesOnPage[index].companyName;
            var confirm = window.confirm('Are you sure want to delete company' + companyToDelete);
            if (confirm) {
                crudService.deleteCompany(companyToDelete).then(function (resp) {
                    console.log(resp);
                    getCompanies();
                })
            } else {
                console.log("Deleting " + companyToDelete + " prevented by conversation")
            }
        };

        vm.open = function (companyName, index) {
            console.log(index);

            var modalInstance = $uibModal.open({
                    templateUrl: "showInfo.html",
                    controller: 'showInfoCtrl',
                    controllerAs: 'info',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: 'static',
                    resolve: {
                        myData: {
                            index: index,
                            itemsPerPage: vm.itemsPerPage,
                            currentPage: vm.currentPage,
                            companyName: companyName,
                            allCompanies: vm.companies,
                            updateCompanies: getCompanies

                        }
                    }
                }
            )
        };

        vm.showBtns = function (index) {
            if (vm.btnIndex || vm.btnIndex === 0) {
                vm.btnIndex = NaN;
            } else {
                vm.btnIndex = index;
            }

        };

        vm.currentPage = 1;
        vm.itemsPerPage = 5;


        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene)
    }
})();