<template>
   <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
        <div class="menu_page_top rflex">
            <img :class='["logo",{"closeLogo":!sidebar.opened}]' :src="logo" alt="" >
			<div style="width: 100%; display: flex;flex-direction:column ;justify-content: space-around;text-align: center;">
				<span class='title' v-show="sidebar.opened">{{username}}</span>
				<span class='title-level' v-show="sidebar.opened">{{userlevel}}</span>
			</div>
        </div>
        <div class="menu_page_bottom is-scroll-left">
            <el-menu 
                mode="vertical"
                theme="dark" 
                :show-timeout="200"
                :default-active="$route.path" 
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:sidebar.width+'px'}"
                >
                    <template v-for="(item,index) in permission_routers">
                        <!--表示 有一级菜单-->
                        <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                            <el-menu-item class="dropItem" 
                                :index="item.path+'/'+item.children[0].path"
                                >
                                <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" />
                                <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`)}}</span> 
                            </el-menu-item>
                        </router-link>

                        <!--表示 有二级或者多级菜单 -->
                        <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"  :index="item.path" :key="index">
                            <template slot="title">
                                <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" />
                                <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`)}}</span>
                            </template>
                            <!--直接定位到子路由上，子路由也可以实现导航功能-->
                            <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                                <el-menu-item 
                                    v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                                    :index="getIindex(citem,item,cindex)">
									<svg-icon v-if="citem.meta.icon" :icon-class="citem.meta.icon" />
                                    <span slot="title"> {{ $t(`commons.${citem.name}`)}}</span>
                                </el-menu-item> 
                            </router-link>
                        </el-submenu>
                    </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mUtils from "@/utils/mUtils";
import logoImg from "@/assets/img/avatar.svg";
import { 
		setToken,
		getToken,
	} from '@/utils/auth'
	import {
		shop_type
	} from "@/utils/env";

export default {
  name: "left-Menu",
  data() {
    return {
       menuObj:{
         bgColor:'#333',
         textColor:'#999',
         activeTextColor:'#ff6428',
       },
       logo:getToken('Logo')||logoImg,
	   username:getToken('Username')||'你的姓名',
	   realname:getToken('Realname')||'你的姓名',
	   userlevel:getToken('UserLevel')||'普通用户',
    };
  },
  computed:{
      ...mapGetters([
        'permission_routers',
        'isCollapse',
        'sidebar',
        'menuIndex'
      ]),
  },
  created(){
  },
  mounted(){
  },
  methods: {
    getIindex(citem,item,cindex){
      return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
    }
  }
};
</script>


<style lang="less" scoped>
  @left-bgColor:#333;  // 左侧菜单背景颜色;	
  @icon-link:#FF6C60;
    .menu_left{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
		z-index:30;
    }
    .menu_page_top{
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
		text-align: center;
        text-transform: uppercase;
        //box-sizing: border-box;
        //box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
		background-color: #333;
		color:#fff;
        .logo {
            height: 45px;
            width: 45px;
			margin-left:10px;
			border-radius: 50%;
            vertical-align: middle;
            display: inline-block;
        }
        .closeLogo{
            width:30px;
            height:30px;
        }
        .title{
			width: 80%;
            font-size: 16px;
			text-align: center;
			margin: 0 auto;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
            i{
                color:#FF6C60;
            }
        }
		.title-level{
			font-size: 12px;
			margin: 0 auto;
			text-align: center;
			background-color: #666;
			color:#fff;
			padding: 3px;
			border-radius: 8px;
			
			i{
				color:#FF6C60;
			}
		}
    }
  .menu_page_bottom {
      width:100%;
      overflow-y: scroll;
      overflow-x: hidden;
      flex:1;
      margin-top:2px;
      z-index: 10;
      //box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5)
  }
</style>
