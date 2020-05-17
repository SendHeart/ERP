<template>
<div>
	<div :style="'height:'+win_height+'px;max-height:'+win_height+'px;'" class="newsContainer" >
		<div class="newsArea el-scrollbar">
			<div class="news-list" v-for="(item_news,index) in news_list" :key="index">
				<div class="news-item" @click="news_detail(0,item_news)">
					<div v-if="item_news.hot_no" class="news-content-hotno" style="text-align: center;">
						{{item_news.hot_no}}
					</div>
					<div class="news-content" :class="item_news.hot_no?'':'news-indent'" style="text-align: start;">{{item_news.title}}</div>
					<div class="news-content-time" style="text-align: start;">{{item_news.time}}</div>
				</div>
			</div>
			<div style="display: flex;flex-direction: row;justify-content: center;">
				<el-button  round type="primary" @click="getNewsMore">{{ $t('commons.more') }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</div>
		</div>
	</div>
	<el-dialog :title="$t('commons.globalnews')" :visible.sync="setDialogVisible" width="40%">
		<div class="ql-editor" v-html="setDialogData.news_content" style="white-space: pre-wrap;"></div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="setDialogVisible = false" size="small">取 消</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
	import { github } from "@/utils/env";
	import {
		getNewsList,
	} from "@/api/user";
	import {
		getBizPara,
	} from "@/api/user";
	import {
		shop_type,
	} from "@/utils/env";
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
  export default {
    name:'newsList',
    data() {
      return {
		shop_type:shop_type?shop_type:10,
		lang:getToken('lang')||'zh',
		access_token:getToken('Token')||'zh',
		username:getToken('Username')||'',
		setDialogVisible:false,
		setDialogData:{news_content:'',news_title:'',news_time:''},
		win_height:'225',
		news_page:1,
		news_total:10,
		news_pagesize:10,
		news_list:[],
        news_init_list:[
			{
				hot_no:'1',
				content:'2020CCEE(深圳)跨境电商选品大会暨采购节火热报名中',
				title:'国内要闻',
				time:'13:50',
				style_class:''
			},
			{
				hot_no:'2',
				content:'Lazada菲力宾站推迟327大促，马来西亚海外仓暂停覆盖新加坡',
				title:'国际要闻',
				time:'13:50',
				style_class:''
			},
			{
				hot_no:'3',
				content:'2020年新手卖家如何在Wish平台上销售？先Get这5个点',
				title:'国际要闻',
				time:'2020-01-14',
				style_class:''
			},
			{
				hot_no:'',
				content:'呼吸机缺口上万，纽约采购3000个手动复苏面罩 ',
				title:'国内要闻',
				time:'2020-03-30',
				style_class:''
			},
			{
				hot_no:'',
				content:'加大宏观政策对冲力度应对疫情冲击 聚焦安全返程复工 ',
				title:'国要闻',
				time:'2020-03-30',
				style_class:''
			},
			{
				hot_no:'',
				content:'媒体报道指某外卖平台依靠它在外卖市场的垄断性优势，迫使商家降低价格、增加优... ',
				title:'国内要闻',
				time:'2020-03-29',
				style_class:''
			},
			
			{
				hot_no:'',
				content:'3月以来生活必需品价格全面回落 ',
				title:'国要闻',
				time:'2020-03-28',
				style_class:''
			},
			{
				hot_no:'',
				content:'超过15kg拒收？仓库大火！拿什么拯救你，我的亚马逊...... ',
				title:'国际要闻',
				time:'2020-02-13',
				style_class:''
			},
			{
				hot_no:'',
				content:'又能查竞品，又能保护品牌，亚马逊产品ASIN码居然这么神奇？ ',
				title:'国际要闻',
				time:'2020-01-12',
				style_class:''
			}
        ],
        github:github
      };
    },
	created(){
		
	},
	mounted(){
		this.win_height = this.winheight?this.winheight:this.win_height;
		if(this.newslist.length>0){
			for(var i=0;i<this.newslist.length;i++){
				this.news_list.push(this.newslist[i])
			}
		}else{
			this.getNewsMore()
		}
		console.log('new list:',this.news_list) ;
	},
	props:{
			winheight: { // 当前窗口高度
				type: String,
				default(){
					return '225' ;
				}
			},
			newslist: { // 数据列表
				type: Array,
				default(){
					return [] ;
				}
			},
	},
	components: {
		getNewsList,
	},	
	methods: {
		news_detail(type=0,para={}){
			this.setDialogVisible = !this.setDialogVisible;
			console.log('news_detail type:',type,' para:',para)
			this.setDialogData.news_content = para.content
			this.setDialogData.news_time = para.time
		},
		getNewsMore(){
		    const para = {
		    	username:this.username,
				access_token:this.access_token,
				page:this.news_page,
				pagesize:this.news_pagesize,
		    	news_type:'',
		    	shop_type:'2',
				lang:'zh',
		    }
			var newsList_init = [
				{
					hot_no:'',
					content:'3月以来生活必需品价格全面回落 ',
					title:'国要闻',
					time:'2020-03-28',
					style_class:''
				},
				{
					hot_no:'',
					content:'超过15kg拒收？仓库大火！拿什么拯救你，我的亚马逊...... ',
					title:'国际要闻',
					time:'2020-02-13',
					style_class:''
				},
				{
					hot_no:'',
					content:'又能查竞品，又能保护品牌，亚马逊产品ASIN码居然这么神奇？ ',
					title:'国际要闻',
					time:'2020-01-12',
					style_class:''
				},
			]
			
			
			getNewsList(para).then(res => {
				/*
				this.$message({
					message: '获取新闻完成',
					type: 'success'
				})
				*/
			   let newsList = res.result
			   let total = res.total
				if(newsList.length>0){
					for(var i=0;i<newsList.length;i++){
						this.news_list.push(newsList[i])
					}
				}
				console.log('getNewsList:',newsList) ;
			})
		},
	}
	
}
</script>

<style lang="less" scoped>
.newsContainer{
    padding: 1px;
    overflow: hidden;
	.newsArea{
		overflow: auto;
		height: 100%;
	}
	.news-indent{
		text-indent:10px ;
	}
	.news-list{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.news-item{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.news-title{
		font-size: 16px;
		font-weight:bolder ;
		padding: 2px;
		color:#333;
	}
	.news-type{
		font-size: 14px;
		font-weight:normal ;
		border-radius: 10px;
		padding: 5px;
		color:#666;
		background-color: #f2f2f2;
	}
	.news-content{
		font-size: 14px;
		font-weight:normal ;
		width: 80%;
		padding: 5px;
		color:#666;
	}
	.news-content-time{
		font-size: 12px;
		font-weight:normal ;
		width: 15%;
		padding: 5px;
		color:#666;
	}
	.news-content-hotno{
		font-size: 12px;
		margin-top: 5px;
		width: 15px;
		height: 15px;
		line-height: 15px;
		font-weight:normal ;
		text-align: center;
		border-radius: 50%;
		padding: 2px;
		color:#fff;
		background-color: #F56C6C;
	}
}
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>