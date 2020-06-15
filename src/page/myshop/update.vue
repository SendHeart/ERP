<template>
	<div class="container" style="display: flex;flex-direction: column;justify-content: center;">
		<div class="emall-detail">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="12">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{$t('commons.shop_name')}}:{{shop_name }}</p>
						</div>
					</div>
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;"><br></p>
						</div>
						<el-form :label-position="labelPosition" label-width="80px" :model="goodsQuery">
						  <el-form-item :label="$t('commons.goods_info_categorylist')">
						    <el-cascader
								clearable
								v-model="selectProductCateValue" 
								:options="productCateOptions"
								@change="selectedCategory"
								filterable
							>
						    </el-cascader>
						  </el-form-item>
						  <el-form-item :label="$t('commons.goods_info_title')">
						    <el-input v-model="goodsQuery.goodsTitle" size="small"></el-input>
						  </el-form-item>
						</el-form>
					</div>
				</el-col>
				 
			</el-row>
		</div>
		
		<div class="goods-image">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="24">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{ $t('commons.goods_image_info') }}</p>
						</div>

						<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top:15px;">
							<v-upload @change = "upload_image" ref="uploadCtr" accept="image/jpeg,image/png">
								<span slot="label">{{ $t('commons.goods_image_add') }}</span>
							</v-upload>
						</div>
						
						<el-row :gutter="10" class="el-row" type="flex">
							<el-col :span="2" v-for="(item_img,img_index) in goods_info['img']" :key="img_index" style="margin-top:25px;" class="el-col">
								<div style="display: flex;flex-direction: column;justify-content: flex-start;margin:5px;">
									<img :src="item_img['url']" :class="'goods-image-img '+ (item_img['type']=='1'?'goods-image-main':'')" @click="set_main_image(img_index)" >
									<el-row type="flex" justify="center">
										<el-button style="margin-top: 5px;" icon="el-icon-delete" type="primary" @click="delete_image(img_index)">{{ $t('commons.deleted') }}</el-button>
									</el-row>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="goods-sku">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="24">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">SKU</p>
						</div>
						<el-row :gutter="10" class="el-row" type="flex">
							<el-button style="margin-top: 5px;" icon="el-icon-plus" type="primary" @click="sku_add()">{{ $t('commons.goods_sku_add') }}</el-button>
							<el-button style="margin-top: 5px;" icon="el-icon-edit" type="primary" @click="edit_sku_spec()">{{ $t('commons.goods_sku_edit_attr') }}</el-button>
						</el-row>					 
					</div>
				</el-col>
				<div class="table-container">
					<el-table ref="productTable"
				            :data="goods_sku_list"
				            style="width: 100%;"
							:stripe="true"
							:row-style="tableRowStyle"
							:header-cell-style="tableHeaderColor"
				            @selection-change="tableSelectionChange"
				            v-loading="listLoading"
				            border>
						<el-table-column type="selection" width="60" align="center"></el-table-column>
						<el-table-column v-for="(item_title,title_index) in goods_skulist_title" :key="title_index" :label="item_title.title" :prop="item_title.key" align="center" :width="item_title.width" @click="add_sku_spec(2,item_title)">
							<template slot-scope="scope">
								<div v-if="item_title.attr!=='spec'" >
									<el-input v-model="scope.row[item_title.key]" ></el-input>
								</div>
								<div v-if="item_title.attr=='spec'"  style="margin-left:5px; margin-right: 5px; display: flex;flex-direction: row;justify-content: flex-start;">
									<img v-if="item_title.type=='2'" style="width:40px;height: 30px" :src="scope.row.value[item_title.spec_index]['value']">
									<p v-if="item_title.type=='1'" style="text-align: left;">
										<el-input v-model="scope.row.value[item_title.spec_index]['value']"></el-input>
									</p>
									<p v-if="item_title.type=='2'" style="text-align: left;margin-right: 5px;">
										<el-input v-model="scope.row.value[item_title.spec_index]['note']"></el-input>
									</p>
									<v-upload v-if="item_title.type=='2'" @change = "upload_sku_image" accept="image/jpeg,image/png" :para="{'sku_index':scope.$index,'spec_index':item_title.spec_index}" >
										<span slot="label">{{ $t('commons.upload') }}</span>
									</v-upload>
								</div>
							</template>
						</el-table-column>
						
						<el-table-column label="操作" width="160" align="center">
						<template slot-scope="scope">
						<p>
							<el-button size="mini" type="danger" @click="sku_delete(scope.$index, scope.row)">
							{{$t('commons.deleted')}}
							</el-button>
				        </p>
						</template>
						</el-table-column>
				</el-table>
				</div>
			</el-row>
		</div>
	 
		<div class="goods-attr">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="24">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{$t('commons.goods_attr')}}</p>
						</div>
						<el-row :gutter="10" class="el-row" type="flex">
							<el-button style="margin-top: 5px;" icon="el-icon-plus" type="primary" @click="goods_attr_add()">{{ $t('commons.goods_attr_add') }}</el-button>
						</el-row>					 
					</div>
					<el-row :gutter="20" class="el-row" type="flex">
						<el-col :span="3" v-for="(item_attr,attr_index) in goods_attr_list" :key="attr_index" style="margin-top:25px;" class="el-col">
							<span style="margin-left: 10px;font-size: 12px;">属性:</span>
							<el-input v-model="item_attr.name" style="margin-left: 5px;width: 50%;" :placeholder=" $t('commons.input')"></el-input>
							<el-button style="margin-left: 5px;" icon="el-icon-delete" type="primary" @click="delete_goods_attr(attr_index)"></el-button>
							<div v-for="(item_attrv,attrv_index) in item_attr.value" :key="attrv_index" style="display: flex;flex-direction: row;justify-content: flex-start;margin-top:5px;width: 100%;">
								<el-input v-model="goods_attr_list[attr_index]['value'][attrv_index]" style="margin-left: 5px;width:100%;" :placeholder=" $t('commons.input')"></el-input>
								<el-row type="flex" justify="center" style="margin-left: 2px;">
									<el-button style="margin-left: 3px;" icon="el-icon-delete" type="primary" @click="delete_attr_value(attr_index,attrv_index)"></el-button>
								</el-row>
							</div>
							<el-button style="margin-left: 10px;" icon="el-icon-plus" type="primary" @click="add_attr_value(attr_index)"></el-button>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		 
		<div class="goods-desc">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="24">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{$t('commons.goods_desc')}}
							<el-button style="margin-left: 5px;" :icon="is_goods_desc?'el-icon-caret-top':'el-icon-caret-bottom'" type="primary" @click="edit_goods_desc()"></el-button>
							</p>
						</div>				 
					</div>
					<div v-if="is_goods_desc" >
						<el-col v-if="goods_desc" :md="15" style="margin-top: 10px;">
							<!-- 
							<ueditor @on-change="get_goods_desc" :initContent="goods_desc"></ueditor>
							-->
							<Kind-editor  ref="kindeditor" :content="goods_desc" @input="get_goods_desc_k"></Kind-editor>
						</el-col>
					</div>
					
				</el-col>
			</el-row>
		</div>
		
		<div class="goods-save">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="24">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<el-row :gutter="20" class="el-row" type="flex">
							<el-button style="margin-top: 15px;margin-left: 10px;" size="medium" type="primary" @click="save_goods_info()">{{ $t('commons.save') }}</el-button>
							<el-button style="margin-top: 15px;margin-left: 30px;" size="medium" type="info" @click="go_back()">{{ $t('commons.goback') }}</el-button>
						</el-row>					 
					</div>
				</el-col>
			</el-row>
		</div>
		<el-dialog :title="$t('commons.goods_sku_edit_attr')" :visible.sync="setDialogVisible" width="40%">
			<span>{{$t('commons.goods_sku_attr')}}</span>
			<!--
			<el-input :placeholder="$t('commons.goods_sku_attrtype')" v-model="setDialogData.sku_attr" size="small" style="width: 30%;margin-left: 10px"></el-input>
			-->
			<el-select v-model="setDialogData.sku_attr" :placeholder="$t('commons.select')"  style="width: 20%;margin-left: 10px">
				<el-option
					v-for="item_attrlist in category_attr_list"
					:key="item_attrlist.value"
					:label="item_attrlist.label"
					:value="item_attrlist.value">
				</el-option>
			</el-select>
			<el-select v-model="setDialogData.sku_attr_type" :placeholder="$t('commons.select')"  style="width: 20%;margin-left: 10px">
				<el-option
					v-for="item_attrtype in sku_attrtype_options"
					:key="item_attrtype.value"
					:label="item_attrtype.label"
					:value="item_attrtype.value">
				</el-option>
			</el-select>
			<el-button style="margin-top: 5px;margin-left: 10px;" icon="el-icon-circle-plus" type="primary" @click="add_sku_spec(1,setDialogData)">{{ $t('commons.add') }}</el-button>
			<el-table style="width: 100%;margin-top: 20px" :data="goods_sku_speclist" border>
			<el-table-column :label="$t('commons.goods_sku_attr')" align="center" width="180">
				<template slot-scope="scope">
					<el-input v-model="scope.row.name" style="width: 150px"></el-input>
				</template>
			</el-table-column>
			<el-table-column :label="$t('commons.goods_sku_attrtype')" align="center" width="150">
				<template slot-scope="scope">
				<el-select v-model="scope.row.type" :placeholder="$t('commons.select')">
					<el-option
						v-for="item_attrtype in sku_attrtype_options"
						:key="item_attrtype.value"
						:label="item_attrtype.label"
						:value="item_attrtype.value"
					>
					</el-option>
				</el-select>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="160" align="center">
				<template slot-scope="scope">
				<p>
				<el-button size="mini" type="danger" @click="delete_sku_spec(scope.$index, scope.row)">{{$t('commons.deleted')}}</el-button>
				</p>
			</template>
			</el-table-column>
		  </el-table>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="setDialogVisible = false" size="small">取 消</el-button>
		    <el-button type="primary" @click="edit_sku_spec(1,goods_sku_speclist)" size="small">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
    import { 
		getEmallInfo,
		getMyShopGoodsList,
		saveMyShopGoodsInfo,
		getGoodsCategory,
		getCategoryAttr,
	} from "@/api/user";
	import ueditor from "@/components/editor/editor.vue"; //富文本编辑器
	import KindEditor from "@/components/Kindeditor"; //富文本编辑器 
	import HelpHint from "@/components/Helphint/helpHint.vue"; //
	import AddShareDialog from "@/components/addShareDialog.vue"; //
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
	import { 
		shop_type
	} from "@/utils/env";
	import * as mutils from '@/utils/mUtils' ;
	import upload from '@/components/uploadList/upload'
	
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
	const defaultGoodsQuery = {
		keyword: null,
		pageNum: 1,
		pageSize: 5,
		goodsTitle: null,
		verifyStatus: null,
		productSn: null,
		productCategoryId: null,
		brandId: null,
		goodsSupplyId:null,
		storage_in:null,
		storage_out:null,
	};
	
	let moment = require("moment");

    export default {
        data(){
            return {
				username:getToken('Username')||'',
				shop_type:shop_type?shop_type:10,
				lang:getToken('lang')||'zh',
				access_token:getToken('Token')||'zh',
				is_goods_desc:false,
				labelPosition: 'left',
				scrollTop:0,
				emall_id:0,
				goods_id:0,
				shop_name:null,
				shop_account:null,
				goodsQuery: Object.assign({}, defaultGoodsQuery),
				selectProductCateValue: null,
				productCateOptions: [],
				fileList: [],
				listLoading: false,
				multipleSelection: [],
				setDialogVisible:false,
				setDialogData:{sku_attr:'',sku_attr_type:''},
				sku_attrtype_options: [
					{
						value: '1',
						label: '文字'
					}, 
					{
						value: '2',
						label: '图片'
					}, 
				],
				goods_category:[],
				goods_info:{},
				goods_init_info:{
					id:'1',
					name:'',
					title:'',
					sub_title:'',
					img:[],
					attr:'',
					deliverytype:' ',
					linkorg:'',
					category:{
						id:'1_1_2',
						value:'',
					},
					type:'',
					goods_org:'',
					info_from:'1688.com',
					desc:'',
					sales_desc:'',
					sales:'',
					market_price:'',
					sell_price:'',
				},
				goods_desc:'',
				goods_query_info:{},
				loading:true,
				goods_sku_list:[],
				goods_sku_speclist:[],
				goods_sku_speclist_init:[],
				goods_skulist_title:[],
				goods_skulist_title_init: [],
				
				goods_sku_query:[],
				
				goods_attr_title:[
					{ title: "属性名称", attr: "title", key: "name",width:150 },
					{ title: "属性描述", attr: "title", key: "value",width:150 },
				],
				goods_attr_list:[],
				goods_attr_list_init:[],
				category_attr_list:[],
			  //需的信息
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
		components:{
			'AddShareDialog':AddShareDialog,
			'ueditor':ueditor,
			'v-upload':upload,
			'KindEditor':KindEditor,
			'HelpHint':HelpHint,
		},
        created(){
			//传参初始化
			if(this.$route.query){
				let goods_query= this.$route.query;
				var goods_para = JSON.parse(goods_query.goods_para)?JSON.parse(goods_query.goods_para):null
				var category_para = JSON.parse(goods_query.category_para)?JSON.parse(goods_query.category_para):null
				var goods_init_info = this.goods_init_info
				this.goods_category = category_para?category_para:this.this.goods_category 
				//console.log('goods query category_para:',this.goods_category)
				if(goods_para){
					goods_init_info['name'] = goods_para['name']
					goods_init_info['info_from'] = goods_para['info_from']? goods_para['info_from']:''
					goods_init_info['attr'] = goods_para['attr']?goods_para['attr']:[]
					goods_init_info['goods_org'] = goods_para['goods_org']?goods_para['goods_org']:0
					goods_init_info['desc'] = goods_para['desc']?goods_para['desc']:''
					goods_init_info['sales_desc'] = goods_para['sales_desc']?goods_para['sales_desc']:''
					goods_init_info['sales'] = goods_para['sales']
					goods_init_info['market_price'] = goods_para['market_price']?goods_para['market_price']:''
					goods_init_info['sell_price'] = goods_para['sell_price']?goods_para['sell_price']:0
					goods_init_info['materialUrl'] = goods_para['materialUrl']?goods_para['materialUrl']:''
					goods_init_info['id'] = goods_para['id']
					goods_init_info['goods_id'] = goods_para['goods_id']?goods_para['goods_id']:0
					goods_init_info['img'] =  goods_para['img']
					//console.log('goods query goods_init_info:',goods_init_info)
					this.goodsQuery['goodsTitle'] = goods_para['name']
					this.goods_id = goods_para['id']
					this.shop_name = goods_query['shop_name']
					this.shop_account = goods_query['shop_account']
					this.emall_id = goods_query['platform_id']
				}
				//console.log('goods query shop_account:',this.shop_account,' platform_id:',this.emall_id)
				//this.goods_sku_list = this.goods_sku_query
			}
			
			this.goods_info=goods_init_info
			this.query_goods_info()
			this.category_list_init()
			/*
			if(this.goods_query_info){
				for(var i=0;i<this.goods_query_info['img'].length;i++){
					this.goods_info['img'].push(this.goods_query_info['img'][i])
				}
			}
			*/
			//初始化SKU属性到表头
			/*
			if(this.goods_sku_speclist){
				//插入新的属性项
				this.sku_title_init()
			}
			*/
        },
        mounted(){
			//this.productCateOptions = this.goods_category ;
			
        },
        methods: {
			sku_title_init(){
				var sku_title_list = []
				//console.log('sku_title_init:',this.goods_skulist_title)
				if(this.goods_sku_speclist && this.goods_sku_speclist.constructor === Array){
					sku_title_list.push(this.goods_skulist_title[0]) //保留前两个表头项
					sku_title_list.push(this.goods_skulist_title[1])
					for(var i=0;i<this.goods_sku_speclist.length;i++){
						let width = this.goods_sku_speclist[i]['type']=='1'?200:230
						let sku_title_inf = { 
							title: this.goods_sku_speclist[i]['name'], 
							attr: "spec", 
							key: "",
							spec_index:i,
							type:this.goods_sku_speclist[i]['type'],
							width:width ,
						}
						sku_title_list.push(sku_title_inf)
					}
					for(var i=2;i<this.goods_skulist_title.length;i++){
						sku_title_list.push(this.goods_skulist_title[i])
					}
					this.goods_skulist_title = sku_title_list
				}
			},
			
			category_list_init(){
				var category_list=[]
				//console.log('myshop update category_list_init goods_category:',this.goods_category)
				var label = ''
				var ch_label = ''
				var category_info = {} 
				var ch_category_info = {}
				for(let i=0;i<this.goods_category.length;i++){
					if(this.lang=='zh'){
						label =this.goods_category[i]['name']
					} else {
						label = this.goods_category[i]['name_en']
					}
					
					category_info = {
						label:label,
						value:this.goods_category[i]['id'],
						//children:[]
					 } 
					
					 if(this.goods_category[i]['down'] && this.goods_category[i]['down'].constructor===Array && this.goods_category[i]['down'].length>0){
						 category_info['children'] = []
						 for(let k=0;k<this.goods_category[i]['down'].length;k++){
							if(this.lang=='zh'){
								ch_label = this.goods_category[i]['down'][k]['name']
							} else {
							 	ch_label = this.goods_category[i]['down'][k]['name_en']
							}
							ch_category_info = {
								label:ch_label,
								value:this.goods_category[i]['down'][k]['id'],
								//children:[]
							}
							category_info['children'].push(ch_category_info)
						 }
					 }
					 
					category_list.push(category_info)
				}
				this.productCateOptions = category_list 
				console.log('myshop update category_list_init category_info productCateOptions:',this.productCateOptions)
			},
			
			edit_goods_desc(){
				this.is_goods_desc = !this.is_goods_desc
			},
			goods_attr_add(){
				let goods_attr = {
					name:'',
					value:[],
				}
				this.goods_attr_list.push(goods_attr)
			},
			
			delete_goods_attr(attr_index){
				this.$confirm('是否要进行删除操作?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.goods_attr_list.splice(attr_index,1)
				});
			},
			
			delete_attr_value(attr_index,attrv_index){
				this.$confirm('是否要进行删除操作?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.goods_attr_list[attr_index]['value'].splice(attrv_index,1)
				});
			},
			
			add_attr_value(attr_index){
				let attr_value=''
				let attrvalue_len = this.goods_attr_list[attr_index]['value'].length
				if(this.goods_attr_list[attr_index]['value'][attrvalue_len-1]!=''){
					this.goods_attr_list[attr_index]['value'].push(attr_value)
				}
			},
			
			add_sku_spec(type=0,para={}){
			  //this.setDialogVisible = !this.setDialogVisible;
				console.log('add_sku_spec para:',para,' type:',type)
				if(type == 1){ //商品属性添加
					if(para.sku_attr_type == '1' && para.sku_attr){
						console.log('add_sku_spec 文字 para:',para,' type:',type)
						this.sku_add_attrc()
						
					}else if(para.sku_attr_type == '2' && para.sku_attr ){
						console.log('add_sku_spec 图片 para:',para,' type:',type)
						this.sku_add_attrp()
						
					}else{
						console.log('add_sku_spec para:',para)
						this.$message({
						  message: 'SKU属性更新失败',
						  type: 'warning',
						  duration: 1000
						});
					}
				} else if(type == 2){ //商品属性修改
					let sku_attr = para.title
					let sku_attr_type = para.type
					this.setDialogData.sku_attr = sku_attr
					this.setDialogData.sku_attr_type = sku_attr_type
					console.log('add_sku_spec 商品属性修改 para:',para,' type:',type)
				}
			},
			
			delete_sku_spec(sku_speclist_index){
				//删除表头项
				this.$confirm('是否要进行删除操作?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					//删除数据项
					for(let i=0; i<this.goods_sku_list.length;i++){
						this.goods_sku_list[i]['value'].splice(sku_speclist_index,1)
						//console.log('delete_sku_spec goods_sku_list :',this.goods_sku_list[i],' sku speclist index:',sku_speclist_index,' i:',i)
						//this.$delete(this.goods_sku_list[i].value,sku_speclist_index)
					}
					//console.log('delete_sku_spec goods_sku_list :',this.goods_sku_list)
					for(let i=0;i<this.goods_skulist_title.length;i++){
						if(this.goods_skulist_title[i]['attr']=='spec' && this.goods_skulist_title[i]['title']==this.goods_sku_speclist[sku_speclist_index]['name']){
							this.goods_skulist_title.splice(i,1)
							break;
						}
					}
					let k = 0 ;
					for(let i=0;i<this.goods_skulist_title.length;i++){ //更新 spec_index
						if(this.goods_skulist_title[i]['attr']=='spec'){
							this.goods_skulist_title[i]['spec_index'] = k
							k++
						}
					}
					this.goods_sku_speclist.splice(sku_speclist_index,1)
					console.log('delete_sku_spec goods_sku_speclist :',this.goods_sku_speclist,' skulist title:',this.goods_skulist_title)
				})
			},
			
			edit_sku_spec(type=0,para={}){
				this.setDialogVisible = !this.setDialogVisible;
				console.log('edit_sku_spec type:',type,' para:',para)
				if(type==1){ //更新 表头项
					var goods_sku_speclist = para
					for(var i=0;i<goods_sku_speclist.length;i++){
						for(var k=0;k<this.goods_skulist_title.length;k++){
							if(this.goods_skulist_title[k]['attr']=='spec' && this.goods_skulist_title[k]['title'] == goods_sku_speclist[i]['name']){
								this.goods_skulist_title[k]['title'] = goods_sku_speclist[i]['name']
								this.goods_skulist_title[k]['type'] = goods_sku_speclist[i]['type']
								this.goods_skulist_title[k]['width'] = goods_sku_speclist[i]['type']==1?200:280
							}
						}
					}
					
				}
			  
			},
			
			sku_add(){
				let sku_inf={
					id:'',
					goods_id:'1',
					sku_no:'',
					jd_skuno:'',
					tb_skuno:'',
					pdd_skuno:'',
					value:[],
					hsncode:'43556676',
					store_nums:'',
					market_price:'',
					sell_price:'',
					weight:'',
					tax_rate:'',
					sales:'',
				}
				var current_sku_no = '' 
				if(this.goods_sku_list[0]){
					current_sku_no = this.goods_sku_list[0].sku_no+'_'+this.goods_sku_list.length
					sku_inf['market_price'] = this.goods_sku_list[0].market_price
					sku_inf['sell_price'] = this.goods_sku_list[0].sell_price
					sku_inf['tax_rate'] = this.goods_sku_list[0].tax_rate
					sku_inf['hsncode'] = this.goods_sku_list[0].hsncode
					sku_inf['store_nums'] = this.goods_sku_list[0].store_nums
					sku_inf['weight'] = this.goods_sku_list[0].weight
				}else{
					current_sku_no =  moment().unix() 
				}
				sku_inf['sku_no'] = current_sku_no
				if(this.goods_sku_speclist){
					for(var k=0; k<this.goods_sku_speclist.length;k++){
						sku_inf['value'].push(this.goods_sku_speclist[k]) ;
					}
				}
				this.goods_sku_list.push(sku_inf) ;
			},
			sku_add_attrc(){
				var len = this.goods_sku_speclist.length
				let sku_spec_inf=
				{
					name:this.setDialogData.sku_attr?this.setDialogData.sku_attr:'',
					type:this.setDialogData.sku_attr_type?this.setDialogData.sku_attr_type:'1',
					value:this.setDialogData.sku_attr+"说明",
					note:"",
				}
				this.goods_sku_speclist.push(sku_spec_inf) 
				console.log('sku_add_attrc:',this.goods_sku_speclist)
				//
				for(var i=0; i<this.goods_sku_list.length;i++){
					this.goods_sku_list[i].value.push(sku_spec_inf)
				}
				console.log('sku_add_attrc sku list:',this.goods_sku_list)
				//添加SKU属性到表头
				if(this.goods_sku_speclist){
					var sku_title_list = []
					for(var i=0;i<len+2;i++){
						sku_title_list.push(this.goods_skulist_title[i])
					}
					let sku_title_inf = {
						title: sku_spec_inf['name'], 
						attr: "spec", 
						key: "",
						spec_index:len,
						type:sku_spec_inf['type'],
						width:200 ,
					}
					sku_title_list.push(sku_title_inf)
					for(var i=len+2;i<this.goods_skulist_title.length;i++){
						sku_title_list.push(this.goods_skulist_title[i])
					}
					this.goods_skulist_title = sku_title_list
					console.log('sku_add_attrc sku goods_skulist_title:',this.goods_skulist_title)
				}
			},
			
			sku_add_attrp(){
				let len = 0 
				if(this.goods_sku_speclist){
					len = this.goods_sku_speclist.length
				}else{
					 this.goods_sku_speclist = []
				}
				
				console.log('sku_add_attrc:',len,' sku speclist:',this.goods_sku_speclist)
				let sku_spec_inf=
				{
					name:this.setDialogData.sku_attr,
					type:this.setDialogData.sku_attr_type,
					value:"",
					note:this.setDialogData.sku_attr+"说明",
				}
				
				this.goods_sku_speclist.push(sku_spec_inf) 
				console.log('sku_add_attrc:',this.goods_sku_speclist)
				for(var i=0; i<this.goods_sku_list.length;i++){
					this.goods_sku_list[i].value.push(sku_spec_inf)
				}
				console.log('sku_add_attrc sku list:',this.goods_sku_list)
				//添加SKU属性到表头
				if(this.goods_sku_speclist){
					var sku_title_list = []
					for(var i=0;i<len+2;i++){
						sku_title_list.push(this.goods_skulist_title[i])
					}
					let sku_title_inf = {
						title: sku_spec_inf['name'], 
						attr: "spec", 
						key: "",
						spec_index:len,
						type:sku_spec_inf['type'],
						width:230 ,
					}
					sku_title_list.push(sku_title_inf)
					for(var i=len+2;i<this.goods_skulist_title.length;i++){
						sku_title_list.push(this.goods_skulist_title[i])
					}
					this.goods_skulist_title = sku_title_list
					console.log('sku_add_attrp sku goods_skulist_title:',this.goods_skulist_title)
				}
			},
			
			goods_linkorg(url){
				window.open(url, '_blank');
			},
			
			set_main_image(index){
				 for(var i=0;i<this.goods_info['img'].length;i++){
					 if(i==index){
						 this.goods_info['img'][i]['type'] = '1'
					 }else{
						 this.goods_info['img'][i]['type'] = ''
					 }
				 } 
			},
			
			delete_image(index){
				this.$confirm('是否要进行删除操作?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					if (this.goods_info['img'][index]) {
						this.goods_info['img'].splice(index,1)
					} 
				});
			},
			
			upload_image(file, fileList,para) {
				this.fileList = fileList.slice(-1);
				console.log('add_image file:',file,' fileList:',fileList,' para:',para)
				if(file.response){
					let upload_img = {
						url:file.response.result.img_url,
						type:''
					}
					this.goods_info['img'].push(upload_img) 
				}
			},
			  
			upload_sku_image(file, fileList,para) {
				this.fileList = fileList.slice(-1);
				console.log('add_image file:',file,' fileList:',fileList,' para:',para)
				if(file.response){
					let para_info = para 
					let spec_index = para_info.spec_index 
					let sku_index = para_info.sku_index
					this.goods_sku_list[sku_index]['value'][spec_index]['value']=file.response.result.img_url
				}
			},
			
            selectedCategory(){
                //console.log('selectedCategory:',this.selectProductCateValue)
				 
				let goods_category = 0
				if(this.selectProductCateValue.constructor==Array){
					goods_category = this.selectProductCateValue[this.selectProductCateValue.length - 1]
				} 
				if(goods_category!=0){
					let para = {
						username:this.username,
						access_token:this.access_token,
						shop_type:this.shop_type,
						lang:this.lang,
						goods_category:goods_category,
						platform_id:this.emall_id,
						type:0,
					}
					console.log('selectedCategory para:',para); 
					getCategoryAttr(para).then(res => {
						/*
					    this.$message({
					      message: '保存成功',
					      type: 'success',
					      duration: 1000
					    });
						*/
						var result = res
						let category_attr_list = []
						for(let i=0;i<result.length;i++){
							let category_attr_info = {
								label:result[i],
								value:result[i]
							}
							category_attr_list.push(category_attr_info)
						}
						this.category_attr_list = category_attr_list
						console.log('selectedCategory category_attr_list:',this.category_attr_list); 
					})
					.catch(err=>{
						console.log('selectedCategory err:',err)
					})
				}
            },
			
			query_goods_info(){
			    let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					goods_id:this.goods_id,
					emall_id:this.emall_id,
					shop_account:this.shop_account,
					shop_name:this.shop_name,
					type:1,
			    }
				console.log('getMyShopGoodsList para:',para); 
			    getMyShopGoodsList(para).then(res => {
					/*
			        this.$message({
			          message: '保存成功',
			          type: 'success',
			          duration: 1000
			        });
					*/
					var result = res.result
					if(result[0]['img'] && result[0]['img'].constructor === Array){
						 this.goods_info['img']=[]
						for(var k=0;k<result[0]['img'].length;k++){
							this.goods_info['img'].push(result[0]['img'][k])
						} 
					}
					//this.goods_info['category'] = result[0]['category']
					this.selectProductCateValue = result[0]['category']
					this.goods_info['materialUrl'] = result[0]['materialUrl']
					this.goods_info['name'] = result[0]['name']
					this.goods_info['id'] = result[0]['id']
					this.goods_info['sell_price'] = result[0]['sell_price']
					this.goods_sku_list = result[0]['sku_list']?result[0]['sku_list']:null
					this.goods_attr_list = result[0]['features']?result[0]['features']:null
					this.goods_sku_speclist = result[0]['sku_speclist']?result[0]['sku_speclist']:null
					this.goods_skulist_title = result[0]['skulist_title']?result[0]['skulist_title']:null
					setTimeout(() => {
						this.goods_desc = result[0]['desc']?result[0]['desc']:null
					}, 1000);
					
					console.log('getMyShopGoodsList return:',res,' goods_desc:',this.goods_desc);
					if(this.goods_skulist_title){
						this.sku_title_init()
					}
					if(this.selectProductCateValue){
						this.selectedCategory()
					}
			    })
				.catch(err=>{
					console.log('getMyShopGoodsList err:',err)
				});
			},
			
			save_goods_info(){
				this.goods_info['name'] = this.goodsQuery['goodsTitle']
				let goods_category = 0
				if(this.selectProductCateValue.constructor==Array){
					goods_category = this.selectProductCateValue[this.selectProductCateValue.length - 1]
				} 
				
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					goods_id:this.goods_id,
					goods_info:this.goods_info,
					goods_category:goods_category,
					goods_sku_list:this.goods_sku_list,
					goods_desc:this.goods_desc,
					goods_attr_list:this.goods_attr_list,
					shop_account:this.shop_account,
					shop_name:this.shop_name,
					emall_id:this.emall_id,
				}
				console.log('save_goods_info para:',para);
				saveMyShopGoodsInfo(para).then(res => {
				    this.$message({
				      message: 'Success',
				      type: 'success',
				      duration: 1000
				    });
					console.log('save_goods_info return:',res);
				})
				.catch(err=>{
					console.log('save_goods_info err:',err)
				});
			},
			sku_delete(index, row){
			  this.$confirm('是否要进行删除操作?', '提示', {
			    confirmButtonText: '确定',
			    cancelButtonText: '取消',
			    type: 'warning'
				}).then(() => {
					if (row) {
						this.goods_sku_list.splice(index, 1)
					} 
				});
			},
			
			get_goods_desc(ctx) {
				this.goods_desc = ctx?ctx:this.goods_desc ;
				//console.log('Rich Text:',ctx)
			},
			
			get_goods_desc_k(content) {
				this.goods_desc = content?content:this.goods_desc ;
				//console.log('Rich Text:',ctx)
			},
			
			//设置表格行的样式
			 tableRowStyle({row,rowIndex}){
			    return 'background-color:#FFF;font-size:12px;borderColor: #F2F2F2';
			 },
			//设置表头行的样式
			tableHeaderColor({row,column,rowIndex,columnIndex}){
					return 'background:#BBBBBB;color:#333;borderColor: #FFFFFF;font-size:14px;' ;
			},
			tableSelectionChange(val) {
			  this.multipleSelection = val;
			},
			
			go_back(){
				this.$router.go(-1)
				//window.close();
			}
        },
    }
