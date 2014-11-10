<?php if (!defined('THINK_PATH')) exit();?><div class="widget-box">
	<div class="widget-title">
		<h3>
			<span>产品展示</span>
			<a class="btn pull-right" href="#/addShow"><i class="icon icon-list"></i> 添加产品</a>
		</h3>
	</div>
	<ul class="unstyled" id="show-list">
		<li class="span3" ng-repeat="slist in showObj.list">
			<div class="innerbox">
				<div id="show-img-box">
					<img ng-src="{{slist.img}}" alt="" >
				</div>
				<br>
				<span>系列:{{slist.name}}</span>
				<label class="checkbox" for="">
					<input type="checkbox">前台展示
				</label>
			</div>
		</li>
	</ul>
</div>