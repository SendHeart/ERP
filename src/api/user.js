import request from '@/utils/axios'


export function login(params) {
  return request({
    url: '/api/web_client/user_login_erp',
    method: 'post',
    data:params
  })
}
export function register(params) {
  return request({
    url: '/api/web_client/user_register_erp',
    method: 'post',
    data:params
  })
}
export function updateUserInfo(params) {
  return request({
    url: '/api/web_client/user_update_erp',
    method: 'post',
    data:params
  })
}
export function getVerifyCode(params) {
  return request({
    url: '/api/web_client/get_verifycode_erp',
    method: 'post',
    data:params
  })
}
export function logout(params) {
  return request({
    url: '/api/web_client/user_loginout_erp',
    method: 'post',
    data:params
  })
}


export function getUserInfo(params) {
  return request({
    url: '/api/web_client/user_info',
    method: 'post',
    data:params
  })
}

export function getUserList(reqData) {
  return request({
    url:'/user/list/get',
    method: 'get',
    data: reqData
  })
}

export function getBizPara(reqData) {
    return request({
      url:'/api/web_client/get_biz_para',
      method: 'post',
      data: reqData
    })
}

export function getEmallInfo(reqData) {
    return request({
      url:'/api/web_client/get_emall_info',
      method: 'post',
      data: reqData
    })
}

export function getEmallList(reqData) {
    return request({
      url:'/api/web_client/get_emall_list',
      method: 'post',
      data: reqData
    })
}

export function getEmallIndex(reqData) {
    return request({
      url:'/api/web_client/get_emall_index',
      method: 'post',
      data: reqData
    })
}

export function prizeComment(reqData) {
    return request({
      url:'/api/web_client/post_comment_prize',
      method: 'post',
      data: reqData
    })
}

export function replyComment(reqData) {
    return request({
      url:'/api/web_client/post_comment_reply',
      method: 'post',
      data: reqData
    })
}
export function replyQueryComment(reqData) {
    return request({
      url:'/api/web_client/query_comment_reply',
      method: 'post',
      data: reqData
    })
}
export function prizeStrategy(reqData) {
    return request({
      url:'/api/web_client/post_strategy_prize',
      method: 'post',
      data: reqData
    })
}

export function replyStrategy(reqData) {
    return request({
      url:'/api/web_client/post_strategy_reply',
      method: 'post',
      data: reqData
    })
}
export function replyQueryStrategy(reqData) {
    return request({
      url:'/api/web_client/query_strategy_reply',
      method: 'post',
      data: reqData
    })
}
export function submitEmallScore(reqData) {
    return request({
      url:'/api/web_client/submit_emall_score',
      method: 'post',
      data: reqData
    })
}

export function submitComment(reqData) {
    return request({
      url:'/api/web_client/post_emall_comment',
      method: 'post',
      data: reqData
    })
}

export function submitStrategy(reqData) {
    return request({
      url:'/api/web_client/post_emall_strategy',
      method: 'post',
      data: reqData
    })
}

export function getNewsList(reqData) {
    return request({
      url:'/api/web_client/get_emall_news',
      method: 'post',
      data: reqData
    })
}

export function getGoodsList(reqData) {
    return request({
      url:'/api/web_client/query_goods_list',
      method: 'post',
      data: reqData
    })
}

export function saveGoodsInfo(reqData) {
    return request({
      url:'/api/web_client/save_goods_info',
      method: 'post',
      data: reqData
    })
}

export function addMyWarehouse(reqData) {
    return request({
      url:'/api/web_client/add_goods_warehouse',
      method: 'post',
      data: reqData
    })
}

export function getMyWarehouse(reqData) {
    return request({
      url:'/api/web_client/query_goods_warehouse',
      method: 'post',
      data: reqData
    })
}

export function deleteGoodsWarehouse(reqData) {
    return request({
      url:'/api/web_client/delete_goods_warehouse',
      method: 'post',
      data: reqData
    })
}

export function getGoodsSupply(reqData) {
    return request({
      url:'/api/web_client/query_goods_supply',
      method: 'post',
      data: reqData
    })
}

export function getGoodsCategory(reqData) {
    return request({
      url:'/api/web_client/query_goods_category',
      method: 'post',
      data: reqData
    })
}

export function goodsUpDown(reqData) { //上架
    return request({
      url:'/api/web_client/goods_up_down',
      method: 'post',
      data: reqData
    })
}

export function goodsRecommSet(reqData) { //推荐商品
    return request({
      url:'/api/web_client/goods_recomment_set',
      method: 'post',
      data: reqData
    })
}

export function goodsNewSet(reqData) { //推荐商品
    return request({
      url:'/api/web_client/goods_new_set',
      method: 'post',
      data: reqData
    })
}

export function rechargeOrder(reqData) { //充值
    return request({
      url:'/api/web_client/recharge_order',
      method: 'post',
      data: reqData
    })
}

export function wxPay(reqData) { //充值
    return request({
      url:'/wxpay/webpay',
      method: 'post',
      data: reqData
    })
}

export function queryBalAccount(reqData) { //账户余额
    return request({
      url:'/api/web_client/get_member_account_bal',
      method: 'post',
      data: reqData
    })
}

export function queryDetailsAccount(reqData) { //账户明细
    return request({
      url:'/api/web_client/get_member_account_detail',
      method: 'post',
      data: reqData
    })
}

export function queryNewsList(reqData) { //新闻列表
    return request({
      url:'/api/web_client/get_emall_news',
      method: 'post',
      data: reqData
    })
}

export function updateNewsStatus(reqData) { //新闻状态
    return request({
      url:'/api/web_client/update_news_status',
      method: 'post',
      data: reqData
    })
}

export function deleteNewsAdvertise(reqData) { //新闻删除
    return request({
      url:'/api/web_client/delete_news_info',
      method: 'post',
      data: reqData
    })
}

export function addNewsAdvertise(reqData) { // 
    return request({
      url:'/api/web_client/post_emall_news',
      method: 'post',
      data: reqData
    })
}

export function addGoodsShop(reqData) { // 
    return request({
      url:'/api/web_client/add_goods_shop',
      method: 'post',
      data: reqData
    })
}

export function publishGoodsShop(reqData) { // 
    return request({
      url:'/api/web_client/publish_goods_shop',
      method: 'post',
      data: reqData
    })
}

export function getMyShopGoodsList(reqData) {
    return request({
      url:'/api/web_client/get_myshop_goods_list',
      method: 'post',
      data: reqData
    })
}

export function saveMyShopGoodsInfo(reqData) {
    return request({
      url:'/api/web_client/save_myshop_goods_info',
      method: 'post',
      data: reqData
    })
}

export function deleteMyShopGoods(reqData) {
    return request({
      url:'/api/web_client/delete_myshop_goods',
      method: 'post',
      data: reqData
    })
}

export function authorizeEmall(reqData) {
    return request({
      url:'/api/web_client/authorize_emall',
      method: 'post',
      data: reqData
    })
}

export function getMyEmallList(reqData) {
    return request({
      url:'/api/web_client/get_myemall_list',
      method: 'post',
      data: reqData
    })
}

export function queryMyShopInfo(reqData) {
    return request({
      url:'/api/web_client/query_myshop_info',
      method: 'post',
      data: reqData
    })
}
