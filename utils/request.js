import config from './config'

export default (url,data={},method='GET')=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url: config.mobileHost + url, 
            data,
            method,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
              resolve(res.data);
            },
            fail(res){
              console.log("请求失败:",res);
              reject(res);
            }
          })
    });
}