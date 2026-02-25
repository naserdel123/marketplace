const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

// المجلدات الثابتة
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname)));

// ============== DATA ==============
let users = [];
let products = []; // فاضي - ما في منتجات تجريبية

// ============== API ROUTES ==============

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' });
    }
    const user = { id: Date.now(), name, email, password };
    users.push(user);
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(400).json({ error: 'بيانات الدخول غير صحيحة' });
    }
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString()
    };
    products.unshift(product);
    res.json({ success: true, product });
});

// ============== HTML ROUTES ==============

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-product.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
