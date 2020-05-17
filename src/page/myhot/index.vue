<template> 
  <div class="container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>{{$t('commons.search')}}</span>
        <el-button
          style="float: right"
          @click="search()"
          type="primary"
          size="small">
          {{$t('commons.findresult')}}
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="search()"
          size="small">
          {{$t('commons.reset')}}
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="120px">
			<el-form-item :label="$t('commons.goodsorg')">
				<el-cascader
				  clearable
				  v-model="listQuery.goodsSupplyId"
				  :options="goods_supply">
				</el-cascader>
			</el-form-item>
			<el-form-item :label="$t('commons.goodscate')">
			  <el-cascader
			    clearable
			    v-model="listQuery.goodsCategoryId"
			    :options="goods_category"
				filterable>
			  </el-cascader>
			</el-form-item>
			<el-form-item :label="$t('commons.storedate')">
				<el-date-picker
				      v-model="listQuery.storage_in"
				      type="daterange"
				      :start-placeholder="$t('commons.startdate')"
				      :end-placeholder="$t('commons.enddate')"
				      :default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
        </el-form>
      </div>
    </el-card>
	 
    <el-card class="operate-container" shadow="never">
      <el-button
        class="btn-add"
        @click="add_hot_goods()"
		type="primary"
        size="mini">
         {{$t('commons.addbyself')}}
      </el-button>
	  <el-button type="primary" class="btn-add"  size="mini" @click="get_goods_list(2)"> {{$t('commons.exportexcel')}}</el-button>
    </el-card>
    <div class="table-container">
	<el-table ref="productTable"
                :data="list"
                style="width: 100%;"
				:stripe="true"
				:row-style="tableRowStyle"
				:header-cell-style="tableHeaderColor"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="商品图片" width="480" align="center">
			<template slot-scope="scope">
				<div style="display: flex;flex-direction: row;justify-content: flex-start;" >
					<img style="height: 80px" :src="scope.row.img" @click="goods_detail(scope.$index)">
					<div style="margin-left:5px; display: flex;flex-direction: column;justify-content: flex-start;">
						<p style="text-align: left;">{{scope.row.name}}</p>
						<p style="text-align: left;" >
							<el-button type="primary" size="mini" @click="html_view(scope.$index)">源链</el-button>
						</p>
					</div>
				</div>
			</template>
        </el-table-column>
		<el-table-column label="商品ID" width="130" align="center">
		  <template slot-scope="scope">{{scope.row.goods_id}}</template>
		</el-table-column>
		<!--
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>品牌：{{scope.row.brandName}}</p>
          </template>
        </el-table-column>
		-->
        <el-table-column label="原价" width="180" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.sell_price}}</p>
          </template>
        </el-table-column>
		<!--
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <p>上架：
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus">
              </el-switch>
            </p>
            <p>新品：
              <el-switch
                @change="handleNewStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus">
              </el-switch>
            </p>
            <p>推荐：
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus">
              </el-switch>
            </p>
          </template>
        </el-table-column>
		-->
        <el-table-column label="类目" width="100" align="center">
          <template slot-scope="scope">{{scope.row.category}}</template>
        </el-table-column>
        <el-table-column label="库存" width="100" align="center">
          <template slot-scope="scope">
			 <p>{{scope.row.storenum}}</p>
			 <!--
			 <el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
			 -->
          </template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column>
		<el-table-column label="入库时间" width="100" align="center">
		  <template slot-scope="scope">{{scope.row.storage_time}}</template>
		</el-table-column>
		<!--
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.verifyStatus | verifyStatusFilter}}</p>
            <p>
              <el-button
                type="text"
                @click="handleShowVerifyDetail(scope.$index, scope.row)">审核详情
              </el-button>
            </p>
          </template>
        </el-table-column>
		-->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
			  <!--
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
            </p>
			-->
            <p>
			<!--
              <el-button
                size="mini"
                @click="handleShowLog(scope.$index, scope.row)">日志
              </el-button>
			  -->
              <el-button
                size="mini"
                type="danger"
                @click="delete_mywarehouse(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
	</el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" :placeholder="$t('commons.batch')">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px;margin-right:20px;"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        {{$t('commons.confirm')}}
      </el-button>
	  <el-select
	    size="small"
	    v-model="emall_id" :placeholder="$t('commons.emallplatform')">
	    <el-option
	      v-for="item in emall_list"
	      :key="item.id"
	      :label="item.title"
	      :value="item.id">
	    </el-option>
	  </el-select>
    </div>
	
    <el-dialog
		:title="$t('commons.hot_goods_add')"
		:visible.sync="addhotgoodsInfo.dialogVisible"
		width="65%">
		<el-form :model="addhotgoodsInfo" status-icon :rules="rules" ref="addhotgoodsInfo" label-width="100px">
		  <el-form-item :label="$t('commons.goods_info_from')" prop="goodsFromId" style="width: 30%;margin-left: 0px">
		  	<el-cascader
		  	clearable
		  	v-model="addhotgoodsInfo.goodsFromId"
		  	:options="hot_supply"
		  	filterable>
		  	</el-cascader>
		  </el-form-item>
		  <el-form-item :label="$t('commons.hot_goods_sku')">
		  	<el-input :placeholder="$t('commons.hot_goods_sku')" v-model="addhotgoodsInfo.productId" size="small" style="width: 30%;margin-left: 0px"></el-input>
		  </el-form-item>
		  <el-form-item :label="$t('commons.hot_goods_name')">
		  	<el-input :placeholder="$t('commons.hot_goods_name')" v-model="addhotgoodsInfo.productName" size="small" style="width: 50%;margin-left: 0px"></el-input>
		  </el-form-item>
		  <el-form-item :label="$t('commons.hot_goods_link')" prop="productLink">
		    <el-input v-model="addhotgoodsInfo.productLink"></el-input>
		  </el-form-item>
		  <el-form-item>
			 <el-button @click="addhotgoodsInfo.dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="add_hot_confirm('addhotgoodsInfo')">提交</el-button>
		  </el-form-item>
		</el-form>
		<!--
		<el-form :model="addhotgoodsInfo" :rules="rules" ref="ref_addhotgoodsInfo">
			<el-form-item :label="$t('commons.goods_info_from')">
				<el-cascader
				clearable
				v-model="addhotgoodsInfo.goodsFromId"
				:options="hot_supply"
				filterable>
				</el-cascader>
			</el-form-item>
			<el-form-item :label="$t('commons.hot_goods_link')">
				<el-input :placeholder="$t('commons.hot_goods_link')" v-model="addhotgoodsInfo.productLink" size="small" style="width: 80%;margin-left: 0px">
					 
				</el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="addhotgoodsInfo.dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="add_hot_confirm">确 定</el-button>
		</span>
		-->
		
	</el-dialog>
	<el-row>
	     <el-col :span="24">
	         <div class="pagination">
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
	     </el-col>
	 </el-row>
  </div>
