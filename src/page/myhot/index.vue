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
				  :options="goodsSupplyOptions">
				</el-cascader>
			</el-form-item>
			<el-form-item label="所属类目：">
			  <el-cascader
			    clearable
			    v-model="listQuery.goodsCategoryId"
			    :options="productCateOptions"
				filterable>
			  </el-cascader>
			</el-form-item>
			<el-form-item label="入库时间(从)：">
			  <el-date-picker
			    class="input-width"
			    v-model="listQuery.storage_in"
			    value-format="yyyy-MM-dd"
			    type="date"
			    placeholder="请选择入库时间">
			  </el-date-picker>
			  至
			  <el-date-picker
			    class="input-width"
			    v-model="listQuery.storage_out"
			    value-format="yyyy-MM-dd"
			    type="date"
			    placeholder="请选择入库时间">
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
				<div style="display: flex;flex-direction: row;justify-content: flex-start;"  @click="goods_detail(scope.$index)">
					<img style="height: 80px" :src="scope.row.img" >
					<div style="margin-left:5px; display: flex;flex-direction: column;justify-content: flex-start;">
						<p style="text-align: left;">{{scope.row.name}}</p>
						<p style="text-align: left;">品牌：{{scope.row.brandName}}</p>
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
		goodsSupplyOptions: [
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
		goods_category:[
			{
				label:'女装',
				value:'1',
				children:[
					{
						label:'裙装',
						value:'1_1',
						children:[
							{
								label:'连衣裙',
								value:'1_1_1',
								children:'',
							},
							{
								label:'A字裙',
								value:'1_1_2',
								children:'',
							},
							{
								label:'半身裙',
								value:'1_1_3',
								children:'',
							},
							{
								label:'针织裙',
								value:'1_1_4',
								children:'',
							},
							{
								label:'背带裙',
								value:'1_1_5',
								children:'',
							},
							{
								label:'鱼尾裙',
								value:'1_1_6',
								children:'',
							},
						]
					},
					{
						label:'外套',
						value:'1_2',
						children:[
							{
								label:'西装',
								value:'1_2_1',
								children:'',
							},
							{
								label:'外套新品',
								value:'1_2_2',
								children:'',
							},
							{
								label:'棒球服',
								value:'1_2_3',
								children:'',
							},
						]
					},
					{
						label:'裤装',
						value:'1_3',
						children:[
							{
								label:'牛仔裤',
								value:'1_3_1',
								children:'',
							},
							{
								label:'休闲裤',
								value:'1_3_2',
								children:'',
							},
							{
								label:'打底裤',
								value:'1_3_3',
								children:'',
							},
							{
								label:'运动裤',
								value:'1_3_4',
								children:'',
							},
							{
								label:'背带裤',
								value:'1_3_5',
								children:'',
							},
							{
								label:'阔腿裤',
								value:'1_3_6',
								children:'',
							},
						]
					},
					{
						label:'特色女装',
						value:'1_4',
						children:[
							{
								label:'大码女装',
								value:'1_4_1',
								children:'',
							},
							{
								label:'中老年女装',
								value:'1_4_2',
								children:'',
							},
							{
								label:'婚纱礼服',
								value:'1_4_3',
								children:'',
							},
							{
								label:'中式旗袍',
								value:'1_4_4',
								children:'',
							},
							{
								label:'汉服',
								value:'1_4_5',
								children:'',
							},
						]
					},
					{
						label:'外套',
						value:'1_5',
						children:[
							{
								label:'针织开衫',
								value:'1_5_1',
								children:'',
							},
							{
								label:'卫衣绒衫',
								value:'1_5_2',
								children:'',
							},
							{
								label:'背心吊带',
								value:'1_5_3',
								children:'',
							},
							{
								label:'雪纺纱',
								value:'1_5_4',
								children:'',
							},
							{
								label:'内搭新品',
								value:'1_5_5',
								children:'',
							},
						]
					},
					{
						label:'内搭',
						value:'1_6',
						children:[
							{
								label:'针织开衫',
								value:'1_6_1',
								children:'',
							},
							{
								label:'卫衣绒衫',
								value:'1_6_2',
								children:'',
							},
							{
								label:'背心吊带',
								value:'1_6_3',
								children:'',
							},
							{
								label:'雪纺纱',
								value:'1_6_4',
								children:'',
							},
							{
								label:'内搭新品',
								value:'1_6_5',
								children:'',
							},
						]
					},
				],
				icon:''
			},
			{
				label:'男装',
				value:'2',
				children:[
					{
						label:'套装',
						value:'2_1',
						children:[
							{
								label:'西服套装',
								value:'2_1_1',
								children:'',
							},
							{
								label:'休闲套装',
								value:'2_1_2',
								children:'',
							},
							{
								label:'运动套装',
								value:'2_1_3',
								children:'',
							},
						]
					},
					{
						label:'内搭',
						value:'2_2',
						children:[
							{
								label:'T恤',
								value:'2_2_1',
								children:'',
							},
							{
								label:'polo衫',
								value:'2_2_2',
								children:'',
							},
							{
								label:'衬衫',
								value:'2_2_3',
								children:'',
							},
							{
								label:'毛衣',
								value:'2_2_4',
								children:'',
							},
							{
								label:'针织衫',
								value:'2_2_5',
								children:'',
							},
						]
					},
					{
						label:'外套',
						value:'2_3',
						children:[
							{
								label:'西装',
								value:'2_3_1',
								children:'',
							},
							{
								label:'外套背心',
								value:'2_3_2',
								children:'',
							},
							{
								label:'防晒衣',
								value:'2_3_3',
								children:'',
							},
							{
								label:'套头外衣',
								value:'2_3_4',
								children:'',
							},
							{
								label:'马甲',
								value:'2_3_4',
								children:'',
							},
							{
								label:'风衣',
								value:'2_3_5',
								children:'',
							},
							{
								label:'春夏夹克',
								value:'2_3_6',
								children:'',
							},
							{
								label:'PU皮衣',
								value:'2_3_7',
								children:'',
							},
							{
								label:'棒球服',
								value:'2_3_8',
								children:'',
							},
						]
					},
					{
						label:'裤装',
						value:'2_4',
						children:[
							{
								label:'牛仔长裤',
								value:'2_4_1',
								children:'',
							},
							{
								label:'七分裤',
								value:'2_4_2',
								children:'',
							},
							{
								label:'沙滩裤',
								value:'2_4_3',
								children:'',
							},
							{
								label:'西裤',
								value:'2_4_4',
								children:'',
							},
							{
								label:'小脚裤',
								value:'2_4_5',
								children:'',
							},
						]
					},
					 
				],
				icon:''
			},
			{
				label:'内衣',
				value:'3',
				children:[
					{
						label:'男子内衣',
						value:'3_1',
						children:[
							{
								label:'男士内裤',
								value:'3_1_1',
								children:'',
							},
							{
								label:'男士棉袜',
								value:'3_1_2',
								children:'',
							},
							{
								label:'男士船袜',
								value:'3_1_2',
								children:'',
							},
							{
								label:'商务袜',
								value:'3_1_3',
								children:'',
							},
							{
								label:'男士睡衣',
								value:'3_1_4',
								children:'',
							},
						]
					},
					{
						label:'女子内衣',
						value:'3_2',
						children:[
							{
								label:'女士内裤',
								value:'3_2_1',
								children:'',
							},
							{
								label:'女士棉袜',
								value:'3_2_2',
								children:'',
							},
							{
								label:'女士船袜',
								value:'3_2_3',
								children:'',
							},
							{
								label:'美腿袜',
								value:'3_2_4',
								children:'',
							},
							{
								label:'堆堆袜',
								value:'3_2_4',
								children:'',
							},
						]
					},
					{
						label:'袜子',
						value:'3_3',
						children:[
							{
								label:'运动休闲',
								value:'3_3_1',
								children:'',
							},
							{
								label:'打底袜',
								value:'3_3_2',
								children:'',
							},
							{
								label:'地板袜',
								value:'3_3_3',
								children:'',
							},
							{
								label:'美腿袜',
								value:'3_3_4',
								children:'',
							},
						]
					},
					{
						label:'居家睡衣',
						value:'3_4',
						children:'',
					},
					{
						label:'舒适馆',
						value:'3_5',
						children:'',
					},
					{
						label:'内裤',
						value:'3_6',
						children:'',
					},
					{
						label:'塑身情趣',
						value:'3_7',
						children:'',
					},
					{
						label:'背心裹胸',
						value:'3_8',
						children:'',
					},
				],
				icon:''
			},
			{
				label:'运动服饰',
				value:'4',
				children:[
					{
						label:'男子鞋服',
						value:'4_1',
						children:'',
					},
					{
						label:'女子鞋服',
						value:'4_2',
						children:'',
					},
					{
						label:'骑行用品',
						value:'4_3',
						children:'',
					},
					{
						label:'舞蹈',
						value:'4_4',
						children:'',
					},
					{
						label:'瑜伽健身',
						value:'4_5',
						children:'',
					},
					{
						label:'运动配件',
						value:'4_6',
						children:'',
					},
					{
						label:'热销精品',
						value:'4_7',
						children:'',
					},
				],
				icon:''
			},
			{
				label:'3C数码',
				value:'5',
				children:[
					{
						label:'手机配件',
						value:'5_1',
						children:[
							{
								label:'手游装备',
								value:'5_1_1',
								children:'',
							},
							{
								label:'手机膜',
								value:'5_1_2',
								children:'',
							},
							{
								label:'数据线',
								value:'5_1_3',
								children:'',
							},
							{
								label:'蓝牙耳机',
								value:'5_1_4',
								children:'',
							},
							{
								label:'移动电源',
								value:'5_1_5',
								children:'',
							},
							{
								label:'充电器',
								value:'5_1_6',
								children:'',
							},
						]
					},
					{
						label:'智能设备',
						value:'5_2',
						children:[
							{
								label:'智能手表',
								value:'5_2_1',
								children:'',
							},
							{
								label:'智能眼镜',
								value:'5_2_2',
								children:'',
							},
							{
								label:'智能手环',
								value:'5_2_3',
								children:'',
							},
							{
								label:'智能机器人',
								value:'5_2_4',
								children:'',
							},
							{
								label:'智能手表带',
								value:'5_2_5',
								children:'',
							},
							{
								label:'儿童智能手表',
								value:'5_2_6',
								children:'',
							},
						]
					},
					{
						label:'电脑周边',
						value:'5_3',
						children:'',
					},
					{
						label:'电脑',
						value:'5_4',
						children:'',
					},
					 
				],
				icon:''
			},
			{
				name:'日用百货',
				value:'6',
				children:[],
				icon:''
			},
			{
				label:'家电',
				value:'7',
				children:[],
				icon:''
			},
			{
				label:'箱包',
				value:'8',
				children:[],
				icon:''
			},
			{
				label:'配饰',
				value:'9',
				children:[],
				icon:''
			},
			{
				label:'鞋靴',
				value:'10',
				children:[],
				icon:''
			}
		],
		
		hot_goods_list:[
			{
				id:'1',
				goods_id:'1',
				name:'厂家批发多功能美容仪家用美白祛痘离子导入仪脸部按摩仪礼品套装',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/291/861/12346168192_1472172504.640x640.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'东莞市嘉贝美美容',
				info_from:'1688',
				desc:'',
				sales_desc:'成交2080元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥7.50 - ￥11.00',
			},
			{
				id:'2',
				goods_id:'2',
				name:'创意卡通儿童电动牙刷便携式电池款全自动超声波电动牙刷洗漱用品',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/419/328/12673823914_1472172504.640x640.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'东莞市嘉贝美美容',
				info_from:'1688',
				desc:'',
				sales_desc:'成交277元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥ 0.90  -  ￥ 6.50',
			},
			{
				hot_no:'3',
				goods_id:'3',
				name:'诺仪洗鼻器儿童医用家用鼻腔冲洗器鼻炎电动成人洗鼻器盐水洗鼻机',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/263/718/10889817362_1504341105.640x640.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'广州诺仪电子商务有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交277元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥780.00 - ￥880.00',
			},
			{
				hot_no:'4',
				goods_id:'4',
				name:'夏新家用厨房电烤箱12L多功能定时烘焙烤箱礼品电烤箱网红小烤箱',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/801/971/13028179108_1157205226.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'中山市劲和电器有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交6009元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥59.00 - ￥89.00',
			},
			{
				hot_no:'5',
				goods_id:'5',
				name:'便携式电动冲牙器 去牙结石 水牙线 牙齿家用洗牙器',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/318/800/10315008813_537755685.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'中山市劲和电器有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交5115元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥108.00 - ￥108.00',
			},
			{
				hot_no:'6',
				goods_id:'6',
				name:'厂家批发多功能美容仪家用美白祛痘离子导入仪脸部按摩仪礼品套装',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/291/861/12346168192_1472172504.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'东莞市嘉贝美美容设备有限公司 ',
				info_from:'1688',
				desc:'',
				sales_desc:'成交2080元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥7.50 - ￥11.00',
			},
			{
				hot_no:'7',
				goods_id:'7',
				name:'环保竹木QI无线充USB接口创意形状竹木5瓦手机无线充电器',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/447/199/12315991744_2145207750.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'玛仕智能电子科技（深圳）有限公司 ',
				info_from:'1688',
				desc:'',
				sales_desc:'成交1559元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥15.00 - ￥15.00',
			},
			{
				hot_no:'8',
				goods_id:'8',
				name:'厂家直销57寸黑板高亮笔迹 光能写字板会议教学培训黑科技手写板',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/055/218/12806812550_1035588130.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'东莞市亿辰模具科技有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交1638元',
				sales:'',
				storenum:'100',
				market_price:'',
				storage_time:'2020-01-10 12:12:01',
				sell_price:'￥200.00 - ￥600.00',
			},
			{
				hot_no:'9',
				goods_id:'9',
				name:'电磁炉触摸式大功率火锅煲汤茶炉特价智能商小型光波家用厂家直销',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/249/462/12860264942_144826441.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'中山市荣耀电器科技有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交845元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥110.80 - ￥120.80',
			},
			{
				hot_no:'10',
				goods_id:'10',
				name:'智能i12无线双模蓝牙耳机6h待机无线双耳立体声音乐耳机磁吸盒',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/621/405/12667504126_1450738888.400x400.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'深圳市隆富鑫电子有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交2257元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥30.80 - ￥30.80',
			},
			{
				hot_no:'11',
				goods_id:'11',
				name:'厂家直销手臂式跨境电子血压计全自动语音播报臂式仪器',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2017/725/534/6025435527_1260723814.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'义乌市橙柔电子商务商行',
				info_from:'1688',
				desc:'',
				sales_desc:'成交282元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥55.00 - ￥90.00',
			},
			{
				hot_no:'12',
				goods_id:'12',
				name:'HD3多档位蓝光吹风机宿舍酒店礼品家用静音电吹风恒温干发吹风筒',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/581/368/13059863185_108881536.400x400.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'揭阳空港区家福电器厂',
				info_from:'1688',
				desc:'',
				sales_desc:'成交819元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥14.90 - ￥14.90',
			},
			{
				hot_no:'13',
				goods_id:'13',
				name:'小容量空气炸锅多功能无油烟电炸锅新款特价薯条机家用电烤箱定制',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2020/682/533/13462335286_850530338.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'汉中市皓康家居用品有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交732元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥139.00 - ￥159.00',
			},
			{
				hot_no:'14', 
				goods_id:'14',
				name:'超薄迷你液晶显示充电宝 小巧便携全面屏智能数显手机移动电源',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/007/422/12325224700_749556508.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'深圳市德熙伟业科技有限公司 ',
				info_from:'1688',
				desc:'',
				sales_desc:'成交102元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥30.00 - ￥42.00',
			},
			{
				hot_no:'15',
				goods_id:'15',
				name:'2019新款无线迷你蓝牙音箱礼品 创意便携式mini蓝牙小音响 定制',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/200/176/12959671002_2064773465.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'东莞市浩力升精密模塑电子有限公司 ',
				info_from:'1688',
				desc:'',
				sales_desc:'成交79元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥38.00 - ￥38.00',
			},
			{
				hot_no:'16',
				goods_id:'16',
				name:'诺仪中频理疗仪家用颈椎腰间盘突出损经络通多功能疏通经络治疗仪',
				title:'国内要闻',
				sub_title:'',
				img:'https://cbu01.alicdn.com/img/ibank/2019/768/667/10533766867_1504341105.360x360.jpg',
				attr:'一件代发',
				category:'3C数码',
				type:'',
				goods_org:'广州诺仪电子商务有限公司',
				info_from:'1688',
				desc:'',
				sales_desc:'成交79元',
				sales:'',
				storenum:'100',
				storage_time:'2020-01-10 12:12:01',
				market_price:'',
				sell_price:'￥268.00 - ￥288.00',
			}
		],
      }
    },
    created() {
     this.get_goods_list();
     this.get_mywarehouse();
     this.get_goods_category();
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
		  this.productCateOptions = this.goods_category ;
		  //console.log('get_goods_category para:',para);
		  getGoodsCategory(para).then(res => {
			/*
		  	this.$message({
		       message: 'Completed!',
		       type: 'success',
		       duration: 1000
		     });
			*/
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


