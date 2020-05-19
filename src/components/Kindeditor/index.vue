<template>
  <div class="margin-top-20">
    
	<!--
    <input
      @change="selectedFile"
      style="visibility: hidden;height:0;"
      type="file"
      name
      id="inputFile"
    />
	
	<el-upload
		style="display: none;"
		class="uploader"
		:action="serverUrl"
		name="erp_upimg"
		:data="params"
		:headers="header"
		:show-file-list="false"
		:on-success="uploadSuccess"
		:on-error="uploadError"
		:before-upload="beforeUpload">
	</el-upload>
	-->
	<el-upload v-if="uploadVisible"
		class="multiuploader"
		ref="upload"
		:multiple="true"
		:action="serverUrl"
		name="erp_upimg"
		list-type="picture-card"
		:auto-upload="false"
		:file-list="fileList"
		:on-preview="handlePictureCardPreview"
		:on-remove="handleRemove"
		:before-upload="beforeImageUpload"
		:on-success="uploadSuccess"
		:on-error="uploadError"
		>
		<i class="el-icon-plus"></i>
	</el-upload>
	<el-button v-if="uploadVisible" size="small" type="success" @click="submitUpload">{{$t('commons.news_pic_ins')}}</el-button>
	<el-button v-if="uploadVisible" size="small" type="warning" @click="clearUploadedImage">{{$t('commons.news_pic_cls')}}</el-button>
	<el-dialog :visible.sync="dialogVisible" :append-to-body="true" >
		<img width="100%" :src="dialogImageUrl" alt />
	</el-dialog>
	<textarea :id="id" name="content" v-model="outContent"></textarea>
  </div>
</template>
<script>
import axios from 'axios'
import "kindeditor/themes/default/default.css";
import "kindeditor/kindeditor-all-min.js";
import "kindeditor/lang/zh-CN.js";

// 以下四个配置文件见下文

import items from "./config/items";
import htmlTags from "./config/htmlTags";
import fontSizeTable from "./config/fontSizeTable";
import otherConfig from "./config/otherConfig";

