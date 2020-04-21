<template>
	<div class="upload" :class="{error:err}">
		<div class="upload-wrapper" :style="{margin:'0 0 0 '}">
			<el-upload
			  ref="uploadControl"
			  :action="serverUrl"
			  :name="uploadName"
			  :auto-upload='false'
			  :multiple="false"
			  :accept="accept"
			  list-type=""
			  :show-file-list="ShowList"
			  :on-success="_success"
			  :on-change="onChange"
			  :on-remove="handleRemove"
			  >
			  <div style="display:flex; flex-direction: column;justify-content: center;">
				  <el-button :icon="button_icon" type="primary"><slot name="label"></slot></el-button>
			  </div>
				
			  <!--
				<i class="el-icon-plus"></i>
				<div slot="tip" class="el-upload__tip">格式要求：jpg/png，尺寸939*480px</div>
			  -->
			</el-upload>
			<el-progress v-show="show_process" type="circle" :percentage="process_percent" :stroke-width="10"></el-progress>
			<el-dialog :visible.sync="dialogVisible" title="图片预览">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<div class="tips">{{tips}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'upload',
		data(){
			return {
				serverUrl: '/erp_upload',  // 这里写你要上传的图片服务器地址
				uploadName:'erp_upimg',
				process_percent: 0,
				show_process:false,
				ShowList:false,
				fileList: [],
				dialogVisible:false,
				dialogImageUrl:'',
				tips:'',
				isInit:true,
				err:false
			}
		},
		props: {
			limit:{
				type:Number,
				default(){
					return 1
				}
			},
			accept:{
				type:String,
				default(){
					return '*/'
				}
			},
			button_icon:{
				type:String,
				default(){
					return 'el-icon-upload2'
				}
			},
			para:{
				type:[Object,String],
				default(){
					return '{}'
				}
			}
		},
		watch:{
			fileList:function(val,oval){
				//this.$emit('change',val);	
				console.log('para:',this.para)
				if(!this.isInit){
					this.valiDate();
				}
			},
			isInit:function(val,oval){
				if(val){
					this.err = false,
					this.tips = '';
				}
			}
		},
		mounted(){
			this.$nextTick(() =>{
				this.$on('resetForm',() =>{
					this.resetForm();
				})
			})
		},
		methods:{
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
		    onChange(file,fileList){
		        const isLt50M = file.size / 1024 / 1024 < 50;
		        this._fileWithCheck(file.raw).then(res =>{
		        	if (!isLt50M) {
			          this.$message.error('上传头像图片大小不能超过 2MB!');
			          return;
			        }
		        	/*
		        	if(res.width > 939 || res.height > 480){
		        		this.$message.error('上传头像图片大小不能超过规定尺寸');
			          	return;
		        	};
		        	*/
		        	this.$refs.uploadControl.submit();
					
		        });
				this.$emit('change',file,fileList,this.para);
				if(file.status=='ready'){
					this.process_percent = 0
					this.show_process = true
					const upload_interval = setInterval(()=>{
						if(this.process_percent>=99){
							clearInterval(upload_interval)
							return
						}
						this.process_percent +=1
					},20)
				}else if(file.status=='success'){
					this.process_percent =100
					this.show_process = false
				}
		    },
		    _success(res,file,fileList){
		    	this.fileList.splice(0,1,file.url);
		    	if(this.isInit == true){
		    		this.isInit = false;
		    	}
		    },
		   
		    _fileWithCheck(file){
		    	var reader = new FileReader();
		    	var newImg = new Image();
		    	reader.readAsDataURL(file);
		    	reader.onload = function(res){
		    		newImg.src = res.target.result;
		    	};
		    	return new Promise((resolve,reject) =>{
		    		
			    	newImg.onload = function(){
			    		resolve(newImg)
			    	}
			    	
		    	});
		    },
		    
		    _deleteImg(index){
		    	this.fileList.splice(index,1);
		    },
		    
		    _preView(img){
		    	this.dialogVisible = true;
		    	this.dialogImageUrl = img;
		    },
		    
		    resetForm(){
		    	this.isInit = true;
		    	this.fileList = [];
		    },
		    
		    valiDate(msg='请上传图片'){
		    	this.isInit = false;
		    	if(this.fileList.length == 0){
	    			this.tips = msg;
	    			this.err = true;
		    		return false;
		    	}else{
		    		this.tips = '';
		    		this.err = false;
		    		return true;
		    	}
		    }
		}

	}
</script>

<style scoped lang="scss">
.el-dialog__header{
	background-color: transparent;
}
	.upload {
		position: relative;
		padding-bottom: 20px;
		.label {
			float: left;
			text-align: right;
			padding-right: 12px;
			box-sizing: border-box;
			line-height: 40px;
			label {
				span {
					color: #606266;
					font-size: 14px;
				}
			}
		}
		.upload-wrapper{
			min-height: 20px;
			.imgList{
				vertical-align: top;
				display:inline-block;
				li{
					width: 148px;
					height: 148px;
					border:1px solid #c0ccda;
					border-radius: 6px;
					text-align: center;
					position: relative;
					line-height: 148px;
					overflow: hidden;
					img{
						display: inline-block;
						vertical-align: middle;
						max-width: 100%;
					}
					.marsk{
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						z-index: 5;
						opacity: 0;
						filter:alpha(opacity=0);
						background-color: #000;
						transition: 0.5s;
						-webkit-transition: 0.5s;
						-ms-transition: 0.5s;
					}
					.icons{
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						z-index: 6;
						display: none;
					}
				}
				li:hover{
					.marsk{
						opacity: 0.6;
						filter:alpha(opacity=60)
					}
					.icons{
						display: block;
						i{
							color: #fff;
							display: inline-block;
							cursor:pointer;
							font-size: 20px;
						}
					}
				}
			}
		}
		.tips{
			bottom: 0;
		}
	}
	
</style>