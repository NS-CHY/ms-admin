'use strict';
var app = angular.module('appService', []);
// 定义通用对象
app.factory('commonRequestObj', function($http) {
  return {
    request: function(url, method, data) {
      var request_data = {
        method: method,
        url: url
      };
      if (data) {
        request_data.data = data;
      }
      return $http(request_data);
    }
  };
});
// 网格
app.service('groupService', function(commonRequestObj) {
  var group = {
    //获取网格列表
    list: function(data) {
      return commonRequestObj.request('/Group/getGroup', 'post', data);
    },
    //添加
    add: function(data) {
      return commonRequestObj.request('/Group/addGroup', 'post', data);
    },
    //修改
    update: function(data) {
      return commonRequestObj.request('/Group/updateGroup', 'post', data);
    },
    //删除
    delete: function(data) {
      return commonRequestObj.request('/Group/deleteGroup', 'post', data);
    },
    tree: function() {
      return commonRequestObj.request('/Group/groupTree', 'get');
    }
  };
  return group;
});
// 人员
app.service('userService', function(commonRequestObj) {
  var user = {
    // 获取列表
    list: function(data) {
      return commonRequestObj.request('/User/users', 'post', data);
    },
    // 获取单条记录
    one: function(data) {
      return commonRequestObj.request('/User/getUser', 'post', data);
    },
    // 添加
    add: function(data) {
      return commonRequestObj.request('/User/add', 'post', data);
    },
    // 修改
    update: function(data) {
      return commonRequestObj.request('/User/modify', 'post', data);
    },
    // 删除
    delete: function(data) {
      return commonRequestObj.request('/User/setStatus', 'post', data);
    },
    currentLoginMember: function() {
      return commonRequestObj.request('/User/getMember', 'get');
    }
  };
  return user;
});
// 表单
app.service('itemService', function(commonRequestObj) {
  var item = {
    //获取网格列表
    list: function(data) {
      return commonRequestObj.request('/Item/items', 'post', data);
    },
    one: function(data) {
      return commonRequestObj.request('/Item/getItem', 'post', data);
    },
    //添加
    add: function(data) {
      return commonRequestObj.request('/Item/add', 'post', data);
    },
    //删除
    delete: function(data) {
      return commonRequestObj.request('/Item/delete', 'post', data);
    },
    //修改
    update: function(data) {
      return commonRequestObj.request('/Item/modify', 'post', data);
    }
  };
  return item;
});
// 类型
app.service('typeService', function(commonRequestObj) {
  var type = {
    //获取网格列表
    list: function(data) {
      return commonRequestObj.request('/Type/types', 'post', data);
    },
    //添加
    add: function(data) {
      return commonRequestObj.request('/Type/add', 'post', data);
    },
    one: function(data) {
      return commonRequestObj.request('/Type/getType', 'post', data);
    },
    update: function(data) {
      return commonRequestObj.request('/Type/modify', 'post', data);
    },
    //删除
    delete: function(data) {
      return commonRequestObj.request('/Type/delete', 'post', data);
    }
  };
  return type;
});
// 监管场所
app.service('companyService', function(commonRequestObj) {
  var company = {
    //获取网格列表
    list: function(data) {
      return commonRequestObj.request('/Index/companys', 'post', data);
    },
    //添加
    add: function(data) {
      return commonRequestObj.request('/Index/add', 'post', data);
    },
    one: function(data) {
      return commonRequestObj.request('/Index/getCompany', 'post', data);
    },
    one_task: function(data) {
      return commonRequestObj.request('/Index/getCompanyTask', 'post', data);
    },
    update: function(data) {
      return commonRequestObj.request('/Index/modify', 'post', data);
    },
    unchargeList: function(data) {
      return commonRequestObj.request('/Index/getUnchargeCompanys', 'post', data);
    },
    set: function(data) {
      return commonRequestObj.request('/Index/setCompanys', 'post', data);
    },
    bulk_edit: function(data) {
      return commonRequestObj.request('/Index/bulkEdit', 'post', data);
    },
    delete: function(data) {
      return commonRequestObj.request('/Index/delete_companys', 'post', data);
    },
    import: function(data) {
      return commonRequestObj.request('/Index/import_company', 'post', data);
    }
  };
  return company;
});
// 任务
app.service('taskService', function(commonRequestObj) {
  var task = {
    //获取网格列表
    list: function(data) {
      return commonRequestObj.request('/Task/tasks', 'post', data);
    },
    crud: function() {
      return commonRequestObj.request('/Task/getUserTaskCurd', 'get');
    },
    user_list: function() {
      return commonRequestObj.request('/User/getUsersOfGroup', 'get');
    },
    update: function(data) {
      return commonRequestObj.request('/Task/setTaskUser', 'post', data);
    },
    one: function(data) {
      return commonRequestObj.request('/Task/getTask', 'post', data);
    },
    //添加
    add: function(data) {
      return commonRequestObj.request('/Task/add', 'post', data);
    },
    statistic: function(data) {
      return commonRequestObj.request('/Task/statistic', 'post', data);
    }
  };
  return task;
});
app.service('bulletinService', function(commonRequestObj) {
  var bulletin = {
    list: function(data) {
      return commonRequestObj.request('/Bulletin/getBulletinList', 'post', data);
    },
    add: function(data) {
      return commonRequestObj.request('/Bulletin/add', 'post', data);
    }
  };
  return bulletin;
});
app.service('complainService', function(commonRequestObj) {
  var complain = {
    list: function(data) {
      return commonRequestObj.request('/Complain/complains', 'post', data);
    },
    delete: function(data) {
      return commonRequestObj.request('/Complain/deleteComplain', 'post', data);
    },
    add: function(data) {
      return commonRequestObj.request('/Complain/add', 'post', data);
    },
    one: function(data) {
      return commonRequestObj.request('/Complain/getComplain', 'post', data);
    },
    addTask: function(data) {
      return commonRequestObj.request('/Complain/addTask', 'post', data);
    }
  };
  return complain;
});
//应急数据
app.service('emergencyDataService', function(commonRequestObj) {
  var emergencyData = {
    list: function(data) {
      return commonRequestObj.request('/Map/emergencyDatas', 'post', data);
    }
  };
  return emergencyData;
});
//统计数据
app.service('statisticsService', function(commonRequestObj) {
  var statistics = {
    userList: function(data) {
      return commonRequestObj.request('/Statistics/userStatistics', 'post', data);
    },
    companyList: function(data) {
      return commonRequestObj.request('/Statistics/companyStatistics', 'post', data);
    },
    groupList: function(data) {
      return commonRequestObj.request('/Statistics/groupStatistics', 'post', data);
    }
  };
  return statistics;
});