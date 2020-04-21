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
						<div :style="item_category.style_class" @click="category_select(index)">{{ $t(`commons.${item_category.name}`) }}</div>
					</el-col>
					</el-row>
				</div>
			</div>
			<div style="width: 85%;margin-left: 20px;">
			<el-row :gutter="15" class="row_list">
				<el-col :span="5" v-for="(item_hot,index) in bigdata_hot_list" :key="index">
					<div class="goods-hot rflex"  @click="goods_detail(index)">
						<div class="cflex wflex">
							<div style="display: flex;flex-direction: row;justify-content: center;">
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
									<span style="font-size: 12px;">{{ $t('commons.addhotgoods') }}</span>
								</el-col>
								<el-col :span="10" style="text-align: center;">
									<span style="font-size: 12px;">{{ $t('commons.linkorg') }}</span>
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
				shop_type:shop_type?shop_type:2,
				lang:getToken('lang')||'zh',
				username:getToken('Username')||'',
				emall_selected:0,
				category_selected:0,
				scrollTop:0,
                emall_provider:[
					{
						name:'emall_provider_1688',
						title:'1688',
						style_class:'font-size:16px;background-color:#BBBBBB;color:#FFFFFF;',
						icon:''
					},
					{
						name:'emall_provider_taobaounion',
						title:'淘宝联盟',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_provider_pingduoduo',
						title:'多多进宝',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_provider_jingdong',
						title:'京东联盟',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					}
                ],
				goods_category:[
					{
						name:'goods_category_womanclothes',
						title:'女装',
						style_class:'font-size:16px;background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_manclothes',
						title:'男装',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_underclothes',
						title:'内衣',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_sportsclothes',
						title:'运动服饰',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_3Cdigit',
						title:'3C数码',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_necessities',
						title:'日用百货',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_householdappliances',
						title:'家电',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_luggagebag',
						title:'箱包',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_cornament',
						title:'配饰',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'goods_category_shoeboots',
						title:'鞋靴',
						style_class:'background-color:#FFFFFF;color:#666;',
						icon:''
					}
				],
				bigdata_hot_list:[],
				hot_goods_list:[
					{
						id:'1',
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
						market_price:'',
						sell_price:'￥ 0.90  -  ￥ 6.50',
					},
					{
						hot_no:'3',
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
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥200.00 - ￥600.00',
					},
					{
						hot_no:'9',
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
					},{
						hot_no:'14', 
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
					},{
						hot_no:'15',
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
						market_price:'',
						sell_price:'￥38.00 - ￥38.00',
					},{
						hot_no:'16',
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
				latest_hot_list:[
					{
						id:'1',
						name:'惠田牌饮水机下置式水桶装立式家用冰温热全自动茶吧机制冷管线机',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/028/100/13698001820_1952544606.360x360.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'宁波惠人环保科技有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交37900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥249.50 - ￥379.00',
					},
					{
						id:'2',
						name:'天喜研磨器超细研磨机五谷杂粮粉碎机家用小型磨粉机中药材干磨机',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/839/950/12878059938_1145433329.360x360.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'缙云县鼎祥贸易有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交13900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥ 45.00  -  ￥ 45.00',
					},
					{
						hot_no:'3',
						name:'批发手机WIFI远程控制扫吸拖三合一自动回充家用智能扫地机器人',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/230/251/12846152032_1792247958.400x400.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'广东海清新环保科技有限公司 ',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6360元',
						sales:'',
						market_price:'',
						sell_price:'￥798.00 - ￥798.00',
					},
					{
						hot_no:'4',
						name:'德国铂瑞BR-Y9儿童电动牙刷充电式软毛宝宝全自动卡通款3-6-12-岁',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/502/688/12842886205_1805136156.400x400.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'慈溪市卓家电器厂',
						info_from:'1688',
						desc:'',
						sales_desc:'成交7714元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥35.00 - ￥45.00',
					},
					{
						hot_no:'5',
						name:'创意卡通儿童电动牙刷便携式电池款全自动超声波电动牙刷洗漱用品',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/387/836/12209638783_910076344.400x400.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'义乌市意凡日用品有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交277元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥6.00 - ￥6.00',
					},
					{
						hot_no:'6',
						name:'厂家批发外贸大功率不卡发头发造型充电式理发电推剪成人RFCD-12',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/726/026/12607620627_2129541544.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'温州梵众贸易有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交132元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥38.00 - ￥38.00',
					},
					{
						hot_no:'7',
						name:'缓解眼睛疲劳视力恢复矫正仪眼袋按摩护眼仪学生视力矫正器批发',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/709/073/11929370907_303166472.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'玛仕智能电子科技（深圳）有限公司 ',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6777元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥52.00 - ￥52.00',
					},
					{
						hot_no:'8',
						name:'家用厨房多功能12L电烤箱定时控温烘焙迷你烤箱会销礼品现货批发',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/856/902/11937209658_1157205226.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'中山市劲和电器有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥49.00 - ￥79.00',
					},
					{
						hot_no:'9',
						name:'惠田饮水机家用立式下置水桶冰温热多功能防烫全自动桶装水茶吧机',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/121/072/13941270121_1952544606.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'宁波惠人环保科技有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥209.00 - ￥389.00',
					},
					{
						hot_no:'10',
						name:'折叠旅行宿舍电热水壶迷你便携家用烧水壶自动断电烧水壶厂家直销',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/891/949/12932949198_1157205226.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'中山市劲和电器有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交830元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥40.00 - ￥41.00',
					},
					{
						hot_no:'11',
						name:'煮蛋神器蒸蛋器自动断电迷你煮蛋羹机小型家用早餐机',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/832/988/10492889238_1504341105.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'广州诺仪电子商务有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥19.90 - ￥21.50',
					},
					{
						hot_no:'12',
						name:'手摇磨豆机 复古式 意式咖啡豆研磨机 便捷式古典小型家用研磨器',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/898/407/11937704898_537755685.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'宁波绿之品电器科技有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交186元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥62.00 - ￥62.00',
					},
					{
						hot_no:'13',
						name:'家用一级能效智能储水式电热水器60L洗澡速热热水器出水断电安全',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/859/336/12885633958_1816051973.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'广东威太生活电器有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交2425元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥465.00 - ￥585.00',
					},{
						hot_no:'14',
						name:'眼部按摩仪眼睛脉冲缓解近视矫正恢复去眼袋眼罩疲劳护眼仪按摩器',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2018/336/480/10176084633_1504341105.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'广州诺仪电子商务有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交186元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥98.00 - ￥98.00',
					},{
						hot_no:'15',
						name:'远红外石墨烯加热坐垫 方便携带随时享用 经久耐用 缓解姨妈痛',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/777/479/11915974777_872318441.640x640.jpg',
						attr:'一件代发',
						category:'3C数码',
						type:'',
						goods_org:'宁波优康电子科技有限公司 ',
						info_from:'1688',
						desc:'',
						sales_desc:'成交79元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥46.00 - ￥46.00',
					}
				],
				womanclothes_hot_list:[
					{
						id:'1',
						name:'定制棉服女毛领中长款加厚羽绒棉衣2019秋冬季韩版时尚新款派克服',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/095/569/12770965590_1240347665.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'温州市左言右语服饰有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交37900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥253.00 - ￥253.00',
					},
					{
						id:'2',
						name:'纯棉打底衫 女式秋季新款磨毛高领春秋上衣女潮流爆款t恤厂家直销',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/406/341/12686143604_1155724448.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'深圳市龙岗区凤衣依服饰商行',
						info_from:'1688',
						desc:'',
						sales_desc:'成交13900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥ 25.00  -  ￥ 27.00',
					},
					{
						hot_no:'3',
						name:'小清新吊带背心女外穿港味chic针织内搭无袖打底上衣',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/321/248/13980842123_104904343.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'深圳市宝安区依诗佳服饰商行 ',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6360元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥19.90 - ￥19.90',
					},
					{
						hot_no:'4',
						name:'新款中国风唐装上衣茶艺服女 改良复古民国中袖旗袍上衣两件套',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/805/285/13920582508_1833753767.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'深圳市龙岗区仙妙服饰经营部',
						info_from:'1688',
						desc:'',
						sales_desc:'成交7714元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥102.00 - ￥102.00',
					},
					{
						hot_no:'5',
						name:'创意卡通儿童电动牙刷便携式电池款全自动超声波电动牙刷洗漱用品',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/332/120/13360021233_1133866091.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'义乌市意凡日用品有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交277元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥6.00 - ￥6.00',
					},
					{
						hot_no:'6',
						name:'2020春夏新款民族风绣花中式古典清新中国风旗袍唐装上衣套装2161',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/846/745/13306547648_1950439571.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'深圳市阿韵贸易有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交132元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥57.00 - ￥101.00',
					},
					{
						hot_no:'7',
						name:'2020新款胖MM大码女装韩版休闲百搭高腰显瘦宽松牛仔A字半身裙',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/475/670/13920076574_298991964.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'深圳市宝安区西乡文雅服饰商行',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6777元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥47.00 - ￥49.00',
					},
					{
						hot_no:'8',
						name:'2020春季新款女装小心机圆领套头打底衫宽松七分袖条纹休闲针织衫',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/809/571/13924175908_640380022.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'桐乡市濮院纤羽羊毛衫门市部',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥79.00 - ￥85.00',
					},
					{
						hot_no:'9',
						name:' 2020春季新款拉链修身小心机打底针织衫显瘦百搭上衣女',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/489/858/13803858984_775472603.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'深圳市南山区微雅轩服装厂',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥36.63 - ￥40.59',
					},
					{
						hot_no:'10',
						name:'新款2019年王鸥同款羊毛大衣中长款羊毛外套秋冬款休闲毛呢大衣女',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/639/617/13499716936_846350483.400x400.jpg',
						attr:'一件代发',
						category:'女装',
						type:'',
						goods_org:'大连金普新区雅姿服饰商行',
						info_from:'1688',
						desc:'',
						sales_desc:'成交830元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥420.00 - ￥420.00',
					},
				],
				manclothes_hot_list:[
					{
						id:'1',
						name:'男士日系休闲男装夏青年纯棉短袖体恤男士印花潮牌t恤 速卖通爆款',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/899/831/13934138998_1995089890.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'石狮九门服饰有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交37900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥26.00 - ￥26.00',
					},
					{
						id:'2',
						name:'2020新款夏季男士短袖t恤潮流潮牌宽松打底衫纯棉上衣男式T恤印花',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/307/672/13719276703_195184060.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'常熟市服装城简木服装商行',
						info_from:'1688',
						desc:'',
						sales_desc:'成交13900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥ 29.00  -  ￥ 29.00',
					},
					{
						hot_no:'3',
						name:'ins超火潮牌港风短袖男夏季新款韩版时尚青年情侣T恤休闲纯棉上衣',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/214/804/13696408412_1434053828.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'青墅官方旗舰店 ',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6360元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥29.00 - ￥29.00',
					},
					{
						hot_no:'4',
						name:'批发2020夏季韩版时尚潮圆领套头印花修身休闲学生运动短袖t恤男',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/657/331/13846133756_501713363.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'海门市衣之道服装厂',
						info_from:'1688',
						desc:'',
						sales_desc:'成交7714元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥19.00 - ￥23.00',
					},
					{
						hot_no:'5',
						name:'2020外贸新款 男士商务马甲青果领条纹双排扣马甲西装马甲9726',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/164/079/13589970461_2117616284.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'杭州子呈贸易有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交277元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥63.65 - ￥63.65',
					},
					{
						hot_no:'6',
						name:'男式休闲针织开衫外套上衣2020春秋季纯色免烫打底外穿衣服',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/292/479/13881974292_986389892.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'桐乡市濮院尤黎服装网店',
						info_from:'1688',
						desc:'',
						sales_desc:'成交132元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥52.00 - ￥55.00',
					},
					{
						hot_no:'7',
						name:'厂家直销弹力男式牛仔裤2020春夏新款高腰长裤男商务直筒牛仔裤男',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/403/530/13259035304_353667905.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'深圳市宝安区沙井鑫兴潮服装',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6777元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥48.02 - ￥56.84',
					},
					{
						hot_no:'8',
						name:'男士工装裤春季新款潮流小脚哈伦裤宽松九分休闲裤男束脚纯棉男裤',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/336/087/13403780633_507661052.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'楚阳服装源头厂家',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥59.00 - ￥59.00',
					},
					{
						hot_no:'9',
						name:' 2020春季新款拉链修身小心机打底针织衫显瘦百搭上衣女',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/489/858/13803858984_775472603.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'深圳市南山区微雅轩服装厂',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥36.63 - ￥40.59',
					},
					{
						hot_no:'10',
						name:'墨麦客男装2019冬季厚款棉服男 纯色连帽男士棉衣外套8291',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/188/559/12031955881_1369934477.400x400.jpg',
						attr:'一件代发',
						category:'男装',
						type:'',
						goods_org:'M－MAICCO/墨麦客官方旗舰店',
						info_from:'1688',
						desc:'',
						sales_desc:'成交830元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥193.00 - ￥252.00',
					},
					
				],
				underclothes_hot_list:[
					{
						id:'1',
						name:'加肥加大码V领保暖背心女带胸垫加绒加厚胖蕾丝马甲修身打底内衣',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/010/124/12060421010_2095011289.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'汕头市潮阳区贵屿正正发针织',
						info_from:'1688',
						desc:'',
						sales_desc:'成交37900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥15.80 - ￥17.80',
					},
					{
						id:'2',
						name:'雪地袜子女秋冬季加厚加绒中筒袜睡眠毛保暖袜长月子家居地板袜',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/499/687/12126786994_1386415648.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'诸暨草塔何伟康袜源头厂家',
						info_from:'1688',
						desc:'',
						sales_desc:'成交13900元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥ 1.80  -  ￥ 1.80',
					},
					{
						hot_no:'3',
						name:'清仓2020春秋冬季男士发热德绒保暖内衣套装男式保暖内衣秋衣秋裤',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/386/773/12304377683_1158693929.360x360.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'青岛 ',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6360元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥48.44 - ￥93.00',
					},
					{
						hot_no:'4',
						name:'【佳蒂曼】4条盒装新款精梳棉男士内裤纯棉U凸男式平角裤全棉裤衩',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2018/527/683/9693386725_1416672854.360x360.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'海门市衣之道服装厂',
						info_from:'1688',
						desc:'',
						sales_desc:'成交7714元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥8.69 - ￥8.69',
					},
					{
						hot_no:'5',
						name:'男背心夏季网纱透明透气网眼薄款运动背心性感打底衫',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2015/402/163/2624361204_1401480406.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'深圳市宝安区福永街道华玉',
						info_from:'1688',
						desc:'',
						sales_desc:'成交277元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥14.00 - ￥16.00',
					},
					{
						hot_no:'6',
						name:'男式休闲针织开衫外套上衣2020春秋季纯色免烫打底外穿衣服',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/292/479/13881974292_986389892.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'桐乡市濮院尤黎服装网店',
						info_from:'1688',
						desc:'',
						sales_desc:'成交132元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥52.00 - ￥55.00',
					},
					{
						hot_no:'7',
						name:'冰丝无痕男士背心男夏季修身型紧身大码运动跨栏无袖内衣打底汗衫',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2020/369/754/13518457963_815345275.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'俊驰服饰源头厂家',
						info_from:'1688',
						desc:'',
						sales_desc:'成交6777元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥7.50 - ￥7.50',
					},
					{
						hot_no:'8',
						name:'日本安心free无痕养护蕾丝美背裹胸背心 瑜伽睡眠无钢圈文胸内衣',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2018/405/825/9469528504_2022168690.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'汕头市欧迪妮内衣有限公司',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥20.00 - ￥23.00',
					},
					{
						hot_no:'9',
						name:'爆款字母带美背文胸一字围插片防走光百搭打底运动抹胸裹胸少女',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2019/715/876/12127678517_713984353.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'汕头市潮阳区铜盂名品汇百',
						info_from:'1688',
						desc:'',
						sales_desc:'成交282元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥2.60 - ￥4.80',
					},
					{
						hot_no:'10',
						name:'2020春夏新款双肩带百搭打底小衫显瘦美背纯色蕾丝花边吊带背心女',
						title:'国内要闻',
						sub_title:'',
						img:'https://cbu01.alicdn.com/img/ibank/2018/532/779/8062977235_869693435.400x400.jpg',
						attr:'一件代发',
						category:'内衣',
						type:'',
						goods_org:'汕头市潮阳区谷饶鑫铭针织',
						info_from:'1688',
						desc:'',
						sales_desc:'成交830元',
						sales:'',
						storenum:'100',
						storage_time:'2020-01-10 12:12:01',
						market_price:'',
						sell_price:'￥6.00 - ￥7.00',
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
            }
        },
        created(){
			this.emall_list = this.emall_provider ;
			this.bigdata_hot_list = this.latest_hot_list ;
        },
        mounted(){
            this.getUserList();
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
			emall_select(selected=0) {
				var k = parseInt(selected) ;
				var category_selected = this.category_selected
				this.emall_provider[selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
				
				if(selected!=this.emall_selected){
					this.emall_provider[this.emall_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				}
				this.emall_selected = selected ;
				if(k%2>0){
					this.bigdata_hot_list = this.hot_goods_list
				}else{
					this.bigdata_hot_list = this.latest_hot_list
				}
				this.goods_category[category_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
			},
			category_select(selected=0) {
				var k = parseInt(selected) ;
				var category_selected = this.category_selected
				this.goods_category[selected]['style_class'] = 'background-color:#BBBBBB;color:#FFFFFF;';
				if(selected!=this.category_selected){
					this.goods_category[category_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				}
				
				this.category_selected = selected ;
				if(k%3==1){
					this.bigdata_hot_list = this.womanclothes_hot_list
				}else if(k%3==2){
					this.bigdata_hot_list = this.manclothes_hot_list
				}else{
					this.bigdata_hot_list = this.underclothes_hot_list
				}
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



