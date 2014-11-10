//兼容ie7,8
app.config(function($sceProvider) {
	$sceProvider.enabled(false);
});
app.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
});
app.config(function($anchorScrollProvider) {
	$anchorScrollProvider.disableAutoScrolling();
})
//配置Content-type格式
app.config(function($httpProvider) {
	$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	$httpProvider.defaults.transformRequest = [

		function(data) {
			var param = function(obj) {
				var query = '';
				var name, value, fullSubName, subName, subValue, innerObj, i;
				for (name in obj) {
					value = obj[name];
					if (value instanceof Array) {
						for (i = 0; i < value.length; ++i) {
							subValue = value[i];
							fullSubName = name + '[' + i + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if (value instanceof Object) {
						for (subName in value) {
							subValue = value[subName];
							fullSubName = name + '[' + subName + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if (value !== undefined && value !== null) {
						query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
					}
				}
				return query.length ? query.substr(0, query.length - 1) : query;
			};
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}
	]
});
// dropMenu
// <div drop-menu menus="{{menus}}"></div>
app.directive('dropMenu', function() {
	return {
		restrict: 'A',
		scope: {
			menus: '='
		},
		template: '<ul class="nav nav-list bs-docs-sidenav nav-collapse collapse">' +
			'<li ng-class="{active: defaultIndex===$index}" ng-repeat="m in menus" ng-click="toggleClass($index)">' +
			'<a ng-href="{{m.url}}"><i class="icon-chevron-right"></i> {{m.name}}</a>' +
			'</li>' +
			'</ul>',
		link: function(scope, ele, attr) {
			scope.defaultIndex = 0;
			scope.toggleClass = function(index) {
				scope.defaultIndex = index;
			};
		}
	}
});
// ckEditor
// <textarea ck-editor id="ck-editor"></textarea>
app.directive('ckEditor', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			id: '@',
			ngModel: '='
		},
		link: function(scope, ele, attr, ngModelCtrl) {
			CKEDITOR.replace(scope.id);

			function read() {
				var editor = CKEDITOR.instances[scope.id];
				editor.on('change', function() {
					var data = editor.getData();
					ngModelCtrl.$setViewValue(data);
				})
			}
			read();
		}
	}
});
// <div id></div>
app.directive('uploader', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			doneUpload: '&',
			id: '@',
			url: '@',
			type: '='
		},
		link: function(scope, element, attrs) {
			element.attr('id', scope.id);
			element.find('input')
				.css({
					"color": "red",
					"height": "100%"
				});
			var obj = {
				button: scope.id,
				action: scope.url,
				onComplete: function(fileName, response) {
					if (response.ret != 0) {
						return;
					}
					if (!scope.doneUpload) {
						return;
					}
					scope.$apply(function() {
						/*注意,此处方法的参数以对象的形式传递*/
						scope.doneUpload({
							data: response
						});
					})
				}
			};
			$.jUploader.setDefaults({
				allowedExtensions: scope.type
			});
			$.jUploader(obj);
		}
	}
});