<template>
  	<div class="register-page">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form-contianer">
				<div class='titleArea rflex'>
					<img class="logo" :src="logo" :alt="$t('commons.company')">
					<span class='title'><i>{{ $t('commons.company') }}</i></span>
				</div>
				<el-steps :active="active" finish-status="success" align-center>
					<el-step :title="$t('commons.register_step_1')" @click="active_select(0)"></el-step>
					<el-step :title="$t('commons.register_step_2')" @click="active_select(1)"></el-step>
					<el-step :title="$t('commons.register_step_3')" @click="active_select(2)"></el-step>
				</el-steps>
				<div style="display: flex;flex-direction: row;justify-content: center;">
					<el-form :model="registerForm" :rules="rules" ref="ref_registerform" class="register-form" :label-position="labelPosition" label-width="80px" >
						<div v-if="active==0">
							<el-form-item :label="$t('commons.country')" prop="country"  class="register-item">
								<span class="register-tips"><svg-icon icon-class="country" /></span>
								<el-select v-model="registerForm.country" :placeholder="$t('commons.country')"  class="area">
									<el-option
										v-for="item_country in country_list"
										:key="item_country.code"
										:label="(lang=='zh'?item_country.cname:item_country.ename)"
										:value="item_country.code"
										@keyup.enter.native ="checkForm('registerForm')"
									>
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item :label="$t('commons.phone')" prop="phone"  class="register-item">
							    <span class="register-tips"><svg-icon icon-class="cellphone" /></span>
								<el-input @keyup.enter.native ="checkForm('registerForm')" class="area-phone" type="text" v-model="registerForm.phone" ></el-input>
								<el-button v-show="show" type="primary"  @click="get_verifycode" class="area-verifycode">{{ $t('commons.vrcode') }}</el-button>
								<span v-show="!show" class="count-down">{{count}}s</span>
							</el-form-item>
							<el-form-item :label="$t('commons.set_password')" prop="password" class="register-item"> 
								<span class="register-tips"><svg-icon icon-class="lock" /></span>
								<el-input @keyup.enter.native ="checkForm('registerForm')" class="area" type="password" v-model="registerForm.password"></el-input>
							</el-form-item>
							<el-form-item :label="$t('commons.vrcode')" prop="vrcode" class="register-item">
								<span class="register-tips"><svg-icon icon-class="link" /></span>
								<el-input @keyup.enter.native ="checkForm('registerForm')" class="area" type="text" v-model="registerForm.vrcode"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"  @click="register()" class="submit_btn">{{ $t('commons.next_step') }}</el-button>
							</el-form-item>
						</div>
						<div v-if="active==1">
							<el-form-item :label="$t('commons.realname')" prop="realname" class="register-item"> 
								<span class="register-tips"><svg-icon icon-class="user" /></span>
								<el-input @keyup.enter.native ="checkForm('registerForm')" class="area" type="text" v-model="registerForm.realname"></el-input>
							</el-form-item>
							<el-form-item :label="$t('commons.email')" prop="email" class="register-item">
								<span class="register-tips"><svg-icon icon-class="email" /></span>
								<el-input @keyup.enter.native ="checkForm('registerForm')" class="area" type="text" v-model="registerForm.email"></el-input>
							</el-form-item>
							<el-form-item :label="$t('commons.logo')" prop="logo" class="register-item">
								<el-upload
								  class="avatar-uploader"
								 :action="serverUrl"
								 :name="uploadName"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess"
								  :before-upload="beforeAvatarUpload">
								  <img v-if="registerForm.logo" :src="registerForm.logo" class="avatar">
								  <img v-else class="avatar" :src="upload_img">
								</el-upload>
							</el-form-item>
							<el-checkbox v-model="registerForm.register_checked">
							<span class="register-prototype">
								{{$t('commons.register_prototype')}}
							</span>
							</el-checkbox>
							 
							<el-form-item>
								<el-button type="primary"  @click="update_userinfo()" class="submit_btn">{{ $t('commons.next_step') }}</el-button>
							</el-form-item>
						</div>
						<div v-if="active==2">
							<el-form-item  class="register-item">
								<div style="display: flex;flex-direction: row;justify-content: center;">
									<img :src="register_end_img" class="register-end">
								</div>
							</el-form-item>
						 
							<el-form-item>
								<span class="register-end-tips">{{ $t('commons.register_step_end') }}</span>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"  @click="register_end()" class="submit_btn">{{ $t('commons.register_end') }}</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import logoImg from "@/assets/img/logo.png";
	import upload_img from "@/assets/img/u116.png";
	import register_end_img from "@/assets/img/u134.svg";
	import { 
		login,
		register,
		getVerifyCode,
		updateUserInfo,
	} from "@/api/user";
    import { 
		setToken,
		getToken 
	} from '@/utils/auth'
	import {
		shop_type
	} from "@/utils/env";
	import {
		isvalidPhone,
	} 
	from '@/utils/validate'
	var validPhone=(rule, value,callback)=>{
		if (!value){
			callback(new Error('请输入电话号码'))
		}else if (!isvalidPhone(value)){
			callback(new Error('请输入正确的11位手机号码'))
		}else {
			callback()
		}
	}
	var validAgreement=(rule, value,callback)=>{
		if (!value){
			callback(new Error('请同意协议内容'))
		}else {
			callback()
		}
	}
	export default {
	    data(){
			return {
				labelPosition: 'right',
				serverUrl: '/erp_upload',  // 这里写你要上传的图片服务器地址
				uploadName:'erp_upimg',
				show: true,
				count: '',
				timer: null,
				shop_type:shop_type?shop_type:2,
				lang:getToken('lang')||'zh',
				active:0,
				logo:logoImg,
				upload_img:upload_img,
				register_end_img:register_end_img,
				registerForm: {
					//username: '',
					phone: '',
					password: '',
					vrcode: '',
					country:'',
					realname:'',
					email:'',
					logo:'',
					register_checked:false,
				},
				rules: {
					/*
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
			        ],
					*/
				    phone: [
						{ required: true, trigger: 'blur', validator: validPhone } //这里需要用到全局变量
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					country: [
						{ required: true, message: '请选择国家', trigger: 'blur' }
					],
					/*
					vrcode: [
						{ required: false, message: '请输入验证码', trigger: 'blur' }
					],
					*/
					register_checked: [
						{ required: true, message: '请同意协议内容', trigger: 'blur',validator: validAgreement },
					],
				},
				country_list:[
					{
						cname:'中国',
						ename:'China',
						code:'86',
					},
					{
						cname:'美国',
						ename:'United States of America',
						code:'1',
					},
					{
						cname:'英国',
						ename:'United Kiongdom',
						code:'44',
					},
					{
						cname:'日本',
						ename:'Japan',
						code:'81',
					},
					{
						cname:'韩国',
						ename:'Korea',
						code:'82',
					},
					{
						cname:'印度',
						ename:'India',
						code:'91',
					},
					{
						cname:'泰国',
						ename:'Thailand',
						code:'66',
					},
					{
						cname:'越南',
						ename:'Vietnam',
						code:'84',
					},
					{
						cname:'沙特阿拉伯',
						ename:'Saudi Arabia',
						code:'966',
					},
					{
						cname:'俄罗斯',
						ename:'Russia',
						code:'7',
					},
					{
						cname:'新加坡',
						ename:'Singapore',
						code:'65',
					},
					{
						cname:'马来西亚',
						ename:'Malaysia',
						code:'60',
					},
					{
						cname:'菲律宾',
						ename:'Philippines',
						code:'63',
					},
					{
						cname:'印尼',
						ename:'Indonesia',
						code:'62',
					},
					{
						cname:'伊朗',
						ename:'Iran',
						code:'98',
					},
					{
						cname:'伊拉克',
						ename:'Iraq',
						code:'964',
					},
					{
						cname:'香港',
						ename:'Hongkong',
						code:'852',
					},
					{
						cname:'柬埔寨',
						ename:'Kampuchea (Cambodia )',
						code:'855',
					},
					{
						cname:'老挝',
						ename:'Laos',
						code:'856',
					},
					{
						cname:'澳门',
						ename:'Macao',
						code:'853',
					},
					{
						cname:'乌干达',
						ename:'Uganda',
						code:'256',
					},
					{
						cname:'南非',
						ename:'South Africa',
						code:'27',
					},
					{
						cname:'赞比亚',
						ename:'Zambia',
						code:'260',
					},
					{
						cname:'津巴布韦',
						ename:'Zimbabwe',
						code:'263',
					},
					{
						cname:'阿根廷',
						ename:'Argentina',
						code:'54',
					},
				]
			}
		},
		mounted(){
		},
		methods: {
			loginByWechat(){
			},
			count_down(){
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
				 	}, 1000)
				}
			},
			
			showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
			active_select(step){
			   this.active = step?step:this.active
			},
			register_end(){
				if(this.active == 2){
					let routeUrl = this.$router.resolve({
						path: "/login",
						query: {}
					});
					window.open(routeUrl.href, '_self'); //_self _blank
				}
			},
			
			register(){
				let para = {
					username:this.registerForm.phone?this.registerForm.phone:'',
					password:this.registerForm.password?this.registerForm.password:'',
					vrcode:this.registerForm.vrcode?this.registerForm.vrcode:'',
					country:this.registerForm.country?this.registerForm.country:'',
					shop_type:this.shop_type,
					lang:this.lang,
				}	
				this.$refs['ref_registerform'].validate((valid) => {
					if (valid) {
						register(para).then(res => {
							if(res.id){
								this.$message({
									message: '账号已经注册',
									type: 'success',
									duration: 1000
								});
								this.registerForm.logo = res.headimgurl?res.headimgurl:this.registerForm.logo
								this.registerForm.realname = res.realname
								this.registerForm.email = res.email
							}else{
								this.$message({
									message: '注册完成',
									type: 'success',
									duration: 1000
								});
							}
							
							this.show = true;
							this.active = 1,
							console.log('register return:',res);
						})
						.catch(err=>{
							console.log('register err:',err)
						});
					}
				});
				/*
				if (!isvalidPhone(para.username)){
					this.$message({
						message: 'Phone number is illegual',
						type: 'warn',
						duration: 1000
					});
				}else if(para.country==''){
					this.$message({
						message: 'Country is emtpy',
						type: 'warn',
						duration: 1000
					});
				}else if(para.password==''){
					this.$message({
						message: 'Password is emtpy',
						type: 'warn',
						duration: 1000
					});
				}else{
					
				}
				*/
			},
			
			update_userinfo(){
				let para = {
					username:this.registerForm.phone?this.registerForm.phone:'',
					password:this.registerForm.password?this.registerForm.password:'',
					country:this.registerForm.country?this.registerForm.country:'',
					realname:this.registerForm.realname?this.registerForm.realname:'',
					email:this.registerForm.email?this.registerForm.email:'',
					logo:this.registerForm.logo?this.registerForm.logo:'',
					register_checked:this.registerForm.register_checked?this.registerForm.register_checked:false,
					shop_type:this.shop_type,
					lang:this.lang,
				}	
				this.$refs['ref_registerform'].validate((valid) => {
					if(!this.registerForm.register_checked){
						this.$message({
							message: '请同意协议内容',
							type: 'error',
							duration: 1000
						});
					}else if (valid) {
						updateUserInfo(para).then(res => {
							this.$message({
								message: '资料更新完成',
								type: 'success',
								duration: 1000
							});
							this.show = true;
							this.active = 2
							console.log('updateUserInfo return:',res);
						})
						.catch(err=>{
							console.log('updateUserInfo err:',err)
						});
					}
				});
				/*
				if (!isvalidPhone(para.username)){
					this.$message({
						message: 'Phone number is illegual',
						type: 'warn',
						duration: 1000
					});
				}else if(para.country==''){
					this.$message({
						message: 'Country is emtpy',
						type: 'warn',
						duration: 1000
					});
				}else if(para.password==''){
					this.$message({
						message: 'Password is emtpy',
						type: 'warn',
						duration: 1000
					});
				}else if(para.realname==''){
					this.$message({
						message: 'Realname is emtpy',
						type: 'warn',
						duration: 1000
					});
				}else if(!this.register_checked){
					this.$message({
						message: 'Need your agreement for Prototype',
						type: 'warn',
						duration: 1000
					});
				}else if(para.email==''){
					this.$message({
						message: 'Email Code is emtpy',
						type: 'warn',
						duration: 1000
					});
				}else{
					
				}
				*/
				
			},
		    checkForm(registerForm) {
				this.$refs[registerForm].validate((valid) => {
					console.log('checkForm valid:',valid);
				});
			},
			get_verifycode(){
			    let para = {
			        username:this.registerForm.phone,
					shop_type:this.shop_type,
					lang:this.lang,
			    }
				
			    getVerifyCode(para).then(res => {
			        this.$message({
			          message: '验证码获取完成',
			          type: 'success',
			          duration: 1000
			        });
					this.count_down()
					console.log('getVerifyCode return:',res);
			    })
				.catch(err=>{
					console.log('getVerifyCode err:',err)
				});
			},
				
			handleAvatarSuccess(res, file) {
				console.log('handleAvatarSuccess res:',res,' file:',file)
				this.registerForm.logo = res.result.img_url; //URL.createObjectURL(file.raw)
			},
			
			beforeAvatarUpload(file) {
				//const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
		},
	}
