<template>
    <div class="shareArea cflex">
		<div class="bottom cflex">
			<div class="lineArea rflex">
				<div class="line"></div>
				<span class="lineTitle">分享到</span>
				<div class="line"></div>
			</div>
			<ul class="shareUl rflex wflex">
				<li>
					<div class="item" @mouseover="showqrcode()" @mouseout="hideqrcode()">
						<svg-icon icon-class="wechat" />
					</div>
					<div class="qrcodeArea" v-show="qrcode.show">
						<p class="saoTitle">扫一扫</p>
						<div class="qrcode" ref='qrCodeUrl1'></div>
					</div>
				</li>
				<li>
					<div class="item" @click="shareToWeibo()">
						<svg-icon icon-class="weibo" />
					</div>
				</li>
				<li>
					<div class="item" @click="shareToQQ()">
						<svg-icon icon-class="qq" />
					</div>
				</li>
				<li>
					<div class="item" @click="shareToQQzone()">
						<svg-icon icon-class="qq_zone" />
					</div>
				</li>
			
				<li>
					<div class="item" @click="shareToDouban()">
						<svg-icon icon-class="douban" />
					</div>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl } from "@/utils/env";

	export default {
	  name:'infoShare',
	  data(){
			return {
				qrcode:{
					show:false
				},
				qrcodeObj:{
					text:shareUrl, // 要分享的网页路径
					width:80,
					height:80,
					colorDark: '#000000',
					colorLight: '#ffffff',
					correctLevel: QRCode.CorrectLevel.H
				}
				
			}
		},
		mounted(){
			this.creatQrCode();
		},
		methods: {
			showqrcode(){
				this.qrcode.show  = true;
			},
			hideqrcode(){
				this.qrcode.show  = false;
			},
			creatQrCode() {
				const qrcode = new QRCode(this.$refs.qrCodeUrl1, this.qrcodeObj)
			},
			shareToQQ(){
                this.$emit('shareToQQ');
			},
			shareToQQzone(){
                this.$emit('shareToQQzone');
			},
			shareToWeibo(){
                this.$emit('shareToWeibo');
            },
			shareToDouban(){
                this.$emit('shareToDouban');
			}

		}
	}
</script>

<style lang="less" scoped>
	.shareArea{
		width: 340px;
		margin-top: 2px;
		margin-bottom: 5px;
		align-items: center;
		background: #fff;
		border-radius: 4px;
		.shareTitle{
            border-bottom: 1px solid #e8e8e8;
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            font-size:14px;
        }
		.bottom{
			align-items: center;
			padding: 20px;
			width: 100%;
			height: 150%;
			box-sizing: border-box;
			.lineArea{
				padding: 10px;
				width:100%;
				text-align: center;
				align-items: center;
				justify-content: space-between;
				.lineTitle{
					font-size: 13px;
					margin: 0 5px;
				}
				.line{
					border-bottom:1px solid gold;
					flex:0.5;
				}
			}
			.shareUl{
				    width: 100%;
					justify-content: space-between;
						li{
								display: flex;
								flex-direction: column;
								align-items: center;
								position: relative;
								cursor: pointer;
								.title{
									margin-bottom: 10px;
									font-size: 13px;
									color:#a9d86e;
								}
								.item{
									background: #EFF2F7;
									width: 40px;
									height: 40px;
									border-radius: 50%;
									display: flex;
									justify-content: center;
									align-items: center;
									.svg-icon{
										font-size: 24px;
									}
									.active{
										color:#FF6C60;
									}
								}
								.qrcodeArea{
									position: absolute;
									top: 50px;
									left: -30px;
									text-align: center;
									border: 1px solid #a9d86e;
									border-radius: 4px;
									padding: 10px;
									z-index: 99;
									background: #fff;
									.saoTitle{
										font-size: 14px;
										color:#a9d86e;
										margin-bottom: 5px;
									}
								}
						}
			}
		}
     
	}
	
</style>
