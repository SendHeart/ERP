import Vue from 'vue' ;
import App from './App' ;
import router from './router' ;
import store from './store/' ;
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

//import './assets/icon/iconfont.css'; 
//import '@/components/iconSvg' ;// iconSvg
import '@/icons' ;
import '@/permission' ; // permission control
import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";

//富文本编辑
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import VueResource from 'vue-resource' ; //http服务
Vue.use(VueResource) ;

import Blob from '@/Excel/Blob'
import Export2Excel from '@/Excel/Export2Excel.js'
//import JsonExcel from 'vue-json-excel'
//Vue.component('downloadExcel', JsonExcel)

// 分享功能集合
import { shareConfig } from './utils/share';
Vue.prototype.shareConfig = shareConfig;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
