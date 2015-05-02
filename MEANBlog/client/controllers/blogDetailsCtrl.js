angular.module('MEANBlog')
    .controller('blogDetailsCtrl',function($scope,$http,$location){  //define this function if this does not define, page(HTML) bined can show, but js will not work
    console.log('hi, this is blogDetails');
        var permalink = $location.path().split('/').pop();
        $http.get('/getPostDetailsByPermalink/'+permalink).success(function(data){
        $scope.post = data[0];
        });
});