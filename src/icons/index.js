import Vue from 'vue'
//import IconSvg from '@/components/iconSvg/IconSvg.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
//Vue.component('icon-svg', IconSvg)
Vue.component('svg-icon', SvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
// const iconMap = requireAll(req)
// console.log(iconMap)
requireAll(req)
