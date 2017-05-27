(function () {
    angular
        .module('avalonApp')
        .controller('mainCtrl', ['crudService', mainCtrl]);


    function mainCtrl(crudService) {
        var vm = this;
        console.log(crudService.getItems('/companies'));


        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene)
    }
})();