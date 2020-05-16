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
							<el-button @click="recharge_quit()">{{$t('commons.cancel')}}</el-button>
							<el-button type="primary" @click="recharge_order('rechargeInfo')">{{$t('commons.confirm')}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
			<el-col :span="4">
				<div id="qrcode" class="wechat_code"></div>
			</el-col>
		</el-row>
	</el-dialog>
	<el-dialog
		:title="$t('commons.accountinfo')"
		:visible.sync="accountInfo.dialogVisible"
		:before-close="recharge_quit"
		width="50%">
		<el-form :label-position="labelPosition" label-width="80px" :model="accountInfo">
			<el-row :gutter="24">
				<el-col :span="8">
					<el-form-item :label="$t('commons.m_id')">
						<el-input v-model="accountInfo.m_id"  readonly style="width:100px;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item :label="$t('commons.balance_cash')">
						<el-input v-model="accountInfo.balance_cash[0]['bal_desc']"  readonly style="width:180px;font-size: 18px;color:#ff0000;background-color: #FFFFFF;"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table v-if="accountInfo.details" 
			:data="accountInfo.details"
			:row-class-name="account_detail_class"
			height="250"
			border
			stripe
			style="width: 100%">
			<el-table-column
				prop="date"
				:label="$t('commons.date')"
				width="180">
			</el-table-column>
		    <el-table-column 
				prop="amount_desc"
				:label="$t('commons.amount')"
				width="180">
			</el-table-column>
			<el-table-column
				prop="note"
				:label="$t('commons.note')">
			</el-table-column>
		</el-table>
		<el-row v-if="paginations">
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
	</el-dialog>
</div>
</template>
<script>
import {
		rechargeOrder,
		wxPay,
		queryBalAccount,
		queryDetailsAccount,
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
				page_type:'',
				rechargeInfo:{
					dialogVisible:false,
					order_no:'',
					order_price:0,
					order_status:0,
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
				],
				accountInfo:{
					dialogVisible:false,
					m_id:0,
					level:'',
					balance_cash:[{"bal":"0","currency":"RMB","bal_desc":""}],
					balance_quan:[{"bal":"0","type":"score"},{"bal":"0","reward":"0"}],
					details:[],
					type:0,
					note:''
				},
				labelPosition: 'right',
				paginations:
				{
					total: 0,        // 总数
					pageIndex: 1,  // 当前位于哪页
					pageSize: 20,   // 1页显示多少条
					pageSizes: [5, 10, 15, 20],  //每页显示多少条
					layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
				},
			}
		},
		
		created(){
			console.log('recharge starting...')
			if(this.$route.query){
				this.page_query= this.$route.query;
				this.page_type=this.page_query['type']?this.page_query['type']:'recharge' 
				if(this.page_type=='recharge'){
					this.rechargeInfo.dialogVisible = !this.rechargeInfo.dialogVisible
				}else if(this.page_type=='account'){
					this.query_bal_account()
					this.query_details_account()
					this.accountInfo.dialogVisible = !this.accountInfo.dialogVisible
				}
			}
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
					let pay_note = ''
					if(this.rechargeInfo.channel==1){
						pay_note = this.$t('commons.wechat')
					}else if(this.rechargeInfo.channel==2){
						pay_note = this.$t('commons.alipay')
					}else if(this.rechargeInfo.channel==2){
						pay_note = this.$t('commons.bancard')
					}
					this.$message({
					  message: '请'+pay_note+'扫码支付',
					  type: 'success',
					  duration: 2000
					});
					this.query_order()
				}
			},
			
			query_order(){
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
				console.log('query_order para:',para);
				rechargeOrder(para).then(res => {
					let pay_info  = res
					this.rechargeInfo.order_no = pay_info.order_no
					this.rechargeInfo.order_price = pay_info.order_price
					this.rechargeInfo.order_status = pay_info.order_status
					console.log('query_order return:',pay_info)
					if(this.rechargeInfo.order_status == '2'){
						this.$message({
						message: this.$t('commons.success'),
						type: 'success',
						duration: 3000
						});
						this.query_bal_account()
					}else{
						this.setTimeout=setTimeout(this.query_order(),5000)
					}
					
				})
				.catch(err=>{
					console.log('query_order err:',err)
				});
			},
			
			query_bal_account(){
				let pagenum = getToken('Pagenum')
				this.paginations.pageIndex = pagenum?parseInt(pagenum):this.paginations.pageIndex
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					pagesize:this.paginations.pageSize,
					page:this.paginations.pageIndex,
				}
				console.log('query_order para:',para);
				queryBalAccount(para).then(res => {
					let account_info = res
					this.accountInfo.balance_cash = account_info.balance_cash
					this.accountInfo.balance_quan = account_info.balance_quan
					this.accountInfo.level = account_info.level
					this.accountInfo.type = account_info.type
					this.accountInfo.m_id = account_info.m_id
					console.log('query_bal_account return:',account_info)
					this.rechargeInfo.dialogVisible = false
					this.accountInfo.dialogVisible = true
				})
				.catch(err=>{
					console.log('query_bal_account err:',err)
				});
			},
			query_details_account(){
				let pagenum = getToken('account_Pagenum')
				this.paginations.pageIndex = pagenum?parseInt(pagenum):this.paginations.pageIndex
				let para = {
					username:this.username,
					access_token:this.access_token,
					shop_type:this.shop_type,
					lang:this.lang,
					pagesize:this.paginations.pageSize,
					page:this.paginations.pageIndex,
				}
				console.log('query_order para:',para);
				queryDetailsAccount(para).then(res => {
					let account_details = res.result
					this.paginations.total = res.total
					for(let i=0;i<account_details.length;i++){
						 if(account_details[i]['amount_type'] == 2){
							 account_details[i]['amount_desc'] = '-'+account_details[i]['amount']
						 } else{
							 account_details[i]['amount_desc'] = '+'+account_details[i]['amount']
						 }
					} 
					this.accountInfo.details = account_details
					
					console.log('query_details_account return:',account_details)
					this.rechargeInfo.dialogVisible = false
					this.accountInfo.dialogVisible = true
				})
				.catch(err=>{
					console.log('query_details_account err:',err)
				});
			},
			
			account_detail_class({row, rowIndex}) {
				if (row.amount_type == 2) {
					return 'account-decrease';
				} else  {
					return 'account-increase';
				}
			},
				 
			get_pay_qrcode(order_no=''){
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
				let token_codeurl = 'code_url'+order_no
				let codeurl = getToken(token_codeurl)||''
				
				if(codeurl==''){
					console.log('get_pay_qrcode para:',para);
					wxPay(para).then(res => {
						this.$message({
					     message: 'Completed!',
					     type: 'success',
					     duration: 1000
					   });
					   console.log('get_pay_qrcode return:',res);
					   this.code_url= res.code_url 
					   let token_code_url = 'code_url'+this.rechargeInfo.order_no
					   setToken(token_code_url,this.code_url)
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
							//console.log('recharge_init para:',para);
							rechargeOrder(para).then(res => {
								let pay_info  = res
								this.rechargeInfo.order_no = res.order_no
								this.rechargeInfo.order_price = res.order_price
								this.rechargeInfo.order_status = res.order_status
								//
								if(this.rechargeInfo.order_status == '2'){
									this.$message({
									message: 'Success!',
									type: 'success',
									duration: 2000
									});
									console.log('recharge_init return:',res)
								}else{
									this.get_pay_qrcode(this.rechargeInfo.order_no)
								}
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
			},
			
			// 每页多少条切换
			handleSizeChange(pageSize) {
			   this.paginations.pageSize = pageSize;
			   this.query_account()();
			},
			// 上下分页
			handleCurrentChange(page) {
			   this.paginations.pageIndex = page;
			   setToken("account_Pagenum",this.paginations.pageIndex)
			   this.query_account();
			},
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
  .account-decrease {
	  color:#E60000;
	  font-weight: bold;
  }
  .account-increase {
  	  color:#666;
  }
  
</style>