</template>
<script>
	/*
  import {
    fetchList,
    updateDeleteStatus,
    updateNewStatus,
    updateRecommendStatus,
    updatePublishStatus
  } from '@/api/product'
  */
  //import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
  //import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  //import {fetchList as fetchBrandList} from '@/api/brand'
  //import {fetchListWithChildren} from '@/api/productCate'
	
	import {
		getMyWarehouse,
		deleteGoodsWarehouse,
		getGoodsCategory,
		getGoodsSupply,
		addMyWarehouse,
		goodsUpDown,
		goodsRecommSet,
		goodsNewSet,
		getEmallList,
	} from "@/api/user";
	
	import {
		shop_type,
	} from "@/utils/env" ;
	
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
	
	import {
		validateURL,
	} from "@/utils/validate" ;
	
  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null,
	goodsSupplyId:null,
	storage_in:null,
	storage_out:null,
  };
  export default {
    name: "productList",
    data() {
		var validUrl=(rule, value,callback)=>{
			if (!value){
				callback(new Error('请输入商品信息链接'))
			}
			setTimeout(() => {
			  if (!validateURL(value)){
			  	callback(new Error('请输入正确的商品信息链接'))
			  }else {
			  	callback()
			  }
			}, 1000);
		}
		
		return {
			shop_type:shop_type?shop_type:10,
			lang:getToken('lang')||'zh',
			access_token:getToken('Token')||'zh',
			username:getToken('Username')||'',
			goods_id:0,
			scrollTop:0,
			exportList:[],
			tableData:[
				{
					title:'title',
					cid:'cid',
					seller_cids:'seller_cids',
					stuff_status:'stuff_status',
					location_state:'location_state',
					location_city:'location_city',
					item_type:'item_type',
					price:'price',
					auction_increment:'auction_increment',
					num:'num',
					valid_thru:'valid_thru',
					freight_payer:'freight_payer',
					post_fee:'post_fee',
					ems_fee:'ems_fee',
					express_fee:'express_fee',
					has_invoice:'has_invoice',
					has_warranty:'has_warranty',
					approve_status:'approve_status',
					has_showcase:'has_showcase',
					list_time:'list_time',	
					description:'description',
					cateProps:'cateProps',
					postage_id:'postage_id',
					has_discount:'has_discount',
					modified:'modified',
					upload_fail_msg:'upload_fail_msg',
					picture_status:'picture_status',
					auction_point:'auction_point',
					picture:'picture',
					video:'video',
					skuProps:'skuProps',
					inputPids:'inputPids',
					inputValues:'inputValues',
					outer_id:'outer_id',
					propAlias:'propAlias',
					auto_fill:'auto_fill',
					num_id:'num_id',
					local_cid:'local_cid',
					navigation_type:'navigation_type',
					user_name:'user_name',
					syncStatus:'syncStatus',
					is_lighting_consigment:'is_lighting_consigment',
					is_xinpin:'is_xinpin',
					foodparame:'foodparame',
					features:'features',
					buyareatype:'buyareatype',
					global_stock_type:'global_stock_type',
					global_stock_country:'global_stock_country',
					sub_stock_type:'sub_stock_type',
					item_size:'item_size',
					item_weight:'item_weight',
					sell_promise:'sell_promise',
					custom_design_flag:'custom_design_flag',
					wireless_desc:'wireless_desc',
					barcode:'barcode',
					sku_barcode:'sku_barcode',
					newprepay:'newprepay',
					subtitle:'subtitle',
					cpv_memo:'cpv_memo',
					input_custom_cpv:'input_custom_cpv',
					qualification:'qualification',
					add_qualification:'add_qualification',
					o2o_bind_service:'o2o_bind_service',
					tmall_extend:'tmall_extend',	
					product_combine:'product_combine',
					tmall_item_prop_combine:'tmall_item_prop_combine',
					taoschema_extend:'taoschema_extend'
				},
			],
			tableHeader:[
				'宝贝名称',
				'宝贝类目',
				'店铺类目',
				'新旧程度',
				'省',
				'城市',
				'出售方式',
				'宝贝价格',
				'加价幅度',
				'宝贝数量',
				'有效期',
				'运费承担',
				'平邮',
				'EMS',
				'快递',
				'发票',
				'保修',
				'放入仓库',
				'橱窗推荐',
				'开始时间',	
				'宝贝描述',
				'宝贝属性',
				'邮费模版ID',
				'会员打折',
				'修改时间',
				'上传状态',
				'图片状态',
				'返点比例',
				'新图片',
				'视频',
				'销售属性组合',
				'用户输入ID串',
				'用户输入名-值对',
				'商家编码',
				'销售属性别名',
				'代充类型',
				'数字ID',
				'本地ID',
				'宝贝分类',
				'用户名称',
				'宝贝状态',
				'闪电发货',
				'新品',
				'食品专项',
				'尺码库',
				'采购地',
				'库存类型',
				'国家地区',
				'库存计数',
				'物流体积',
				'物流重量',
				'退换货承诺',
				'定制工具',
				'无线详情',
				'商品条形码',
				'sku条形码',
				'7天退货',
				'宝贝卖点',
				'属性值备注',
				'自定义属性值',
				'商品资质',
				'增加商品资质',
				'关联线下服务',
				'tmall扩展字段',	
				'产品组合',
				'tmall属性组合',
				'taoschema扩展字段'
			],
			tableTitle:[
				'title',
				'cid',
				'seller_cids',
				'stuff_status',
				'location_state',
				'location_city',
				'item_type',
				'price',
				'auction_increment',
				'num',
				'valid_thru',
				'freight_payer',
				'post_fee',
				'ems_fee',
				'express_fee',
				'has_invoice',
				'has_warranty',
				'approve_status',
				'has_showcase',
				'list_time',	
				'description',
				'cateProps',
				'postage_id',
				'has_discount',
				'modified',
				'upload_fail_msg',
				'picture_status',
				'auction_point',
				'picture',
				'video',
				'skuProps',
				'inputPids',
				'inputValues',
				'outer_id',
				'propAlias',
				'auto_fill',
				'num_id',
				'local_cid',
				'navigation_type',
				'user_name',
				'syncStatus',
				'is_lighting_consigment',
				'is_xinpin',
				'foodparame',
				'features',
				'buyareatype',
				'global_stock_type',
				'global_stock_country',
				'sub_stock_type',
				'item_size',
				'item_weight',
				'sell_promise',
				'custom_design_flag',
				'wireless_desc',
				'barcode',
				'sku_barcode',
				'newprepay',
				'subtitle',
				'cpv_memo',
				'input_custom_cpv',
				'qualification',
				'add_qualification',
				'o2o_bind_service',
				'tmall_extend',	
				'product_combine',
				'tmall_item_prop_combine',
				'taoschema_extend'
			],
			emall_list:[],
			addhotgoodsInfo:{
				dialogVisible:false,
				productId:'',
				productLink:'',
				productName:'',
				goodsCategoryId:0,
				goodsFromId:0,
				productAttr:[],
				keyword:''
			},
		rules: {
		    productLink: [
				{ required: true, trigger: 'blur', validator: validUrl } //这里需要用到全局变量
			],
			goodsFromId: [
				 { required: true, message: '请选择来源', trigger: 'change' }
			],
			productName: [
				 { required: true, message: 'Name', trigger: 'change' }
			],
			productId: [
				 { required: true, message: 'SKU', trigger: 'change' }
			],
		},
		 
        operates: [
          {
            label: "商品上架",
            value: "publishOn"
          },
          {
            label: "商品下架",
            value: "publishOff"
          },
          {
            label: "设为推荐",
            value: "recommendOn"
          },
          {
            label: "取消推荐",
            value: "recommendOff"
          },
          {
            label: "设为新品",
            value: "newOn"
          },
          {
            label: "取消新品",
            value: "newOff"
          },
		  /*
          {
            label: "转移到分类",
            value: "transferCategory"
          },
		 
          {
            label: "移入回收站",
            value: "recycle"
          }
		  */
        ],
        operateType: null,
		emall_id:null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
		selectGoodsSupplyValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [
			{
				label:'宁波',
				value:'10001'
			},
			{
				label:'绍兴',
				value:'10002'
			}
		],
		hot_supply:[
			{
				label:'1688',
				value:'1',
			},
			{
				label:'多多进宝',
				value:'2',
			},
			{
				label:'淘宝联盟',
				value:'3',
			},
			{
				label:'京东联盟',
				value:'4',
			}
		],
		goods_supply:[],
		
        publishStatusOptions: [{
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
		
		verifyStatusOptions: [{
          value: 1,
          label: '审核通过'
		}, {
          value: 0,
          label: '未审核'
		}],
		
		paginations: {
		    total: 0,        // 总数
		    pageIndex: 1,  // 当前位于哪页
		    pageSize: 20,   // 1页显示多少条
		    pageSizes: [5, 10, 15, 20, 30],  //每页显示多少条
		    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
		},
		goods_category:[],
      }
    },
    created() {
     this.get_goods_list()
     this.get_mywarehouse()
     this.get_goods_category()
	 this.get_goods_supply()
	 this.get_emall_list()
    },
    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productCategoryId = newValue[1];
        } else {
          this.listQuery.productCategoryId = null;
        }
      }
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods: {
		//本地数据导出的Excel方法
		exportExcel() {
		  require.ensure([], () => {
		    const { export_json_to_excel } = require('@/Excel/Export2Excel');//Export2Excel路径
		    const tHeader = this.tableHeader;   // 上面设置Excel的表格第一行的标题
		    const filterVal = this.tableTitle; // 上面的index、nickName、name是tableData里对象的属性key值
			let hot_list = this.export_list
			for(let j=0; j<hot_list.length;j++){
				let hot_goods = {
					title:hot_list[j]['name']?hot_list[j]['name']:'(商品名称)',
					cid:hot_list[j]['category1']?hot_list[j]['category1']:'',
					seller_cids:hot_list[j]['seller_cids']?hot_list[j]['seller_cids']:'',
					stuff_status:hot_list[j]['stuff_status']?hot_list[j]['stuff_status']:'1',
					location_state:hot_list[j]['productArea']?hot_list[j]['productArea']:'',
					location_city:hot_list[j]['productAreaCity']?hot_list[j]['productAreaCity']:'',
					item_type:hot_list[j]['item_type']?hot_list[j]['item_type']:'1',
					price:hot_list[j]['sell_price']?hot_list[j]['sell_price']:'',
					auction_increment:hot_list[j]['auction_increment']?hot_list[j]['auction_increment']:'0',
					num:hot_list[j]['storenum']?hot_list[j]['storenum']:'',
					valid_thru:hot_list[j]['valid_thru']?hot_list[j]['valid_thru']:'7',
					freight_payer:hot_list[j]['freight_payer']?hot_list[j]['freight_payer']:'2',
					post_fee:hot_list[j]['post_fee']?hot_list[j]['post_fee']:'1.03',
					ems_fee:hot_list[j]['ems_fee']?hot_list[j]['ems_fee']:'4.49',
					express_fee:hot_list[j]['express_fee']?hot_list[j]['express_fee']:'0',
					has_invoice:hot_list[j]['has_invoice']?hot_list[j]['has_invoice']:'0',
					has_warranty:hot_list[j]['has_warranty']?hot_list[j]['has_warranty']:'0',
					approve_status:hot_list[j]['approve_status']?hot_list[j]['approve_status']:'1',
					has_showcase:hot_list[j]['has_showcase']?hot_list[j]['has_showcase']:'1',
					list_time:hot_list[j]['list_time']?hot_list[j]['list_time']:'',	
					description:hot_list[j]['description']?hot_list[j]['description']:'',
					cateProps:hot_list[j]['cateProps']?hot_list[j]['cateProps']:'',
					postage_id:hot_list[j]['postage_id']?hot_list[j]['postage_id']:'27817412700',
					has_discount:hot_list[j]['has_discount']?hot_list[j]['has_discount']:'0',
					modified:hot_list[j]['modified']?hot_list[j]['modified']:'',
					upload_fail_msg:hot_list[j]['upload_fail_msg']?hot_list[j]['upload_fail_msg']:'200',
					picture_status:hot_list[j]['picture_status']?hot_list[j]['picture_status']:'1',
					auction_point:hot_list[j]['auction_point']?hot_list[j]['auction_point']:'0',
					picture:hot_list[j]['picture']?hot_list[j]['picture']:'',
					video:hot_list[j]['video']?hot_list[j]['video']:'',
					skuProps:hot_list[j]['skuProps']?hot_list[j]['skuProps']:'',
					inputPids:hot_list[j]['inputPids']?hot_list[j]['inputPids']:'',
					inputValues:hot_list[j]['inputValues']?hot_list[j]['inputValues']:'',
					outer_id:hot_list[j]['outer_id']?hot_list[j]['outer_id']:'',
					propAlias:hot_list[j]['propAlias']?hot_list[j]['propAlias']:'',
					auto_fill:hot_list[j]['auto_fill']?hot_list[j]['auto_fill']:'',
					num_id:hot_list[j]['goods_id']?hot_list[j]['goods_id']:'',
					local_cid:hot_list[j]['local_cid']?hot_list[j]['local_cid']:'0',
					navigation_type:hot_list[j]['navigation_type']?hot_list[j]['navigation_type']:'2',
					user_name:hot_list[j]['user_name']?hot_list[j]['user_name']:'',
					syncStatus:hot_list[j]['syncStatus']?hot_list[j]['syncStatus']:'1',
					is_lighting_consigment:hot_list[j]['is_lighting_consigment']?hot_list[j]['is_lighting_consigment']:'200',
					is_xinpin:hot_list[j]['is_xinpin']?hot_list[j]['is_xinpin']:'116',
					foodparame:hot_list[j]['foodparame']?hot_list[j]['foodparame']:'',
					features:hot_list[j]['features']?hot_list[j]['features']:'',
					buyareatype:hot_list[j]['buyareatype']?hot_list[j]['buyareatype']:'0',
					global_stock_type:hot_list[j]['global_stock_type']?hot_list[j]['global_stock_type']:'-1',
					global_stock_country:hot_list[j]['global_stock_country']?hot_list[j]['global_stock_country']:'',
					sub_stock_type:hot_list[j]['global_stock_country']?hot_list[j]['global_stock_country']:'1',
					item_size:hot_list[j]['item_size']?hot_list[j]['item_size']:'',
					item_weight:hot_list[j]['item_weight']?hot_list[j]['item_weight']:'',
					sell_promise:hot_list[j]['sell_promise']?hot_list[j]['sell_promise']:'0',
					custom_design_flag:hot_list[j]['custom_design_flag']?hot_list[j]['custom_design_flag']:'0',
					wireless_desc:hot_list[j]['wireless_desc']?hot_list[j]['wireless_desc']:'',
					barcode:hot_list[j]['barcode']?hot_list[j]['barcode']:'',
					sku_barcode:hot_list[j]['sku_barcode']?hot_list[j]['sku_barcode']:'',
					newprepay:hot_list[j]['newprepay']?hot_list[j]['newprepay']:'1',
					subtitle:hot_list[j]['subtitle']?hot_list[j]['subtitle']:'',
					cpv_memo:hot_list[j]['cpv_memo']?hot_list[j]['cpv_memo']:'',
					input_custom_cpv:hot_list[j]['input_custom_cpv']?hot_list[j]['input_custom_cpv']:'',
					qualification:hot_list[j]['qualification']?hot_list[j]['qualification']:'',
					add_qualification:hot_list[j]['add_qualification']?hot_list[j]['add_qualification']:'',
					o2o_bind_service:hot_list[j]['o2o_bind_service']?hot_list[j]['o2o_bind_service']:'',
					tmall_extend:hot_list[j]['tmall_extend']?hot_list[j]['tmall_extend']:'',	
					product_combine:hot_list[j]['product_combine']?hot_list[j]['product_combine']:'',
					tmall_item_prop_combine:hot_list[j]['tmall_item_prop_combine']?hot_list[j]['tmall_item_prop_combine']:'',
					taoschema_extend:hot_list[j]['tmall_item_prop_combine']?hot_list[j]['tmall_item_prop_combine']:''
				}
				this.tableData.push(hot_goods) ;
			}
		    const list = this.tableData;  //把要导出的数据tableData存到list
		    const data = this.formatJson(filterVal, list);
		    export_json_to_excel(tHeader, data, 'HotGoodsList');//最后一个是表名字
		  })
		},
		
		formatJson(filterVal, jsonData) {
		  return jsonData.map(v => filterVal.map(j => v[j]))
		},
		
		get_emall_list(){
			let para = {
				username:this.username,
				access_token:this.access_token,
				shop_type:this.shop_type,
				lang:this.lang,
				type:1, //
			}
			//console.log('get_emall_list para:',para);
			getEmallList(para).then(res => {
				/*
				this.$message({
			     message: 'Completed!',
			     type: 'success',
			     duration: 1000
			   });
			   */
			   this.emall_list = res 
			   console.log('get_emall_list return:',res);
			})
			.catch(err=>{
				console.log('get_emall_list err:',err)
			});
		},
		
		goods_detail(goods_index=0){
			//this.$router.push({path:'/myhot/goodsedit',query:{goods_name:goods_name,goods_id:goods_id,goods_from:goods_from}});
			let goods_para = JSON.stringify(this.list[goods_index])
			let routeUrl = this.$router.resolve({
			    path: "/goodsedit",
			    query: {
					goods_para:goods_para,
				}
			  });
			  console.log('goods_detail goods_para:',goods_para)
			  window.open(routeUrl.href, '_self'); //_self _blank
		},
		
		goto_materialurl(goods_index=0){
			let url = this.list[goods_index].materialUrl
			window.open(url, '_blank');
		},
     
		html_view(goods_index=0) {
			let url = this.list[goods_index].materialUrl
			let name  = this.list[goods_index].name
		
			let routeUrl = this.$router.resolve({
			    path: "/htmlview",
			    query: {
					url:url,
					name:name,
				}
			});
			  
			window.open(routeUrl.href, '_self'); //_self _blank
		},
		
		get_goods_list(is_search=0) {
			this.listLoading = true;
			let pagenum = getToken('Pagenum_hot')
			this.paginations.pageIndex = pagenum?parseInt(pagenum):this.paginations.pageIndex
			let para = {
				username:this.username,
				access_token:this.access_token,
				pagesize:this.paginations.pageSize,
				page:this.paginations.pageIndex,
				goods_id:this.goods_id,
				shop_type:this.shop_type,
				lang:this.lang,
			}
			if(is_search == 1){
				para['page'] = this.listQuery.pageNum
				para['query_info'] = this.listQuery
			}else if(is_search == 2){
				para['type'] = 1 //全部导出查询
			}
		//console.log('get_goods_list para:',para);
			getMyWarehouse(para).then(res => {
				let hot_goods_list = []
				for(var i=0;i<res.result.length;i++){
					hot_goods_list.push(res.result[i])
				} 
				this.paginations.total = parseInt(res.total);
				if(is_search == 2){
					this.export_list = hot_goods_list ;
					this.exportExcel()
				}else{
					this.list = hot_goods_list ;
					
				}
				console.log('get_goods_list return:',res);
			})
			.catch(err=>{
				console.log('get_goods_list err:',err)
			});
			this.listLoading = false;
		},
	  
	  getProductSkuSp(row, index) {
	    let spData = JSON.parse(row.spData);
	    if(spData!=null&&index<spData.length){
	      return spData[index].value;
	    }else{
	      return null;
	    }
	  },
      getBrandList() {
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
          this.brandOptions = [];
          let brandList = response.data.list;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        });
      },
	  
      get_goods_category() {
		  let para = {
		  	username:this.username,
		  	access_token:this.access_token,
		  	shop_type:this.shop_type,
		  	lang:this.lang,
			type:0, //多级类目
		  }
		  //this.productCateOptions = this.goods_category ;
		  //console.log('get_goods_category para:',para);
		  getGoodsCategory(para).then(res => {
			/*
		  	this.$message({
		       message: 'Completed!',
		       type: 'success',
		       duration: 1000
		     });
			*/
		    let goods_category = res
		    for(var i=0;i<goods_category.length;i++){
		    	this.goods_category.push(goods_category[i])
		    } 
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
	  get_goods_supply() {
		let para = {
			username:this.username,
			access_token:this.access_token,
			shop_type:this.shop_type,
			lang:this.lang,
			type:0, //
		}
		this.productCateOptions = this.goods_category ;
		//console.log('get_goods_category para:',para);
		getGoodsSupply(para).then(res => {
	  			/*
	  		  	this.$message({
	  		       message: 'Completed!',
	  		       type: 'success',
	  		       duration: 1000
	  		     });
	  			*/
			let goods_supply = res
			for(var i=0;i<goods_supply.length;i++){
				this.goods_supply.push(goods_supply[i])
			} 
			console.log('get_goods_supply return:',res);
		})
		.catch(err=>{
			console.log('get_goods_supply err:',err)
		});
	  },
	  
		handleShowSkuEditDialog(index,row){
			this.editSkuInfo.dialogVisible=true;
			this.editSkuInfo.productId=row.id;
			this.editSkuInfo.productSn=row.productSn;
			this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId;
			this.editSkuInfo.keyword=null;
			fetchSkuStockList(row.id,{keyword:this.editSkuInfo.keyword}).then(response=>{
				this.editSkuInfo.stockList=response.data;
			});
			if(row.productAttributeCategoryId!=null){
				fetchProductAttrList(row.productAttributeCategoryId,{type:0}).then(response=>{
				this.editSkuInfo.productAttr=response.data.list;
			});
			}
		},
      
		handleSearchEditSku(){
			fetchSkuStockList(this.editSkuInfo.productId,{keyword:this.editSkuInfo.keyword}).then(response=>{
				this.editSkuInfo.stockList=response.data;
			});
		},
		
		add_hot_confirm(formName) {
	         this.$refs[formName].validate((valid) => {
	           if (valid) {
				   if(this.addhotgoodsInfo.goodsFromId==0 ||this.addhotgoodsInfo.productName=='' ||this.addhotgoodsInfo.productId=='' ||!this.addhotgoodsInfo.productLink ){
						this.$message({
						  message: '输入信息不完整!',
						  type: 'warn',
						  duration: 1000
						});
						console.log('add_hot_confirm 输入信息有误');
						return false;
					}else{
						this.$confirm('是否要添加', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
							}).then(()=>{
							let para = {
								username:this.username,
								access_token:this.access_token,
								type:1, //
								goods_org:2, //第三方商品
							    goods_from_id:this.addhotgoodsInfo.goodsFromId[0],
								goods_from_sku:this.addhotgoodsInfo.productId,
								goods_from_link:this.addhotgoodsInfo.productLink,
								goods_name:this.addhotgoodsInfo.productName,
								shop_type:this.shop_type,
								lang:this.lang,
							}
							console.log('add_hot_confirm para:',para);
							addMyWarehouse(para).then(res => {
								this.$message({
									message: 'Completed!',
									type: 'success',
									duration: 1000
								});
								this.addhotgoodsInfo.dialogVisible=false;
								console.log('add_hot_confirm return:',res);
								this.get_goods_list();
							})
							.catch(err=>{
								console.log('add_hot_confirm err:',err)
							});
						});
					}
				} else {
					console.log('add_hot_confirm 输入信息有误');
					return false;
				}
			});
		},
      
	
		search() {
			this.listQuery.pageNum = 1;
			this.get_goods_list(1);
		},
	
		add_hot_goods() {
			this.addhotgoodsInfo.dialogVisible = !this.addhotgoodsInfo.dialogVisible
		},
	
	handleBatchOperate() {
        if(this.operateType==null){
          this.$message({
            message: '请选择操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的商品',
            type: 'warning',
            duration: 1000
          });
          return;
        }
		if(this.emall_id==null){
		  this.$message({
		    message: '请选择电商平台',
		    type: 'warning',
		    duration: 1000
		  });
		  return;
		}
        this.$confirm('是否进行该批量操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          switch (this.operateType) {
            case this.operates[0].value:
              this.goods_up_down(1,ids);
              break;
            case this.operates[1].value:
              this.goods_up_down(0,ids);
              break;
            case this.operates[2].value:
              this.goods_recomm_set(1,ids);
              break;
            case this.operates[3].value:
              this.goods_recomm_set(0,ids);
              break;
            case this.operates[4].value:
              this.goods_new_set(1,ids);
              break;
            case this.operates[5].value:
              this.goods_new_set(0,ids);
              break;
            case this.operates[6].value:
              this.goods_cancel_set(1,ids);
              break;
            default:
              break;
          }
          this.get_goods_list();
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
	   setToken("Pagenum_hot",this.paginations.pageIndex)
	   this.get_goods_list();
	},
	
    
	handleSelectionChange(val) {
		this.multipleSelection = val;
	},
    
	handlePublishStatusChange(index, row) {
		let ids = [];
        ids.push(row.id);
        this.updatePublishStatus(row.publishStatus, ids);
	
	},
	
	handleNewStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateNewStatus(row.newStatus, ids);
	},
	
	handleRecommendStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateRecommendStatus(row.recommandStatus, ids);
	},
    
	handleResetSearch() {
        this.selectProductCateValue = [];
		this.selectGoodsSupplyValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
	},
    
		handleDelete(index, row){
			this.$confirm('是否要进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
			let ids = [];
			ids.push(row.id);
			this.updateDeleteStatus(1,ids);
			});
		},
	
		handleUpdateProduct(index,row){
			this.$router.push({path:'/pms/updateProduct',query:{id:row.id}});
		},
	
		handleShowProduct(index,row){
			console.log("handleShowProduct",row);
		},
		
		handleShowVerifyDetail(index,row){
			console.log("handleShowVerifyDetail",row);
		},
		
		handleShowLog(index,row){
			console.log("handleShowLog",row);
		},
	  
		goods_up_down(updown, ids) {
			let params = new URLSearchParams();
			params.append('ids', ids);
			params.append('publishStatus', updown);
			if(this.emall_id){
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					goods_ids:ids,
					emall_id:this.emall_id,
					updown:updown,  //0下架 1上架
				}
				console.log("goods_up_down para:",para,' ids:',ids);
				goodsUpDown(para).then(response => {
				this.$message({
					message: 'Completed',
					type: 'success',
					duration: 1000
					});
				});
			}else{
				this.$message({
					message: '请选则电商平台',
					type: 'warn',
					duration: 2000
				}); 
			}
		},
	  
		goods_new_set(new_status, ids) {
			let params = new URLSearchParams();
			params.append('ids', ids);
			params.append('newStatus', new_status);
			
			if(this.emall_id){
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					goods_ids:ids,
					emall_id:this.emall_id,
					new_status:new_status,  //1新品 0取消新品
				}
				console.log("goods_new_set para:",para,' ids:',ids);
				goodsNewSet(para).then(response => {
				this.$message({
					message: 'Completed',
					type: 'success',
					duration: 1000
					});
				});
			}else{
				this.$message({
					message: '请选则电商平台',
					type: 'warn',
					duration: 2000
				}); 
			}
		},
	  
		goods_recomm_set(recommend_status, ids) {
			let params = new URLSearchParams();
			params.append('ids', ids);
			params.append('recommendStatus', recommend_status);
			if(this.emall_id){
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					goods_ids:ids,
					emall_id:this.emall_id,
					recommend_status:recommend_status,  //1推荐 0取消推荐
				}
				console.log("goods_recomm_set para:",para,' ids:',ids);
				goodsRecommSet(para).then(response => {
					this.$message({
						message: 'Completed!',
						type: 'success',
						duration: 1000
					});
				});
			}else{
				this.$message({
					message: '请选则电商平台',
					type: 'warn',
					duration: 2000
				}); 
			}
		},
		
		/*
		updateDeleteStatus(deleteStatus, ids) {
			let params = new URLSearchParams();
			params.append('ids', ids);
			params.append('deleteStatus', deleteStatus);
		},
		*/
	   
		delete_mywarehouse(index, row){
			let para = {
				username:this.username,
				access_token:this.access_token,
				shop_type:this.shop_type,
				lang:this.lang,
				goods_id:row.id,
			}
			this.$confirm('是否要删除', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(()=>{
			  deleteGoodsWarehouse(para).then(res => {
			  	this.$message({
			  		message: 'Success!',
			  		type: 'success',
			  		duration: 1000
			  	});
			  	this.list = [] ;
			  	this.get_goods_list();
			  	console.log('deleteGoodsWarehouse return:',res);
			  })
			  .catch(err=>{
			  	console.log('deleteGoodsWarehouse err:',err)
			  });
			})
		},
	  
		get_mywarehouse(){
			let para = {
				username:this.username,
				access_token:this.access_token,
				shop_type:this.shop_type,
				lang:this.lang,
			}
			console.log('get_mywarehouse para:',para);
			getMyWarehouse(para).then(res => {
	  		/*
			this.$message({
	  	     message: 'Completed!',
	  	     type: 'success',
	  	     duration: 1000
	  	   });
		   */
			console.log('getMyWarehouse return:',res);
			})
			.catch(err=>{
				console.log('getMyWarehouse err:',err)
			});
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


