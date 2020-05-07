<template>
		<section class="data_section" ref="data_section"> 
			<a>
				<el-row :gutter="10" class="row_list">
					<div style="display: flex;flex-direction: row;justify-content: flex-start;">
						<div style="width: 60%;display: flex;flex-direction: column;justify-content: flex-start;">
							<div class="moreItem" style="width: 99%; z-index:30; display: flex;flex-direction: row;justify-content: flex-end;">
								<a>
									<svg-icon icon-class="more_color" />
								</a>
							</div>
							<div class="row_left row_base" style="width: 100%;margin-top:-28px;">
								<el-col :span="6" v-for="(item_index,index) in main_index" :key="index" style="margin-top:25px;">
									<div :class="item_index.style_class">
										<div class="leftItem cflex wflex">
											<p class="number">{{item_index.value}}</p>
											<p class="investor">{{ $t(`index.${item_index.name}`) }}</p>
										</div>
									</div>
								</el-col>
							</div>
							<div class="moreItem" style="width: 99%; margin-top:20px; z-index:30; display: flex;flex-direction: row;justify-content: flex-end;">
								<div @click="gotoEmallPlatform">
									<svg-icon icon-class="more_color" />
								</div>
							</div>
							<div class="row_left row_base" style="width: 100%;margin-top:-30px;">
								<div style=" display: flex;flex-direction: row;justify-content: center;">
								<el-col :span="4" v-for="(item_emall,index) in emall_list" :key="index" style="margin-top:10px;">
									<div class="pay data_list rflex">
										<div class="logoItem cflex wflex">
											<p class="number">
												<img :src="item_emall.img" class='emallAvatar' alt="" @click="emall_detail(item_emall.name,item_emall.id)">
											</p>
											<p class="investor">{{ $t(`commons.${item_emall.name}`) }}</p>
											<!--
											<p class="emalllogoText">{{item_emall.sub_title}}</p>
											-->
										</div>
									</div>
								</el-col>
								</div>
							</div>
						</div>
						<div class="row_left row_news" style="width: 40%; margin-left:10px;margin-top:-8px;float:right; padding:10px; flex;flex-direction: column;justify-content: flex-start;">
							<div style="display: flex;flex-direction: column;justify-content: flex-start;padding-top: 8px;">
								<el-col :span="8">
									<div class="news-title" style="margin-top: -20px;">{{ $t('commons.globalnews') }}</div>
								</el-col>
								<el-row type="flex" justify="start" class="row-bg" :gutter="1" style="margin-top: 5px;margin-bottom: 10px;">
									<el-col :span="4">
										<div style="text-align: center;">
											<el-button  round type="primary" @click="gotoStrategy">{{ $t('commons.strategy') }}</el-button>
										</div>
									</el-col>
									<el-col :span="4">
										<div style="text-align: center;">
											<el-button  round  type="primary" @click="gotoComment">{{ $t('commons.newscomment') }}</el-button>
										</div>
									</el-col>
								</el-row>
								<news-list :winheight="'220'"></news-list>
							</div>
						</div>
					</div>
				</el-row>
			</a>
			<el-row type="flex" justify="start" class="row-bg" :gutter="10" style="margin-top: -5px;margin-bottom: 10px;">
				<el-col :span="3">
					<div class="news-title" style="margin-top: 0px;">{{ $t('commons.goodshot') }}</div>
				</el-col>
				<el-col :span="2">
					<div :style="'text-align: center;'+latest_goods_selected" class="news-type"  @click="hot_goods_select('1')">{{ $t('commons.latest') }}</div>
				</el-col>
				<el-col :span="2">
					<div :style="'text-align: center;'+hot_goods_selected" class="news-type"  @click="hot_goods_select('2')">{{ $t('commons.hot') }}</div>
				</el-col>
			</el-row>
			<div style="">
				<el-row :gutter="15" class="row_list">
					<el-col :span="4" v-for="(item_hot,index) in goods_list" :key="index">
						<div class="goods-hot rflex">
							<div class="cflex wflex">
								<div style="display: flex;flex-direction: row;justify-content: center;" @click="goods_detail(index)">
									<img :src="item_hot.img" class='goods-hot-img' alt="" >
								</div>
								
								<div style="text-align: left;">
									<p class="goods-hot-title">{{item_hot.name}}</p>
									<p class="goods-hot-sub-title">{{item_hot.sell_price}}</p>
								</div>
								<div style="display: flex;flex-direction: row;justify-content: space-between;">
									<p class="goods-hot-title">{{ item_hot.category }}</p>
									<p class="goods-hot-sub-title">{{item_hot.attr}}</p>
								</div>
								<div style="text-align: left;">
									<p class="goods-hot-title">{{ item_hot.info_from }}</p>
								</div>
								<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="space-around" style="height:30px;line-height: 30px; background-color: #D9D9D9;box-shadow:0 0 1px #000 inset;;">
									<el-col :span="10" style="text-align: center;"  >
										<span style="font-size: 12px;" @click="add_mywarehouse(index)">{{ $t('commons.addhotgoods') }}</span>
									</el-col>
									<el-col :span="10" style="text-align: center;">
										<span style="font-size: 12px;" @click="gotoMaterialUrl(index)">{{ $t('commons.linkorg') }}</span>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>	
				</el-row>
			</div>
			
			<el-row v-if="paginations">
			     <el-col :span="24">
			         <div class="pagination">
			             <el-pagination
			                 v-if='paginations.total > 0'
			                 :page-sizes="paginations.pageSizes"
			                 :page-size="paginations.pageSize"
			                 :layout="paginations.layout"
			                 :total="paginations.total"
			                 :current-page='paginations.pageIndex'
			                 @current-change='handleCurrentChange'
			                 @size-change='handleSizeChange'>
			             </el-pagination>
			         </div>
			     </el-col>
			 </el-row>
		</section>
