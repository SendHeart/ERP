import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name){
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/',
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
		path: '',  
		component: Layout,
		redirect: '/index/index',
		hidden:true
	},
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/register',name: 'register',component:() => import('@/page/register'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
	{ path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	
	{ path: '/emallplatform_detail', component: () => import('@/page/emall_detail/emall_detail'), hidden: true },
	{ path: '/goodsedit', component: () => import('@/page/goodsedit/goodsedit'), hidden: true },
	{ path: '/pay/recharge', component: () => import('@/page/pay/recharge'), hidden: true },
	{ path: '/htmlview', component: () => import('@/page/myhot/htmlview'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
			icon: 'dashboard',	
			keepAlive: true //不刷新
		},
		noDropdown:true,
		children:[ 
			{
				path:'index', 
				meta:{
					title:'首页', 
					icon:'dashboard',
					routerType:'leftmenu',
				},
				component: () => import('@/page/index/index'),
			}
		]
	},
	/*
	{
		path: '/goodsedit',
		name: 'goodsedit',
		component:Layout,
		//component: () => import('@/page/goodsedit/goodsedit'),
	},
	*/
]

	//注册路由
export default new Router({
	mode:'hash', // 默认为'hash'模式 history
	base: '/', // 添加根目录,对应服务器部署子目录
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path:'/bigdatahot',
		name: 'bigdatahot',
		component:Layout,
		meta: {
			title:'大数据爆款',
			icon: 'goods_hot',
		},
		noDropdown:true,
		children:[
			{
				path:'bigdataHot', 
				meta:{
					title:'大数据爆款', 
					icon:'goods_hot',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/bigdataHot/bigdataHot'),
			}
		]
	},
	{
		path:'/myhot',
		name: 'myhot',
		component:Layout,
		meta: {
			title:'我的爆款库',
			icon: 'my_da',
		},
		noDropdown:true,
		children:[
			{
				path:'myhot', 
				meta:{
				  title:'我的爆款库', 
				  icon:'my_da',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/myhot'),
			},
			/*
			{
				path:'htmlview', 
				meta:{
					title:'爆款详情页', 
					icon:'my_da',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/myhot/htmlview'),
			}
			*/
		]
	},
	{
		path:'/emallplatform',
		name: 'emallplatform',
		component:Layout,
		meta: {
			title:'全球电商平台',
			icon: 'global',
		},
	 
		noDropdown:true,
		children:[
	  	{
	  		path:'emallplatform', 
	  		meta:{
	  		  title:'全球电商平台', 
	  		  icon:'my_da',
	  		  routerType:'leftmenu'
	  		},
	  		component: () => import('@/page/globalemall/globalemall'),
	  	},
		/*
		{
		   path:'emallplatform_detail',
		   name:'emallplatform_detail',
		   meta: {
					title:'电商详情',
					icon: 'emall',
					routerType:'leftmenu',	
			},
			component: () => import('@/page/emall_detail/emall_detail'),
		},
		*/
	  ]
	  /*
	  children:[
		{
		   path:'emallplatform_china',
		   name:'emallplatform_china',
		   meta: {
					title:'中国电商',
					icon: 'china',
					routerType:'leftmenu',
					titleList:[
						{"path":"emallplatform_2","title":"淘宝"},
						{"path":"emallplatform_3","title":"天猫"},
						{"path":"emallplatform_7","title":"拼多多"}
					]	
			 },
	  	 component:Content,
			 children:filterTopRouterMap('emallplatform_china')
		},
		{
			path:'emallplatform_oversea',
			name:'emallplatform_oversea',
			meta: {
				title:'国外电商',
				icon: 'global',
				routerType:'leftmenu',
				titleList:[
					{"path":"emallplatform_1","title":"亚马逊"},
					{"path":"emallplatform_4","title":"WISH"},
					{"path":"emallplatform_5","title":"易贝"},
					{"path":"emallplatform_6","title":"虾皮"}
				]
			},
			component:Content,
			children:filterTopRouterMap('emallplatform_oversea')
		 }
	  ]
	  */
	},
	/*
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'设置',
			icon: 'settingwrenches',
	  },
	  component:Layout,
	  children:[
		{
		   path:'infoShow',
		   name:'infoShow',
		   meta: {
					title:'个人信息',
					icon: 'ums',
					routerType:'leftmenu',
					titleList:[
						{"path":"infoShow1","title":"个人信息子菜单1"},
						{"path":"infoShow2","title":"个人信息子菜单2"},
						{"path":"infoShow3","title":"个人信息子菜单3"},
						{"path":"infoShow4","title":"个人信息子菜单4"},
						{"path":"infoShow5","title":"个人信息子菜单5"}
					]	
			 },
	  	 component:Content,
			 children:filterTopRouterMap('infoShow')
		},
		{
			path:'infoModify',
			name:'infoModify',
			meta: {
				title:'修改信息',
				icon: 'iconinfo',
				routerType:'leftmenu',
				titleList:[
					{"path":"infoModify1","title":"修改信息子菜单1"},
					{"path":"infoModify2","title":"修改信息子菜单2"},
					{"path":"infoModify3","title":"修改信息子菜单3"}
				]
			},
			component:Content,
			children:filterTopRouterMap('infoModify')
		 }
	  ]
	},
	
	{
		path:'/userManager',
		name: 'userManage',
		component:Layout,
		meta: {
			title:'用户管理',
			icon: 'user',
		},
		noDropdown:true,
		children:[
			{
				path:'userList', 
				meta:{
					title:'用户管理', 
					icon:'user',
					routerType:'leftmenu'
				},
				component: () => import('@/page/userList/userList'),
			}
		]
	},
	
	{
		path: '/settings',
		name: 'settings',
		meta: {
			title: '设置',
			icon: 'permission',
			roles: ['admin', 'editor'] // you can set roles in root nav
		},
		component: Layout,
		redirect: '/permission/page',
		children: [{
			path: 'page',
			name: 'pagePer',
			meta: {
				title: '页面权限',
				roles: ['admin'] // or you can only set roles in sub nav
			},
			component: () => import('@/page/permission/page'),
		}, 
		{
			path: 'directive',
			name: 'directivePer',
			meta: {
				title: '按钮权限',
				roles:['editor']
			},
			component: () => import('@/page/permission/directive'),
	  }]
	},
	{
		path:'/share',
		name: 'share',
		component:Layout,
		meta: {
			title:'分享功能',
			icon: 'iconshare',
		},
		noDropdown:true,
		children:[
			{
				path:'share', 
				meta:{
				  title:'分享功能', 
				  icon:'iconshare',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/share'),
			}
		]
	},
	
	{
		path:'/fundManage',
		name: 'fundManage',
		meta: {
		  title:'资金管理',
		  icon: 'iconpay3',
		},
		component:Layout,
		children:[
		  {
			path:'fundList',
			name:'fundList',
			meta: {
					title:'资金流水',
					routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/fundList'),
		  },
		  {
			path:'chinaTabsList',
			name:'chinaTabsList',
			meta: {
				title:'区域投资',
				routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/chinaTabsList'),
			}
		]
	},
	{
		path:'/fundData',
		name: 'fundData',
		meta: {
		  title:'资金数据',
		  icon: 'iconecharts',
		},
		component:Layout,
		redirect: '/fundData/fundPosition',
		children:[
		  {
			 path:'fundPosition',
			 name:'fundPosition',
			 meta: {
				  title:'投资分布'
			 },
			 component: () => import('@/page/fundData/fundPosition')
		  },
		  {
			  path:'typePosition',
			  name:'typePosition',
			  meta: {
				   title:'项目分布'
				},
				component: () => import('@/page/fundData/typePosition')
		   },
		   {
				path:'incomePayPosition',
				name:'incomePayPosition',
				meta: {
					title:'收支统计'
				},
				component: () => import('@/page/fundData/incomePayPosition')
		    }
		]
	},
	{
    path: '/permission',
		name: 'permission',
		meta: {
      title: '权限设置',
      icon: 'iconpermission',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    component: Layout,
    redirect: '/permission/page',
    children: [{
			path: 'page',
			name: 'pagePer',
      meta: {
        title: '页面权限',
        roles: ['admin'] // or you can only set roles in sub nav
      },
      component: () => import('@/page/permission/page'),
    }, {
			path: 'directive',
			name: 'directivePer',
      meta: {
				title: '按钮权限',
				roles:['editor']
      },
      component: () => import('@/page/permission/directive'),
    }]
  },
  {
    path: '/error',
    component: Layout,
    name: 'errorPage',
    meta: {
      title: '错误页面', 
      icon: 'iconError'
    },
    children: [
			{  
				path: '401', 
				name: 'page401', 
				component: () => import('@/page/errorPage/401'), 
				meta: { 
					title: '401', 
					noCache: true 
			  }
			},
			{
				path: '404', 
				name: 'page404', 
				component: () => import('@/page/errorPage/404'), 
				meta: { 
					title: '404', 
					noCache: true
				}
			}
    ]
  },
  */
	{ path: '*', redirect: '/404', hidden: true }
	];
	
	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 * 
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 * 
	 * 
	 * 
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 * 
	 * 
	 * 
	 */

