var app = angular.module('app',['ngAnimate', 'colorBoxes']);


HomeCtrl.$inject = ['$scope', '$http', '$sce'];
app.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $http, $sce) {
  $scope.items = [];

	function fetchInstagram() {
		var params = {
			access_token: "50957893.c4c5a38.45731381623a4ddd86c042851d4d317f",
      count: 2,
      callback: "JSON_CALLBACK"
		}
		$http.jsonp("https://api.instagram.com/v1/users/50957893/media/recent/", { params: params })
			.success(function (resp) {
        for (var i in resp.data) {
          var data = resp.data[i]
          var content = "";
          if(data.type == "video") {
            var gramURL = data.videos.standard_resolution.url;
            content = "<center><video id = \"" + data.id + "\" width='300' height='300'><source src = \"" + gramURL + "\" type='video/mp4'></video></center>";
          } else {
            var gramURL = data.images.standard_resolution.url;
            content = "<center><img src = '" + gramURL + "' width='300' height='300'></center>";
          }
          var date =new Date(data.created_time * 1000)
          var item = {
            date: date,
            dateFormat: date.toLocaleString('en-US'),
            id: data.id,
            source: $sce.trustAsHtml("On <a href = '" + data.link + "' style='text-decoration: none' target='_top'>Instagram <img src = '/content/icons/instagramBW.png' align = 'absmiddle' height = '12' width = '12' style='border-style: none' /></a>"),
            style: "width:36%",
            content: $sce.trustAsHtml(content)
          }

          $scope.items.push(item);
        }
			})
	}
	fetchInstagram();

  function fetchSwarm() {
		var params = {
			oauth_token: "OU2LAHV5RHIWU22OSUUA2QRXAWYWDISJBCY2SS5ANH41PRXS",
      limit: 2,
      v: 20140806
		}
		$http.get("https://api.foursquare.com/v2/users/self/checkins", { params: params })
			.success(function (resp) {
        for (var i in resp.response.checkins.items) {
          var data = resp.response.checkins.items[i]
          var content = "";
          if(data.photos.items.length > 0) {
            content = "<center><img src = '" + data.photos.items[0].prefix + "300x300" + data.photos.items[0].suffix + "' ></center>";
          }
          var date = new Date(data.createdAt * 1000)
          var item = {
            date: date,
            dateFormat: date.toLocaleString('en-US'),
            id: data.id,
            source: $sce.trustAsHtml("At " + data.venue.name + " On <a href = '" + data.source.url + "' style='text-decoration: none' target='_top'>Swarm <img src = '/content/icons/swarmBW.png' align = 'absmiddle' height = '12' width = '12' style='border-style: none' /></a>"),
            style: "width:36%",
            content: $sce.trustAsHtml(content)
          }

          $scope.items.push(item);
        }
			})
	}
	fetchSwarm();

  function fetchTwitter() {
		var params = {
      screen_name: "jesse0michael",
      count: 2,
      include_rts: true
		}

		$http.get("https://api.twitter.com/1.1/statuses/user_timeline.json", { params: params })
			.success(function (resp) {
        for (var i in resp) {
          var data = resp[i]
          var date = new Date(data.created_date)
          var item = {
            date: date,
            dateFormat: date.toLocaleString('en-US'),
            id: data.id,
            source: $sce.trustAsHtml("On <a href = 'http://www.twitter.com/#!/Jesse0Michael' style='text-decoration: none' target='_top'>Twitter <img src = '/content/icons/twitterBW.png' align = 'absmiddle' height = '12' width = '12' style='border-style: none' /></a>"),
            style: "width:36%",
            content: $sce.trustAsHtml(data.text_as_html)
          }

          $scope.items.push(item)
        }
			})
	}
	fetchTwitter();

  function fetchDeviantArt() {
    // Parse Deviantart RSS feed and get past CORS through https://developer.yahoo.com/yql/
    var url = "http://backend.deviantart.com/rss.xml?q=gallery:mini-michael/33242408"
    var params = {
			q: "select * from html where url='" + url + "'",
      format: "json",
      env: "store://datatables.org/alltableswithkeys"
		}

    $http.get("https://query.yahooapis.com/v1/public/yql", { params: params })
			.success(function (resp) {
        var count = Math.min(resp.query.results.body.rss.channel.item.length, 2)
        for (var i = 0; i < count; i++) {
          var data = resp.query.results.body.rss.channel.item[i]
          var urlParts = data.guid.content.split("/")
          var title = urlParts[urlParts.length - 1].split("-")[0]
          var date = new Date(data.pubdate)
          var item = {
            date: date,
            dateFormat: date.toLocaleString('en-US'),
            id: title,
            source: $sce.trustAsHtml("\"" + title + "\" On <a href = '" + data.guid.content + "' style='text-decoration: none' target='_top'>Deviant Art <img src = '/content/icons/deviantart2BW.png' align = 'absmiddle' height = '12' width = '12' style='border-style: none' /></a>"),
            style: "width:36%",
            content: $sce.trustAsHtml("<center><img src = '" + data.thumbnail.thumbnail.url + "' ></center>")
          }

          $scope.items.push(item)
        }
			})
	}
	fetchDeviantArt();

  function fetchBlogger() {
		var params = {
      key: "AIzaSyBU3_KGZO90Vu_s8Lhbl7lJAEsaIouAEaY",
      fetchBodies: true,
      maxResults: 2
		}
		$http.get("https://www.googleapis.com/blogger/v2/blogs/2628647666607369284/posts", { params: params })
			.success(function (resp) {
        for (var i in resp.items) {
          var data = resp.items[i]
          var date = new Date(data.published)
          var item = {
            date: date,
            dateFormat: date.toLocaleString('en-US'),
            id: data.id,
            source: $sce.trustAsHtml("On <a href = '" + data.url + "' style='text-decoration: none' target='_top'>Blogger <img src = '/content/icons/bloggerBW.png' align = 'absmiddle' height = '12' width = '12' style='border-style: none' /></a>"),
            style: "width:88%",
            content: $sce.trustAsHtml(data.content)
          }

          $scope.items.push(item)
        }
			})
	}
	fetchBlogger();

}