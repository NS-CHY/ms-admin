<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html ng-app="msApp" id="ng-app">
    
    <head>
        <title>Admin Home Page</title>
        <!-- Bootstrap -->
        <meta charset="UTF-8">
        <link href="__PUBLIC__/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="__PUBLIC__/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
        <link href="__PUBLIC__/css/styles.css" rel="stylesheet" media="screen">
        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    
    <body ng-controller="ctrl">
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="brand color_e3ce82" href="#"><img src="__PUBLIC__/images/logo-60-43.png" width="35" alt="">&nbsp;&nbsp;美尚佳美壁纸</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav pull-right">
                            <li><a href="">2014-11-04 17:49</a></li>
                            <li class="dropdown">
                                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> 
                                <i class="icon-user"></i> admin <i class="caret"></i>

                                </a>
                                <ul class="dropdown-menu">
                                    <li class="divider"></li>
                                    <li>
                                        <a tabindex="-1" href="login.html">Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!--/.nav-collapse -->
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span3" id="sidebar">
                    <div drop-menu menus="menus"></div>
                </div>
                
                <!--/span-->
                <div class="span9" id="content">
                    <div class="row-fluid">
                        <div ng-view=""></div>    
                    </div>
                </div>
            </div>
            <hr>
            <footer>
                <p>&copy; Vincent Gabriel 2013</p>
            </footer>
        </div>
       <script src="__PUBLIC__/js/ckeditor/ckeditor.js"></script>
       <script src="__PUBLIC__/js/angular/angular.min.js"></script>
       <script src="__PUBLIC__/js/angular/angular-route.min.js"></script>
       <script src="__PUBLIC__/js/angular/json2.js"></script>
       <!-- // <script src="angular/filter.js"></script> -->
       <script src="__PUBLIC__/js/angular/service.js"></script>
       <script src="__PUBLIC__/js/controller.js"></script>
       <script src="__PUBLIC__/js/angular/directive.js"></script>
    </body>

</html>