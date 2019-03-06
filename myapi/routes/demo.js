var express = require('express');
var router = express.Router();
var routes = require('../public/data/routes.json');
//请求头设置
router.all('*', function (req, res, next) {
    // 设置访问的权限
    res.header("Access-Control-Allow-Origin", "*");
    // 设置支持ajax请求
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // 设置支持的请求方法
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 设置服务器端开发平台
    res.header("X-Powered-By", 'express');
    // 设置的响应的文本类型（mime type)和编码规则（不让产生乱码）
    res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    // res.header('Content-Type', 'text/plain;charset=utf-8');
    next();
});
router.post('/demo', function (req, res, next) {
    res.json(routes);
    // res.send('respond with a resource');
});

router.post('/log', function (req, res, next) {
    console.log(req.body);
    if (req.body) {
        res.json({ state: "1", message: "登录成功!" });
    }
});

module.exports = router;