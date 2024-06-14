const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 解析 JSON 和 URL-encoded 資料
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 建立 MySQL 連接池
const db = mysql.createPool({
    host: '192.168.1.101',// 根據實際情況修改
    user: 'root', // 根據實際情況修改
    password: 'Yan7668114', // 根據實際情況修改
    database: 'scholarship_db',
    port: '3306',
    insecureAuth: true
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                res.send({ success: true });
            } else {
                res.send({ success: false, message: '使用者名稱或密碼錯誤' });
            }
        });
    } else {
        res.send({ success: false, message: '請提供使用者名稱和密碼' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});