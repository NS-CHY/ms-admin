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
//饼图插件
app.directive('highchart', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			data: '=costData'
		},
		link: function(scope, element, attrs) {
			element.highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					backgroundColor: null
				},
				title: {
					text: ''
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							color: '#000000',
							connectorColor: '#000000',
							format: '<b>{point.name}</b>: {point.percentage:.1f} %'
						},
						showInLegend: true
					}
				},
				//去水印
				credits: {
					enabled: false
				},
				series: [{
					type: 'pie',
					name: '费用统计',
					data: scope.data
				}]
			})
		}

	}
});
/*上传指令*/
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
//自定义指令调用时间插件
app.directive('datePicker', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: {
			dateOptions: '=',
			done: '&'
		},
		link: function(scope, element, attrs, ngModel) {
			if (!ngModel)
				return;
			element.focus(function() {
				if (!scope.dateOptions) {
					scope.dateOptions = {
						lang: 'zh-cn',
						onpicked: function() {
							element.blur();
						},
						oncleared: function() {
							element.blur();
						}
					}
				}

				WdatePicker(scope.dateOptions);
			});

			element.bind('blur change keyup', function() {
				ngModel.$setViewValue(element.val());
				if (scope.done) {
					scope.done({
						obj: element
					});
				}
			});
		}
	}
});
/*图片加载时获取图片的宽和高并使其适应容器的宽高*/
app.directive('resize', function($timeout) {
	return {
		restrict: 'A',
		scope: {
			loadingDone: '&'
		},
		link: function(scope, element, attrs) {
			//第一次被调用时隐藏图片
			element.css({
				'visibility': 'hidden'
			})
			element.load(function() {
				$timeout(function() {
					scope.loadingDone();
				}, 10);
				// 清除设置的所有属性
				element.parent().css({
					'width': '',
					'height': '',
					'margin-left': '',
					'margin-top': ''
				});
				element.css({
					'width': '',
					'height': '',
					'margin-left': '',
					'margin-top': '',
					'visibility': 'visible'
				})
				/*获取父元素的高度和宽度*/
				var w = Math.ceil(element.width()),
					h = Math.ceil(element.height()),
					max_w = 1024,
					offset_w = 110;
				/*获取窗口的宽度和高度*/
				var ww = Math.ceil(angular.element(window).width()),
					wh = Math.ceil(angular.element(window).height()),
					max_h = wh - 100;
				/*设置父元素的偏移量和图片的宽高*/
				if (w > max_w) {
					element.css({
						'width': max_w + 'px'
					});
				} else {
					element.parent().css({
						'margin-left': -w / 2 + offset_w + 'px',
						'width': w + 'px'
					});
				}

				if (h > max_h) {
					element.parent().css({
						'height': max_h + 'px',
						'margin-top': -max_h / 2 + 'px'
					});
					element.css({
						'height': max_h + 'px'
					})
				} else {
					element.parent().css({
						'margin-top': -h / 2 + 'px',
						'height': h + 'px'
					});
				}
			})
		}
	}
})
/*
 *点击小图看大图
 */
