<template>
	<div class="container">
		<div class="row_left row_base" style="width: 100%;margin-top:-28px;">
			<el-row :gutter="5" class="row_list">
				<el-col :span="3" v-for="(item_emall,index) in emall_provider" :key="index">
					<div :style="item_emall.style_class" @click="emall_select(index)">{{ $t(`commons.${item_emall.name}`) }}</div>
				</el-col>
			</el-row>
		</div>
		<div style="display: flex;flex-direction: row;justify-content: flex-start;">
			<div style="width: 15%;">
				<div style="display: flex;flex-direction: column;justify-content: center;">
					<el-row :gutter="1" class="row_list">
					<el-col :span="16" v-for="(item_category,index) in goods_category" :key="index" style="text-align: left; margin-bottom: 1px;font-size: 18px;">
						<div :style="item_category.style_class" @click="category_select(index)">{{ item_category.title }}</div>
					</el-col>
					</el-row>
				</div>
			</div>
			<div style="width: 85%;margin-left: 20px;">
			<el-row :gutter="15" class="row_list">
				<el-col :span="5" v-for="(item_hot,index) in bigdata_hot_list" :key="index">
					<div class="goods-hot rflex"  >
						<div class="cflex wflex">
							<div style="display: flex;flex-direction: row;justify-content: center;" @click="goods_detail(index)">
								<img :src="item_hot.img" class='goods-hot-img' >
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
								<el-col :span="10" style="text-align: center;">
									<span style="font-size: 12px;"  @click="add_mywarehouse(index)">{{ $t('commons.addhotgoods') }}</span>
								</el-col>
								<el-col :span="10" style="text-align: center;">
									<span style="font-size: 12px;" @click="goto_materialurl(index)">{{ $t('commons.linkorg') }}</span>
								</el-col>
							</el-row>
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
		getGoodsList,
		getGoodsCategory,
		addMyWarehouse,
	} from "@/api/user";
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
	import { 
		shop_type
	} from "@/utils/env";
    export default {
        data(){
            return {
				shop_type:shop_type?shop_type:10,
				lang:getToken('lang')||'zh',
				access_token:getToken('Token')||'zh',
				username:getToken('Username')||'',
				emall_selected:0,
				category_selected:0,
				scrollTop:0,
                emall_provider:[
					{
						name:'emall_provider_1688',
						title:'1688',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:'',
						emall_id:'1',
					},
					{
						name:'emall_provider_taobaounion',
						title:'淘宝联盟',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:'',
						emall_id:'2',
					},
					{
						name:'emall_provider_pingduoduo',
						title:'多多进宝',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:'',
						emall_id:'3',
					},
					{
						name:'emall_provider_jingdong',
						title:'京东联盟',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:'',
						emall_id:'4',
					}
                ],
				goods_category:[],
				goods_category_init:[],
				bigdata_hot_list:[],
				hot_goods_list:[],
				latest_hot_list:[],
				womanclothes_hot_list:[],
				manclothes_hot_list:[],
				underclothes_hot_list:[],
                loading:true,
              //需要给分页组件传的信息
                paginations: {
                    total: 0,        // 总数
                    pageIndex: 1,  // 当前位于哪页
                    pageSize: 20,   // 1页显示多少条
                    pageSizes: [5, 10, 15, 20],  //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
                },
            }
        },
        created(){
			this.emall_list = this.emall_provider ;
			//this.bigdata_hot_list = this.latest_hot_list ;
        },
        mounted(){
			this.get_goods_category();
        },
        methods: {
			goods_detail(goods_index=0){
				//this.$router.push({path:'/myhot/goodsedit',query:{goods_name:goods_name,goods_id:goods_id,goods_from:goods_from}});
				let goods_para = JSON.stringify(this.bigdata_hot_list[goods_index])
				let routeUrl = this.$router.resolve({
				    path: "/goodsedit",
				    query: {
						goods_para:goods_para,
					}
				  });
				console.log('goods_detail goods_para:',goods_para)
				window.open(routeUrl.href, '_self'); //_self _blank
			},
			get_goods_list(){
				let category_selected = getToken('category_selected_big')
				let emall_selected = getToken('emall_selected_big')
				let pagenum = getToken('Pagenum_big')
				this.paginations.pageIndex = pagenum?parseInt(pagenum):this.paginations.pageIndex
			    let para = {
					username:this.username,
					access_token:this.access_token,
			        pagesize:this.paginations.pageSize,
			        page:this.paginations.pageIndex,
					shop_type:this.shop_type,
					lang:this.lang,
					type:3, //3大数据爆款商品查询
					category:this.goods_category[category_selected]['category'],
					category_title:this.goods_category[category_selected]['title'],
					emall_id:this.emall_provider[emall_selected]['emall_id'],
			    }
				
			    getGoodsList(para).then(res => {
			        this.loading = false;
					this.bigdata_hot_list = []
					for(var i=0;i<res.result.length;i++){
						this.bigdata_hot_list.push(res.result[i])
					} 
					console.log('getGoodsList return:',res);
			        this.paginations.total = parseInt(res.total);
					this.category_selected = getToken('category_selected_big')
					this.emall_selected = getToken('emall_selected_big')
					this.goods_category[this.category_selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
					this.emall_provider[this.emall_selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
			    })
				.catch(err=>{
					console.log('getGoodsList err:',err)
				});
			},
			get_goods_category() {
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					type:1, //爆款类目
				}
			
				getGoodsCategory(para).then(res => {
						/*
					  	this.$message({
					       message: 'Completed!',
					       type: 'success',
					       duration: 1000
					     });
						*/
					let goods_category = res
					this.goods_category = [] ;
					for(var i=0;i<goods_category.length;i++){
						this.goods_category.push(goods_category[i])
					} 
					this.get_goods_list()
					console.log('get_goods_category return:',res);
				})
				.catch(err=>{
					console.log('get_goods_category err:',err)
				});
				/*
				fetchListWithChildren().then(response => {
					let list = response.data;
					this.productCateOptions = [];
					for (let i = 0; i < list.length; i++) {
					let children = [];
					if (list[i].children != null && list[i].children.length > 0) {
						for (let j = 0; j < list[i].children.length; j++) {
							children.push({label: list[i].children[j].name, value: list[i].children[j].id});
						}
					}
					this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
					}
				});
				*/
			},
			goto_materialurl(goods_index=0){
				let url = this.bigdata_hot_list[goods_index].materialUrl
				window.open(url, '_blank');
			},
			html_view(goods_index=0) {
				let url = this.bigdata_hot_list[goods_index].materialUrl
				this.$router.push({path:'/pms/htmlview',query:{url:url}});
			},
			add_mywarehouse(goods_index=0){
				let para = {
					username:this.username,
					access_token:this.access_token,
				    goods_id:this.bigdata_hot_list[goods_index]['id'],
					goods_org:1, //1688商品
					goods_from_id:1,
					type:1, //
					shop_type:this.shop_type,
					lang:this.lang,
				}
				console.log('addMyWarehouse para:',para);
				addMyWarehouse(para).then(res => {
					this.$message({
				     message: 'Completed!',
				     type: 'success',
				     duration: 1000
				   });
				   console.log('addMyWarehouse return:',res);
				})
				.catch(err=>{
					console.log('addMyWarehouse err:',err)
				});
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
				this.get_goods_list();
			},
            // 上下分页
			handleCurrentChange(page) {
				this.paginations.pageIndex = page;
				setToken("Pagenum_big",this.paginations.pageIndex)
				this.get_goods_list();
			},
			
			emall_select(selected=0) {
				let category_selected = this.category_selected
				//var category_selected = this.category_selected
				let emall_selected = this.emall_selected
				this.emall_provider[selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
				
				if(selected!=this.emall_selected){
					this.emall_provider[this.emall_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				}
				this.emall_selected = selected ;
				
				this.goods_category[category_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				this.paginations.pageIndex = 1 ;
				setToken("Pagenum_big",this.paginations.pageIndex)
				setToken("emall_selected_big",this.emall_selected)
				this.get_goods_category()
				this.category_selected = 0 ;
			},
			category_select(selected=0) {	
				//let category_selected = getToken('category_selected_big')
				//var category_selected = this.category_selected
				this.goods_category[selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
				if(selected!=this.category_selected){
					this.goods_category[this.category_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				}
				
				this.category_selected = selected ;
				this.paginations.pageIndex = 1 ;
				setToken("Pagenum_big",this.paginations.pageIndex)
				setToken("category_selected_big",selected)
				this.get_goods_list()
			}
        },
    }
</script>

<style lang="less" scoped>
    .container{
		margin: 35px;
	}
   .pagination{
       padding: 10px 20px;
       text-align: right;
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
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		margin-top: 10px;
		.goods-hot-info{
			align-items: left;
		}
		.goods-hot-img{
			width: 100%;
			height: 220px;
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
</style>