</script>

<style lang="less" scoped>
    .container{
		margin: 10px;
		background-color: #f0f2f5;
	}
   .pagination{
       padding: 10px 20px;
       text-align: right;
   }
   
   .row_list{
		margin-bottom: 20px;
		text-align: flex-start;
		font-size: 16px;
		.row_base{
			padding: 10px;
			box-sizing: border-box;
			height: 100px;
			line-height: 100px;
			border-radius: 6px;
			background: #FFFFFF;
		}
	}
 
	.el-row {
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap
	}
	.el-col {
	    border-radius: 4px;
	    align-items: stretch;
	    margin-bottom: 10px;
	}
	
   .emall-detail{
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
			border-radius: 10px;
			background-color:#FFFFFF;
		}
		.emall-detail-img{
			min-width: 140px;
			max-width: 150px;
			height: 150px;
			padding: 5px;
			border-radius: 10px;
		}
		.emall-detail-title{
			font-size: 15px;
			padding: 2px;
			color:#666;
		}
		.emall-detail-desc{
			font-size: 15px;
			padding: 5px;
			color:#666;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.emall-detail-sub-title{
			font-size: 16px;
			padding: 2px;
			color:#666;	
			margin-right: 20px;
		}
	}
	.goods-image{
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
			border-radius: 10px;
			background-color:#FFFFFF;
		}
		.goods-image-img{
			min-width: 100px;
			max-width: 100;
			height: 120px;
			padding: 5px;
			border-radius: 10px;
		}
		.goods-image-main{
			border: 1px solid;
		}
	}

	.goods-sku{
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
			border-radius: 10px;
			background-color:#FFFFFF;
		}
	}
	
	.goods-attr{
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
			border-radius: 10px;
			background-color:#FFFFFF;
		}
	}
	.goods-desc{
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
			border-radius: 10px;
			background-color:#FFFFFF;
		}
	}
	.goods-save{
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
			border-radius: 10px;
			background-color:#FFFFFF;
		}
	}
</style>
