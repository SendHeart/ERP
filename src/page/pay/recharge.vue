<template>
<div>
	
	<el-dialog
		:title="$t('commons.recharge')"
		:visible.sync="rechargeInfo.dialogVisible"
		 :before-close="recharge_quit"
		width="65%">
		<el-row :gutter="24">
			<el-col :span="18">
				<div class="grid-content bg-purple">
					<el-form :model="rechargeInfo" status-icon :rules="rules" ref="rechargeInfo" label-width="100px">
						<el-form-item :label="$t('commons.orderno')" v-if="rechargeInfo.order_no">
							<el-input :placeholder="$t('commons.orderno')" v-model="rechargeInfo.order_no" size="small" :disabled="true" style="width: 30%;margin-left: 0px"></el-input>
						</el-form-item>
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
							<el-button type="primary" @click="recharge_order('rechargeInfo')">提交</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
			<el-col :span="4">
				<div id="qrcode" class="wechat_code"></div>
			</el-col>
		</el-row>
		
		
	</el-dialog>
</div>
</template>
<script>
import {
		rechargeOrder,
		wxPay,
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
				order_no:'',
				code_url:null,
				rechargeInfo:{
					dialogVisible:true,
					order_no:'',
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
				if( this.code_url &&  this.code_url!==''){
					document.getElementById('qrcode').innerHTML = ''; 
					this.qrcode = new QRCode('qrcode', {
						width: 120,
						height: 120, // 高度
						text: this.code_url // 二维码内容
					})
					this.$message({
					  message: '请扫码支付',
					  type: 'success',
					  duration: 2000
					});
					//this.setTimeout=setTimeout(this.queryOrder,3000)
				}
			},
			
			get_pay_qrcode(codeurl=''){
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					trade_type:'native',
					body:'Dream Max',
					tradeNo:this.rechargeInfo.order_no,
					totalFee:(this.rechargeInfo.amount+0)*100
				}
				console.log('get_pay_qrcode para:',para);
				if(codeurl==''){
					wxPay(para).then(res => {
						this.$message({
					     message: 'Completed!',
					     type: 'success',
					     duration: 1000
					   });
					   console.log('get_pay_qrcode return:',res);
					   this.code_url= res.code_url 
					   this.qrCode()
					})
					.catch(err=>{
						console.log('get_pay_qrcode err:',err)
					});
				}else{
					this.code_url= codeurl
					this.qrCode()
				}
			},
			
			recharge_order(formName){
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
								amount:(this.rechargeInfo.amount+0)*100,
								channel:this.rechargeInfo.channel,
								type:this.rechargeInfo.type,
								order_no:this.rechargeInfo.order_no
							}
							console.log('recharge_init para:',para);
							rechargeOrder(para).then(res => {
								let pay_info  = res
								this.rechargeInfo.order_no = res.order_no
								console.log('recharge_init return:',res)
								this.get_pay_qrcode()
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
			},
			
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					this.recharge_quit();
				})
				.catch(_ => {
					
				});
			}
		}
	}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #FFFFFF;
  }
  .bg-purple {
    background: #FFFFFF;
  }
  .bg-purple-light {
    background: #FFFFFF;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #FFFFFF;
  }
  .qrcode {
	  display: flex;
	  flex-direction: column;
	  justify-content: flex-start;
	  width: 100%;
  }
  .scan-note {
	  width: 100%;
	  font-size: 18px;
	  margin-top: 20px;
	  justify-content: center;
	  align-items: center;
	  text-align: center;
  }
</style>