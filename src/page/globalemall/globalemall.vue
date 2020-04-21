<template>
	<div class="container">
		<div style="margin-bottom: 50px;padding: 5px;display: flex;flex-direction: row;justify-content: flex-start;">
			 <div style="height:100%;width:75%;">
				 <el-carousel  indicator-position="inside" :height="bannerHeight+'px'" trigger="click">
				 	<el-carousel-item v-for="(item_banner,index) in banner_url" :key="index">
						<div style="display:flex;flex-direction: row; justify-content:center;">
							<img ref="banner_image" class="bannerImg" :src="item_banner.url" alt="轮播图" @load="imgSet" />
						</div>
				 	</el-carousel-item>
				 </el-carousel>
			</div>
		
			<div style="height:100%;width:25%;margin-left:10px;">
				<el-row :gutter="10" type="flex" class="row-bg" justify="center">
					<el-col :span="12">
						<img ref="subbanner_image" class="subbannerImg" :src="sub_banner_url[0].url" />
					</el-col>
					<el-col :span="12">
						<img ref="subbanner_image" class="subbannerImg" :src="sub_banner_url[1].url" />
					</el-col>
				</el-row>
				<br>
				<el-row :gutter="10" type="flex" class="row-bg" justify="center" style="margin-top: -15px;">
					<el-col :span="12">
						<img ref="subbanner_image" class="subbannerImg" :src="sub_banner_url[2].url" />
					</el-col>
					<el-col :span="12">
						<img ref="subbanner_image" class="subbannerImg" :src="sub_banner_url[3].url" />
					</el-col>
				</el-row>
			</div>
		</div>
		<div style="display: flex;flex-direction: row;justify-content: flex-start;">
			<div style="width: 15%;">
				<div style="display: flex;flex-direction: column;justify-content: center;">
					<el-row :gutter="1" class="row_list">
					<el-col :span="18" v-for="(item_region,index) in emall_region" :key="index" style="text-align: center; margin-bottom: 1px;font-size: 18px;">
						<div :style="item_region.style_class" @click="region_select(index)">{{ $t(`commons.${item_region.name}`) }}</div>
					</el-col>
					</el-row>
				</div>
			</div>
			<div style="width: 85%;margin-left: 20px;">
				<div class="row_left row_base" style="width: 100%;margin-top:-28px;">
					<el-row :gutter="5" class="row_list">
						<el-col :span="3" v-for="(item_emall,index) in emall_index" :key="index">
							<div :style="item_emall.style_class" @click="emall_index_select(index)">{{ $t(`index.${item_emall.name}`) }}</div>
						</el-col>
					</el-row>
				</div>
			<el-row :gutter="15" class="row_list">
				<el-col :span="7" v-for="(item_hot,index) in emall_list" :key="index">
					<div class="goods-hot rflex">
						<div class="cflex wflex">
							<div style="display: flex;flex-direction: row;justify-content: flex-start;">
								<div style="display: flex;flex-direction: row;justify-content: center;">
									<img :src="item_hot.img" class='goods-hot-img' alt="" @click="emall_detail(item_hot.name)">
								</div>
								<div style="display: flex;flex-direction: column;justify-content: flex-start;">
									<div style="text-align: left;">
										<p class="goods-hot-title">{{$t(`commons.${item_hot.name}`)}}</p>
										<p class="goods-hot-title">{{item_hot.sub_title}}</p>
										
									</div>
									<div style="display: flex;flex-direction: row;justify-content: space-between;">
										<p class="goods-hot-title">{{ item_hot.score!=''?'评分:'+item_hot.score:'' }}</p>
										<p class="goods-hot-sub-title">{{item_hot.strategy!=''?'攻略:'+item_hot.strategy:''}}</p>
									</div>
									<div style="display: flex;flex-direction: row;justify-content: space-between;text-align: left;">
										<p class="goods-hot-title">{{ item_hot.comment!=''?'评论:'+item_hot.comment:'' }}</p>
										<p class="goods-hot-sub-title">{{item_hot.status=='1'?'已入驻':''}}</p>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</el-col>	
			</el-row>
			</div>
		</div>
		<el-row>
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
	</div>
</template>

