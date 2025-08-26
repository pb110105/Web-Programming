const express = require('express');
const path = require('path');
const app = express();

// Phục vụ file tĩnh (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Xử lý POST form (nếu muốn lưu dữ liệu)
app.use(express.urlencoded({ extended: true }));
app.post('/submit', (req, res) => {
  console.log(req.body); // in dữ liệu form ra console
  res.send('Cảm ơn bạn đã gửi khảo sát!');
});

// Lắng nghe port từ Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
