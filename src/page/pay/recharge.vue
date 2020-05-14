<template>
<div>
	<div id="qrcode" class="wechat_code"></div>
	<el-dialog
		:title="$t('commons.recharge')"
		:visible.sync="rechargeInfo.dialogVisible"
		width="65%">
		<el-form :model="rechargeInfo" status-icon :rules="rules" ref="rechargeInfo" label-width="100px">
		  <el-form-item :label="$t('commons.pay')" prop="channel" style="width: 30%;margin-left: 0px">
		  	<el-cascader
		  	clearable
		  	v-model="rechargeInfo.channel"
		  	:options="pay_channel"
		  	filterable>
		  	</el-cascader>
		  </el-form-item>
		  <el-form-item :label="$t('commons.amount')" prop="amount">
		  	<el-input :placeholder="$t('commons.amount')" v-model="rechargeInfo.amount" size="small" style="width: 30%;margin-left: 0px"></el-input>
		  </el-form-item>
		  
		  <el-form-item>
			 <el-button @click="recharge_quit()">取 消</el-button>
		    <el-button type="primary" @click="recharge_init('rechargeInfo')">提交</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
</div>
</template>
<script>
import {
		rechargeOrder,
	} from "@/api/user";
	
import {
		shop_type,
	} from "@/utils/env" ;
	
import {
		setToken,
		getToken,
	} from '@/utils/auth';
	
import QRCode from 'qrcodejs2'

	export default {
		name: "recharge",
		data() {
			var isPriceVlidator= (rule, value, callback) => {
				var pattern = /^\d+.?\d{0,2}$/
				if (!pattern.test(value)) {
					return callback(new Error('小数点后最多只能输入两位'))
				} else {
					return callback()
				}
			}
			
			return {
				shop_type:shop_type?shop_type:10,
				lang:getToken('lang')||'zh',
				access_token:getToken('Token')||'zh',
				username:getToken('Username')||'',
				rechargeInfo:{
					dialogVisible:true,
					amount:0,
					type:0,
					channel:0,
					currency:0,
					cardno:'',
					note:''
				},
				rules: {
				    amount: [
						{ required: true, message: '请输入金额',trigger: 'blur' } ,//这里需要用到全局变量
						{ validator: isPriceVlidator, trigger: 'blur' }
					],
					channel: [
						{ required: true, trigger: 'blur' } //这里需要用到全局变量
					],
				},
				pay_channel:[
					{
						label:'微信支付',
						value:'1',
					},
					{
						label:'支付宝',
						value:'2',
					},
					{
						label:'银行卡',
						value:'3',
					},
				],
			}
		},
		created(){
			console.log('recharge starting...'); 
		},
		mounted(){
			//this.changeLocale('zh');
		},
		methods:{
			qrCode(){
				if( this.codeUrl &&  this.codeUrl!==''){
					if(this.qrcode !== null){
						this.qrcode.clear();
						this.qrcode.makeCode(this.codeUrl);
					}else{
						this.qrcode = new QRCode('qrcode', {
							width: 200,
							height: 200, // 高度
							text: this.codeUrl // 二维码内容
						})
					}
					this.setTimeout=setTimeout(this.queryOrder,3000)
				}
			},
			
			recharge_init(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.rechargeInfo.amount == 0 || this.rechargeInfo.channel==0){
							this.$message({
							message: '输入信息有误!',
							type: 'warning',
							duration: 1000
							});
						}else{
							let para = {
								username:this.username,
								access_token:this.access_token,
								shop_type:this.shop_type,
								lang:this.lang,
								amount:this.rechargeInfo.amount,
								channel:this.rechargeInfo.channel,
							}
						  
							rechargeOrder(para).then(res => {
								console.log('recharge_init return:',res);
							})
							.catch(err=>{
								console.log('recharge_init err:',err)
							});
						}
					} else {
					  console.log('error submit!!');
					  return false;
					}	
				});
			},
			
			recharge_quit(){
				this.rechargeInfo.dialogVisible = !this.rechargeInfo.dialogVisible
				let routeUrl = this.$router.resolve({
				    path: "/",
				    query: {}
				  });
				  console.log('recharge_quit')
				  window.open(routeUrl.href, '_self'); //_self _blank
			}
		}
	}
</script>