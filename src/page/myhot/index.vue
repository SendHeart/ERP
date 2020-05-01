<template> 
  <div class="container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="search()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="search()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="120px">
			<el-form-item label="货源：">
				<el-cascader
				  clearable
				  v-model="listQuery.goodsSupplyId"
				  :options="goods_supply">
				</el-cascader>
			</el-form-item>
			<el-form-item label="所属类目：">
			  <el-cascader
			    clearable
			    v-model="listQuery.goodsCategoryId"
			    :options="goods_category"
				filterable>
			  </el-cascader>
			</el-form-item>
			<el-form-item label="入库时间">
				<el-date-picker
				      v-model="listQuery.storage_in"
				      type="daterange"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			 
			<!--
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input style="width: 203px" v-model="listQuery.productSn" placeholder="商品货号"></el-input>
          </el-form-item>
          
          
          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
		  -->
        </el-form>
      </div>
    </el-card>
	<!--
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>
	-->
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
		<el-table-column label="商品ID" width="100" align="center">
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
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%">
      <span>商品货号：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <el-input placeholder="按sku编号搜索" v-model="editSkuInfo.keyword" size="small" style="width: 50%;margin-left: 20px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
      </el-input>
      <el-table style="width: 100%;margin-top: 20px"
                :data="editSkuInfo.stockList"
                border>
        <el-table-column
          label="SKU编号"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center">
          <template slot-scope="scope">
            {{getProductSkuSp(scope.row,index)}}
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
    </el-dialog>
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
	} from "@/api/user";
	import {
		shop_type,
	} from "@/utils/env" ;
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
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
      return {
		shop_type:shop_type?shop_type:10,
		lang:getToken('lang')||'zh',
		access_token:getToken('Token')||'zh',
		username:getToken('Username')||'',
		goods_id:0,
		scrollTop:0,
        editSkuInfo:{
          dialogVisible:false,
          productId:null,
          productSn:'',
          goodsCategoryId:null,
          stockList:[],
          productAttr:[],
          keyword:null
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
          {
            label: "转移到分类",
            value: "transferCategory"
          },
          {
            label: "移入回收站",
            value: "recycle"
          }
        ],
        operateType: null,
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
		goods_supply:[],
		goods_supply_init: [
			{
				label:'1688',
				value:'1',
				children:[
					{
						label:'全部',
						value:'1_0',
					},
					{
						label:'天天特卖',
						value:'1_1',
						children:[
							{
								label:'全部',
								value:'1_1_0',
								children:'',
							},
							{
								label:'家居百货',
								value:'1_1_1',
								children:'',
							},
							{
								label:'内衣',
								value:'1_1_2',
								children:'',
							},
							{
								label:'母婴童玩',
								value:'1_1_3',
								children:'',
							},
							{
								label:'美妆个护',
								value:'1_1_4',
								children:'',
							},
							{
								label:'服饰配件',
								value:'1_1_5',
								children:'',
							},
							{
								label:'数码家电',
								value:'1_1_6',
								children:'',
							},
							{
								label:'女装',
								value:'1_1_7',
								children:'',
							},
							{
								label:'鞋包',
								value:'1_1_8',
								children:'',
							},
							{
								label:'男装运动',
								value:'1_1_9',
								children:'',
							},
							{
								label:'食品生鲜',
								value:'1_1_10',
								children:'',
							},
						]
					},
					{
						label:'热采排行榜',
						value:'1_2',
						children:[
							{
								label:'全部',
								value:'1_2_0',
								children:'',
							},
							{
								label:'女装',
								value:'1_2_1',
								children:'',
							},
							{
								label:'鞋靴',
								value:'1_2_2',
								children:'',
							},
							{
								label:'内衣',
								value:'1_2_3',
								children:'',
							},
							{
								label:'日用百货',
								value:'1_2_4',
								children:'',
							},
							{
								label:'童装',
								value:'1_2_5',
								children:'',
							},
							{
								label:'男装',
								value:'1_2_6',
								children:'',
							},
							{
								label:'饰品',
								value:'1_2_7',
								children:'',
							},
							{
								label:'服饰配件',
								value:'1_2_8',
								children:'',
							},
							{
								label:'玩具',
								value:'1_2_9',
								children:'',
							},
							{
								label:'箱包皮具',
								value:'1_2_10',
								children:'',
							},
							{
								label:'美妆',
								value:'1_2_11',
								children:'',
							},
							{
								label:'运动服饰',
								value:'1_2_12',
								children:'',
							},
							{
								label:'运动装备',
								value:'1_2_13',
								children:'',
							},
							{
								label:'个护家清',
								value:'1_2_14',
								children:'',
							},
							{
								label:'家居饰品',
								value:'1_2_15',
								children:'',
							},
							{
								label:'床上用品',
								value:'1_2_16',
								children:'',
							},
							{
								label:'毛巾巾类',
								value:'1_2_17',
								children:'',
							},
							{
								label:'数码电脑',
								value:'1_2_18',
								children:'',
							},
							{
								label:'家用电器',
								value:'1_2_19',
								children:'',
							},
							{
								label:'食品生鲜',
								value:'1_2_20',
								children:'',
							},
							{
								label:'母婴用品',
								value:'1_2_21',
								children:'',
							},
							{
								label:'办公文教',
								value:'1_2_22',
								children:'',
							},
							{
								label:'家装建材',
								value:'1_2_23',
								children:'',
							},
							{
								label:'包装辅料',
								value:'1_2_24',
								children:'',
							},
							{
								label:'电工电气',
								value:'1_2_25',
								children:'',
							},
							{
								label:'五金工具',
								value:'1_2_26',
								children:'',
							},
							{
								label:'安全防护',
								value:'1_2_27',
								children:'',
							},
							{
								label:'照明工业',
								value:'1_2_28',
								children:'',
							},
						]
					},
					{
						label:'利润爆款榜',
						value:'1_3',
						children:[
							{
								label:'全部',
								value:'1_3_0',
								children:'',
							},
							{
								label:'女装',
								value:'1_3_1',
								children:'',
							},
							{
								label:'鞋靴',
								value:'1_3_2',
								children:'',
							},
							{
								label:'内衣',
								value:'1_3_3',
								children:'',
							},
							{
								label:'日用百货',
								value:'1_3_4',
								children:'',
							},
							{
								label:'童装',
								value:'1_3_5',
								children:'',
							},
							{
								label:'男装',
								value:'1_3_6',
								children:'',
							},
							{
								label:'饰品',
								value:'1_3_7',
								children:'',
							},
							{
								label:'服饰配件',
								value:'1_3_8',
								children:'',
							},
							{
								label:'玩具',
								value:'1_3_9',
								children:'',
							},
							{
								label:'箱包皮具',
								value:'1_3_10',
								children:'',
							},
							{
								label:'美妆',
								value:'1_3_11',
								children:'',
							},
							{
								label:'运动服饰',
								value:'1_3_12',
								children:'',
							},
							{
								label:'运动装备',
								value:'1_3_13',
								children:'',
							},
							{
								label:'个护家清',
								value:'1_3_14',
								children:'',
							},
							{
								label:'家居饰品',
								value:'1_3_15',
								children:'',
							},
							{
								label:'床上用品',
								value:'1_3_16',
								children:'',
							},
							{
								label:'毛巾巾类',
								value:'1_3_17',
								children:'',
							},
							{
								label:'数码电脑',
								value:'1_3_18',
								children:'',
							},
							{
								label:'家用电器',
								value:'1_3_19',
								children:'',
							},
							{
								label:'食品生鲜',
								value:'1_3_20',
								children:'',
							},
							{
								label:'母婴用品',
								value:'1_3_21',
								children:'',
							},
							{
								label:'办公文教',
								value:'1_3_22',
								children:'',
							},
							{
								label:'家装建材',
								value:'1_3_23',
								children:'',
							},
							{
								label:'包装辅料',
								value:'11',
								children:'',
							},
							{
								label:'电工电气',
								value:'1_3_24',
								children:'',
							},
							{
								label:'五金工具',
								value:'1_3_25',
								children:'',
							},
							{
								label:'安全防护',
								value:'1_3_26',
								children:'',
							},
							{
								label:'照明工业',
								value:'1_3_27',
								children:'',
							},
						]
					},
					{
						label:'预测热卖榜',
						value:'1_4',
						children:[
							{
								label:'全部',
								value:'1_4_0',
								children:'',
							},
							{
								label:'女装',
								value:'1_4_1',
								children:'',
							},
							{
								label:'鞋靴',
								value:'1_4_2',
								children:'',
							},
							{
								label:'内衣',
								value:'1_4_3',
								children:'',
							},
							{
								label:'日用百货',
								value:'1_4_4',
								children:'',
							},
							{
								label:'童装',
								value:'1_4_5',
								children:'',
							},
							{
								label:'男装',
								value:'1_4_6',
								children:'',
							},
							{
								label:'饰品',
								value:'1_4_7',
								children:'',
							},
							{
								label:'服饰配件',
								value:'1_4_8',
								children:'',
							},
							{
								label:'玩具',
								value:'1_4_9',
								children:'',
							},
							{
								label:'箱包皮具',
								value:'1_4_10',
								children:'',
							},
							{
								label:'美妆',
								value:'1_4_11',
								children:'',
							},
							{
								label:'运动服饰',
								value:'1_4_12',
								children:'',
							},
							{
								label:'运动装备',
								value:'1_4_13',
								children:'',
							},
							{
								label:'个护家清',
								value:'1_4_14',
								children:'',
							},
							{
								label:'家居饰品',
								value:'1_4_15',
								children:'',
							},
							{
								label:'床上用品',
								value:'1_4_16',
								children:'',
							},
							{
								label:'毛巾巾类',
								value:'1_4_17',
								children:'',
							},
							{
								label:'数码电脑',
								value:'1_4_18',
								children:'',
							},
							{
								label:'家用电器',
								value:'1_4_19',
								children:'',
							},
							{
								label:'食品生鲜',
								value:'1_4_20',
								children:'',
							},
							{
								label:'母婴用品',
								value:'1_4_21',
								children:'',
							},
							{
								label:'办公文教',
								value:'1_4_22',
								children:'',
							},
							{
								label:'家装建材',
								value:'1_4_23',
								children:'',
							},
							{
								label:'包装辅料',
								value:'11',
								children:'',
							},
							{
								label:'电工电气',
								value:'1_4_24',
								children:'',
							},
							{
								label:'五金工具',
								value:'1_4_25',
								children:'',
							},
							{
								label:'安全防护',
								value:'1_4_26',
								children:'',
							},
							{
								label:'照明工业',
								value:'1_4_27',
								children:'',
							},
						]
					},
					{
						label:'昆明产业带',
						value:'1_5',
						children:[
							{
								label:'全部',
								value:'1_5_0',
								children:'',
							},
							{
								label:'核心卖家热销',
								value:'11',
								children:'',
							},
							{
								label:'复购热销',
								value:'1_5_1',
								children:'',
							},
							{
								label:'近期热销',
								value:'1_5_2',
								children:'',
							},
							{
								label:'最受关注',
								value:'1_5_3',
								children:'',
							},
						]
					},
					{
						label:'广州产业带',
						value:'1_6',
						children:[
							{
								label:'全部',
								value:'1_6_0',
								children:'',
							},
							{
								label:'近期热销',
								value:'1_6_1',
								children:'',
							},
							{
								label:'复购热销',
								value:'1_6_2',
								children:'',
							},
							{
								label:'核心卖家热销',
								value:'1_6_3',
								children:'',
							},
							{
								label:'最受关注',
								value:'1_6_4',
								children:'',
							},
						]
					},
					{
						label:'杭州产业带',
						value:'1_7',
						children:[
							{
								label:'全部',
								value:'1_7_0',
								children:'',
							},
							{
								label:'最受关注',
								value:'1_7_1',
								children:'',
							},
							{
								label:'近期热销',
								value:'1_7_2',
								children:'',
							},
						]
					},
				],
				icon:''
			},
		],
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
		    pageSizes: [5, 10, 15, 20],  //每页显示多少条
		    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
		},
		goods_category:[],
      }
    },
    created() {
     this.get_goods_list();
     this.get_mywarehouse();
     this.get_goods_category();
	 this.get_goods_supply();
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
			}
		//console.log('get_goods_list para:',para);
			getMyWarehouse(para).then(res => {
			/*
			this.$message({
		     message: 'Completed!',
		     type: 'success',
		     duration: 1000
		   });
		   */
				this.list = []
				for(var i=0;i<res.result.length;i++){
					this.list.push(res.result[i])
				} 
				this.paginations.total = parseInt(res.total);
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
      handleEditSkuConfirm(){
        if(this.editSkuInfo.stockList==null||this.editSkuInfo.stockList.length<=0){
          this.$message({
            message: '暂无sku信息',
            type: 'warning',
            duration: 1000
          });
          return
        }
        this.$confirm('是否要进行修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          updateSkuStockList(this.editSkuInfo.productId,this.editSkuInfo.stockList).then(response=>{
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.editSkuInfo.dialogVisible=false;
          });
        });
      },
      search() {
        this.listQuery.pageNum = 1;
        this.get_goods_list(1);
      },
      handleAddProduct() {
        this.$router.push({path:'/pms/addProduct'});
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
        this.$confirm('是否要进行该批量操作?', '提示', {
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
              this.updatePublishStatus(1,ids);
              break;
            case this.operates[1].value:
              this.updatePublishStatus(0,ids);
              break;
            case this.operates[2].value:
              this.updateRecommendStatus(1,ids);
              break;
            case this.operates[3].value:
              this.updateRecommendStatus(0,ids);
              break;
            case this.operates[4].value:
              this.updateNewStatus(1,ids);
              break;
            case this.operates[5].value:
              this.updateNewStatus(0,ids);
              break;
            case this.operates[6].value:
              break;
            case this.operates[7].value:
              this.updateDeleteStatus(1,ids);
              break;
            default:
              break;
          }
          this.get_goods_list();
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.get_goods_list();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
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
      updatePublishStatus(publishStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('publishStatus', publishStatus);
        updatePublishStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateNewStatus(newStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('newStatus', newStatus);
        updateNewStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateRecommendStatus(recommendStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('recommendStatus', recommendStatus);
        updateRecommendStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateDeleteStatus(deleteStatus, ids) {
		let params = new URLSearchParams();
		params.append('ids', ids);
		params.append('deleteStatus', deleteStatus);
      },
	  
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
	  float: right;
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


