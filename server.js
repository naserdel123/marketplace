const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Data
let users = [];
let products = [];

// API Routes
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ error: 'البريد الإلكتروني مستخدم' });
    
    const user = { id: Date.now(), name, email, password };
    users.push(user);
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ error: 'بيانات غير صحيحة' });
    
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = { id: Date.now(), ...req.body, date: new Date().toISOString() };
    products.unshift(product);
    res.json({ success: true, product });
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id != id);
    res.json({ success: true });
});

// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/add-product', (req, res) => res.sendFile(path.join(__dirname, 'add-product.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
