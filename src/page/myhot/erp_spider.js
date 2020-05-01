/*

模拟登陆 csdn
https://blog.csdn.net/mengxiangxingdong
 */
/**
 * 第三方库
 */
const puppeteer = require('puppeteer'); //引入puppeteer库


/**
 * 本地库
 */
const {installMouseHelper} = require('@/utils/install-mouse-helper');
const captchaBehaviorUtil = require('@/utils/CaptchaBehaviorUtil');
const xpathUtil = require('@/utils/XpathUtil');

async function erp_spider(url){
    const browser = await puppeteer.launch({    //启动浏览器
        args: ['--no-sandbox'],
        headless: false,   //代码运行时打开浏览器方便观察
        // slowMo: 300  //放慢速度
        // devtools:true   //打开f12界面
    });
    const page = await browser.newPage();  //打开浏览器的一个tab 页
    // Installs the helper to the page. Mouse will be visible in the subsequent navigation.
    await installMouseHelper(page); //调试鼠标轨迹专用

    await page.goto(url, {timeout: 20 * 1000, waitUntil: 'networkidle0'});
    //等待登录元素出现

    await page.waitForSelector('.loginico', {timeout: 20 * 1000}).then(elementHandle => {
        elementHandle.click();
        // elementHandle.dispose();
    }).catch(e => console.log(e));
    // page.waitForNavigation({timeout: 10 * 1000, waitUntil: 'networkidle0'}).catch(e => console.log(e));
    // await page.waitFor(3 * 1000);

    await page.waitForXPath('//a[contains(string(),"下次再说")]', {
        timeout: 20 * 1000,
        visible: true
    })
    /*        .then(elementHandle => {
            elementHandle.click();
            // elementHandle.dispose();
        })*/
        .catch(e => console.log(e));

    await page.waitFor(1 * 1000); //等待广告弹出
    await xpathUtil.$xClick(page, '//a[contains(string(),"下次再说")]');
    await page.waitFor(3 * 1000);

    //淘宝验证码
    await  captchaBehaviorUtil.taobao(page);


    // await browser.close();  //关闭浏览器
}
module.exports = {
    erp_spider,
}