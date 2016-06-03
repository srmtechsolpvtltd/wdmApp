angular.module('starter.controllers', ['ionic','ionicLazyLoad'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $http, $ionicLoading,$cordovaGeolocation,$ionicHistory,$window) {
var urls = "http://whatsdamove.net/ws/";
//var urls = "http://localhost/whatsdamove/ws/";
   // Open the login Page
  $scope.loginMenu=false;
  $scope.urlsnew="http://whatsdamove.net/";
  $scope.urlsImg="http://whatsdamove.net/getImage.php?url=";
  $scope.sidebutton = true;
  $scope.loginSidemenu=false;
  $scope.registerSidemenu=false;
  $scope.forgotSidemenu=false;
  $scope.logoutSidemenu=true;
  $scope.eventerr = false;
  $scope.filterbar = false;
  $scope.venueerr = false;
  $scope.filterbartype = false;
  //$scope.disparam = "0";

	$scope.hidesearch = function() { 
	  $scope.filterbartype = false;
      $scope.filterbar = false;
	}
	
	$scope.dashboardfilter = function(val) {
		$scope.disparam = val;
		$scope.eventerr = false;
		$scope.venueerr = false;
		$ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	$scope.users = "";
	$scope.places = "";	
	
	var lat = "";
		var longs = "";
		var dist = val;
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat = position.coords.latitude;
      longs = position.coords.longitude;
	  
	  var userDetail = {
            lat: lat,
            longs: longs,
			dist:dist
			};
	  
	 $http.get(urls+"/eventslist", {
                params: userDetail,
				headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.users = data.events;
					$scope.places = data.venues;
					
					//$state.go('app.dashboard');
					
				}
				else
				{
					$ionicLoading.hide();
					$scope.eventerr = true;
					$scope.venueerr = true;
					//alert("There is no event(s) found.");
								
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
    }, function(err) {
      // error
    });
	}
	
	$scope.filterbarshow = function(val) {
		if(val=="1")
		{
			$scope.filterbartype = true;
			$scope.filterbar = false;	 
		}
		else if(val=="2")
		{
			
			$scope.filterbartype = false;
			$scope.filterbar = true;
			
		}			
		
	}
	
	$scope.addEvent = function(data) {
		
		alert(data.title);
	}
	
	$scope.updatestate = function(data) {
		//alert(data);
		$ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	 $http.get(urls+"/get_statelist", {
                params: data,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					alert("succs");
					$scope.dressCodes = data.dresslist;
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
	}
  
  $scope.login = function() {
   $state.go('app.login');
  };
  
  $scope.createEvent = function() {
	
		$ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	 $http.get(urls+"/createEvent", {
                params: '1',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.dressCodes = data.dresslist;
					$scope.groups = data.groupslist;
					$scope.types = data.eventtypes;
					$scope.countries = data.get_country_list;
					$ionicLoading.hide();
					$state.go('app.createEvent');
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
	  
	  
   //$state.go('app.createEvent');
  };
  
  // Open the register page
  $scope.register = function() {
   $state.go('app.register');
  };
  
  // Open the register page
  $scope.loginnew = function() {
   return true;
  };
  
  // Open the forget password
  $scope.forgot_password = function() {
   $state.go('app.forgot_password');
  };
  
  // Open the Events
  $scope.events = function(val) {
	  $scope.eventerr = false;
	  $scope.disparam = val;
	  $ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	  var lat = "";
		var longs = "";
		var dist = val;
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat = position.coords.latitude;
      longs = position.coords.longitude;
	  var userDetail = {
            lat: lat,
            longs: longs,
			dist:dist
			};
	  
	 $http.get(urls+"/eventslistmain", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.users = data.events;
					$scope.etypelist = data.eventtypelist;
	  				$ionicLoading.hide();
					$state.go('app.events');
				}
               else
				{
					$ionicLoading.hide();
					$scope.eventerr=true;
					//alert("There is no event(s) found.");	
					$state.go('app.events');	
				}
                
            })
            .error(function(data) {
                alert("error");
            });
		}, function(err) {
      // error
    });	
 
  };
  
  // Open the Events
  $scope.eventsfilter = function(val) {
	  $scope.eventerr = false;
	  $scope.disparam = val;
	  $ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	  $scope.users = "";
	  var lat = "";
		var longs = "";
		var dist = val;
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat = position.coords.latitude;
      longs = position.coords.longitude;
	  var userDetail = {
            lat: lat,
            longs: longs,
			dist:dist
			};
	  
	 $http.get(urls+"/eventslistmain", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.users = data.events;
					$scope.etypelist = data.eventtypelist;
	  
					//$state.go('app.events');
				}
               else
				{
					$ionicLoading.hide();
					$scope.eventerr = true;
					//alert("There is no event(s) found.");	
					//$state.go('app.events');	
				}
                
            })
            .error(function(data) {
                alert("error");
            });
		}, function(err) {
      // error
    });	
 
  };
  // Open the Venues
  $scope.venues = function(val) {
	  $scope.venueerr = false;
	  $scope.disparam = val;
	  $ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	  var lat = "";
		var longs = "";
		var dist = "10000";
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat = position.coords.latitude;
      longs = position.coords.longitude;
	  var userDetail = {
            lat: lat,
            longs: longs,
			dist:dist
			};
	  
	 $http.get(urls+"/venuelistmain", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.places = data.venues;
					//
					//$scope.etypelist = data.eventtypelist;
					$scope.vtypelist = data.venuetypelist;
					$ionicLoading.hide();
					$state.go('app.venues');
				}
				else
				{
					$ionicLoading.hide();
					$scope.venueerr = true;
					//alert("There is no event(s) found.");	
					$state.go('app.venues');	
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
			}, function(err) {
      // error
    });	
   
  };
  
  // Open the Venues
  $scope.venuesfilter = function() {
	  
	  $scope.venueerr = false;
	  $ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
	  $scope.places = "";
	  
	  var lat = "";
		var longs = "";
		var dist = "10000";
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat = position.coords.latitude;
      longs = position.coords.longitude;
	  var userDetail = {
            lat: lat,
            longs: longs,
			dist:dist
			};
	  
	 $http.get(urls+"/venuelistmain", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.places = data.venues;
					//$scope.etypelist = data.eventtypelist;
					$scope.vtypelist = data.venuetypelist;
					$ionicLoading.hide();
					//$state.go('app.venues');
				}
				else
				{
					$ionicLoading.hide();
					$scope.venueerr = true;
					//alert("There is no event(s) found.");	
					//$state.go('app.venues');	
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
			}, function(err) {
      // error
    });	
   
  };
  
  $scope.dashboard = function(val) { 
		$scope.eventerr = false;
		$scope.disparam = val;
		//$scope.volume = val;
		$ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
		var lat = "";
		var longs = "";
		var dist = val;
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat = position.coords.latitude;
      longs = position.coords.longitude;
	   //alert(lat+"**"+longs);
	  var userDetail = {
            lat: lat,
            longs: longs,
			dist:dist
			};
	  
	 $http.get(urls+"/eventslist", {
                params: userDetail,
				headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					//alert(JSON.stringyfy(data.eventtypelist));
					$ionicLoading.hide();
					$scope.users = data.events;
					$scope.places = data.venues;
					$scope.etypelist = data.eventtypelist;
					$scope.vtypelist = data.venuetypelist;
					//
					$ionicLoading.hide();
					$state.go('app.dashboard');
				}
				else
				{
					$ionicLoading.hide();
					//alert("There is no event(s) found.");	
					$scope.eventerr = true;
					$state.go('app.dashboard');	
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
    }, function(err) {
      // error
    });
	
		
    
    };

   $scope.logout = function() {
          
          $scope.loginSidemenu=false;
          $scope.registerSidemenu=false;
          $scope.forgotSidemenu=false;
          $scope.logoutSidemenu=true;
          $state.go("app.login");
   };

    $scope.checklogin = function(password, email) {
		$ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
        var userDetail = {
            email: email,
            password: password
            
        };

         
         $http.get(urls+"/check_login/", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				//localStorageService.set('uName', userstr);
               if(data.status>0)
				{
					//localStorage.setItem("firstname", "Nic");
					//alert(data.users[0].email);
					localStorage.setItem('uemail', data.users[0].email);
					localStorage.setItem('uID', data.users[0].id);
					localStorage.setItem('uName', data.users[0].first_name);
					localStorage.setItem('uType', data.users[0].usertype);
					localStorage.setItem('uPhoto', data.users[0].photo);
					$ionicLoading.hide();
					//alert(localStorage.getItem("firstname"));
					$scope.loginSidemenu=true;
          $scope.registerSidemenu=true;
          $scope.forgotSidemenu=true;
          $scope.logoutSidemenu=false;
					$state.go('app.dashboard');
				}
				else
				{
					$ionicLoading.hide();
					alert("Your email or password is not valid.");					
				}

            })
            .error(function(data) {
                alert("error! Please try again.");
            });
    }
	
	$scope.registeruser = function(password, email,usertype,dob) {

          $ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
        var userDetail = {
            email: email,
            password: password,
			usertype:usertype,
			dob:dob
			};

         $http.get(urls+"/add_user/", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					$ionicLoading.hide();
					alert("Your Created successfully.");
					$state.go('app.login');
					
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
    }
	
	$scope.forgot = function(email) {

          $ionicLoading.show({
            template: '<img src="img/loader.gif" alt="Loading Image" />'
        });
        var userDetail = {
            email: email
			};

         $http.get(urls+"/get_password/", {
                params: userDetail,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .success(function(data) {
				
				if(data.status>0)
				{
					$ionicLoading.hide();
					alert("Password sent to your registered email.");
					$state.go('app.login');
					
				}
				else
				{
					$ionicLoading.hide();
					alert("Invalid Email!");
				}
               
                
            })
            .error(function(data) {
                alert("error");
            });
    }
 
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	
});