export default {
	name: "kindeditor-component",
	props: {
		params:{
			type:Object,
			default(){
				return {}
			}
		},
		// 编辑器内容 url
		html: {
			type: String,
		default: ""
		},
    // 编辑器内容
		content: {
			type: String,
			default: ""
		},
    // 编辑器id
		id: {
			type: String,
		// required: true,
			default: "kindeditor-id"
		},
    // 宽
		width: {
			type: String,
			default: `100%`
		},
    // 高
		height: {
			type: String,
			default: "400"
		},
    // 最小宽
		minWidth: {
			type: Number,
			default: 650
		},
    // 最小高
		minHeight: {
			type: Number,
			default: 400
		},
    // toolbar 工具栏配置
		items: {
			type: Array,
			default: function() {
				return [...items];
			}
		},
    // 标签配置
		htmlTags: {
			type: Object,
			default: function() {
				return { ...htmlTags };
			}
		},
    //字号配置
		fontSizeTable: {
			type: Array,
			default: function() {
				return [...fontSizeTable];
			}
		},
    // 语言配置
		langType: {
			type: String,
			default: "zh-CN"
		},
    // 主题配置
		themeType: {
			type: String,
			default: "default"
		},
    // body 的样式
		bodyClass: {
			type: String,
			default: "ke-content"
		},
    // 其他配置项
		...otherConfig
	},
	data() {
		return {
			editor: null,
			outContent: this.content,
			//quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
			serverUrl: '/erp_upload',  // 这里写你要上传的图片服务器地址
			header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
			uploadVisible: false,
			dialogImageUrl: '',
			dialogVisible: false,
			fileList: [],
		};
	},

	watch: {
		content(val) {
			this.editor && val !== this.outContent && this.editor.html(val);
			//console.log('watch content:',val)
		},
		// 分发编辑器内容改变事件
		outContent(val) {
			this.$emit("update:content", val);
			this.$emit("on-content-change", val);
			this.$emit("input", val);
		},
		// 初始化编辑器内容
	
		html(val) {
			if (this.html && (this.html.startsWith("https://") || this.html.startsWith("http://"))) {
				this.loadUrl(val);
			} else {
				this.outContent = "";
				this.outContent ? this.editor.html(this.outContent) : "";
				//console.log('watch html:',this.outContent)
			}
		}
	},
	created() {
		if (this.html && (this.html.startsWith("https://") || this.html.startsWith("http://"))) {
			this.loadUrl(this.html);
		} else {
			this.outContent = "";
			setTimeout(() => {
				this.content ? this.editor.html(this.content) : "";
				//console.log('setTimeout html:',this.content,' outContent:',this.outContent)
			}, 1000);
		}
	},
	mounted() {
    // 初始访问时创建
		this.initEditor();
    //  添加焦点
    // this.editor.focus();
    // 添加点击图片回调函数
		this.editor.clickToolbar("image", () => { //单图片上传
			// 禁用自带的图片弹窗
			this.editor.hideDialog();
			// 打开文件
			//this.handleOpenFile();
			//upload组件
			if(!this.uploadVisible){
				this.uploadVisible = true
			}
		});
		/*
		this.editor.clickToolbar("multiimage", () => { //多图片上传
			// 禁用自带的图片弹窗
			this.editor.hideDialog();
			this.uploadVisible = true
			//upload组件
			document.querySelector(".multiuploader input").click()
		});
		*/
	},
	activated() {
    // keep-alive 进入时创建
		this.initEditor();
	},
	deactivated() {
    // keep-alive 离开时移除
		this.removeEditor();
	},
	beforeDestroy() {
    // 实例销毁之前移除
		this.removeEditor();
	},

	methods: {
		beforeUpload() {
	      // 显示loading动画
	      //this.quillUpdateImg = true
		},
		uploadSuccess(res, file) {
	    // res为图片服务器返回的数据
			console.log('uploadSuccess:',res,' file:',file)
			if (res.status == 'y' ) {
				let startOffset = this.editor.cmd.range.startOffset;//kindEditor中当前光标的位置索引值startOffset
				let img_url  = res.result.img_url 
				this.editor.insertHtml(
					`<img style="max-width:100%;" src=" ${img_url}">`
				);
			} else {
				this.$message.error('图片插入失败')
			}
		},
	  // 富文本图片上传失败
		uploadError() {
			this.$message.error('图片插入失败')
		},
	  
    // 打开文件
	/* 
		handleOpenFile() {
		let input = document.getElementById("inputFile");
      // 解决同一个文件不能监听的问题
		input.addEventListener(
			"click",
			function() {
				this.value = "";
			},
			false
		);
		// 点击input
		input.click();
    },
	
    // 选择好文件
	async  selectedFile($event) {
		const file = $event.target.files[0];
		console.log('KindEditor selectedFile:',file)

    // 把图片上传到后端服务器 拿到url  uploadImage 是自己后端上传图片的接口
    // 调用appendHtml方法把图片追加到富文本

    //	 const url= await  uploadImage (file)
    //   this.editor.appendHtml(
    //           `<img style="max-width:100%;" src="https://${data.Location}">`
    //  ); 
    },
	*/
    // 编辑器内容上传到cos，调用返回url
		async content2Url() {
   // 把html片段上传到后端服务器 拿到url  uploadHtml 是自己后端上传的接口
    //   try {
    //     const res = await uploadHtml(this.outContent)
    //     return res
    //   } catch (error) {
    //     this.$message({
    //       message: error.data.message,
    //       type: 'error'
    //     })
    //   }
		},
    // 加载html填充编辑器内容
		loadUrl(url) {
			if (url && url.length > 0) {
				axios.get(url)
				.then(response => {
				// 处理HTML显示
					this.outContent = response.data;
					this.editor.appendHtml(this.outContent);
					this.$emit("subLoadUrlToHtml", response.data);
					console.log('loadUrl url:',url)
				})
				.catch(() => {
					this.outContent = "服务器数据加载失败，请重试!";
					this.editor.html(this.outContent);
				});
			}
		},
		// 移除编辑器实例
		removeEditor() {
			window.KindEditor.remove(`#${this.id}`);
		},
	
		clearUploadedImage () {
			this.$refs.upload.clearFiles();
		},
		
		//图片上传之前
	    beforeImageUpload(file) {
	      console.log(file)
	      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1) 
	      const isJpg = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'gif' || testmsg === 'jfif' 
	      if (!isJpg) {
	        this.$message.error('上传图片只能是 jpg 或 png 格式!')
	        return false
	      }
	      const isLt2M = file.size / 1024 / 1024 < 2
	      if (!isLt2M) {
	        this.$message.error('上传图片大小不能超过 2MB!')
	        return false
	      }
	      // return false // (返回false不会自动上传)
	    },

		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
	
		handleRemove(file) {
			for(var i = 0; i < this.fileList.length; i++){
				if(this.fileList[i].url === file.url){
					deleteImageReport(this.fileList[i].id).then(res =>{
						console.log('handleRemove file:',file,' fileList:',this.fileList)
						this.$message.success('删除图片成功')
					})
				this.fileList.splice(i, 1)
				}
			}
	    },
		
		submitUpload () {
		  // 手动触发上传
		  this.$refs.upload.submit()
		},
		
		// 初始化编辑器
		initEditor() {
			this.removeEditor();
			this.editor = window.KindEditor.create("#" + this.id, {
				width: this.width,
				height: this.height,
				minWidth: this.minWidth,
				minHeight: this.minHeight,
				items: this.items,
				noDisableItems: this.noDisableItems,
				filterMode: this.filterMode,
				htmlTags: this.htmlTags,
				wellFormatMode: this.wellFormatMode,
				resizeType: this.resizeType,
				themeType: this.themeType,
				langType: this.langType,
				designMode: this.designMode,
				fullscreenMode: this.fullscreenMode,
				basePath: this.basePath,
				themesPath: this.themesPath,
				pluginsPath: this.pluginsPath,
				langPath: this.langPath,
				minChangeSize: this.minChangeSize,
				loadStyleMode: this.loadStyleMode,
				urlType: this.urlType,
				newlineTag: this.newlineTag,
				pasteType: this.pasteType,
				dialogAlignType: this.dialogAlignType,
				shadowMode: this.shadowMode,
				zIndex: this.zIndex,
				useContextmenu: this.useContextmenu,
				syncType: this.syncType,
				indentChar: this.indentChar,
				cssPath: this.cssPath,
				cssData: this.cssData,
				bodyClass: this.bodyClass,
				colorTable: this.colorTable,
				afterCreate: this.afterCreate,
				// 编辑器内容改变回调
				afterChange: () => {
					this.editor ? (this.outContent = this.editor.html()) : "";
				},
				afterTab: this.afterTab,
				afterFocus: this.afterFocus,
				afterBlur: this.afterBlur,
				afterUpload: this.afterUpload,
				uploadJson: this.uploadJson,
				fileManagerJson: this.fileManagerJson,
				allowPreviewEmoticons: this.allowPreviewEmoticons,
				allowImageUpload: this.allowImageUpload,
				allowFlashUpload: this.allowFlashUpload,
				allowMediaUpload: this.allowMediaUpload,
				allowFileUpload: this.allowFileUpload,
				allowFileManager: this.allowFileManager,
				fontSizeTable: this.fontSizeTable,
				imageTabIndex: this.imageTabIndex,
				formatUploadUrl: this.formatUploadUrl,
				fullscreenShortcut: this.fullscreenShortcut,
				extraFileUploadParams: this.extraFileUploadParams,
				filePostName: this.filePostName,
				fillDescAfterUploadImage: this.fillDescAfterUploadImage,
				afterSelectFile: this.afterSelectFile,
				pagebreakHtml: this.pagebreakHtml,
				allowImageRemote: this.allowImageRemote,
				autoHeightMode: this.autoHeightMode,
				fixToolBar: this.fixToolBar,
				tabIndex: this.tabIndex
			});
		}
	}
};
</script>

<style>
</style>