const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware để đọc dữ liệu từ form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Thư mục chứa file tĩnh (HTML, CSS, JS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));

// Route trả index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route nhận dữ liệu survey từ form
app.post('/submit-survey', (req, res) => {
    const surveyData = req.body;
    console.log('Survey received:', surveyData);

    // Lưu dữ liệu vào file survey.json (nếu chưa có thì tạo)
    const filePath = path.join(__dirname, 'survey.json');
    let existingData = [];

    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath);
        existingData = JSON.parse(jsonData);
    }

    existingData.push(surveyData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    // Trả phản hồi
    res.send('Cảm ơn bạn đã gửi survey!');
});

// Khởi chạy server trên port Render cung cấp
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
});
