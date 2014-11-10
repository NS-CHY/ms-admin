<?php if (!defined('THINK_PATH')) exit();?><div class="widget-box">
	<div class="widget-title">
		<h3>
			<span>编辑新闻</span>
			<a class="btn pull-right" href="#/news"><i class="icon icon-list"></i> 新闻列表</a>
		</h3>
	</div>
	<div class="widget-content">
		<form action="" ng-submit="newsEditObj.update()">
			<legend></legend>
				<label class="control-label">新闻标题:</label>
				<input class="span12" type="text" ng-model="newsEditObj.news.title">
				<label class="control-label">新闻内容:</label>
				<textarea  ck-editor id="ck-editor" ng-model="newsEditObj.news.content"></textarea>
				<br/>
				<label class="checkbox">
					<input type="checkbox">立即发布
				</label>
			<div class="form-actions">
				<button class="btn btn-primary" type="submit">确定</button>
				<button class="btn" type="reset">取消</button>
			</div>
		</form>
	</div>
</div>