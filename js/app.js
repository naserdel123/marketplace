// ====================
// JavaScript أسطوري لسوق الأساطير
// ====================

// تهيئة الجسيمات المتحركة
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initForms();
    initImageUpload();
});

// ====================
// جسيمات الخلفية
// ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ====================
// تبديل نماذج المصادقة
// ====================
function showRegister() {
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    
    loginBox.style.opacity = '0';
    loginBox.style.transform = 'rotateY(90deg)';
    
    setTimeout(() => {
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
        
        setTimeout(() => {
            registerBox.style.opacity = '1';
            registerBox.style.transform = 'rotateY(0)';
        }, 50);
    }, 300);
}

function showLogin() {
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    
    registerBox.style.opacity = '0';
    registerBox.style.transform = 'rotateY(-90deg)';
    
    setTimeout(() => {
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
        
        setTimeout(() => {
            loginBox.style.opacity = '1';
            loginBox.style.transform = 'rotateY(0)';
        }, 50);
    }, 300);
}

// ====================
// إظهار/إخفاء كلمة المرور
// ====================
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.currentTarget.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ====================
// تهيئة النماذج
// ====================
function initForms() {
    // نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // نموذج التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // نموذج إضافة منتج
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddProduct();
        });
    }
}

// ====================
// معالجة تسجيل الدخول
// ====================
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // التحقق من البيانات
    if (!email || !password) {
        showNotification('الرجاء إدخال البريد الإلكتروني وكلمة المرور', 'error');
        return;
    }
    
    // محاكاة تسجيل الدخول
    const btn = document.querySelector('#loginForm .auth-btn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
    btn.disabled = true;
    
    setTimeout(() => {
        // حفظ بيانات المستخدم
        const user = {
            email: email,
            name: email: email,
            name: email.split('@')[0],
            isLoggedIn: true
        };
        
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
        
        showNotification('تم تسجيل الدخول بنجاح!', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

// ====================
// معالجة التسجيل
// ====================
function handleRegister() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    
    // التحقق من البيانات
    if (!name || !email || !password) {
        showNotification('الرجاء ملء جميع الحقول المطلجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showNotification('كلمات المرور غير متطابقة', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }
    
    // محاكاة التسجيل
    const btn = document.querySelector('#registerForm .auth-btn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إنشاء الحساب...';
    btn.disabled = true;
    
    setTimeout(() => {
        const user = {
            name: name,
            email: email,
            isLoggedIn: true
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        showNotification('تم إنشاء الحساب بنجاح!', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

// ====================
// تهيئة رفع الصور
// ====================
function initImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('productImage');
    
    if (!uploadArea || !fileInput) return;
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageFile(e.target.files[0]);
        }
    });
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('الرجاء اختيار ملف صورة صحيح', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showNotification('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('imagePreview');
        const placeholder = document.querySelector('.upload-placeholder');
        const img = preview.querySelector('img');
        
        img.src = e.target.result;
        preview.classList.remove('hidden');
        placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    const preview = document.getElementById('imagePreview');
    const placeholder = document.querySelector('.upload-placeholder');
    const fileInput = document.getElementById('productImage');
    
    preview.classList.add('hidden');
    placeholder.style.display = 'block';
    fileInput.value = '';
}

// ====================
// معالجة إضافة منتج
// ====================
function handleAddProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const currency = document.getElementById('productCurrency').value;
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const facebookLink = document.getElementById('facebookLink').value;
    const country = document.getElementById('productCountry').value;
    const city = document.getElementById('productCity').value;
    const phone = document.getElementById('contactPhone').value;
    
    // التحقق من البيانات المطلوبة
    if (!name || !price || !currency || !category || !country || !city) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // الحصول على صورة المنتج
    const imagePreview = document.querySelector('#imagePreview img');
    const image = imagePreview ? imagePreview.src : null;
    
    // إنشاء كائن المنتج
    const product = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        currency,
        category,
        description,
        facebookLink,
        country,
        city,
        phone,
        image,
        seller: JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}'),
        date: new Date().toISOString()
    };
    
    // حفظ المنتج
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.unshift(product);
    localStorage.setItem('products', JSON.stringify(products));
    
    // عرض نافذة النجاح
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}

// ====================
// تحميل المنتجات
// ====================
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (!grid) return;
    
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (products.length === 0) {
        // منتجات تجريبية
        const sampleProducts = [
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
        
        localStorage.setItem('products', JSON.stringify(sampleProducts));
        renderProducts(sampleProducts);
    } else {
        renderProducts(products);
    }
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (products.length === 0) {
        grid.innerHTML = '';
        noProducts.classList.remove('hidden');
        return;
    }
    
    noProducts.classList.add('hidden');
    
    const currencySymbols = {
        'SAR': 'ر.س', 'USD': '$', 'EUR': '€', 'GBP': '£',
        'AED': 'د.إ', 'KWD': 'د.ك', 'QAR': 'ر.ق', 'BHD': 'د.ب',
        'OMR': 'ر.ع', 'JOD': 'د.أ', 'EGP': 'ج.م', 'SDG': 'ج.س',
        'SYP': 'ل.س', 'LBP': 'ل.ل', 'YER': 'ر.ي', 'MAD': 'د.م',
        'TND': 'د.ت', 'DZD': 'د.ج', 'LYD': 'د.ل', 'TRY': '₺',
        'INR': '₹', 'PKR': '₨', 'CNY': '¥', 'JPY': '¥',
        'KRW': '₩', 'RUB': '₽', 'CAD': 'C$', 'AUD': 'A$',
        'CHF': 'Fr', 'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr',
        'NZD': 'NZ$', 'SGD': 'S$', 'HKD': 'HK$', 'MXN': '$',
        'BRL': 'R$', 'ZAR': 'R', 'NGN': '₦', 'KES': 'KSh',
        'ETB': 'Br', 'TZS': 'Sh', 'UGX': 'Sh', 'RWF': 'RF',
        'GHS': '₵', 'XOF': 'CFA', 'XAF': 'FCFA', 'SSP': 'SS£'
    };
    
    const countryNames = {
        'sa': 'السعودية', 'ae': 'الإمارات', 'kw': 'الكويت',
        'qa': 'قطر', 'bh': 'البحرين', 'om': 'عمان',
        'eg': 'مصر', 'sd': 'السودان', 'jo': 'الأردن',
        'iq': 'العراق', 'sy': 'سوريا', 'lb': 'لبنان',
        'ye': 'اليمن', 'ma': 'المغرب', 'tn': 'تونس',
        'dz': 'الجزائر', 'ly': 'ليبيا', 'ps': 'فلسطين',
        'us': 'أمريكا', 'uk': 'بريطانيا', 'tr': 'تركيا',
        'other': 'دولة أخرى'
    };
    
    grid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both">
            <div class="product-image">
                <img src="${product.image || 'https://via.placeholder.com/400x300?text=No+Image'}" alt="${product.name}">
                <span class="product-badge">${getCategoryName(product.category)}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${countryNames[product.country] || product.country} - ${product.city}</span>
                </div>
                <div class="product-price">
                    ${product.price.toLocaleString()} ${currencySymbols[product.currency] || product.currency}
                </div>
                <div class="product-footer">
                    <div class="seller-info">
                        <div class="seller-avatar">${product.seller.name ? product.seller.name[0].toUpperCase() : 'U'}</div>
                        <span class="seller-name">${product.seller.name || 'مستخدم'}</span>
                    </div>
                    ${product.facebookLink ? `
                        <a href="${product.facebookLink}" target="_blank" class="contact-btn" onclick="event.stopPropagation()">
                            <i class="fab fa-facebook"></i>
                            تواصل
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'electronics': 'إلكترونيات',
        'cars': 'سيارات',
        'fashion': 'أزياء',
        'home': 'منزل',
        'sports': 'رياضة',
        'books': 'كتب',
        'toys': 'ألعاب',
        'beauty': 'صحة وجمال',
        'food': 'مواد غذائية',
        'pets': 'حيوانات',
        'services': 'خدمات',
        'other': 'أخرى'
    };
    return categories[category] || category;
}

// ====================
// البحث والفلترة
// ====================
function setupSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const cityFilter = document.getElementById('cityFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchProducts, 300));
    }
    
    if (countryFilter) {
        countryFilter.addEventListener('change', searchProducts);
    }
    
    if (cityFilter) {
        cityFilter.addEventListener('input', debounce(searchProducts, 300));
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const country = document.getElementById('countryFilter')?.value || '';
    const city = document.getElementById('cityFilter')?.value.toLowerCase() || '';
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // تصفية حسب البحث
    if (searchTerm) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description?.toLowerCase().includes(searchTerm)
        );
    }
    
    // تصفية حسب البلد
    if (country) {
        products = products.filter(p => p.country === country);
    }
    
    // تصفية حسب المدينة
    if (city) {
        products = products.filter(p => p.city.toLowerCase().includes(city));
    }
    
    renderProducts(products);
}

function filterBy(category) {
    // تحديث الأزرار النشطة
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    
    renderProducts(products);
}

// ====================
// القائمة المنسدلة
// ====================
function toggleMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('active');
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    const menu = document.getElementById('userMenu');
    const menuBtn = document.querySelector('.menu-dots');
    
    if (menu && !menu.contains(e.target) && !menuBtn?.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// ====================
// الملف الشخصي والمساعدة
// ====================
function showProfile() {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    if (user.name) {
        showNotification(`مرحباً ${user.name}!`, 'info');
    }
}

function showHelp() {
    showNotification('مركز المساعدة قريباً!', 'info');
}

// ====================
// تسجيل الخروج
// ====================
function logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    showNotification('تم تسجيل الخروج بنجاح', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ====================
// أداة Debounce
// ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================
// إشعارات
// ====================
function showNotification(message, type = 'info') {
    // إزالة الإشعارات السابقة
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    