app.directive('imgScan', function() {
	return {
		restrict: 'A',

		replace: true,

		scope: {
			imgArr: '=',
			currentImg: '=',
		},

		template: '<div class="shadeBox" ng-if="currentImg">'

		+ '<div class="shade" ng-click="closeShade()" ></div>'

		+ '<div id="imgBox" >'

		+ '<a ng-click="prev()" ng-if="imgArr[0].id != currentImg.id"  href="javascript:;" class="prev"><img ng-src="/img/prev-50-45.png" alt="上一张"></a>'

		+ '<img resize  loading-done="removeLoading()"  ng-src="' + resourceUrl + '{{currentImg.img}}" alt=""/>'

		+ '<img ng-if="loading == true" src="/img/spinner.gif" class="imgLoading">'

		+ '<a ng-click="next()" ng-if="imgArr[imgArr.length-1].id != currentImg.id"  href="javascript:;" class="next"><img ng-src="/img/next-50-45.png" alt="下一张"></a>'

		+ '</div>'

		+ '</div>',

		link: function(scope, element, attrs) {

			scope.loading = true;

			scope.closeShade = function() {
				scope.currentImg = '';
			}

			scope.prev = function() {
				var index = getIndex();
				index -= 1;
				if (index >= 0) {
					scope.currentImg = scope.imgArr[index];
					scope.loading = true;
				}
			}

			scope.next = function() {
				var index, len;
				len = scope.imgArr.length;
				index = getIndex();
				index += 1;
				if (index < len) {
					scope.currentImg = scope.imgArr[index];
					scope.loading = true;
				}
			}

			scope.removeLoading = function() {
				scope.loading = false;
			}

			function getIndex() {
				var i,
					id = scope.currentImg.id,
					len = scope.imgArr.length;
				for (i = 0; i < len; i++) {
					if (scope.imgArr[i].id == id) {
						return i;
					}
				}
			}

		}
	}
});
/*弹窗*/
app.directive('dialogWin', function() {
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			data: '=dialogData'
		},
		template: '<div class="shadeBox" ng-if="data.msg">'

		+ '<div class="shade" ng-click="closeShade()" ></div>'

		+ '<div class="dialog" id="dialog">'

		+ '<div class="dialogCloseBox"><span class="dialogClose" ng-click="closeShade()" ng-if="data.type == 2 || data.type==3"></span></div>'

		+ '<div class="dialogMsgBox">'

		+ '<p class="dialogMsg">'

		+ '<img ng-if="data.type == 1" src="' + imageUrl + '/public/loading.gif" />'

		+ '<img ng-if="data.type == 2" src="' + imageUrl + '/public/error_face.jpg" />'

		+ '<img ng-if="data.type == 3" src="' + imageUrl + '/public/succ_face.jpg" />'

		+ '{{data.msg}}'

		+ '</p>'

		+ '</div > '

		+ '<div class = "dialogBtnBox" ng-if="data.type == 4">'

		+ '<input ng-click="closeShade()" class="blue_button " type="image" src="/flyox_platform/flyox_xt/img/write/cancle.jpg">'

		+ '<input ng-click="confirm()" class="blue_button fr" type="image" src="/flyox_platform/flyox_xt/img/write/confirm.jpg">'

		+ '</div>'

		+ '</div> '

		+ ' </div>',

		link: function(scope, element, attrs, ngModel) {
			scope.showDialog = true;
			scope.closeShade = function() {
				scope.data = '';
			}
			scope.confirm = function() {
				scope.data.confirmCallBack();
				scope.data = '';
			}
		}
	}
});
/*最大长度控制 */
app.directive('ctrlMaxlength', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			var maxlength = Number(attrs.ctrlMaxlength);

			function fromUser(text) {
				if (text.length > maxlength) {
					var transformedInput = text.substring(0, maxlength);
					ngModelCtrl.$setViewValue(transformedInput);
					ngModelCtrl.$render();
					return transformedInput;
				}
				return text;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});
