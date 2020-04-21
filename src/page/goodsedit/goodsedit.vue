<template>
	<div class="container" style="display: flex;flex-direction: column;justify-content: center;">
		<div class="emall-detail">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="8">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{ $t('commons.base_info') }}</p>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;">
							<div class="emall-detail-sub-title" style="width: 15%;">{{ $t('commons.goods_info_from') }}</div>
							<div class="emall-detail-sub-title" style="width: 80%;">{{goods_info.info_from}}</div>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;">
							<p class="emall-detail-sub-title" style="width: 15%;">{{ $t('commons.goods_info_category') }}</p>
							<p class="emall-detail-sub-title" style="width: 80%;">{{goods_info['category']['value']}}</p>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;">
							<p class="emall-detail-sub-title" style="width: 15%;">{{ $t('commons.goods_info_deliverytype') }}</p>
							<p class="emall-detail-sub-title" style="width: 80%;">{{goods_info.attr}}</p>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top:15px;">
							<el-button icon="el-icon-circle-plus" type="primary" @click="goods_linkorg(goods_info.linkorg)">{{ $t('commons.linkorg') }}</el-button>
						</div>
					</div>
				</el-col>
				<el-col :span="16">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<div style="text-align: left;">
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;"><br></p>
						</div>
						<el-form :label-position="labelPosition" label-width="80px" :model="goodsQuery">
						  <el-form-item :label="$t('commons.goods_info_categorylist')">
						    <el-cascader
								clearable
								v-model="selectProductCateValue" 
								:options="goods_category"
								filterable
							>
						    </el-cascader>
						  </el-form-item>
						  <el-form-item :label="$t('commons.goods_info_title')">
						    <el-input v-model="goodsQuery.goodsTitle"></el-input>
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
									<el-input v-model="scope.row[item_title.key]"></el-input>
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
						<el-col :span="4" v-for="(item_attr,attr_index) in goods_attr_list" :key="attr_index" style="margin-top:25px;" class="el-col">
							<span style="margin-left: 10px;font-size: 12px;">属性:</span>
							<el-input v-model="item_attr.name" style="margin-left: 5px;width: 50%;" :placeholder=" $t('commons.input')"></el-input>
							<el-button style="margin-left: 5px;" icon="el-icon-delete" type="primary" @click="delete_goods_attr(attr_index)"></el-button>
							<div v-for="(item_attrv,attrv_index) in item_attr.value" :key="attrv_index" style="display: flex;flex-direction: row;justify-content: flex-start;margin:5px;width: 100%;">
								<el-input v-model="goods_attr_list[attr_index]['value'][attrv_index]" style="margin-left: 5px;" :placeholder=" $t('commons.input')"></el-input>
								<el-row type="flex" justify="center" style="margin-left: 5px;">
									<el-button style="margin-left: 5px;" icon="el-icon-delete" type="primary" @click="delete_attr_value(attr_index,attrv_index)"></el-button>
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
							<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{$t('commons.goods_desc')}}</p>
						</div>				 
					</div>
					<el-col :md="15" style="margin-top: 10px;">
						<ueditor @on-change="get_goods_desc" :initContent="goods_desc"></ueditor>
					</el-col>
				</el-col>
			</el-row>
		</div>
		
		<div class="goods-save">
			<el-row :gutter="1" type="flex" class="row-bg el-row-two" justify="start">
				<el-col :span="24">
					<div style="display: flex;flex-direction: column;justify-content: flex-start;">
						<el-row :gutter="20" class="el-row" type="flex">
							<el-button style="margin-top: 15px;margin-left: 10px;" size="medium" type="primary" @click="query_goods_info()">{{ $t('commons.save') }}</el-button>
							<el-button style="margin-top: 15px;margin-left: 30px;" size="medium" type="info" @click="go_back()">{{ $t('commons.goback') }}</el-button>
						</el-row>					 
					</div>
				</el-col>
			</el-row>
		</div>
		<el-dialog :title="$t('commons.goods_sku_edit_attr')" :visible.sync="setDialogVisible" width="40%">
			<span>{{$t('commons.goods_sku_attr')}}</span>
			<el-input :placeholder="$t('commons.goods_sku_attrtype')" v-model="setDialogData.sku_attr" size="small" style="width: 30%;margin-left: 10px"></el-input>
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
		<backTop :ele="$refs.menu_right"></backTop>
	</div>
</template>

