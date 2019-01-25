const fs = require('fs')
const request = require('request')
//关键字
let word = encodeURI("月亮");

let option = {
    //百度图片路径
    url:"http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1548399571039_R&pv=&ic=&nc=1&z=&hd=&latest=&copyright=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word="+word+"",
    method:'get',
    //伪装成浏览器
    headers:{
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }

};


new Promise((res) => {
    request(option, (error, response, body) => {
        if(error) throw error;
        //正则匹配得到图片路径放到数组
        let urlArr = body.match(/https?:\/\/.+?\.(jpg|png|webp|jpeg|gif)/gi);

        res(urlArr)
    })

}).then((Arr) => {
    Arr.forEach((v,i) => {
        //遍历数组获得图片的后缀
        let ext = v.match(/jpg|png|webp|jpeg|gif/)[0];
        //console.log(v);
        //下载图片通过流存到当前pic文件夹下面
        if(!(i%4))
            request(v).pipe(fs.createWriteStream("./pic/"+i+"."+ext))
    })
})