</template>

<script>
	/*
	import echarts from 'echarts'
	import salesTable from "./components/salesTable";  // 销售数据表格
	import commentList from "./components/commentList";  // 用户评论列表
	import cardList from "./components/cardList";  // card列表
	import logList from "./components/logList";  // 日志列表
	import barChart from 'cps/echarts/barChart' // 用户投资类型 柱状图
	import pieChart from 'cps/echarts/pieChart' // 用户投资类型 饼状图
	import radarChart from 'cps/echarts/radarChart' // 用户投资类型 雷达图
	import lineChart from 'cps/echarts/lineChart' // 用户投资类型 折线图
	*/
    import {
		getEmallList,
		getGoodsList,
		getEmallIndex,
		getNewsList,
		addMyWarehouse,
    } from "@/api/user";
	import newsList from "./components/newsList";  // 新闻列表
	import { 
		github 
	} from "@/utils/env";
	import {
		setToken,
		getToken,
		removeToken,
	} from '@/utils/auth';
	import {
		shop_type
	} from "@/utils/env";
	
	import amazonlogoImg from "@/assets/img/amazon-logo.jpg";
	import taobaologoImg from "@/assets/img/taobao-logo.jpg";
	import wishlogoImg from "@/assets/img/wish-logo.jpg";
	import pingduoduologoImg from "@/assets/img/pingduoduo-logo.jpg";
	import shopeelogoImg from "@/assets/img/shopee-logo.png";
	import ebaylogoImg from "@/assets/img/ebay-logo.png";
	import tianmaologoImg from "@/assets/img/tianmao-logo.jpg";
	
    export default {
		data(){
		return {
			shop_type:shop_type?shop_type:10,
			lang:getToken('lang')||'zh',
			access_token:getToken('Token')||'zh',
			username:getToken('Username')||'',
			scrollTop:0,
			github:github,
			amazonlogoImg:amazonlogoImg,
			taobaologoImg:taobaologoImg,
			wishlogoImg:wishlogoImg,
			pingduoduologoImg:pingduoduologoImg,
			shopeelogoImg:shopeelogoImg,
			ebaylogoImg:ebaylogoImg,
			tianmaologoImg:tianmaologoImg,
			latest_goods_selected:'background-color:#BBBBBB;color:#FFFFFF;',
			hot_goods_selected:'',
			news_page:1,
			news_pagesize:10,
			loading:true,
			
			goods_list:null,
			main_index:null,
			emall_list:null,
			//需要给分页组件传的信息
			paginations:
			{
				total: 0,        // 总数
				pageIndex: 1,  // 当前位于哪页
				pageSize: 20,   // 1页显示多少条
				pageSizes: [5, 10, 15, 20],  //每页显示多少条
				layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
			}
		}
		},
		components: {
		/*
		salesTable,
		commentList,
		cardList,
		logList
		barChart,
		pieChart,
		radarChart,
		lineChart
		*/
		newsList,
		
		},	
		created(){
			//this.goods_list = this.latest_goods_list;
			//console.log('index created paginations:',getToken('Paginations'));
			this.get_emall_list() ;
			this.get_emall_index() ;
			this.get_goods_list() ;
		},
		mounted(){
			//this.changeLocale('zh');
		},
		methods: {
			gotoComment(){
				var emall_name = 'emallplatform_1' ;
				var emall_id = '1' ;
				var type = 'comment' ;
				//this.$router.push({path:'/emallplatform_detail',query:{emall_name:emall_name,emall_id:emall_id,type:type}});
				let routeUrl = this.$router.resolve({
				    path: "/emallplatform_detail",
				    query: {
						emall_name:emall_name,
						emall_id:emall_id,
						type:type,
					}
				  });
				 window.open(routeUrl.href, '_self'); //_self _blank
			},
			gotoStrategy(){
				var emall_name = 'emallplatform_1' ;
				var emall_id = '1' ;
				var type = 'strategy' ;
				//this.$router.push({path:'/emallplatform_detail',query:{emall_name:emall_name,emall_id:emall_id,type:type}});
				let routeUrl = this.$router.resolve({
				    path: "/emallplatform_detail",
				    query: {
						emall_name:emall_name,
						emall_id:emall_id,
						type:type,
					}
				  });
				  window.open(routeUrl.href, '_self'); //_self _blank
			},
			gotoEmallPlatform(){
				this.$router.push('/emallplatform/emallplatform');
			},
			gotoMaterialUrl(goods_index=0){
				let url = this.goods_list[goods_index].materialUrl
				window.open(url, '_blank');
			},
			
			hot_goods_select(selected='') {
				if(selected!=''){
					this.paginations.pageIndex = 1
				}
				
				if(selected =='1'){
					this.latest_goods_selected = 'background-color:#BBBBBB;color:#FFFFFF;';
					this.hot_goods_selected = ''
					//this.goods_list = this.latest_goods_list;
					this.get_goods_list(1)
				}else if(selected =='2'){
					this.hot_goods_selected = 'background-color:#BBBBBB;color:#FFFFFF;';
					this.latest_goods_selected = '' ;
					//this.goods_list = this.hot_goods_list;
					this.get_goods_list(2)
				}
			},
			emall_detail(emall_name='',emall_id='1',type=''){
				//this.$router.push({path:'/emallplatform/emallplatform_detail',query:{emall_name:emall_name,emall_id:emall_id}});
				//this.$router.push({path:'/emallplatform_detail',query:{emall_name:emall_name,emall_id:emall_id}});
				let routeUrl = this.$router.resolve({
				    path: "/emallplatform_detail",
				    query: {
						emall_name:emall_name,
						emall_id:emall_id,
						type:type,
					}
				  });
				 window.open(routeUrl.href, '_self'); //_self _blank
			},
			goods_detail(goods_index=0){
				//this.$router.push({path:'/myhot/goodsedit',query:{goods_name:goods_name,goods_id:goods_id,goods_from:goods_from}});
				let goods_para = JSON.stringify(this.goods_list[goods_index])
				let routeUrl = this.$router.resolve({
				    path: "/goodsedit",
				    query: {
						goods_para:goods_para,
					}
				  });
				console.log('goods_detail goods_para:',goods_para)
				window.open(routeUrl.href, '_self'); //_self _blank
			},
			
			get_emall_list(){
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
				}
				console.log('addMyWarehouse para:',para);
				getEmallList(para).then(res => {
					/*
					this.$message({
				     message: 'Completed!',
				     type: 'success',
				     duration: 1000
				   });
				   */
				   this.emall_list = res 
				   //console.log('get_emall_list return:',res);
				})
				.catch(err=>{
					console.log('get_emall_list err:',err)
				});
			},
			
			get_emall_index(){
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
				}
				console.log('addMyWarehouse para:',para);
				getEmallIndex(para).then(res => {
					/*
					this.$message({
				     message: 'Completed!',
				     type: 'success',
				     duration: 1000
				   });
				   */
				   this.main_index = res 
				   console.log('get_emall_index return:',res);
				})
				.catch(err=>{
					console.log('get_emall_index err:',err)
				});
			},
			
			add_mywarehouse(goods_index=0){
				let para = {
					username:this.username,
					access_token:this.access_token,
				    goods_id:this.goods_list[goods_index]['id'],
					shop_type:this.shop_type,
					lang:this.lang,
				}
				console.log('add_mywarehouse para:',para);
				addMyWarehouse(para).then(res => {
					this.$message({
				     message: 'Completed!',
				     type: 'success',
				     duration: 1000
				   });
				   console.log('add_mywarehouse return:',res);
				})
				.catch(err=>{
					console.log('add_mywarehouse err:',err)
				});
			},
			get_goods_list(type=0){
				if(type==0){
					let pagenum = getToken('Pagenum')
					this.paginations.pageIndex = pagenum?parseInt(pagenum):this.paginations.pageIndex
				}	
			    let para = {
					username:this.username,
					access_token:this.access_token,
			        pagesize:this.paginations.pageSize,
			        page:this.paginations.pageIndex,
					shop_type:this.shop_type,
					lang:this.lang,
					type:type, //1:最新爆款 2:热门爆款
				} 
				 
			    getGoodsList(para).then(res => {
			        this.loading = false;
					this.goods_list = []
					for(var i=0;i<res.result.length;i++){
						this.goods_list.push(res.result[i])
					} 
					
			        this.paginations.total = res.total;
					setToken("Pagenum",this.paginations.pageIndex)
					console.log('getGoodsList result:',this.goods_list)
			    })
				.catch(err=>{
					console.log('getGoodsList err:',err)
				});
			},
			// 每页多少条切换
			handleSizeChange(pageSize) {
			   this.paginations.pageSize = pageSize;
			   this.get_goods_list();
			},
			// 上下分页
			handleCurrentChange(page) {
			   this.paginations.pageIndex = page;
			   setToken("Pagenum",this.paginations.pageIndex)
			   this.get_goods_list();
			},
		}
	}
