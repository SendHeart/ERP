<template>
 <div style="height:auto;" v-if="webAddress">
	 <el-button style="margin-top: 15px;margin-left: 30px;" size="medium" type="info" @click="go_back()">{{ $t('commons.goback') }}</el-button>
	 <el-button style="margin-top: 15px;margin-left: 30px;" size="medium" type="info" @click="view_html()">{{ $t('commons.view') }}</el-button>
 	<iframe 
		id="goodsdetail_iframe"  
		frameborder=0 
		name="goodsdetail_iframe" 
		ref="goodsdetail_iframe"
		scrolling=auto 
		:src="webAddress[0].link" 
		style="background-color:transparent; position：absolute;width: 100%;height:100% ; top: 0;left:0;bottom:0;" 
		@load="setInframeHeight" 
		sandbox="allow-forms allow-scripts allow-same-origin"
		>
	</iframe>
 </div>
  <!--
	
	<div>
	  <v-html-panel v-if="webAddress" :url.asyc="webAddress[0].link"></v-html-panel>
	</div>
	 
	-->
 </template>
 
 <style scoped>
	
 </style>
  
<script>
	//import htmlPanel from '@/components/htmlPanel.vue' ;
	 
	import {
		setToken,
		getToken,
	} from '@/utils/auth';
	import { 
		shop_type
	} from "@/utils/env";
	export default{
		data () {
			return {
				shop_type:shop_type?shop_type:10,
				lang:getToken('lang')||'zh',
				access_token:getToken('Token')||'zh',
				username:getToken('Username')||'',
				url: '',
				  
				iframeState:false,
				goBackState:false,
				webAddress:null,
			}
		},
		
		mounted () {
			if(this.$route.query){
				this.webAddress = []
				this.html_info= this.$route.query;
				let webaddress = {
					link:this.html_info['url'] ,
					name:this.html_info['name'] ,
				}
				this.webAddress.push(webaddress) ;
			}
			/*
			
			*/
		},
		handleMessage (event) {
		    // 根据上面制定的结构来解析iframe内部发回来的数据
		    const data = event.data
			console.log('handleMessage:',data)
		    switch (data.cmd) {
		      case 'returnFormJson':
		        // 业务逻辑
		        break
		      case 'returnHeight':
		        // 业务逻辑
		        break
		    }
		},
		
		components: { 
			//'v-html-panel':htmlPanel,
		},
		
		methods: {
			go_back(){
				this.$router.go(-1)
				
				//window.close();
			},
			
			view_html(){
				// 这里就拿到了iframe的对象
				//console.log('goodsdetail_iframe:',this.$refs.goodsdetail_iframe)
				// 这里就拿到了iframe的window对象
				//console.log('goodsdetail_iframe contentWindow:',this.$refs.goodsdetail_iframe.contentWindow)
				//const oIframe = this.$refs.goodsdetail_iframe;
				//var iwindow = this.$refs.goodsdetail_iframe.contentWindow;
				//console.log("window:",iwindow);//获取iframe的window对象
				
				//var idoc = iwindow.document;
				//console.log("document:",idoc);  //获取iframe的document
				//console.log("html:",idoc.documentElement);//获取iframe的html
				//console.log("html head:",idoc.head);  //获取head
				//console.log("html body:",idoc.body);  //获取body 
				 
				
			},
			
			setInframeHeight(){
				const oIframe = document.getElementById('goodsdetail_iframe');
				const deviceWidth = document.documentElement.clientWidth;
				const deviceHeight = document.documentElement.clientHeight;
				oIframe.style.height = (Number(deviceHeight)+100) + 'px';
				oIframe.style.width = deviceWidth + 'px';
				//oIframe.style.height = deviceHeight + 'px';
				
				
			 }
		},
		
	}
 </script>