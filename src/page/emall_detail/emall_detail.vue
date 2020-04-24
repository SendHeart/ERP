<template>
<div>
	<div class="container" style="display: flex;flex-direction: column;justify-content: center;">
		<div class="go-back">
			<el-button style="margin-top: 15px;margin-right: 30px;" size="medium" type="info" @click="go_back()">{{ $t('commons.goback') }}</el-button>
		</div>
		<div v-if="emall_list" style="display: flex;flex-direction: row;justify-content: center;">
			<div class="emall-detail" style="margin-bottom: 50px;padding: 15px;display: flex;flex-direction: row;justify-content: flex-start;">
				<div style="display: flex;flex-direction: row;justify-content: center;">
					<img :src="emall_list[emall_query_index].img" class='emall-detail-img' alt="">
				</div>
				<div style="display: flex;flex-direction: column;justify-content: flex-start;">
				 	<div style="text-align: left;">
				 		<p class="emall-detail-title" style="font-size: 18px;font-weight: bolder;">{{emall_list[emall_query_index].title}}</p>
				 		<p class="emall-detail-desc" style="width: 100%;margin-bottom: 20px;">{{emall_list[emall_query_index].desc}}</p>
				 	</div>
				 	<div style="display: flex;flex-direction: row;justify-content: flex-start;">
				 		<p class="emall-detail-sub-title">{{emall_list[emall_query_index].type!=''?'类型:'+emall_list[emall_query_index].type:'' }}</p>
				 		<p class="emall-detail-sub-title">{{emall_list[emall_query_index].region!=''?'范围:'+emall_list[emall_query_index].region:''}}</p>
				 	</div>
				 	<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top:15px;">
				 		 <el-button icon="el-icon-circle-plus" type="primary">{{ $t('commons.emall_joining') }}</el-button>
				 		 <el-button icon="el-icon-edit" type="primary">{{ $t('commons.emall_joined') }}</el-button>
				 	</div>
				 </div>
			</div>
		</div>
		
		<div v-if="emall_list" style="display: flex;flex-direction: row;justify-content: flex-start;">
			<div style="width: 13%;">
				<div style="display: flex;flex-direction: column;justify-content: center;padding-left: 10px;">
					<el-row :gutter="1" class="row_list">
					<el-col :span="18" style="text-align: left; margin-bottom: 10px;font-size: 18px;">
						<div style="font-size:18px;color:#666" >{{ $t('index.emall_detail_index_score') }}:<span style="color:#F56C6C">{{ emall_list[0].score}}</span></div>
					</el-col>
					<el-col :span="18" style="text-align: left; margin-bottom: 10px;font-size: 18px;">
						<div style="font-size:18px;color:#666" >{{ $t('index.emall_detail_index_pv') }}:<span style="color:#666">{{ emall_list[0].pv}}</span></div>
					</el-col>
					<el-col :span="18" style="text-align: left; margin-bottom: 10px;font-size: 18px;">
						<div style="font-size:18px;color:#666" >{{ $t('index.emall_detail_index_orderspeed') }}:<span style="color:#666">{{ emall_list[0].orderspeed}}</span></div>
					</el-col>
					<el-col :span="18" style="text-align: left; margin-bottom: 10px;font-size: 18px;">
						<div style="font-size:18px;color:#666" >{{ $t('index.emall_detail_index_cost') }}:<span style="color:#666">{{ emall_list[0].cost}}</span></div>
					</el-col>
					<el-col :span="18" style="text-align: left; margin-bottom: 10px;font-size: 18px;">
						<div style="font-size:18px;color:#666" >{{ $t('index.emall_detail_index_profit') }}:<span style="color:#666">{{ emall_list[0].profit}}</span></div>
					</el-col>
					<!--
					<el-col :span="18" style="text-align: left; margin-bottom: 10px;font-size: 18px;">
						 <el-button icon="el-icon-circle-plus" type="primary">我要打分</el-button>
					</el-col>
					-->
					</el-row>
				</div>
			</div>
			<div style="width: 86%;margin-left: 0px;">
				<!--
				<div class="row_left row_base" style="width: 30%;margin-top:0px;">
					<el-row :gutter="0" class="row_list">
						<el-col :span="3" v-for="(item_emall,index) in emall_detail_index" :key="index">
							<div :style="item_emall.style_class" style="font-weight: bolder;border: 1px solid;" @click="emall_detail_comment_select(index)">{{ $t(`index.${item_emall.name}`) }}</div>
						</el-col>
					</el-row>
				</div>
				-->
				<div class="row_left row_base" style="width: 100%;margin-top:0px;margin-bottom: 60px;">
					<el-tabs type="border-card" v-model="activeName" @tab-click="emall_detail_operation">
					<el-tab-pane name='comment'>
						<span slot="label" class="emall-tab-pane">{{ $t(`index.${emall_detail_index[0].name}`) }}</span>
						<el-button icon="el-icon-circle-plus" type="primary" @click="publishComment">{{ $t('index.emall_detail_mycomment') }}</el-button>
						<div v-if="is_comment_submit" style="display: flex;flex-direction: column;justify-content: center;margin-top:10px;">
							<el-row :gutter="5">
								<el-col :md="15">
									<ueditor ref="ue" @on-change="getComment"></ueditor>
								</el-col>
								<el-col :md="16">
									<div style="display: flex;flex-direction: row;justify-content: flex-start;">
										<el-button type="primary" plain @click="submitComment">{{ $t('commons.submit') }}</el-button>
									</div>
								</el-col>
							</el-row>
						</div>
						<div style="display: flex;flex-direction: column;justify-content: flex-start;">
							<el-col :span="16" v-for="(item_comment,comment_index) in emall_detail_commentlist" :key="comment_index">
								<div class="emall-detail-comment rflex">
									<div class="cflex wflex">
										<div style="display: flex;flex-direction: row;justify-content: flex-start;">
											<div style="display: flex;flex-direction: row;justify-content: flex-start;">
												<img :src="item_comment.avatar" class='emall-detail-comment-avatar' alt="">
											</div>
											<div style="display: flex;flex-direction: column;justify-content: center;">
												<div style="text-align: left;">
													<p class="emall-detail-comment-commentor">{{item_comment.commentor}}</p>
												</div>
												<div style="text-align: left;">
													<p class="emall-detail-comment-updtime">{{ item_comment.update_time}}</p>
												</div>
											</div>
										</div>
										<div style="display: flex;flex-direction: row;justify-content: flex-start;text-align: left;">
											<div class="ql-editor"  v-html="item_comment.desc" style="white-space: pre-wrap;"></div>
										</div>
										<div style="display: flex;flex-direction: row;justify-content: flex-end;margin-top: 10px;">
											<p class="emall-detail-comment-info" >{{ $t('index.emall_detail_comment_pv') }}:{{ item_comment.pv}}</p>
											<p class="emall-detail-comment-info" style="margin-left: 10px;">{{ $t('index.emall_detail_comment_reply') }}:{{ item_comment.replynum}}</p>
										</div>
										<el-row :gutter="0" class="row_list" style="background-color: #F2F2F2;">
											<el-col :span="3">
												<div class="emall-detail-comment-operation"  @click="emall_comment_prize(comment_index)">{{ $t('index.emall_detail_comment_prize') }}</div>
											</el-col>
											<el-col :span="3">
												<div class="emall-detail-comment-operation"  @click="emall_comment_reply(comment_index)">{{ $t('index.emall_detail_comment_reply') }}</div>
											</el-col>
											<el-col :span="3">
												<div class="emall-detail-comment-operation"  @click="emall_comment_share(comment_index)">{{ $t('index.emall_detail_comment_share') }}</div>
												<div v-if="item_comment.is_share==true" style="height: 200px;">
													<info-share  @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></info-share>
												</div>
											</el-col>
										</el-row>
										<div v-if="item_comment.is_reply==true" style="height: 70px;width: 100%;">
											<el-input
											  type="textarea"
											  :autosize="{ minRows: 2, maxRows: 4}"
											  placeholder="请输入回复"
											  v-model="my_comment_reply">
											</el-input>
											<div style="display: flex;flex-direction: row;justify-content: center;margin-top:5px;">
												<el-button type="primary" plain @click="sumbit_comment_reply(item_comment.id)">{{ $t('commons.submit') }}</el-button>
											</div>
										</div>
										<div v-if="item_comment.replytotal>item_comment.replylist.length" style="display: flex;flex-direction: column;justify-content: flex-start;">
											<div v-for="(item_reply,reply_index) in item_comment.replylist" :key="reply_index">
												<p class="emall-detail-comment-info">{{item_reply.commentor}}:{{ item_reply.desc}}</p>
											</div>
											<div style="margin-top:5px ;">
												<div style="display: flex;flex-direction: row;justify-content: center;">
													<el-button plain round icon="el-icon-view" type="view" @click="comment_reply_query(item_comment.id,comment_index,item_comment.replylist[item_comment.replylist.length-1]['id'])">{{ $t('commons.more') }}</el-button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</el-col>	
						</div>
					  </el-tab-pane>
					  <el-tab-pane name='strategy'>
						<span slot="label" class="emall-tab-pane">{{ $t(`index.${emall_detail_index[1].name}`) }}</span>
						<el-button icon="el-icon-circle-plus" type="primary" @click="publishStrategy">{{ $t('index.emall_detail_mystrategy') }}</el-button>
						<div v-if="is_strategy_submit" style="display: flex;flex-direction: column;justify-content: flex-start;margin-top:10px;">
							<el-row :gutter="1">
								<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-bottom:10px;">
								 	<!--
									<el-col>
								 		{{ $t('commons.emall_strategy_title') }}
								 	</el-col>
									-->
								 	<el-col :md="15">
								 		<el-input
											type="textarea"
											:autosize="{ minRows: 1, maxRows: 1}"
											:placeholder="$t('commons.placehold_emall_strategy_title')"
											v-model="my_strategy_title">
								 		</el-input>
								 	</el-col>
								</div>
								<el-col :md="15">
									<ueditor @on-change="getStrategy"></ueditor>
								</el-col>
								<el-col :md="15">
									<div style="display: flex;flex-direction: row;justify-content: flex-start;">
										<el-button type="primary" plain @click="submitStrategy">{{ $t('commons.submit') }}</el-button>
									</div>
								</el-col>
							</el-row>
							<el-row :gutter="1">
								
							</el-row>
						</div>
						<div style="display: flex;flex-direction: column;justify-content: flex-start;">
							<el-col :span="16" v-for="(item_strategy,strategy_index) in emall_detail_strategylist" :key="strategy_index">
								<div class="emall-detail-strategy rflex">
									<div class="cflex wflex">
										<div style="display: flex;flex-direction: row;justify-content: flex-start;">
											<div style="display: flex;flex-direction: row;justify-content: flex-start;">
												<img :src="item_strategy.avatar" class='emall-detail-comment-avatar' alt="">
											</div>
											<div style="display: flex;flex-direction: column;justify-content: center;">
												<div style="text-align: left;">
													<p class="emall-detail-strategy-title">{{item_strategy.title}}</p>
												</div>
												<div style="text-align: left;display: flex;flex-direction: row;justify-content: flex-start;">
													<p class="emall-detail-strategy-updtime">{{ item_strategy.update_time}}</p>
													<p class="emall-detail-strategy-commentor">{{item_strategy.commentor}}</p>
												</div>
											</div>
										</div>
										<div style="display: flex;flex-direction: row;justify-content: flex-start;text-align: left;">
											<p class="ql-editor" v-html="item_strategy.desc"></p>
										</div>
										<div style="display: flex;flex-direction: row;justify-content: flex-end;margin-top: 10px;">
											<p class="emall-detail-strategy-info" >{{ $t('index.emall_detail_comment_pv') }}:{{ item_strategy.pv}}</p>
											<p class="emall-detail-strategy-info" style="margin-left: 10px;">{{ $t('index.emall_detail_comment_reply') }}:{{ item_strategy.replynum}}</p>
										</div>
										<el-row :gutter="0" class="row_list" style="background-color: #F2F2F2;">
											<el-col :span="3">
												<div class="emall-detail-strategy-operation"  @click="emall_strategy_prize(strategy_index)">{{ $t('index.emall_detail_comment_prize') }}</div>
											</el-col>
											<el-col :span="3">
												<div class="emall-detail-strategy-operation"  @click="emall_strategy_reply(strategy_index)">{{ $t('index.emall_detail_comment_reply') }}</div>
											</el-col>
											<el-col :span="3">
												<div class="emall-detail-strategy-operation"  @click="emall_strategy_share(strategy_index)">{{ $t('index.emall_detail_comment_share') }}</div>
												<div v-if="item_strategy.is_share==true" style="height: 200px;">
													<info-share  @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></info-share>
												</div>
											</el-col>
										</el-row>
										<div v-if="item_strategy.is_reply==true" style="height: 70px;width: 100%;">
											<el-input
											  type="textarea"
											  :autosize="{ minRows: 2, maxRows: 4}"
											  placeholder="请输入回复"
											  v-model="my_strategy_reply">
											</el-input>
											<div style="display: flex;flex-direction: row;justify-content: center;margin-top:5px;">
												<el-button type="primary" plain @click="sumbit_strategy_reply(item_strategy.id)">{{ $t('commons.submit') }}</el-button>
											</div>
										</div>
										<div v-if="item_strategy.replytotal>item_strategy.replylist.length" style="display: flex;flex-direction: column;justify-content: flex-start;">
											<div v-for="(item_reply,index) in item_strategy.replylist" :key="index">
												<p class="emall-detail-strategy-info" >{{item_reply.commentor}}:{{ item_reply.desc}}</p>
											</div>
											<div style="margin-top:5px ;">
												<div style="display: flex;flex-direction: row;justify-content: center;">
													<el-button plain round icon="el-icon-view" type="view" @click="strategy_reply_query(item_strategy.id,strategy_index,item_strategy.replylist[item_strategy.replylist.length-1]['id'])" >查看更多</el-button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</el-col>	
						</div>
					</el-tab-pane>
					<el-tab-pane name='headline'>
						<span slot="label" class="emall-tab-pane">{{ $t(`index.${emall_detail_index[2].name}`) }}</span>
					</el-tab-pane>
					<el-tab-pane name='scoring'>
					    <span slot="label" class="emall-tab-pane">{{ $t(`index.${emall_detail_index[3].name}`) }}</span>
						<span style="font-size: 18px;font-weight: bolder;">
							{{ $t('index.emall_detail_index_score') }}
						</span>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top: 15px;">
							<span class="emall-detail-score-title">{{ $t('index.emall_detail_score_pv') }}</span>
							<div class="emall-detail-score">
							   <el-slider v-model="emall_detail_score_pv" :show-input="true" ></el-slider>
							 </div>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top: 15px;">
							<span class="emall-detail-score-title">{{ $t('index.emall_detail_score_orderspeed') }}</span>
							<div class="emall-detail-score">
								<el-slider v-model="emall_detail_score_orderspeed" :show-input="true" ></el-slider>
							</div>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top: 15px;">
							<span class="emall-detail-score-title">{{ $t('index.emall_detail_score_cost') }}</span>
							<div class="emall-detail-score">
								<el-slider v-model="emall_detail_score_cost" :show-input="true" ></el-slider>
							</div>
						</div>
						<div style="display: flex;flex-direction: row;justify-content: flex-start;margin-top: 15px;">
							<span class="emall-detail-score-title">{{ $t('index.emall_detail_score_profit') }}</span>
							<div class="emall-detail-score">
								<el-slider v-model="emall_detail_score_profit" :show-input="true" ></el-slider>
							 </div>
						</div>
						<div style="margin-top:5px ;">
							<div style="display: flex;flex-direction: row;justify-content: center;">
								<el-button plain round icon="el-icon-edit" type="primary" @click="emall_score_submit">{{ $t('commons.submit') }}</el-button>
							</div>
						</div>
					</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
    import { 
		getEmallInfo,
		prizeComment,
		replyComment,
		prizeStrategy,
		replyStrategy,
		replyQueryComment,
		replyQueryStrategy,
		submitEmallScore,
		submitComment,
		submitStrategy,
	} from "@/api/user";
	import Ueditor from "@/components/editor/editor.vue"; //富文本编辑器
	import YanShare from "@/components/yanShare.vue"; //富文本编辑器
	import InfoShare from "@/components/infoShare.vue"; //富文本编辑器
	import AddShareDialog from "@/components/addShareDialog.vue"; //富文本编辑器
	/*
	import {
		YanShare,
		InfoShare,
		AddShareDialog
	} from "./components";
	*/
	import { 
		setToken,
		getToken,
	} from '@/utils/auth';
	import { 
		shop_type
	} from "@/utils/env";
	import * as mutils from '@/utils/mUtils' ;
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
				shop_type:shop_type?shop_type:10,
				lang:getToken('lang')||'zh',
				access_token:getToken('Token')||'zh',
				username:getToken('Username')||'',
				comment_index_selected:0,
				
				activeName: 'comment',
				emall_detail_score_pv:50,
				emall_detail_score_orderspeed:78,
				emall_detail_score_cost:60,
				emall_detail_score_profit:55,
				emall_comment_share_index:0,
				emall_comment_reply_index:0,
				emall_strategy_share_index:0,
				emall_strategy_reply_index:0,
				emall_query:[],
				emall_query_index:0,
				emall_query_id:'1',
				is_comment_submit:false,
				my_comment_content:'',
				my_comment_reply:'',
				is_strategy_submit:false,
				my_strategy_content:'',
				my_strategy_title:'',
				my_strategy_reply:'',
				content: "请输入评论内容",
				
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
				
                emall_detail_index:[
					{
						name:'emall_detail_comment',
						title:'评论',
						style_class:'font-size:18px;background-color:#BBBBBB;color:#FFFFFF;',
						icon:''
					},
					{
						name:'emall_detail_strategy',
						title:'攻略',
						style_class:'font-size:18px;background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_detail_headline',
						title:'头条',
						style_class:'font-size:18px;background-color:#FFFFFF;color:#666;',
						icon:''
					},
					{
						name:'emall_detail_scoring',
						title:'打分',
						style_class:'font-size:18px;background-color:#FFFFFF;color:#666;',
						icon:''
					},
	
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
				emall_list:null,
				
				emall_all_list:[
					{
						id:'1',
						name:'emallplatform_1',
						title:'北美亚马逊',
						sub_title:'美国最大的一家网络电子商务公司',
						img:amazonlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'美国、加拿大、墨西哥',
						strategy:'2300',
						comment:'1688',
						desc:'亚马逊中国(z.cn)坚持“以客户为中心”的理念,秉承“天天低价,正品行货”信念,销售图书、电脑、数码家电、母婴百货、服饰箱包等上千万种产品。亚马逊中国提供专业...',
					},
					{
						id:'2',
						name:'emallplatform_2',
						title:'淘宝',
						sub_title:'中国深受欢迎的网购零售平台,亚太地区较大的网络零售、商圈',
						img:taobaologoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'中国、俄罗斯、巴西',
						strategy:'2300',
						comment:'1688',
						desc:'淘宝已从单一的C2C网络集市变成了包括C2C、分销、拍卖、直供、众筹、定制等等多种电子商务模式在内的综合性零售商圈。',
					},
					{
						id:'3',
						name:'emallplatform_3',
						title:'天猫',
						sub_title:'中国零售百强之首,综合性购物网站',
						img:tianmaologoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'中国、俄罗斯、巴西',
						strategy:'2300',
						comment:'1688',
						desc:'专业线上综合购物平台，全球消费者挚爱的品质购物之城！旨在引领中国消费者第一时间发现和体验全球化、更优质的生活方式，提前开启趋势中的理想生活！理想生活，上天猫',
					},
					{
						id:'4',
						name:'emallplatform_4',
						title:'WISH',
						sub_title:'全球27个国家的购物类APP中排名第一',
						img:wishlogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'中国、俄罗斯、巴西',
						strategy:'2300',
						comment:'1688',
						desc:'Wish累计向全球超过3.5亿的消费者供应了愈2亿款商品，月活跃用户超过9000万人，活跃商户有12.5万，日出货量峰值达到200万单，订单主要来自美国、加拿大、欧洲等全球各地区',
					},
					{
						id:'5',
						name:'emallplatform_5',
						title:'易贝',
						sub_title:'可让全球民众上网买卖物品的线上拍卖及购物网站',
						img:ebaylogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'美国、加拿大、亚洲',
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
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'东南亚、中国、台湾地区',
						strategy:'2300',
						comment:'1688',
						desc:'社群媒体粉丝数量超过3000万，拥有700万活跃卖家，员工超8000人遍布东南亚及中国， [3]  是东南亚发展最快的电商平台，也是国货出海东南亚的首选平台。',
					},
					{
						id:'7',
						name:'emallplatform_7',
						title:'拼多多',
						sub_title:'中国主流的手机购物APP，2019福布斯中国最具创新力企业',
						img:pingduoduologoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'中国',
						strategy:'2300',
						comment:'1688',
						desc:'凝聚更多人的力量，用更低的价格买到更好的东西，体会更多的实惠和乐趣。通过沟通分享形成的社交理念，形成了拼多多独特的新社交电商思维',
					},
					{
						id:'8',
						name:'emallplatform_8',
						title:'FlipKart',
						sub_title:'印度最大电子商务零售商',
						img:flipkartlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'印度、东南亚、台湾地区',
						strategy:'2300',
						comment:'1688',
						desc:'SKU数量超过80万，物流覆盖1000座城市以上，月访客数高达6980万，网站国内排名第9，全球排名173名，整站用户数量超过10亿',
					},
					{
						id:'9',
						name:'emallplatform_9',
						title:'京东',
						sub_title:'全球最具价值500大品牌，中国自营式电商企业',
						img:jingdonglogoImg,
						status:'0', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'中国、美国、加拿大',
						strategy:'2300',
						comment:'1688',
						desc:'在线销售计算机、手机及其它数码产品、家电、汽车配件、服装与鞋类、奢侈品、家居与家庭用品、化妆品与其它个人护理用品、食品与营养品、书籍与其它媒体产品、母婴用品与玩具、体育与健身器材以及虚拟商品等，共13大类3150万种SKU的商品。',
					},
					{
						id:'10',
						name:'emallplatform_10',
						title:'乐天',
						sub_title:'日本最大电子商店街，福布斯全球数字经济100强',
						img:rakutenlogoImg,
						status:'1', //0未入驻 1已入驻
						score:'90',
						pv:'80',
						orderspeed:'60',
						cost:'40',
						profit:'55',
						type:'B2C',
						region:'日本、中国、东南亚',
						strategy:'2300',
						comment:'1688',
						desc:'乐天网站4万家店铺中有1万余家参加了直邮中国的服务，',
					},
				],
				emall_detail_commentlist:[],
				
				emall_commentlist:{
				"1":[
						{
							id:'1',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'<span style="font-size:24px;">经营的好财务自由不是问题，</span><span style="font-size:14px;">最近在推品牌出海，想要出海镀个金的品牌可以早点跟进了。。。</span>',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'<h1>经营得好</h1>财务自由不是问题，最近在推品牌出海，想要出海镀个金的品牌可以早点跟进了。。。',
							replytotal:5,
							replylist:[
								{
									id:'1',
									comment_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									comment_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
				],
				"2":[
						{
							id:'1',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'价格很优惠，服务也很，东西不错，给个好评此次鼓励。。。',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'货晚了两天收到，不过东西真的很好，老板人也好。运输的速度应该是邮局的问题吧。',
							replytotal:5,
							replylist:[
								{
									id:'1',
									comment_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									comment_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				"3":[
						{
							id:'1',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'药效非常好、 精准度惊人的高、  推荐大家购买。。。',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'很好的东西物流很快，卖家发货很及时，服务也很好，全5分。',
							replytotal:5,
							replylist:[
								{
									id:'1',
									comment_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									comment_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
				],
				"4":[
						{
							id:'1',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'Wish——最美移动端电商平台。。。',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'跨境电商移动端平台的黑马，一个传奇！凭借仅50个人的团队，Wish只用了三年时间，就成为北美最大的移动购物平台，这种令人尖叫的传奇亮瞎了许多人的眼，也让Wish在中国跨境电商中迅速窜红。',
							replytotal:5,
							replylist:[
								{
									id:'1',
									comment_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									comment_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
				],
				"5":[
						{
							id:'1',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'eBay并未对平台上销售假货的卖家进行严格监管。许多美国消费者将eBay视为优惠商品的聚集地。。。',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'eBay推翻了以往那种规模较小的跳蚤市场，将买家与卖家拉在一起，创造一个永不休息的市场。',
							replytotal:5,
							replylist:[
								{
									id:'1',
									comment_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									comment_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				},
				 
				emall_detail_strategylist:[],
				emall_strategylist:{
				"1":[
						{
							id:'1',
							title:'如何简单轻松通过亚马逊的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'<span style="font-size:24px;">Lorem ipsum dolor sit amet,</span>  consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							title:'如何简单轻松通过亚马逊的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'<h2>Lorem ipsum dolor sit amet,</h2> consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:5,
							replylist:[
								{
									id:'1',
									strategy_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									strategy_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				"2":[
						{
							id:'1',
							title:'如何简单轻松通过淘宝的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							title:'如何简单轻松通过淘宝的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:5,
							replylist:[
								{
									id:'1',
									strategy_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									strategy_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				"3":[
						{
							id:'1',
							title:'如何简单轻松通过天猫的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							title:'如何简单轻松通过天猫的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:5,
							replylist:[
								{
									id:'1',
									strategy_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									strategy_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				"4":[
						{
							id:'1',
							title:'如何简单轻松通过WISH的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							title:'如何简单轻松通过WISH的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:5,
							replylist:[
								{
									id:'1',
									strategy_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									strategy_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				"5":[
						{
							id:'1',
							title:'如何简单轻松通过eBay的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							title:'如何简单轻松通过eBay的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:5,
							replylist:[
								{
									id:'1',
									strategy_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									strategy_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				"6":[
						{
							id:'1',
							title:'如何简单轻松通过SHOPEE的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-12 12:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'110',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:0,
							replylist:[],
						},
						{
							id:'2',
							title:'如何简单轻松通过SHOPEE的入驻审核',
							commentor:'义乌小卖家',
							avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
							update_time:'2020-03-10 13:01:02',
							status:'1', //0未入驻 1已入驻
							is_share:false,
							is_reply:false,
							pv:'200',
							replynum:'123',
							prizenum:'230',
							sharenum:'168',
							desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
							replytotal:5,
							replylist:[
								{
									id:'1',
									strategy_id:'2',
									commentor:'桐庐小卖家',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-12 12:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'哈哈哈 说的不错！',
								},
								{
									id:'2',
									strategy_id:'2',
									commentor:'西湖小卖家:',
									avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
									update_time:'2020-03-10 13:01:02',
									status:'1', //0未入驻 1已入驻
									desc:'666!',
								},
							]
						},
					],
				},
				
				loading:true,
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
			YanShare,
			InfoShare,
			AddShareDialog,
			Ueditor,
		},
        created(){
			//this.emall_list = this.emall_all_list ;
			if(this.$route.query){
				this.emall_query= this.$route.query;
				this.activeName=this.emall_query['type']?this.emall_query['type']:this.activeName ;
				this.emall_query_id= this.emall_query['emall_id']
				this.emall_query_name= this.emall_query['emall_name']
				/*
				for(var i=0;i<this.emall_list.length;i++){
					if(this.emall_list[i]['name'] == this.emall_query['emall_name']){
						this.emall_query_index = i ;
						this.emall_query_id= this.emall_list[i]['id'] ;
						break;
					}
				}
				*/
			}
			this.emall_detail_commentlist = this.emall_commentlist[this.emall_query_id]?this.emall_commentlist[this.emall_query_id]:this.emall_commentlist['1'] ;
			this.emall_detail_strategylist = this.emall_strategylist[this.emall_query_id]?this.emall_strategylist[this.emall_query_id]:this.emall_strategylist['1'] ;
			this.get_emall_info();
        },
        mounted(){
            
        },
        methods: {
			
			//发布评论
			publishComment(){
				this.is_comment_submit = !this.is_comment_submit ;
			},
			getComment(ctx) {
				this.my_comment_content = ctx ;
				//console.log('Rich Text:',ctx)
			},
			submitComment(){
			    const para = {
			    	emall_id: this.emall_query_id ,
					comment:this.my_comment_content['html'],
			    	username:'username',
			    	post_type:'3',
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
				var my_comment_publish = [
					{
						id:'3',
						commentor:'义乌小卖家',
						avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
						update_time:'2020-03-12 12:01:02',
						status:'1', //0未入驻 1已入驻
						is_share:false,
						is_reply:false,
						pv:'200',
						replynum:'110',
						prizenum:'230',
						sharenum:'168',
						desc:'',
						replytotal:0,
						replylist:[],
					},
				]
				my_comment_publish[0]['desc'] = this.my_comment_content['html'] ; 
				if(!this.my_comment_content ){
					this.$message({
						message: '评论内容为空',
						type: 'error'
					})
				}else{
					console.log('my_comment_publish:',my_comment_publish)
					submitComment(para).then(res => {
						this.$message({
							message: '评论发布成功',
							type: 'success'
						})
						this.emall_detail_commentlist = my_comment_publish.concat(this.emall_detail_commentlist)
					})
				}
			},
			//发布攻略
			publishStrategy(){
				this.is_strategy_submit = !this.is_strategy_submit ;
			},
			getStrategy(ctx) {
				this.my_strategy_content = ctx ;
				//console.log('Rich Text:',ctx)
			},
			submitStrategy(){
			    const para = {
			    	emall_id: this.emall_query_id ,
					strategy:this.my_strategy_content['html'],
					title:this.my_strategy_title,
			    	username:'username',
			    	post_type:'4',
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
				 
			    var my_strategy_publish = [
					{
						id:'3',
						title:'',
						commentor:'义乌小卖家',
						avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
						update_time:'2020-03-12 12:01:02',
						status:'1', //0未入驻 1已入驻
						is_share:false,
						is_reply:false,
						pv:'1',
						replynum:'0',
						prizenum:'0',
						sharenum:'0',
						desc:'',
						replytotal:0,
						replylist:[],
					},
				]
				my_strategy_publish[0]['title'] = this.my_strategy_title ;
				my_strategy_publish[0]['desc'] = this.my_strategy_content['html'] ; 
				if(!this.my_strategy_content || !this.my_strategy_title){
					this.$message({
						message: '攻略标题或内容为空',
						type: 'error'
					})
				}else{
					console.log('my_strategy_publish:',my_strategy_publish)
					submitStrategy(para).then(res => {
						this.$message({
							message: '攻略发布成功',
							type: 'success'
						})
						this.emall_detail_strategylist = my_strategy_publish.concat(this.emall_detail_strategylist)
					})
				}
			},
			// 分享到微信，显示微信二维码弹框；
			shareToWeixin(){
				this.wxModal.show = true;
			},
			shareToQQ(){
				this.shareConfig('qq')
			},
			shareToQQzone(){
				this.shareConfig('qqZone')
			},
			shareToWeibo(){
				this.shareConfig('weibo')
			},
			shareToDouban(){
				this.shareConfig('douban')
			},
			
			emall_detail_operation(tab, e) {//点击选项卡
				this.tabType = tab.index;
				var tab_index = tab.index;//
				if(tab_index == 0){
					//待定
				}
			},
			emall_score_submit(){
			    const para = {
			    	emall_id: this.emall_query_id ,
			    	username:'username',
			    	score_pv:this.emall_detail_score_pv,
			    	score_orderspeed:this.emall_detail_score_orderspeed,
			    	score_cost:this.emall_detail_score_cost,
			    	score_profit:this.emall_detail_score_profit,
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
			   
			    submitEmallScore(para).then(res => {
			    	this.$message({
			    		message: '评分提交完成',
			    		type: 'success'
			    	})
			    	//this.getMoneyList()
			    })
			},
			emall_comment_prize(comment_index){
			    const para = {
			    	id: '1' ,
			    	username:'username',
			    	post_type:'3',
			    	shop_type:this.shop_type,
			    }
			   
			    prizeComment(para).then(res => {
			    	this.$message({
			    		message: '评论点赞成功',
			    		type: 'success'
			    	})
			    	//this.getMoneyList()
			    })
			},
			
			emall_comment_reply(comment_index){
				this.emall_detail_commentlist[comment_index].is_share = false ;
				this.emall_detail_commentlist[comment_index].is_reply = !this.emall_detail_commentlist[comment_index].is_reply
				if(this.emall_comment_reply_index!=comment_index){
					this.emall_detail_commentlist[this.emall_comment_reply_index].is_reply = false ;
					this.emall_detail_commentlist[this.emall_comment_reply_index].is_share = false ;
				}
				
				this.emall_comment_reply_index = comment_index ;
			},
			
			sumbit_comment_reply(comment_id='0'){
			    const para = {
			    	comment_id: comment_id ,
					replycomment:this.my_comment_reply,
			    	username:'username',
			    	post_type:'3',
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
			   
			    replyComment(para).then(res => {
			    	this.$message({
			    		message: '评论回复成功 id:'+comment_id,
			    		type: 'success'
			    	})
			    })
			},
			
			emall_comment_share(comment_index){
				const para = {
					id: '1' ,
					username:'username',
					post_type:'3',
					shop_type:this.shop_type,
					lang:this.lang,
				}
				this.emall_detail_commentlist[comment_index].is_reply = false ;
				this.emall_detail_commentlist[comment_index].is_share = !this.emall_detail_commentlist[comment_index].is_share
				if(this.emall_comment_share_index!=comment_index){
					this.emall_detail_commentlist[this.emall_comment_share_index].is_share = false ;
					this.emall_detail_commentlist[this.emall_comment_share_index].is_reply = false ;
				}
				
				this.emall_comment_share_index = comment_index ;
			},
			comment_reply_query(comment_id='0',comment_reply_index=0,comment_reply_id=0){
			    const para = {
			    	comment_id: comment_id ,
			    	username:'username',
			    	comment_reply_id:comment_reply_id,
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
				var commentreplyquery = [
					{
						id:'3',
						comment_id:'2',
						commentor:'桐庐小卖家',
						avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
						update_time:'2020-03-12 12:01:02',
						status:'1', //0未入驻 1已入驻
						desc:'哈哈哈 说的不错！',
					},
					{
						id:'4',
						comment_id:'2',
						commentor:'西湖小卖家:',
						avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
						update_time:'2020-03-10 13:01:02',
						status:'1', //0未入驻 1已入驻
						desc:'666!',
					},
				]
			    replyQueryComment(para).then(res => {
					/*
			    	this.$message({
			    		message: '评论回复查询成功',
			    		type: 'success'
			    	})
					*/
					if(commentreplyquery){
						for(var i=0;i<commentreplyquery.length;i++){
							this.emall_detail_commentlist[comment_reply_index]['replylist'].push(commentreplyquery[i]);
						}
						this.emall_detail_commentlist[comment_reply_index]['replytotal'] += commentreplyquery.length ;
					}
					console.log('emall_detail_commentlist:',this.emall_detail_commentlist[comment_reply_index]['replylist']);
			    })
			},
			
			emall_strategy_prize(strategy_index){
			    const para = {
			    	id: '1' ,
			    	username:'username',
			    	post_type:'3',
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
			   
			    prizeStrategy(para).then(res => {
			    	this.$message({
			    		message: '攻略点赞成功',
			    		type: 'success'
			    	})
			    	//this.getMoneyList()
			    })
			},
			emall_strategy_reply(strategy_index){
			    this.emall_detail_strategylist[strategy_index].is_share = false ;
			    this.emall_detail_strategylist[strategy_index].is_reply = !this.emall_detail_strategylist[strategy_index].is_reply
			    if(this.emall_strategy_reply_index!=strategy_index){
			    	this.emall_detail_strategylist[this.emall_strategy_reply_index].is_reply = false ;
			    	this.emall_detail_strategylist[this.emall_strategy_reply_index].is_share = false ;
			    }
			    
			    this.emall_strategy_reply_index = strategy_index ;
			},
			sumbit_strategy_reply(strategy_id='0'){
			    const para = {
			    	strategy_id: strategy_id ,
					replystrategy:this.my_strategy_reply,
			    	username:'username',
			    	post_type:'3',
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
			   
			    replyStrategy(para).then(res => {
			    	this.$message({
			    		message: '攻略回复成功 id:'+strategy_id,
			    		type: 'success'
			    	})
			    })
			},
			emall_strategy_share(strategy_index){
				const para = {
					id: '1' ,
					username:'username',
					post_type:'3',
					shop_type:this.shop_type,
				}
				this.emall_detail_strategylist[strategy_index].is_reply = false ;
				this.emall_detail_strategylist[strategy_index].is_share = !this.emall_detail_strategylist[strategy_index].is_share
				if(this.emall_strategy_share_index!=strategy_index){
					this.emall_detail_strategylist[this.emall_strategy_share_index].is_share = false ;
					this.emall_detail_strategylist[this.emall_strategy_share_index].is_reply = false ;
				}
				
				this.emall_strategy_share_index = strategy_index ;
			},
			
			strategy_reply_query(strategy_id='',strategy_reply_index=0,strategy_reply_id=0){
			    const para = {
			    	strategy_id: strategy_id ,
			    	username:'username',
			    	current_id:strategy_reply_id,
			    	shop_type:this.shop_type,
					lang:this.lang,
			    }
			   var strategyreplyquery = [
			   	{
			   		id:'3',
			   		strategy_id:'2',
			   		commentor:'桐庐小卖家',
			   		avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
			   		update_time:'2020-03-12 12:01:02',
			   		status:'1', //0未入驻 1已入驻
			   		desc:'哈哈哈 说的不错！',
			   	},
			   	{
			   		id:'4',
			   		strategy_id:'2',
			   		commentor:'西湖小卖家:',
			   		avatar:'http://shop.dreamer-inc.com/uploads/avatar.png',
			   		update_time:'2020-03-10 13:01:02',
			   		status:'1', //0未入驻 1已入驻
			   		desc:'666!',
			   	},
			   ]
			    replyQueryStrategy(para).then(res => {
					/*
			    	this.$message({
			    		message: '攻略回复查询成功',
			    		type: 'success'
			    	})
					*/
					if(strategyreplyquery){
						for(var i=0;i<strategyreplyquery.length;i++){
							this.emall_detail_strategylist[strategy_reply_index]['replylist'].push(strategyreplyquery[i]);
						}
						this.emall_detail_strategylist[strategy_reply_index]['replytotal'] += strategyreplyquery.length ;
					}
			    })
			},
            get_emall_info(){
                let para = {
                    username:this.username,
                    access_token:this.access_token,
					emall_id:this.emall_query_id,
					emall_name:this.emall_query_name,
					shop_type:this.shop_type,
					lang:this.lang,
                }
				
                getEmallInfo(para).then(res => {
                    this.loading = false ;
					this.emall_query_index = 0 ;
					this.emall_list = []
					let emall_list = res
					this.emall_list.push(emall_list) 
					
					console.log('get_emall_info return:',res);
                })
				.catch(err=>{
					console.log('get_emall_info err:',err)
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
			emall_detail_comment_select(selected=0) {
				var k = parseInt(selected) ;
				var comment_index_selected = this.comment_index_selected
				this.emall_detail_index[selected]['style_class'] = 'border:1px solid;background-color:#BBBBBB;color:#FFFFFF;';
				
				if(selected!=this.comment_index_selected){
					this.emall_detail_index[this.comment_index_selected]['style_class'] = 'background-color:#FFFFFF;color:#666';
				}
				this.comment_index_selected = selected ;
				
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
	
	.go-back{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		position: relative;
		z-index: 0;
	}
	.emall-detail{
		width: 96%;
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		padding: 10px;
		background-color:#FFFFFF;
		.el-row-two {
			margin-bottom: 20px;
			margin-top: 2px;
			padding: 10px;
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
	.emall-tab-pane{
		   font-size: 16px;
		   font-weight: bolder;
	}
	.emall-detail-comment{
		background-color: #fff;
		color:#333;
		border-radius: 10px;
		margin-top: 20px;
		
		.emall-detail-comment-avatar{
			width: 100%;
			min-width: 60px;
			max-width: 60px;
			height: 60px;
			padding: 5px;
			border-radius: 10px;
		}
		.emall-detail-comment-commentor{
			font-size: 12px;
			padding: 2px;
			color:#666;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
		}
		.emall-detail-comment-updtime{
			font-size: 12px;
			padding: 2px;
			color:#666;		
		}
		.emall-detail-comment-desc{
			font-size: 12px;
			padding: 2px;
			color:#666;
		}
		.emall-detail-comment-info{
			font-size: 12px;
			padding: 2px;
			color:#666;
		}  
		.emall-detail-comment-operation{
			font-size: 16px;
			padding: 0px;
			color:#666;
			border:1px solid;
		}		
	}
	
	.emall-detail-strategy{
		background-color: #fff;
		color:#333;
		border-radius: 10px;
		margin-top: 10px;
		
		.emall-detail-strategy-avatar{
			width: 100%;
			min-width: 60px;
			max-width: 60px;
			height: 60px;
			padding: 5px;
			border-radius: 10px;
		}
		.emall-detail-strategy-title{
			font-size: 16px;
			font-weight: bolder;
			padding: 2px;
			color:#666;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
		}
		.emall-detail-strategy-commentor{
			font-size: 12px;
			padding: 2px;
			color:#666;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
		}
		.emall-detail-strategy-updtime{
			font-size: 12px;
			padding: 2px;
			color:#666;		
		}
		.emall-detail-comment-desc{
			font-size: 12px;
			padding: 2px;
			color:#666;
		}
		.emall-detail-strategy-info{
			font-size: 12px;
			padding: 2px;
			color:#666;
		}  
		.emall-detail-strategy-operation{
			font-size: 16px;
			padding: 0px;
			color:#666;
			border:1px solid;
		}		
	}
	.emall-detail-score{
		width: 80%;
		text-align: center;
		align-items: center;
		margin-left: 20px;
		margin-bottom: 20px;
	}
	.emall-detail-score-title{
		width: 10%;
		line-height: 40px;
		height: 40px;
		align-items: center;
		text-align: center;
		margin-left: 20px;
		margin-bottom: 20px;
	}
	
</style>