</script>

<style lang="less" scoped>
	.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 150px;
			}
			.row_news{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 312px;
			}
		}
		 
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:60px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
			.moreItem{
				width:60px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.svg-icon{
					font-size: 30px;
				}
			}
			.number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
					margin-left: 5px;
				}
			}
			.logoItem{
				align-items: center;
				justify-content: space-between;
				text-align: left;
				color:#333;
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
		.emallAvatar{
			width: 50px;
			height: 50px;
			border-radius: 50%;
			vertical-align: middle;
			display: inline-block;
		}
		.emalllogoText{
			font-size: 12px;
			padding: 2px;
			color:#666;
			background-color: #f2f2f2;
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
		.goods-hot{
			background-color: #fff;
			color:#333;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			margin-top: 10px;
			.goods-hot-info{
				align-items: left;
			}
			.goods-hot-img{
				width: 100%;
				height: 225px;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
			}
			.goods-hot-title{
				font-size: 12px;
				height: 40px;
				line-height: 20px;
				padding: 2px;
				color:#666;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.goods-hot-sub-title{
				font-size: 12px;
				padding: 2px;
				color:#666;
				
			}
			.goods-hot-attr{
				font-size: 12px;
				padding: 2px;
				color:#666;
			}
			.goods-hot-from{
				font-size: 12px;
				padding: 2px;
				color:#666;
			}
			.goods-hot-price{
				font-size: 12px;
				padding: 2px;
				color:#DD6161;
			}
			.el-row-two {
				margin-bottom: 0px;
				margin-top: 10px;
				background-color: #FDF6EC;
			}
			.grid-content {
				background-color: rgb(44, 143, 121);
				border-radius: 4px;
				height: 20px;
			}
		}
		
	}
  
</style>
