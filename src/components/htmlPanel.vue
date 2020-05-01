<template>
	<div>
		<!--
		<mu-circular-progress :size="40" v-if="loading"/>
		-->
		<el-progress v-if="loading" type="circle" :percentage="0"></el-progress>
		<div v-html="html"></div>
	</div>
</template>

<style>
</style>
<script>
	export default{
    // 使用时请使用 :url.sync=""传值
		props: {
			url: {
				required: true
			}
		},
		data () {
			return {
				loading: false,
				html: ''
			}
		},
		
		watch: {
			url (value) {
				this.load(value)
			}
		},
    
		mounted () {
			let reg_login= new RegExp('https://login.1688.com','g')//g代表全部
			let reg_detail= new RegExp('https://detail.1688.com','g')//g代表全部
			let reg_login_taobao= new RegExp('https://login.taobao.com','g')//g代表全部
			let url = ''
			url = this.url.replace(reg_login,'/login_1688');
			url = url.replace(reg_detail,'/detail_1688');
			url = url.replace(reg_login_taobao,'/login_taobao_1688');
			this.load(url)
		},
		
		methods: {
			load (url) {
				if (url && url.length > 0) {
					// 加载中
					this.loading = true
					let param = {
						accept: 'text/html, text/plain'
					}
					this.$http.get(url, param).then((response) => {
						this.loading = false
					// 处理HTML显示
						this.html = response.data
					}).catch(() => {
						this.loading = false
						this.html = '加载失败'
					})
				}
			}
		}
	}
  </script>