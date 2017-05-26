(function () {
    angular
        .module('avalonApp')
        .controller('mainCtrl', [mainCtrl]);


    function mainCtrl() {
        var vm = this;

        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene)
    }
})();