/*保持滚动条在最底部*/
app.directive('scrollBottom', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			$timeout(function() {
				element[0].scrollTop = 20000;
			}, 10);
		}
	}
})
/*单张图片加载之后的宽高限制*/
app.directive('imgLimit', function() {
	return {
		restrict: 'A',
		scope: {
			maxH: '@',
			maxW: '@'
		},
		link: function(scope, element, attr) {
			element.load(function() {
				var h, p;
				h = element.height();
				p = element.parent();

				if (scope.maxH < h) {
					element.height(scope.maxH);
				} else {
					p.height(h);
				}
			})
		}
	}
});
/*logout*/
app.directive('logout', function($http) {
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		template: '<div class="fr public_logout" ng-click="logout();">'

		+ '<a class="logout pngFix hander">'

		+ '<img src="' + imageUrl + '/userPage/logout.png">'

		+ '</a>'

		+ '</div>',

		link: function(scope, element, attr) {
			scope.logout = function() {
				var url = '/Index/destroySession',
					msg = '确定要退出赢在吗?',
					goUrl = 'http://www.f-ox.com.cn/';
				if (confirm(msg)) {
					$http({
						method: 'GET',
						url: url
					}).success(function(r) {
						if (r) {
							removeCookie('token', '');
							removeCookie('member', '');
							location.href = goUrl;
						}
					});
				}
			};

			function removeCookie(name, value) {
				var option = {
					expires: -1,
					path: '/',
					domain: 'f-ox.com.cn'
				}
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + option.expires);
				document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toGMTString() + ';path=' + option.path + ';domain=' + option.domain;
			}

		}

	}
});
/*部门树状列表*/
app.directive('groupTree', function($compile, $timeout) {
	var template = '<ul class="common-group-tree">' + '<li ng-repeat="gp in data">' + '<p class="common-group-p">' + '<ins></ins>' + '<a href="javascript:;" ng-click="showChildren($index,gp.id)" ng-if="!gp.isShow && gp.children.length>0"></a>' + '<a href="javascript:;" ng-click="showChildren($index,gp.id)" ng-if="gp.isShow" class="slide-up"></a>' + '<span click-reminder ng-click="select(gp.group_id,gp.group_name,gp.children)">{{gp.group_name}}</span>' + '</p>' + '<div ng-if="gp.isShow" group-tree data="gp.children" select-func="select(id,name,children)"></div>' + '</li>' + '</ul>';
	return {
		restrict: 'A',
		scope: {
			data: '=',
			selectFunc: '&'
		},
		replace: true,
		link: function(scope, element, attr) {
			scope.showChildren = function(index, id) {
				scope.data[index].isShow = !scope.data[index].isShow;
			};
			scope.select = function(id, name, children) {
				var haschildren;
				if (!children) {
					haschildren = false;
				} else {
					haschildren = true;
				}
				scope.selectFunc({
					id: id,
					name: name,
					children: haschildren
				});
			};
			element.append(template);
			var childScope = scope.$new();
			childScope.data = scope.data;
			childScope.selectFunc = scope.selectFunc;
			$compile(element.contents())(childScope);
		}
	};
});
app.directive('clickReminder', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.bind('click', function() {
				element.css({
					"background-color": "#006dcc",
					"color": "#ffffff"
				});
				$timeout(function() {
					element.css({
						"background-color": "",
						"color": ""
					});
				}, 800);
			});
		}
	};
});
app.directive('groupTreecheckbox', function($compile, $timeout) {
	var template = '<ul class="common-group-tree">'

	+'<li ng-repeat="gp in data">'

	+ '<p class="common-group-p">'

	+ '<ins></ins>'

	+ '<a href="javascript:;" ng-click="showChildren($index,gp.id)" ng-if="!gp.isShow && gp.children.length>0"></a>'

	+ '<a href="javascript:;" ng-click="showChildren($index,gp.id)" ng-if="gp.isShow" class="slide-up"></a>'

	+ '<span click-reminder ng-click="select(gp.group_id,gp.group_name,gp.children)">{{gp.group_name}}</span>'

	+ '&nbsp;<input style="margin-top:0px;" type="checkbox" ng-model="gp.apply" ng-change="checkbox_change(gp.group_id,gp.group_name,gp.apply)" />'

	+ '</p>'

	+ '<div ng-if="gp.isShow" group-treecheckbox data="gp.children" checkbox-func="checkbox_change(id,name,apply)" select-func="select(id,name,children)"></div>'

	+ '</li>'

	+ '</ul>';
	return {
		restrict: 'A',
		scope: {
			data: '=',
			selectFunc: '&',
			checkbox: '@',
			checkboxFunc: '&'
		},
		replace: true,
		link: function(scope, element, attr) {
			scope.showChildren = function(index, id) {
				scope.data[index].isShow = !scope.data[index].isShow;
			};
			scope.select = function(id, name, children) {
				var haschildren;
				if (!children) {
					haschildren = false;
				} else {
					haschildren = true;
				}
				scope.selectFunc({
					id: id,
					name: name,
					children: haschildren
				});
			};
			scope.checkbox_change = function(id, name, apply) {
				scope.checkboxFunc({
					id: id,
					name: name,
					apply: apply
				});
			};
			element.append(template);
			var childScope = scope.$new();
			childScope.data = scope.data;
			childScope.selectFunc = scope.selectFunc;
			childScope.checkboxFunc = scope.checkboxFunc;
			$compile(element.contents())(childScope);
		}
	};
});
/*垂直居中*/
app.directive('autoMiddle', function() {
	return {
		restrict: 'A',
		link: function(scope, ele, attr) {
			var h = ele[0].clientHeight,
				wh = document.body.clientHeight - 100;
			if (h > wh) {
				ele[0].clientHeight = wh;
			} else {
				var top = (wh - h) / 2 + 50;
				ele[0].style.top = '50%';
				ele[0].style.marginTop = -top + 'px';
			}
		}
	}
})
/*分页*/
app.directive('pagination', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			totalPage: '=',
			current: '=',
			goPage: '&',
			focusable: '@'
		},
		template: '<div class="pagination pagination-holder dark-theme">'

		+ '<div class="skipPage pull-right">' + ' <form action="" method="post" ng-submit="skip()" >' + '<input type="text" ng-model="skipPage" /> <button class="btn" type="submit">go</button></div>' + '</form>'

		+ '<ul class="pull-right">'

		+ '<li ng-if="current-1>0"><a href="javascript:;" ng-click=goto("prev")>&laquo;</a></li>'

		+ '<li ng-if="current-1<=0"><span>&laquo;</span></li>'

		+ '<li>'

		+ '<span class="active">{{current}} / {{totalPage}}</span>'

		+ '</li>'

		+ '<li ng-if="current<totalPage"><a href="javascript:;" ng-click=goto("next")>&raquo;</a></li>'

		+ '<li ng-if="current>=totalPage"><span>&raquo;</span></li>'

		+ '</ul>'

		+ '</div>',
		link: function(scope, element, attr) {

			scope.goto = function(type) {
				var page;
				if (type == 'next') {
					page = parseInt(scope.current) + 1;
				} else {
					page = parseInt(scope.current) - 1;
				}
				if (scope.goPage) {
					scope.goPage({
						num: page
						// page: page
					});
					scope.current = page;
				}
			};
			scope.skip = function() {
				var page = parseInt(scope.skipPage);
				if (isNaN(page)) {
					return;
				};
				page = page > scope.totalPage ? scope.totalPage : page;
				if (scope.skipPage <= 0) {
					page = 1;
				};
				scope.goPage({
					num: page
					// page: page
				});
				scope.skipPage = "";
				scope.current = page;
				element.find("input").blur();
			};
		}
	}
});
app.directive('map', function() {
	return {
		restrict: 'A',
		scope: {
			id: '@',
			markers: '=',
			type: '@'
			// findMarker: '&'
		},
		link: function(scope, element, attr) {
			function showMap() {
				var op = {
					mapBox: document.getElementById(scope.id),
					position: new AMap.LngLat(113.09874, 22.58711)
				}
				MAP = new AMap.Map(op.mapBox, {
					center: op.position,
					level: 17,
					resizeEnable: true
				});
			}
			showMap();
			//创建点标记
			function addMarker(option) {
				var marker = new AMap.Marker({
					position: new AMap.LngLat(option.long, option.lat),
					content: option.content,
					clickable: option.clickable,
					title: option.title
					// extData: option.extData
				});
				marker.setMap(MAP);
				addInfoWindow(marker, option.title);
				// return marker;
			}

			function showMarkers() {
				var markers = scope.markers,
					op;
				for (var i = 0, len = markers.length; i < len; i++) {
					op = {};
					op.content = markers[i].content;
					op.long = markers[i].long;
					op.lat = markers[i].lat;
					if (markers[i].title) {
						op.title = markers[i].title
					} else {
						op.title = '';
					}
					if (markers[i].is_click) {
						op.clickable = true
					} else {
						op.clickable = false
					}
					addMarker(op);
				}
			}
			showMarkers();
			//创建信息窗口
			function addInfoWindow(marker, title) {
				var content = '';
				if (scope.type == 'user') {
					content += '<p>姓名:' + title + '</p><p>联系方式:18811382014</p><p>所属网格:蓬江区常安社区</p><div><button class="btn">指派任务</button>&nbsp;&nbsp;<button  class="btn">历史任务</button>&nbsp;&nbsp;<button  class="btn">监管单位</button></div>'
				} else {
					content += '<p>监管场所:' + title + '</p><p>负责人:张君</p><p>所属网格:蓬江区常安社区</p><p>监管人:李烈</p>'
				}
				var inforWindow = new AMap.InfoWindow({
					offset: new AMap.Pixel(5, -20),
					content: content,
					closeWhenClickMap: true
				});
				AMap.event.addListener(marker, "click", function(e) {
					inforWindow.open(MAP, this.getPosition());
				});

			}
		}
	}
})
//自定义下拉框
app.directive('diySelect', function() {
	return {
		restrict: 'A',
		scope: {
			options: '=',
			selDone: '&',
			selVal: '='
		},
		require: '?ngModel',
		replace: true,
		template: '<select ng-model="data" ng-change="change()">'

		+ '<option value="{{op.id}}" ng-repeat="op in options" ng-selected="selVal==op.id">{{op.name}}</option>'

		+ '</select>',

		link: function(scope, element, iAttrs, ngModel) {
			if (scope.selVal) {
				scope.data = scope.selVal;
			} else {
				scope.data = scope.options[0].id;
			}
			scope.change = function() {
				scope.selDone({
					data: scope.data
				});
			}
		}
	};
})
//返回上一步
app.directive('goBack', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		template: '<a href="javascript:;" class="btn btn-danger" ng-click="go()">返回</a>',
		link: function(scope, iElement, iAttrs) {
			scope.go = function() {
				history.back();
			}
		}
	};
})
//common menu
app.directive('commonMenu', function() {
	return {
		restrict: 'A',
		scope: {
			activeIndex: '@',
			type: '@',
			power: '@',
			role: '@',
			innerActiveIndex: '@'
		},
		replace: true,
		template: '<ul>'

		+ '<li ng-repeat="menu in menus" ng-class="{active:menu.id==activeIndex}">'

		+ '<a ng-if="menu.show === true && menu.subs.length === 0" ng-href="{{menu.href}}"><i class="icon {{menu.icon}}"></i> {{menu.name}}</a>'

		+ '<a ng-if="menu.subs.length!=0" ng-class="{active:$index==activeIndex}" href="javascript:;" ng-click="menu.sub_show = !menu.sub_show"><i class="icon {{menu.icon}}"></i> {{menu.name}}</a>'

		+ '<ul ng-if="menu.sub_show">'

		+ '<li ng-repeat="sub in menu.subs" ng-if="sub.show ===true" ><a ng-href="{{sub.href}}">{{sub.name}}</a></li>'

		+ '</ul>'

		+ '</li>'

		+ '</ul>',
		link: function(scope, iElement, iAttrs) {
			scope.root = {
				power: scope.power === '10' ? true : false,
				type: scope.type === '-11' ? true : false,
				role: scope.role === '10' ? true : false
			};
			scope.menus = [{
				id: 'group',
				name: '巡查网格管理',
				href: '/Group',
				icon: 'icon-sitemap',
				subs: [],
				show: true
			}, {
				id: 'user',
				name: '人员管理',
				href: '/User',
				icon: 'icon-user-md',
				subs: [],
				show: true
			}, {
				id: 'item',
				name: '巡查表单管理',
				href: '/Item',
				icon: 'icon-reorder',
				subs: [],
				show: true
			}, {
				id: 'type',
				name: '监管场所类型',
				href: '/Type',
				icon: 'icon-cog',
				subs: [],
				show: true
			}, {
				id: 'company',
				name: '监管场所管理',
				href: '/Index',
				icon: 'icon-home',
				show: true,
				subs: [{
					name: '监管单位',
					href: '/Index/#/list',
					show: true
				}, {
					name: '单位池',
					href: '/Index/#/set',
					show: scope.root.type
				}, {
					name: '批量管理',
					href: '/Index/#bulk_edit',
					show: scope.root.power
				}],
				sub_show: false
			}, {
				id: 'task',
				name: '监管任务管理',
				href: '/Task/',
				icon: 'icon-tasks',
				show: true,
				subs: [{
					name: '自动生成',
					href: '/Task/#/list/1',
					show: true
				}, {
					name: '上级指派',
					href: '/Task/#/list/2',
					show: true
				}, {
					name: '投诉处理',
					href: '/Task/#/list/3',
					show: true
				}, {
					name: '限期整改',
					href: '/Task/#/list/4',
					show: true
				}, {
					name: '移交上级',
					href: '/Task/#/list/5',
					show: true
				}, {
					name: '任务文件生成',
					href: '/Task/#/print',
					show: scope.root.power
				}],
				sub_show: false
			}, {
				id: 'bulletin',
				name: '资讯',
				href: '/Bulletin/',
				icon: 'icon-bullhorn',
				subs: [],
				show: true
			}, {
				id: 'complain',
				name: '投诉记录',
				href: '/Complain/#/list',
				icon: 'icon-phone',
				subs: [],
				show: scope.root.type
			}, {
				id: 'mapUser',
				name: '人员分布',
				href: '/Map/#/users',
				icon: 'icon-group',
				subs: [],
				show: true
			}, {
				id: 'mapCompany',
				name: '应急数据',
				href: '/Map/#/companys',
				icon: 'icon-map-marker',
				subs: [],
				show: true
			}, {
				id: 'statistics',
				name: '汇总统计',
				href: '/Statistics/#/1',
				icon: 'icon-bar-chart',
				subs: [],
				show: scope.root.power
			}];
		}
	};
})
//common loading flag
app.directive('pageLoading', function() {
	return {
		restrict: 'A',
		template: '<div class="alert"><img ng-src="' + imageUrl + '/spinner.gif" alt="loading"> 加载中...</div>',
		replace: true
	};
});
app.directive('pageEmpty', function() {
	return {
		restrict: 'A',
		template: '<div class="alert"> 没有记录!</div>',
		replace: true
	};
});
app.directive('msg', function() {
	return {
		restrict: 'A',
		scope: {
			text: '@',
			type: '@'
		},
		replace: true,
		template: '<div class="alert" ng-class={"alert-success":isSuccess,"alert-error":isError}>'

		+ '<strong ng-class={"icon-ok-sign":isSuccess,"icon-remove-sign":isError}></strong>&nbsp;{{text}}'

		+ '</div>',
		link: function(scope, iElement, iAttrs) {
			scope.isSuccess = scope.type == 'success';
			scope.isError = scope.type == 'error';
		}
	}
});
//自动获取焦点
app.directive('autoFocus', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element[0].focus();
		}
	};
});

// 待定
// app.directive('hideList', function ($compile) {
// 	return {
// 		restrict: 'A',
// 		link: function (scope, element, attr) {
// 			angular.element(document).click(function (e){
// 				if(attr.ngIf){
// 					element.attr('ng-if',false);
// 				}
// 				if(attr.ngShow){
// 					element.attr('ng-show',false);
// 				}
// 				if(attr.ngHide){
// 					element.attr('ng-hide',true);
// 				}
// 				$compile(element)(scope);
// 			});
// 		}
// 	};
// });