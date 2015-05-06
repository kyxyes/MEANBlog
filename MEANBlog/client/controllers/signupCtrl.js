angular.module('MEANBlog')
    .controller('signupCtrl',['$scope','$http',function($scope,$http){
     console.log('hi this is sign up');
     $scope.signup = function(){
         var newuser = {username:$scope.username,
                        password:$scope.password,
<<<<<<< HEAD
                        email:$scope.email}       //ng-model
=======
                        email:$scope.email}
>>>>>>> ee198e5a59e03dc3ab9f671c055bd528423e8975
         $http.post('/signup',newuser);
     }
    }]);
