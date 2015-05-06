angular.module('MEANBlog').controller('loginCtrl',['$scope','$window','$rootScope','$location','$http',function($scope,$window,$rootScope,$location,$http){
    console.log('this is loginCtrl');
    $scope.login = function(){
        var user = {username:$scope.username,password:$scope.password};
        $http.post('/login',user).success(function(data){
            $window.localStorage.currentUser = data.username;
            $rootScope.currentUser=$window.localStorage.currentUser;
            $location.path('/');
        });

    }
}]);