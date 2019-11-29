const rootUrl = 'http://www.hiolabs.com:8360/admin/';
// const rootUrl = 'http://127.0.0.1:8300/admin/';

const api = {
    rootUrl : rootUrl,
    express: {
        // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
        appid: '123123', // 对应快递鸟用户后台 用户ID
        appkey: '123123123123123', // 对应快递鸟用户后台 API key
        request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
    }
};

// import api from './config/api'
// Axios.defaults.baseURL = api.rootUrl;

export default api