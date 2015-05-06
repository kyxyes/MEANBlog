angular.module('MEANBlog')
    .controller('blogDetailsCtrl',['$scope','$routeParams','$http','$route',function($scope,$routeParams,$http,$route){  //define this function if this does not define, page(HTML) bined can show, but js will not work
    console.log('hi, this is blogDetails');     //be careful of the sequence of 'scope, routeparam, http'
       // var permalink = $location.path().split('/').pop();
        var permalink = $routeParams.id
        $http.get('/getPostDetailsByPermalink/'+permalink).success(function(data){
        $scope.post = data[0];
        });

        $scope.postSubmit = function(){
        var postComment =
              {commentName:$scope.commentName,
               commentEmail:$scope.commentEmail,
               commentBody:$scope.commentBody};
        $http.post('/postComments/'+permalink,postComment).success(function(data){
            //var path = "/blogDetails/"+permalink; // "#/blogDetails/" do not add # because # will be appended to main location
            //$location.path(path);    //check http://stackoverflow.com/questions/22716449/problems-with-angularjs-location-path
            $route.reload();    //force reload

        });


    }
}]);