const express = require('express');
const app = express();
const port = 3001; // یا هر پورتی که می‌خواهید سرور در آن اجرا شود

// Middleware برای پردازش درخواست‌های JSON
app.use(express.json());

// Endpoint نمونه برای دریافت اطلاعات
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// شروع به کار سرور
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