<script>
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
	import amazonlogoImg from "@/assets/img/amazon-logo.jpg";
	import taobaologoImg from "@/assets/img/taobao-logo.jpg";
	import wishlogoImg from "@/assets/img/wish-logo.jpg";
	import pingduoduologoImg from "@/assets/img/pingduoduo-logo.jpg";
	import shopeelogoImg from "@/assets/img/shopee-logo.png";
	import ebaylogoImg from "@/assets/img/ebay-logo.png";
	import tianmaologoImg from "@/assets/img/tianmao-logo.jpg";
	import flipkartlogoImg from "@/assets/img/flipkart-logo.jpg";
	import jingdonglogoImg from "@/assets/img/jingdong-logo.jpg";
	import rakutenlogoImg from "@/assets/img/rakuten-logo.jpg";
	
    export default {
        data(){
            return {
				shop_type:shop_type?shop_type:2,
				lang:getToken('lang')||'zh',
				index_selected:0,
				region_selected:0,
				banner_url:[
					{
						url:'https://img.alicdn.com/tfs/TB12c.KAkT2gK0jSZFkXXcIQFXa-768-420.jpg',
						title:'家电返场',
					},
					{
						url:'https://img.alicdn.com/tfs/TB1lCjJzUY1gK0jSZFCXXcwqXXa-768-420.png',
						title:'',
					},
					{
						url:'https://img.alicdn.com/tfs/TB115q2wxD1gK0jSZFKXXcJrVXa-768-420.jpg',
						title:'',
					},
					{
						url:'https://img.alicdn.com/tfs/TB1EZzXxpP7gK0jSZFjXXc5aXXa-768-420.jpg',
						title:'',
					},
					{
						url:'https://img.alicdn.com/tfs/TB115q2wxD1gK0jSZFKXXcJrVXa-768-420.jpg',
						title:'',
					},
					
				],
				sub_banner_url:[
					{
						url:'https://img1.utuku.china.com/640x0/news/20200401/052c10e5-abb7-47e3-888f-5c61984b12e5.jpg',
						title:'义乌国际商贸城4819',
					},
					{
						url:'https://08imgmini.eastday.com/mobile/20200402/20200402113240_efaa3ca644ee814be6885b619b02a814_4_mwpm_03200403.jpg',
						title:'中国宝石城',
					},
					{
						url:'https://aecpm.alicdn.com/simba/img/TB1bL69LFXXXXcFXXXXSutbFXXX.jpg',
						title:'珠宝交易市场',
					},
					{
						url:'https://d.vpimg1.com/upcb/2020/03/11/54/ias_158390975517836_570x273_90.jpg',
						title:'',
					},
				],
				
                emall_index:[
					{
						name:'emall_index_general',
						title:'综合',
						style_class:'font-size:16px;background-color:#BBBBBB;color:#FFFFFF;',
						icon:''
					},
					{
						name:'emall_index_pv',
						title:'按流量',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_index_orderspeed',
						title:'按出单速度',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_index_cost',
						title:'按经营成本',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_index_profit',
						title:'按利润率',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					}
                ],
				emall_region:[
					{
						name:'emall_region_joined',
						title:'我已入驻',
						style_class:'font-size:16px;background-color:#FFFFFF;color:#666;margin-bottom:10px;',
						icon:''
					},
					{
						name:'emall_region_china',
						title:'中国',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_region_northamerica',
						title:'北美',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_region_european',
						title:'欧洲',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_region_southeastasia',
						title:'东南亚',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_region_southasia',
						title:'南亚',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_region_middleeastasia',
						title:'中东',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_region_africa',
						title:'非洲',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					
				],
				emall_list:[],
				emall_china_list:[
					{
						id:'2',
						name:'emallplatform_2',
						title:'淘宝',
						sub_title:'中国深受欢迎的网购零售平台,亚太地区较大的网络零售、商圈',
						img:taobaologoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'3',
						name:'emallplatform_3',
						title:'天猫',
						sub_title:'中国零售百强之首,综合性购物网站',
						img:tianmaologoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'7',
						name:'emallplatform_7',
						title:'拼多多',
						sub_title:'中国主流的手机购物APP，2019福布斯中国最具创新力企业',
						img:pingduoduologoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'9',
						name:'emallplatform_9',
						title:'京东',
						sub_title:'全球最具价值500大品牌，中国自营式电商企业',
						img:jingdonglogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					
				],
				emall_asia_list:[
					{
						id:'4',
						name:'emallplatform_4',
						title:'WISH',
						sub_title:'全球27个国家的购物类APP中排名第一',
						img:wishlogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'6',
						name:'emallplatform_6',
						title:'虾皮',
						sub_title:'东南亚及中国台湾地区发展最快的的电商,全球C2C购物类App中下载量排名第一',
						img:shopeelogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'8',
						name:'emallplatform_8',
						title:'FlipKart',
						sub_title:'印度最大电子商务零售商',
						img:flipkartlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'10',
						name:'emallplatform_10',
						title:'乐天',
						sub_title:'日本最大电子商店街，福布斯全球数字经济100强',
						img:rakutenlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
				],
				emall_joined_list:[
					{
						id:'1',
						name:'emallplatform_1',
						title:'亚马逊',
						sub_title:'美国最大的一家网络电子商务公司',
						img:amazonlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'2',
						name:'emallplatform_2',
						title:'淘宝',
						sub_title:'中国深受欢迎的网购零售平台,亚太地区较大的网络零售、商圈',
						img:taobaologoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					 
					 
					{
						id:'5',
						name:'emallplatform_5',
						title:'易贝',
						sub_title:'可让全球民众上网买卖物品的线上拍卖及购物网站',
						img:ebaylogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					 
					{
						id:'8',
						name:'emallplatform_8',
						title:'FlipKart',
						sub_title:'印度最大电子商务零售商',
						img:flipkartlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					 
					{
						id:'10',
						name:'emallplatform_10',
						title:'乐天',
						sub_title:'日本最大电子商店街，福布斯全球数字经济100强',
						img:rakutenlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					
				],
				emall_all_list:[
					{
						id:'1',
						name:'emallplatform_1',
						title:'亚马逊',
						sub_title:'美国最大的一家网络电子商务公司',
						img:amazonlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'2',
						name:'emallplatform_2',
						title:'淘宝',
						sub_title:'中国深受欢迎的网购零售平台,亚太地区较大的网络零售、商圈',
						img:taobaologoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'3',
						name:'emallplatform_3',
						title:'天猫',
						sub_title:'中国零售百强之首,综合性购物网站',
						img:tianmaologoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'4',
						name:'emallplatform_4',
						title:'WISH',
						sub_title:'全球27个国家的购物类APP中排名第一',
						img:wishlogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'5',
						name:'emallplatform_5',
						title:'易贝',
						sub_title:'可让全球民众上网买卖物品的线上拍卖及购物网站',
						img:ebaylogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'6',
						name:'emallplatform_6',
						title:'虾皮',
						sub_title:'东南亚及中国台湾地区发展最快的的电商,全球C2C购物类App中下载量排名第一',
						img:shopeelogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'7',
						name:'emallplatform_7',
						title:'拼多多',
						sub_title:'中国主流的手机购物APP，2019福布斯中国最具创新力企业',
						img:pingduoduologoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'8',
						name:'emallplatform_8',
						title:'FlipKart',
						sub_title:'印度最大电子商务零售商',
						img:flipkartlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'9',
						name:'emallplatform_9',
						title:'京东',
						sub_title:'全球最具价值500大品牌，中国自营式电商企业',
						img:jingdonglogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
					{
						id:'10',
						name:'emallplatform_10',
						title:'乐天',
						sub_title:'日本最大电子商店街，福布斯全球数字经济100强',
						img:rakutenlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						type:'',
						strategy:'2300',
						comment:'1688',
						desc:'',
					},
				],
                loading:true,
              //需要给分页组件传的信息
                paginations: {
                    total: 0,        // 总数
                    pageIndex: 1,  // 当前位于哪页
                    pageSize: 20,   // 1页显示多少条
                    pageSizes: [5, 10, 15, 20],  //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
                },
				bannerHeight:'',
				amazonlogoImg:amazonlogoImg,
				taobaologoImg:taobaologoImg,
				wishlogoImg:wishlogoImg,
				pingduoduologoImg:pingduoduologoImg,
				shopeelogoImg:shopeelogoImg,
				ebaylogoImg:ebaylogoImg,
				tianmaologoImg:tianmaologoImg,
				flipkartlogoImg:flipkartlogoImg,
				jingdonglogoImg:jingdonglogoImg,
				rakutenlogoImg:rakutenlogoImg,
            }
        },
        created(){
			this.emall_list = this.emall_all_list ;
			//this.bigdata_hot_list = this.latest_hot_list ;
        },
        mounted(){
            this.getUserList();
			window.addEventListener("resize", () => {
				if(this.$refs.banner_image.length>0){
					console.log(this.$refs.banner_image)
					this.bannerHeight = this.$refs.banner_image[0].height;
					this.imgSet();
				}
			},false);
        },
        methods: {
			imgSet() {
				this.$nextTick(()=>{
					if(this.$refs.banner_image.length>0){
						console.log(this.$refs.banner_image)
						this.bannerHeight = this.$refs.banner_image[0].height;
						//this.bannerHeight = this.$refs.banner_image[0].img.bannerImg.height;
					}
				})
			},
			emall_detail(emall_name='',emall_id='1'){
			  //this.$router.push({path:'/emallplatform/emallplatform_detail',query:{emall_name:emall_name,emall_id:emall_id}});
			  //this.$router.push({path:'/emallplatform_detail',query:{emall_name:emall_name,emall_id:emall_id}});
			   let routeUrl = this.$router.resolve({
			       path: "/emallplatform_detail",
			       query: {
					   emall_name:emall_name,
					   emall_id:emall_id,
					}
			     });
			     window.open(routeUrl.href, '_self'); //_blank _self
			},
            getUserList(){
                let para = {
                    pagesize:this.paginations.pageSize,
                    page:this.paginations.pageIndex,
					shop_type:this.shop_type,
					lang:this.lang,
                }
				
				//let.seller=Object.assign({},this.seller,new.data)
                getBizPara(para).then(res => {
                    this.loading = false;
					console.log('getBizPara return:',res);
                    this.paginations.total = parseInt(res.total);
                    //this.tableData = res.userList;
                })
				.catch(err=>{
					console.log('getBizPara err:',err)
				});
            },
            // 每页多少条切换
            handleSizeChange(pageSize) {
               this.paginations.pageSize = pageSize;
               this.getUserList();
            },
            // 上下分页
            handleCurrentChange(page) {
               this.paginations.pageIndex = page;
               this.getUserList();
            },
			emall_index_select(selected=0) {
				var k = parseInt(selected) ;
				var index_selected = this.index_selected
				this.emall_index[selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
				
				if(selected!=this.index_selected){
					this.emall_index[this.index_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				}
				this.index_selected = selected ;
				if(k%2>0){
					this.emall_list = this.emall_joined_list
				}else{
					this.emall_list = this.emall_china_list
				}
				this.emall_region[this.region_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
			},
			region_select(selected=0) {
				var k = parseInt(selected) ;
				var region_selected = this.region_selected
				this.emall_region[selected]['style_class'] = selected==0?'background-color:#BBBBBB;color:#FFFFFF;margin-bottom:10px;':'background-color:#BBBBBB;color:#FFFFFF;';
				if(selected!=this.region_selected){
					this.emall_region[region_selected]['style_class'] = region_selected==0?'background-color:#FFFFFF;color:#666;margin-bottom:10px;':'background-color:#FFFFFF;color:#666';
				}
				
				this.region_selected = selected ;
				if(k%3==1){
					this.emall_list = this.emall_joined_list
				}else if(k%3==2){
					this.emall_list = this.emall_asia_list
				}else{
					this.emall_list = this.emall_china_list
				}
			}
        },
    }
</script>

<style lang="less" scoped>
    .container{
		margin: 10px;
	}
   .pagination{
       padding: 10px 20px;
       text-align: right;
   }
   
	.bannerImg{
		width: 100%;
		object-fit: fill;
		max-height: 310px;
		height: 100%;
		/*
		border-radius: 20px;
		*/
	}
	.subbannerImg{
		width: 100%;
		height:100%;
		min-height: 150px;
		object-fit: fill;
	}
   .row_list{
		margin-bottom: 20px;
		text-align: center;
		font-size: 16px;
		.row_base{
			padding: 10px;
			box-sizing: border-box;
			height: 60px;
			line-height: 60px;
			border-radius: 6px;
			background: #FFFFFF;
		}
   }
   .goods-hot{
		background-color: #fff;
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		.goods-hot-info{
			align-items: left;
		}
		.goods-hot-img{
			width: 100%;
			min-width: 110px;
			max-width: 150px;
			height: 120px;
			padding: 5px;
			border-radius: 10px;
		}
		.goods-hot-title{
			font-size: 12px;
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
	}
	
</style>



