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
												<img :src="item_emall.img" class='emallAvatar' alt="" @click="emall_detail(item_emall.name)">
											</p>
											<p class="investor">{{ $t(`commons.${item_emall.name}`) }}</p>
											<p class="emalllogoText">{{item_emall.sub_title}}</p>
										</div>
									</div>
								</el-col>
								</div>
							</div>
						</div>
						<div class="row_left row_news" style="width: 40%; margin-left:10px;margin-top:-8px;float:right; padding:10px; flex;flex-direction: column;justify-content: flex-start;">
							<!--
							<div class="moreItem" style="width: 100%; margin-top:5px; z-index:30; display: flex;flex-direction: row;justify-content: flex-end;">
								
								<a>
									<svg-icon icon-class="more_color" />
								</a>
								
							</div>
							-->
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
								<!--
								<el-row type="flex" justify="center" class="row-bg" :gutter="10" v-for="(item_news,index) in news_list" :key="index">
									<el-col :span="1">
										<div v-if="item_news.hot_no" class="news-content-hotno" style="text-align: center;">
											{{item_news.hot_no}}
										</div>
									</el-col>
									<el-col :span="20">
										<div class="news-content" style="text-align: start;">{{item_news.content}}</div>
									</el-col>
									<el-col :span="5">
										<div class="news-content" style="text-align: start;">{{item_news.time}}</div>
									</el-col>
								</el-row>
								-->
								
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
						<div class="goods-hot rflex" @click="goods_detail(index)">
							<div class="cflex wflex">
								<div style="display: flex;flex-direction: row;justify-content: center;">
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
		getGoodsList,
		getNewsList,
    } from "@/api/user";
	import newsList from "./components/newsList";  // 新闻列表
	import { 
		github 
	} from "@/utils/env";
	import {
		setToken,
		getToken,
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
			shop_type:shop_type?shop_type:2,
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
			//需要给分页组件传的信息
			 paginations: {
			      total: 0,        // 总数
			      pageIndex: 1,  // 当前位于哪页
			      pageSize: 20,   // 1页显示多少条
			      pageSizes: [5, 10, 15, 20],  //每页显示多少条
			      layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
			},
			goods_list:[],
			main_index:[
				{
					name:'globaldailyhot',
					value:'683000',
					title:'全球爆款',
					style_class:'pay saleBgcolor data_list rflex',
					icon:''
				},
				{
					name:'mydailyhot',
					value:'230',
					title:'我的爆款',
					style_class:'pay taxBgcolor data_list rflex',
					icon:''
				},
				{
					name:'emallnum',
					value:'544',
					title:'全球平台数',
					style_class:'pay extenedBgcolor data_list rflex',
					icon:''
				},
				{
					name:'emalljoined',
					value:'150',
					title:'已入驻平台',
					style_class:'pay keleBgColor data_list rflex',
					icon:'more'
				}
			],
			emall_list:[
				{
					name:'emallplatform_1',
					img:amazonlogoImg,
					title:'亚马逊',
					sub_title:'攻略3500',
					icon:''
				},
				{
					name:'emallplatform_2',
					img:taobaologoImg,
					title:'淘宝',
					sub_title:'攻略3500',
					icon:''
				},
				{
					name:'emallplatform_3',
					img:tianmaologoImg,
					title:'天猫',
					sub_title:'攻略3500',
					icon:''
				},
				{
					name:'emallplatform_4',
					img:wishlogoImg,
					title:'WISH',
					sub_title:'攻略3500',
					icon:''
				},
				{
					name:'emallplatform_6',
					img:shopeelogoImg,
					title:'虾皮',
					sub_title:'攻略3500',
					icon:''
				},
				{
					name:'emallplatform_5',
					img:ebaylogoImg,
					title:'易贝',
					sub_title:'攻略3500',
					icon:''
				},
				{
					name:'emallplatform_7',
					img:pingduoduologoImg,
					title:'拼多多',
					sub_title:'攻略3500',
					icon:'more_color'
				},
			],
			latest_goods_list:[
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
					storenum:'100',
					storage_time:'2020-01-10 12:12:01',
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
					storenum:'100',
					storage_time:'2020-01-10 12:12:01',
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
					storenum:'100',
					storage_time:'2020-01-10 12:12:01',
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
			]
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
			hot_goods_select(selected='') {
				if(selected =='1'){
					this.latest_goods_selected = 'background-color:#BBBBBB;color:#FFFFFF;';
					this.hot_goods_selected = ''
					this.goods_list = this.latest_goods_list;
				}else if(selected =='2'){
					this.hot_goods_selected = 'background-color:#BBBBBB;color:#FFFFFF;';
					this.latest_goods_selected = '' ;
					this.goods_list = this.hot_goods_list;
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
			get_goods_list(){
			    let para = {
					username:this.username,
					access_token:this.access_token,
			        pagesize:this.paginations.pageSize,
			        page:this.paginations.pageIndex,
					shop_type:this.shop_type,
					lang:this.lang,
			    }
				
			    getGoodsList(para).then(res => {
			        this.loading = false;
					this.goods_list = []
					for(var i=0;i<res.result.length;i++){
						this.goods_list.push(res.result[i])
					} 
					console.log('getGoodsList return:',res);
			        this.paginations.total = parseInt(res.total);
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
		
	}
  
</style>
