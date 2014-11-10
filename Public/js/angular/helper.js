var app = angular.module('helper', ['appService']);
app.factory('page', function() {
	var page = {};
	page.init = function(opt) {
		var opt = opt || {};
		return {
			loading: opt.loading === false ? false : true,
			empty: false,
			current: 1,
			limit: opt.limit || 10,
			total: 0,
			set_page: function(page) {
				this.current = page;
			},
			set_total: function(num) {
				this.total = num;
			},
			set_val: function(type, value) {
				this[type] = value;
			},
			set_empty: function(value) {
				var val = !!value;
				this.set_val('empty', val);
			},
			set_loading: function(value) {
				var val = !!value;
				this.set_val('loading', val);
			},
			set_groupLoading: function(value) {
				var val = !!value;
				this.set_val('groupLoading', val);
			},
			go_page: function(page) {}
		};
	};
	return page;
});
app.factory('importobj', function($http) {
	var X = {};
	//根据上传文件的扩展名调用不同xls对象
	function setX(ext) {
		X = ext === 'xlsx' ? XLSX : XLS;
	}

	function get_file(data) {
		setX(data.ext);
		return $http({
			method: 'get',
			responseType: 'arraybuffer',
			url: data.url
		});
	}

	function deal_xls(r, opt) {
		// convert data to binary string
		var data, arr = [],
			i, len, bstr, workbook, json_data, json_data_arr = [],
			k;
		data = new Uint8Array(r);
		len = data.length;
		for (i = 0; i < len; ++i) {
			arr[i] = String.fromCharCode(data[i]);
		}
		bstr = arr.join("");
		// Call XLS or XLSX
		workbook = X.read(bstr, {
			type: "binary"
		});
		json_data = to_json(workbook, opt);
		for (k in json_data) {
			json_data_arr = json_data_arr.concat(json_data[k]);
		}
		return json_data_arr;
	}

	function to_json(workbook, opt) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], opt);
			if (roa.length > 0) {
				result[sheetName] = roa;
			}
		});
		return result;
	}

	return {
		get_file: get_file,
		deal_xsl: deal_xls
	}
});
app.factory('Message', function($timeout) {
	var Message = {};
	Message.init = function() {
		return {
			success: false,
			successText: '操作成功!',
			error: false,
			errorText: '未知错误!',
			showSuccess: function(msg, time) {
				if (msg) {
					this.successText = msg;
				}
				this.success = true;
				var t = time || 3000,
					that = this;
				$timeout(function() {
					that.success = false;
				}, t);
			},
			showError: function(msg, time) {
				if (msg) {
					this.errorText = msg;
				}
				this.error = true;
				var t = time || 3000,
					that = this;
				$timeout(function() {
					that.error = false;
				}, t);
			}
		};
	};
	return Message;
});