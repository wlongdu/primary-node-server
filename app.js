const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {v4: uuidV4} = require('uuid');

const app = express();
const port = 3000;

const TEST_USER_NAME = 'admin';
const TEST_PASSWORD = 'admin';
const USER_IND = 'identification';

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


// 请求拦截器，验证是否登录
app.use((req, res, next) => {
    const {cookies, url} = req;
    // 登录页面和登录接口放行
    if (url.includes('/login') || url.includes('/api/login')) {
        next();
        return;
    }

    // 其他请求验证cookie，没有cookie强制跳转到登录界面
    if (!cookies[USER_IND]) {
        res.redirect('/login');
        return;
    }

    next();
})

app.get('/', (req, res) => {
    res.render(`home`)
})

app.get('/login', (req, res) => {
    res.render(`login`)
})

app.get('/logout', (req, res) => {
    res.clearCookie(USER_IND);
    res.redirect(`/login`);
})

app.get('*', (req, res) => {
    res.render('404');
})

app.post('/api/login', (req, res, next) => {
    let {body: {username, password}} = req;
    if (!Object.is(username, TEST_USER_NAME) || !Object.is(password, TEST_PASSWORD)) {
        res.send({status: 0, message: '登录失败，用户名或者密码不正确'});
        return;
    }
    // 登录成功写入cookie
    const uid = uuidV4();
    res.cookie(USER_IND, uid, {maxAge: 60 * 60 * 1000}).send({status: 1});
})

app.listen(port, () => {
    console.log(`JD-node-server start at http://localhost:${port}`)
})