<?php if (!defined('THINK_PATH')) exit();?><div class="widget-box">
	<div class="widget-title">
		<h3>
			<span>行业新闻</span>
			<a href="#/news/add" class="btn pull-right"><i class="icon icon-plus"></i>添加新闻</a>
		</h3>
	</div>
	<div class="widget-content">
		<table class="table table-triped">
			<tr ng-repeat="news in newsObj.list" ng-init="newsIndex = $index">
				<td width="70%"><a href="#">{{newsIndex+1}}.{{news.title}}</a></td>
				<td width="30%"><a href="#/news/edit/{{newsIndex}}"><i class="icon icon-edit"></i> 编辑</a>
				&nbsp;
				<a href=""><i class="icon icon-eye-open"></i> 发布</a></td>
			</tr>
		</table>
	</div>
</div>