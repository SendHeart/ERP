<template>
    <div class="shareArea cflex sharelast">
		<div class="bottom rflex">
			<div class="yanItem" v-popover:yanShare>
				<svg-icon icon-class="share" />
				<el-popover
				ref="yanShare"
				popper-class="yanshare"
				placement="bottom"
				trigger="hover">
				<ul class="shareUl rflex wflex">
					<li>
						<div class="item" v-popover:yanSharewx>
							<svg-icon icon-class="wechat" />
							<el-popover
								ref="yanSharewx"
								popper-class="yanSharewx"
								placement="bottom"
								trigger="hover">
								<div class="qrcodeArea">
									<p class="saoTitle">扫一扫</p>
									<div class="qrcode" ref="qrCodeUrl6"></div>
								</div>
							</el-popover>
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
			</el-popover>
			</div>
		</div>
    </div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl } from "@/utils/env";

	export default {
	  name:'hengShare',
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
				 const qrcode = new QRCode(this.$refs.qrCodeUrl6, this.qrcodeObj)
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
			height: 100%;
			box-sizing: border-box;
			justify-content: center;
			.yanItem{
				justify-content: center;
				align-items: center;
				.svg-icon{
					font-size: 34px;
				}
			}
			.toTitle{
				font-size: 13px;
			}
			 .shareUl{
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
					
				}
			}
		}
     
	}
	
</style>
