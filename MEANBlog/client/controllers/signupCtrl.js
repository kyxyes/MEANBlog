angular.module('MEANBlog')
    .controller('signupCtrl',['$scope','$http',function($scope,$http){
     console.log('hi this is sign up');
     $scope.signup = function(){
         var newuser = {username:$scope.username,
                        password:$scope.password,
                        email:$scope.email}
         $http.post('/signup',newuser);
     }
    }]);
