
export const topRouterMap = [
    {
        'parentName':'emallplatform_china',
        'data':[
            {
                path: 'emallplatform_2',
                name: 'emallplatform_2',
                meta: {
                    title: '淘宝',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/infoManage/infoShow')
            },
            {
                path: 'emallplatform_3',
                name: 'emallplatform_3',
                meta: {
                    title: '天猫',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'emallplatform_7',
                name: 'emallplatform_7',
                meta: {
                    title: '拼多多',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            }
        ]
    },
	{
	    'parentName':'emallplatform_oversea',
	    'data':[
	        {
	            path: 'emallplatform_1',
	            name: 'emallplatform_1',
	            meta: {
	                title: '亚马逊',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/infoManage/infoShow')
	        },
	        {
	            path: 'emallplatform_4',
	            name: 'emallplatform_4',
	            meta: {
	                title: 'WISH',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        },
	        {
	            path: 'emallplatform_5',
	            name: 'emallplatform_5',
	            meta: {
	                title: '易贝EBay',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        },
	        {
	            path: 'emallplatform_6',
	            name: 'emallplatform_6',
	            meta: {
	                title: '虾皮SHOPEE',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        }
	    ]
	},
	{
	    'parentName':'infoShow',
	    'data':[
	        {
	            path: 'infoShow1',
	            name: 'infoShow1',
	            meta: {
	                title: '个人信息子菜单1',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/infoManage/infoShow')
	        },
	        {
	            path: 'infoShow2',
	            name: 'infoShow2',
	            meta: {
	                title: '个人信息子菜单2',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        },
	        {
	            path: 'infoShow3',
	            name: 'infoShow3',
	            meta: {
	                title: '个人信息子菜单3',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        },
	        {
	            path: 'infoShow4',
	            name: 'infoShow4',
	            meta: {
	                title: '个人信息子菜单4',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        },
	        {
	            path: 'infoShow5',
	            name: 'infoShow5',
	            meta: {
	                title: '个人信息子菜单5',
	                icon: 'fa-asterisk',
	                routerType: 'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        }
	    ]
	},
	{
	    'parentName':'infoModify',
	    'data':[
	        {
	            path:'infoModify1',
	            name:'infoModify1',
	            meta:{
	                title:'修改信息子菜单1',
	                icon:'fa-asterisk',
	                routerType:'topmenu'
	            },
	            component: () => import('@/page/infoManage/infoModify')
	        },
	        {
	            path:'infoModify2',
	            name:'infoModify2',
	            meta:{
	                title:'修改信息子菜单2',
	                icon:'fa-asterisk',
	                routerType:'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        },
	        {
	            path:'infoModify3',
	            name:'infoModify3',
	            meta:{
	                title:'修改信息子菜单3',
	                icon:'fa-asterisk',
	                routerType:'topmenu'
	            },
	            component: () => import('@/page/fundList/moneyData')
	        }
	    ]
	}
]


