<template> 
  <div class="container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>{{$t('commons.search')}}</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          {{$t('commons.findresult')}}
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          {{$t('commons.reset')}}
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="新闻标题：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="新闻标题"></el-input>
          </el-form-item>
		  
          <el-form-item label="到期时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
	
	<el-card class="operate-container" shadow="never">
	  <el-button
	    class="btn-add"
	    @click="handleAdd()"
		type="primary"
	    size="mini">
	     {{$t('commons.add')}}
	  </el-button>
	  
	</el-card>
	
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
				:stripe="true"
				:row-style="tableRowStyle"
				:header-cell-style="tableHeaderColor"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column :label="$t('commons.news_id')" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column :label="$t('commons.news_title')" width="220" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column :label="$t('commons.news_content')" width="300" align="center">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>
		 
        <el-table-column :label="$t('commons.news_duration')" width="260" align="center">
          <template slot-scope="scope">
            <p>开始时间：{{scope.row.start_dt | formatTime}}</p>
            <p>到期时间：{{scope.row.end_dt | formatTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="上线/下线" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
				@change="handleUpdateStatus(scope.$index, scope.row)"
				active-color="#13ce66"
				inactive-color="#ff4949"
				v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
		<!--
		<el-table-column label="点击次数" width="120" align="center">
			<template slot-scope="scope">{{scope.row.clickCount}}</template>
		</el-table-column>
		-->
		
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="update_news(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="delete_news_info(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
	<el-dialog
		:title="$t('commons.news_add')"
		:visible.sync="addnewsInfo.dialogVisible"
		width="80%">
		<el-card class="form-container" shadow="never">
			<el-form :model="addnewsInfo"
		           :rules="rules"
		           ref="addnewsInfo"
		           label-width="150px"
		           size="small">
				<el-form-item :label="$t('commons.news_title')" prop="title">
					<el-input v-model="addnewsInfo.title" class="input-width"></el-input>
				</el-form-item>
				<el-form-item :label="$t('commons.news_type')">
				<el-select v-model="addnewsInfo.type">
					<el-option
						v-for="type in typeOptions"
						:key="type.value"
						:label="type.label"
						:value="type.value">
					</el-option>
				</el-select>
				</el-form-item>
				<el-form-item :label="$t('commons.news_duration')" prop="duration">
					<el-date-picker
				      v-model="addnewsInfo.duration"
				      type="daterange"
				      :start-placeholder="$t('commons.startdate')"
				      :end-placeholder="$t('commons.enddate')"
				      :default-time="['00:00:00', '23:59:59']">
					</el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('commons.news_status')" prop="status">
					<el-switch v-model="addnewsInfo.status"
						active-color="#13ce66"
						inactive-color="#ff4949"
					>
					</el-switch>
				</el-form-item>
				<el-form-item :label="$t('commons.news_content')">
					<Kind-editor  ref="kindeditor" :content="addnewsInfo.content"  @input="get_news_desc"></Kind-editor>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add_news_info()">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-dialog>
    <div class="pagination-container">
      <el-pagination
          v-if="paginations.total > 0"
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total"
          :current-page="paginations.pageIndex"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
	import {
		queryNewsList,
		updateNewsStatus,
		deleteNewsAdvertise,
		addNewsAdvertise,
	} from '@/api/user';
	import {
		shop_type,
	} from "@/utils/env" ;
	
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
	import KindEditor from "@/components/Kindeditor"; //富文本编辑器 	
	import {formatDate} from '@/utils/date';

	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
		username: null,
		access_token:null,
		shop_type: null,
		endTime:null
	};
	const defaultTypeOptions = [
		{
			label: '国内新闻',
			value: 0
		},
		{
			label: '国际新闻',
			value: 1
		}
	];
	let moment = require("moment");
	export default {
	name: 'newsAdvertiseList',
	data() {
	return {
		shop_type:shop_type?shop_type:10,
		lang:getToken('lang')||'zh',
		access_token:getToken('Token')||'zh',
		username:getToken('Username')||'',
		listQuery: Object.assign({}, defaultListQuery),
		typeOptions: Object.assign({}, defaultTypeOptions),
		rules: {
		  title: [
		    {required: true, message: '请输入新闻标题', trigger: 'blur'},
		    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
		  ],
		 
		  duration: [
		    {required: true, message: '请选择有效期', trigger: 'blur'}
		  ],
		},
		list: null,
		total: null,
		listLoading: false,
		multipleSelection: [],
		operates: [],
		operateType: null,
		addnewsInfo:{
			dialogVisible:false,
			hot_flag:"0", //热点新闻
			title:null,
			content:null,
			duration: null,
			type:null,
			status:false,
			news_status:"0",
			id:0,
			rowindex:0,
		},
		paginations: {
			total: 0,        // 总数
			pageIndex: 1,  // 当前位于哪页
			pageSize: 20,   // 1页显示多少条
			pageSizes: [5, 10, 15, 20, 30],  //每页显示多少条
			layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
		},
	}
	},
	components:{
		'KindEditor':KindEditor,
	},
    created() {
      this.get_news_list();
    },
    filters:{
      formatType(type){
        if(type===1){
          return '国内新闻';
        }else{
          return '国际新闻';
        }
      },
      formatTime(time){
        if(time==null||time===''){
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
	
	methods: {
		handleResetSearch() {
			this.listQuery = Object.assign({}, defaultListQuery);
		},
		
		handleSearchList() {
			this.listQuery.pageNum = 1;
			this.get_news_list();
		},
     
	  // 每页多少条切换
		handleSizeChange(pageSize) {
			this.paginations.pageSize = pageSize;
			this.get_news_list();
		},
		
		// 上下分页
		handleCurrentChange(page) {
			this.paginations.pageIndex = page;
			setToken("Pagenum_hot",this.paginations.pageIndex)
			this.get_news_list();
		},
	  
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
	  
		handleUpdateStatus(index,row){
			this.$confirm('是否要修改上线/下线状态?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
        }).then(() => {
			updateNewsStatus(row.id,{news_status:row.news_status}).then(response=>{
				this.get_news_list();
					this.$message({
					type: 'success',
					message: '修改成功!'
				});
			});
		}).catch(() => {
				this.$message({
					type: 'success',
					message: '已取消操作!'
				});
				this.get_news_list();
			});
		},
	  
		handleBatchOperate(){
			if (this.multipleSelection < 1) {
				this.$message({
					message: '请选择一条记录',
					type: 'warning',
					duration: 1000
				});
				return;
			}
			let ids = [];
			for (let i = 0; i < this.multipleSelection.length; i++) {
				ids.push(this.multipleSelection[i].id);
			}
			if(this.operateType===0){
			//删除
				this.delete_news_info(ids);
			} else {
			this.$message({
				message: '请选择批量操作类型',
				type: 'warning',
				duration: 1000
			});
			}
		},
		handleAdd(){
			this.addnewsInfo.id=0
			this.addnewsInfo.title='' 
			this.addnewsInfo.content=null 
			this.addnewsInfo.type=null
			this.addnewsInfo.news_status="0" 
			this.addnewsInfo.duration=null
			this.addnewsInfo.dialogVisible = !this.addnewsInfo.dialogVisible
		},
		update_news(index,row){
			//this.$router.push({path: '/settings/updateAdvertise', query: {id: row.id}})
			console.log('update_news row:',row.content)
			this.addnewsInfo.id=row.id 
			this.addnewsInfo.title=row.title 
			//this.addnewsInfo.content=row.content
			this.addnewsInfo.type=row.type
			this.addnewsInfo.news_status=row.news_status 
			this.addnewsInfo.status=row.status 
			this.addnewsInfo.duration=row.duration 
			this.addnewsInfo.rowindex = index
			this.addnewsInfo.dialogVisible = !this.addnewsInfo.dialogVisible
			console.log('update_news info:',this.addnewsInfo)
			setTimeout(() => {
				this.addnewsInfo.content=row.content
			}, 300);
			
		},
	  
		get_news_list() {
			this.listLoading = true;
			this.listQuery.pageNum = this.paginations.pageIndex
			this.listQuery.pageSize = this.paginations.pageSize
			this.listQuery.username = this.username
			this.listQuery.access_token = this.access_token
			this.listQuery.shop_type = this.shop_type
			queryNewsList(this.listQuery).then(response => {
				console.log('get_news_list return:',response);
				this.listLoading = false;
				let news_list = response.result;
				this.total = response.total;
				if(news_list){
					for(let i=0;i<news_list.length;i++){
						let duration = []
						let start_dt = parseInt(news_list[i].start_dt)*1000
						let end_dt = parseInt(news_list[i].end_dt)*1000
						duration.push(moment(start_dt).format())
						duration.push(moment(end_dt).format())
						news_list[i]['duration'] = duration
						news_list[i]['start_dt'] = start_dt
						news_list[i]['end_dt'] = end_dt
						news_list[i]['status'] = news_list[i]['news_status']=="1"?true:false
					}
					this.list = news_list
				}else{
					this.$message({
					type: 'warning',
						message: '暂无新闻'
					})
				}
				
				//console.log('get_news_list return:',res);
			})
			.catch(err=>{
				console.log('get_news_list err:',err)
			});
		},
	  
		delete_news_info(index,row){
			this.$confirm('是否要删除?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
				let para = {
				 	username:this.username,
				 	access_token:this.access_token,
				 	shop_type:this.shop_type,
				 	lang:this.lang,
					id:row.id,
				}
				console.log('delete_news_info para:',para)
				deleteNewsAdvertise(para).then(response=>{
					this.get_news_list();
					this.$message({
					type: 'success',
						message: '删除成功!'
					});
				});
			})
		},
		
		get_news_desc(ctx) {
			this.addnewsInfo.content = ctx ;
			//console.log('Rich Text:',ctx)
		},
		
		add_news_info(){
			this.$confirm(this.$t('commons.news_submit'), '', {
			confirmButtonText: this.$t('commons.confirm'),
			cancelButtonText: this.$t('commons.cancel'),
			type: 'warning'
			}).then(() => {
				let start_dt = parseInt(moment(this.addnewsInfo.duration[0]).unix())
				let end_dt = parseInt(moment(this.addnewsInfo.duration[1]).unix())
				let para = {
				 	username:this.username,
				 	access_token:this.access_token,
				 	shop_type:this.shop_type,
				 	lang:this.lang,
					title:this.addnewsInfo.title,
					content:this.addnewsInfo.content,
					news_status:this.addnewsInfo.status?'1':'0',
					start_dt:start_dt,
					end_dt:end_dt,
					news_type:this.addnewsInfo.type,
					hot_flag:this.addnewsInfo.hot_flag,
					id:this.addnewsInfo.id,
				}
				console.log('add_news_info para:',para)
				addNewsAdvertise(para).then(response=>{
					this.get_news_list();
					this.$message({
					type: 'success',
						message: 'Completed!'
					});
					//更新本地信息
					this.list[this.addnewsInfo.rowindex]['content'] = this.this.addnewsInfo.content
					this.list[this.addnewsInfo.rowindex]['title'] = this.this.addnewsInfo.title
					this.list[this.addnewsInfo.rowindex]['duration'] = this.this.addnewsInfo.duration
					this.list[this.addnewsInfo.rowindex]['news_status'] = this.this.addnewsInfo.news_status
					this.list[this.addnewsInfo.rowindex]['status'] = this.this.addnewsInfo.status
				})
				.catch(err=>{
					console.log('add_news_info err:',err)
				});
			})
		},
		
		//设置表格行的样式
		tableRowStyle({row,rowIndex}){
			return 'background-color:#FFF;font-size:14px;borderColor: #F2F2F2';
		},
		//设置表头行的样式
		tableHeaderColor({row,column,rowIndex,columnIndex}){
			return 'background:#BBBBBB;color:#333;borderColor: #FFFFFF;font-size:16px;' ;
		},		
	}
	}
</script>
<style>
	
  .container{
  		margin: 35px;
  }
  .pagination{
      padding: 10px 20px;
      text-align: right;
  }
  //搜索栏样式
  .filter-container {
  
  }
  
  //操作栏样式
  .operate-container {
    margin-top: 20px;
  }
  
  .operate-container .btn-add {
    float: left;
    margin-bottom: 20px;
  }
  
  //表格栏样式
  .table-container {
    margin-top: 20px;
  }
  
  //批量操作栏样式
  .batch-operate-container {
    display: inline-block;
    margin-top: 20px;
  }
  
  //分页栏样式
  .pagination-container {
    display: inline-block;
    float: right;
    margin-top: 20px;
  }
  
</style>


