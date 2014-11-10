var app = angular.module('msApp', ['ngRoute']);
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			controller: 'showCtrl',
			templateUrl: '/Show/show'
		}).when('/addShow',{
			controller:'showCtrl',
			templateUrl:'/Show/addshow'
		}).when('/about', {
			controller: 'aboutCtrl',
			templateUrl: '/About/about'
		}).when('/notice', {
			controller: 'noticeCtrl',
			templateUrl: '/Notice/notice'
		}).when('/news', {
			controller: 'newsCtrl',
			templateUrl: '/News/news'
		}).when('/news/add', {
			controller: 'newsCtrl',
			templateUrl: '/News/addnews'
		}).when('/news/edit/:index', {
			controller: 'newsCtrl',
			templateUrl: '/News/editnews'
		}).when('/user', {
			controller: 'userCtrl',
			templateUrl: '/User/user'
		}).otherwise({
			redirectTo: '/'
		})
	}
]);
// main controller
app.controller('ctrl', ['$scope',
	function($scope) {
		$scope.menus = [{
			name: '产品展示',
			url: '#/show'
		}, {
			name: '关于我们',
			url: '#/about'
		}, {
			name: '行业新闻',
			url: '#/news'
		}, {
			name: '网站公告',
			url: '#/notice'
		}, {
			name: '添加管理员',
			url: '#/user'
		}
		// , {
		// 	name: '典型案例',
		// 	url: '#/case'
		// }
		];
	}
]);
// show controller
app.controller('showCtrl', ['$scope',
	function($scope) {
		$scope.showObj = {
			list: [{
				name: 'MS001',
				img: 'images/001.jpg'
			}, {
				name: 'MS002',
				img: 'images/002.jpg'
			}, {
				name: 'MS003',
				img: 'images/003.jpg'
			}, {
				name: 'MS004',
				img: 'images/004.jpg'
			}, ]
		}
	}
]);
// about controller
app.controller('aboutCtrl', ['$scope',
	function($scope) {

	}
]);
// case controller
app.controller('caseCtrl', ['$scope',
	function($scope) {

	}
]);
// notice controller
app.controller('noticeCtrl', ['$scope',
	function($scope) {

	}
]);
// news controller
app.controller('newsCtrl', ['$scope', '$routeParams', '$window',

	function($scope, $routeParams, $window) {
		$scope.newsObj = {
			list: [{
				id: '100',
				title: '标题--行业新闻测试数据',
				content: '<h1>内容--行业新闻测试数据</h1>',
				time: Date.now(),
				author: 'chy'
			}, {
				id: '200',
				title: 'test-title',
				content: 'test-content',
				time: Date.parse('2014-11 15:35'),
				author: 'chengyang'
			}]
		};
		console.log($scope.newsObj.list);
		// edit news
		$scope.newsEditObj = {
			news: $scope.newsObj.list[$routeParams.index],
			update: function() {
				console.log(this.news);
			}
		};
		// add news
		$scope.newsAddObj = {
			news: {
				title: '',
				content: '',
				publish: false
			},
			add: function() {
				$scope.newsObj.list.push(this.news);
				console.log($scope.newsObj.list);
			}
		}

	}
]);
// user controller
app.controller('userCtrl', ['$scope',
	function($scope) {

	}
]);