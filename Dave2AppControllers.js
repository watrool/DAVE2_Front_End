(function(){'use strict';
  angular
  .module("Dave2App")
  .controller('Dave2Ctrl', Dave2Ctrl);


  Dave2Ctrl.$inject = ['$scope','$location','$modal'];

  function Dave2Ctrl($scope, $location,$modal){

    var vm = this;

    vm.navClass = navClass;
    vm.isHome = isHome;
    vm.signIn = signIn;

    vm.dynamicBackground = true;
    $scope.$on("dynamicBackground", function(){
      vm.dynamicBackground = true;
    });

    $scope.$on("removeDynamicBackground", function(){
      vm.dynamicBackground = false;
    });

    //////////////////////////
    function navClass(page){
      var currentRoute = $location.path();
      return page === currentRoute ? 'active' : '';
    }

    function isHome(){
      if ($location.path() === ''){
        return true;
      } else {
        return false;
      }
    }

    function signIn(){
      var loginInterface = $modal.open({
        templateUrl:"loginModal.html",
        controller:["$scope","$modalInstance", function($scope, $modalInstance){
          $scope.username = '';
          $scope.password = '';
          $scope.ok = function(){
            $modalInstance.close({username:vm.username, password:vm.password});
          };

          $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
          };
        }]
      });

      loginInterface.result.then(function(data){
        console.log(data);
      });
    }
  }
})();
