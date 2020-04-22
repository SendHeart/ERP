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

export function getGoodsCategory(reqData) {
    return request({
      url:'/api/web_client/query_goods_category',
      method: 'post',
      data: reqData
    })
}