<script>
    import { 
		getEmallInfo,
		getGoodsInfo,
	} from "@/api/user";
	import backTop from 'cps/backTop';
	
	import Ueditor from "@/components/editor/editor.vue"; //富文本编辑器
	import YanShare from "@/components/yanShare.vue"; //
	import InfoShare from "@/components/infoShare.vue"; //
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
				username:'',
				labelPosition: 'left',
				shop_type:shop_type?shop_type:2,
				lang:getToken('lang')||'zh',
				scrollTop:0,
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
				goods_info:{},
				goods_init_info:{
						id:'1',
						name:'惠田牌饮水机下置式水桶装立式家用冰温热全自动茶吧机制冷管线机',
						title:'',
						sub_title:'',
						img:[],
						attr:'',
						deliverytype:'一件代发',
						linkorg:'https://www.1688.com/',
						category:{
							id:'1_1_2',
							value:'服饰_男装_青年服饰_体恤',
						},
						type:'',
						goods_org:'宁波惠人环保科技有限公司',
						info_from:'1688.com',
						desc:'<span style="font-size:28px;font-weight:bolder;">宁波惠人环保科技有限公司</span>',
						sales_desc:'成交37900元',
						sales:'',
						market_price:'',
						sell_price:'￥249.50 - ￥379.00',
				},
				goods_desc:'<span style="font-size:18px">服饰_男装_青年服饰_体恤</p>',
				goods_query_info:
					{
						id:'1',
						name:'惠田牌饮水机下置式水桶装立式家用冰温热全自动茶吧机制冷管线机',
						title:'',
						sub_title:'',
						img:[
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
							{
								url:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
								type:'',
							},
						],
						attr:'',
						deliverytype:'一件代发',
						linkorg:'https://www.1688.com/',
						category:{
							id:'1_1_2',
							value:'服饰_男装_青年服饰_体恤',
						},
						type:'',
						goods_org:'宁波惠人环保科技有限公司',
						info_from:'1688.com',
						desc:'',
						sales_desc:'成交37900元',
						sales:'',
						market_price:'',
						sell_price:'￥249.50 - ￥379.00',
					},
			
				loading:true,
				goods_sku_list:[],
				goods_sku_speclist:[
					{
						name:"型号",
						type:1,
					},
					{
						name:"颜色",
						type:2, //1文字 2图片
					},
					{
						name:"尺寸",
						type:1,
					},
				],
				  	
				goods_skulist_title: [
					{ title: "SKU序号", attr: "title", key: "sku_no",width:150 },
					{ title: "淘宝货号", attr: "title", key: "tb_skuno",width:150 },
					{ title: "库存", attr: "title", key: "store_nums",width:80 },
					{ title: "重量(g)", attr: "title", key: "weight",width:100 },
					{ title: "销售价格", attr: "title", key: "sell_price",width:100 },
					{ title: "市场价格", attr: "title", key: "market_price",width:100 },
					{ title: "税率(%)", attr: "title", key: "tax_rate",width:80 },
					{ title: "HSN CODE", attr: "title", key: "hsncode",width:100 },
				],
				
				goods_sku_query:[
					{
						id:'1',
						title:'',
						goods_id:'1',
						sku_no:'11223001',
						jd_skuno:'',
						tb_skuno:'4219436382417',
						pdd_skuno:'',
						value:[
							{
								"name":"型号",
								"type":1,
								"value":"大礼盒",
								"note":"",
							},
							{
								"name":"颜色",
								"type":2,
								"value":"https:\/\/img11.360buyimg.com\/n1\/jfs\/t1945\/199\/773538707\/86482\/5419d771\/5629b305Nd5f55566.jpg",
								"note":"蓝色",
							},
							{
								"name":"容量",
								"type":1,
								"value":"500ML",
								"note":"",
							}
						],
						hsncode:'43556676',
						store_nums:'100',
						market_price:'12.00',
						sell_price:'11.00',
						weight:'100',
						tax_rate:'5',
						sales:'21',
					},
					{
						id:'2',
						goods_id:'1',
						sku_no:'11223002',
						jd_skuno:'',
						tb_skuno:'4219436382516',
						pdd_skuno:'',
						value:[
							{
								"name":"型号",
								"type":1,
								"value":"小礼盒",
								"note":"",
							},
							{
								"name":"颜色",
								"type":2,
								"value":"https:\/\/sendheart.dreamer-inc.com\/jdgoods_img14\/n1\/s450x450_jfs\/t1\/25793\/36\/13718\/303624\/5ca2b902Efdf1f4fe\/3adc86d2ef3b3776.jpg",
								"note":"优雅白",
							},
							{
								"name":"容量",
								"type":1,
								"value":"200ML",
								"note":"",
							}
						],
						hsncode:'43556676',
						store_nums:'100',
						market_price:'12.00',
						sell_price:'11.00',
						weight:'100',
						tax_rate:'5',
						sales:'21',
					},
				],
				
				goods_attr_title:[
					{ title: "属性名称", attr: "title", key: "name",width:150 },
					{ title: "属性描述", attr: "title", key: "value",width:150 },
				],
				goods_attr_list:[
					{
						name:'材质',
						value:[
							'棉麻','化纤','涤纶','晴纶','塑料','纯棉','帆布'
						],
					},
					{
						name:'安全',
						value:[
							'耐高温','阻燃','防爆','耐腐蚀'
						],
					},
					{
						name:'环保',
						value:[
							'可降解','无辐射','无异味'
						],
					},
					
				],
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
			'YanShare':YanShare,
			'InfoShare':InfoShare,
			'AddShareDialog':AddShareDialog,
			'Ueditor':Ueditor,
			'v-upload':upload,
			'backTop':backTop,
		},
        created(){
			//传参初始化
			if(this.$route.query){
				let goods_query= this.$route.query;
				var goods_para = JSON.parse(goods_query.goods_para)?JSON.parse(goods_query.goods_para):null
				
				var goods_init_info = this.goods_init_info
				console.log('goods query goods_init_info:',goods_init_info)
				if(goods_para){
					let img_info = {
						url:goods_para.img,
						type:'1'
					}
					goods_init_info['name'] = goods_para['name']
					goods_init_info['info_from'] = goods_para['info_from']
					goods_init_info['goods_org'] = goods_para['goods_org']
					goods_init_info['attr'] = goods_para['attr']
					goods_init_info['goods_org'] = goods_para['goods_org']
					//goods_init_info['desc'] = goods_para['desc']
					goods_init_info['sales_desc'] = goods_para['sales_desc']
					goods_init_info['sales'] = goods_para['sales']
					goods_init_info['market_price'] = goods_para['market_price']
					goods_init_info['sell_price'] = goods_para['sell_price']
					goods_init_info['img'].push(img_info)
					console.log('goods edit created desc:',goods_init_info['desc'])
					this.goods_desc = goods_init_info['desc']?goods_init_info['desc']:this.goods_desc
					this.goodsQuery['goodsTitle'] = goods_para['name']
				}
				this.goods_sku_list = this.goods_sku_query
			}
			
			this.goods_info=goods_init_info
			if(this.goods_query_info){
				for(var i=0;i<this.goods_query_info['img'].length;i++){
					this.goods_info['img'].push(this.goods_query_info['img'][i])
				}
			}
			//初始化SKU属性到表头
			if(this.goods_sku_speclist){
				//插入新的属性项
				this.sku_title_init()
			}
        },
        mounted(){
			this.productCateOptions = this.goods_category ;
            this.getUserList();
        },
        methods: {
			sku_title_init(){
				var sku_title_list = []
				sku_title_list.push(this.goods_skulist_title[0]) //保留前两个表头项
				sku_title_list.push(this.goods_skulist_title[1])
				
				for(var i=0;i<this.goods_sku_speclist.length;i++){
					let width = this.goods_sku_speclist[i]['type']=='1'?100:280
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
				if(type == 1){ //商品属性添加
					if(para.sku_attr_type == '1' && para.sku_attr){
						this.sku_add_attrc()
					}else if(para.sku_attr_type == '2' && para.sku_attr_type){
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
				}
			},
			
			delete_sku_spec(sku_speclist_index){
				//删除表头项
				this.$confirm('是否要进行删除操作?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					for(var i=0;i<this.goods_skulist_title.length;i++){
						if(this.goods_skulist_title[i]['attr']=='spec' && this.goods_skulist_title[i]['title']==this.goods_sku_speclist[sku_speclist_index]['name']){
							this.goods_skulist_title.splice(i,1)
						}
					}
					this.goods_sku_speclist.splice(sku_speclist_index,1)
					
					//删除数据项
					for(var i=0; i<this.goods_sku_list.length;i++){
						this.goods_sku_list[i]['value'].splice(sku_speclist_index,1)
						//this.$delete(this.goods_sku_list[i].value,sku_speclist_index)
					}
					console.log('delete_sku_spec goods_sku_list :',this.goods_sku_list)
				});
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
								this.goods_skulist_title[k]['width'] = goods_sku_speclist[i]['type']==1?100:280
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
						width:120 ,
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
				var len = this.goods_sku_speclist.length
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
						width:260 ,
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
			
            getUserList(){
                let para = {
                    pagesize:this.paginations.pageSize,
                    page:this.paginations.pageIndex,
					emall_id:'',
					shop_type:this.shop_type,
					lang:this.lang,
                }
				
				//let.seller=Object.assign({},this.seller,new.data)
                getEmallInfo(para).then(res => {
                    this.loading = false;
					console.log('getBizPara return:',res);
                    this.paginations.total = parseInt(res.total);
					
                    //this.tableData = res.userList;
                })
				.catch(err=>{
					console.log('getBizPara err:',err)
				});
            },
			
			query_goods_info(){
			    let para = {
			        pagesize:this.paginations.pageSize,
			        page:this.paginations.pageIndex,
					goods_id:'',
					shop_type:this.shop_type,
					lang:this.lang,
			    }
				
				//let.seller=Object.assign({},this.seller,new.data)
			    getGoodsInfo(para).then(res => {
			        this.$message({
			          message: '保存成功',
			          type: 'success',
			          duration: 1000
			        });
					console.log('getGoodsInfo return:',res);
			    })
				.catch(err=>{
					console.log('getBizPara err:',err)
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
				this.my_strategy_content = ctx ;
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