</script>

<style lang="less" scoped>
	.register-page{
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/img/bg9.jpg) no-repeat center center;
		background-size: 100% 100%;
	}
	.form-contianer{
		position: absolute;
		top: 50%;
        left: 50%;
		transform: translate(-50%,-50%);
		background: #fff;
		width:40%;
		border-radius: 5px;
		padding: 10px;
		text-align: center;
		.titleArea{
			justify-content: center;
   			align-items: center;
			text-transform: uppercase;
			font-size: 22px;
			width: 100%;
			padding-bottom: 20px;
			.logo{
				width: 40px;
    			margin-right: 10px;
				border-radius: 50%;
			}
			.title{
				i{
				   color: #FF6C60;
				}
			}
		}
	
		.register-form{
			margin-top: 20px;
			width: 70%;
			.submit_btn{
				width: 50%;
				padding:13px 0;
				font-size: 16px;
			}
			.register-item{
				.register-tips{
					position: relative;
					width: 15%;
					z-index: 20;
					color: #FF7C1A;
					font-size: 18px;
					transform: translateY(-50%);
				}
				.register-end-tips{
					position: relative;
					z-index: 20;
					color: #FF7C1A;
					font-size: 18px;
					transform: translateY(-50%);
				}
				.area{
					margin-left: 10px;
					width: 80%;
				}
				.area-phone{
					margin-left: 10px;
					width: 55%;
				}
				.area-verifycode{
					margin-left: 10px;
					width: 20%;
				}
				
				.avatar-uploader .el-upload {
				    border: 1px dashed #333;
				    border-radius: 6px;
				    cursor: pointer;
				    position: relative;
				    overflow: hidden;
				 }
				.avatar-uploader .el-upload:hover {
				    border-color: #333;
				}
				
				.avatar-uploader-icon {
				    font-size: 28px;
				    color: #BBBBBB;
				    width: 178px;
				    height: 178px;
				    line-height: 178px;
				    text-align: center;
				}
				.avatar {
				    width: 178px;
				    height: 178px;
				    display: block;
				}
				.register-end {
				    width: 50%;
					align-items: center;
				    display: block;
				}
			}
	    }
		.register-prototype{
			width: 80%;
			position: relative;
			font-size: 12px;
			padding: 2px;
			color:#666;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
	
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
	
	.count-down{
		margin-left: 10px;
		font-size:12px;
		background-color: #BBBBBB;
		width: 20%;
	}
	.sanFangArea{
		border-top: 1px solid #DCDFE6;
		padding: 10px 0;
		display: none;
		.title{
			font-size: 14px;
			color: #8b9196;
			margin-bottom: 10px;
		}
		ul{
			li{
				flex:1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.svg-icon{
					font-size: 24px;
				}
			}
		}
	}
	
</style>
