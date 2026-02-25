const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// تخزين مؤقت للمستخدمين والمنتجات (لحد ما تضيف قاعدة بيانات)
let users = [];
let products = [
    {
        id: 1,
        name: 'iPhone 15 Pro Max - 256GB',
        price: 4500,
        currency: 'SAR',
        category: 'electronics',
        country: 'sa',
        city: 'الرياض',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400',
        seller: { name: 'أحمد' },
        date: new Date().toISOString()
    },
    {
        id: 2,
        name: 'سيارة تويوتا كامري 2023',
        price: 85000,
        currency: 'SAR',
        category: 'cars',
        country: 'sa',
        city: 'جدة',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
        seller: { name: 'محمد' },
        date: new Date().toISOString()
    },
    {
        id: 3,
        name: 'ساعة آبل واتش الترا',
        price: 2500,
        currency: 'SAR',
        category: 'electronics',
        country: 'ae',
        city: 'دبي',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
        seller: { name: 'خالد' },
        date: new Date().toISOString()
    }
];

// ============== API ROUTES ==============

// تسجيل مستخدم جديد
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

// تسجيل الدخول
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(400).json({ error: 'بيانات الدخول غير صحيحة' });
    }
    
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

// جلب المنتجات
app.get('/api/products', (req, res) => {
    res.json(products);
});

// إضافة منتج
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
