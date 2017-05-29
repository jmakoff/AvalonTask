(function () {
    angular
        .module('avalonApp')
        .controller('mainCtrl', ['crudService', '$uibModal', '$scope', 'cfpLoadingBar', mainCtrl]);


    function mainCtrl(crudService, $uibModal, $scope, cfpLoadingBar) {
        var vm = this;




        function getCompanies() {
            crudService.getItems('/companies').then(function (resp) {
                vm.companies = resp.data;
                vm.totalCompanies = resp.data.success.length;
            });
        }

        getCompanies();
        vm.findByName = function () {/*filtration here */
            var filteredArray = [];
            if (vm.nameToFilter) {
                crudService.getItems('/companies').then(function (resp) { /*it used to work with full array*/
                    var companiesForFilter = resp.data;
                    var expr = new RegExp(vm.nameToFilter, 'i');

                    for (i = 0; i < companiesForFilter.success.length; i++) {
                        if (expr.test(companiesForFilter.success[i].companyName)) {
                            filteredArray.push(companiesForFilter.success[i]);
                        }
                    }
                    vm.companies.success = filteredArray
                });
            }

            else {
                getCompanies()
            }
        };
        vm.filterByProduct = function () {/*filtration here */
            var filteredArray = [];
            if (vm.productToSearch) {
                crudService.getItems('/companies').then(function (resp) {
                    var companiesForFilter = resp.data;
                    var expr = new RegExp(vm.productToSearch, 'i');
                    companiesLoop:
                        for (var i = 0; i < companiesForFilter.success.length; i++) {
                            if (companiesForFilter.success[i].companyGoods) {/*test for companyGoods not null*/
                                for (var j = 0; j < companiesForFilter.success[i].companyGoods.length; j++) {/*loop throw each company product*/
                                    if (expr.test(companiesForFilter.success[i].companyGoods[j])) {
                                        filteredArray.push(companiesForFilter.success[i]);
                                        continue companiesLoop;
                                        /*preventing of add two same objects*/
                                    }
                                }

                            }
                        }
                    vm.companies.success = filteredArray;
                })
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