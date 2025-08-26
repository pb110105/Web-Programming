const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware để đọc dữ liệu từ form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file tĩnh từ thư mục src/
const staticPath = path.join(__dirname, 'web');
app.use(express.static(staticPath));

// Route trả index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Route nhận dữ liệu survey từ form
app.post('/submit-survey', (req, res) => {
    const surveyData = req.body;
    console.log('Survey received:', surveyData);

    const filePath = path.join(__dirname, 'survey.json');
    let existingData = [];

    try {
        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(jsonData);
        }

        existingData.push(surveyData);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

        res.send('Cảm ơn bạn đã gửi survey!');
    } catch (err) {
        console.error('Error saving survey:', err);
        res.status(500).send('Lỗi khi lưu survey!');
    }
});

// Khởi chạy server trên port Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
});
