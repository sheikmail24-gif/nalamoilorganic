# 🚀 Deployment & Backend Guide - Velchekku E-Commerce

## 📌 TABLE OF CONTENTS
1. [How to Make This Website LIVE](#-how-to-go-live)
2. [Backend Options](#-backend-options)
3. [Database Setup](#-database-setup)
4. [Payment Integration](#-payment-gateway)
5. [Domain & SSL](#-custom-domain)

---

## 🌐 HOW TO GO LIVE

### Option 1: Vercel (RECOMMENDED - FREE) ⭐
```bash
# Step 1: Install Vercel CLI
npm install -g vercel

# Step 2: Login
vercel login

# Step 3: Deploy (run from project root)
vercel

# Step 4: For production
vercel --prod
```
🔗 Your site will be live at: `https://your-project.vercel.app`

### Option 2: Netlify (FREE)
```bash
# Step 1: Install Netlify CLI
npm install -g netlify-cli

# Step 2: Login
netlify login

# Step 3: Build the project
npm run build

# Step 4: Deploy
netlify deploy --prod --dir=dist
```
🔗 Your site will be live at: `https://your-project.netlify.app`

### Option 3: GitHub Pages (FREE)
```bash
# Step 1: Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# Step 2: Install gh-pages
npm install -D gh-pages

# Step 3: Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Step 4: Deploy
npm run deploy
```

### Option 4: Firebase Hosting (FREE tier)
```bash
# Step 1: Install Firebase CLI
npm install -g firebase-tools

# Step 2: Login
firebase login

# Step 3: Initialize
firebase init hosting
# Select "dist" as public directory
# Configure as single-page app: Yes

# Step 4: Build & Deploy
npm run build
firebase deploy
```

### Option 5: VPS/Cloud (AWS, DigitalOcean, Hostinger)
```bash
# Step 1: Buy a VPS ($4-10/month)
# - DigitalOcean Droplet
# - AWS Lightsail
# - Hostinger VPS

# Step 2: SSH into server
ssh root@your-server-ip

# Step 3: Install Node.js & Nginx
sudo apt update
sudo apt install nginx nodejs npm

# Step 4: Upload build files
scp -r dist/* root@your-server-ip:/var/www/html/

# Step 5: Configure Nginx
sudo nano /etc/nginx/sites-available/default
# Set root to /var/www/html
# Add try_files for SPA routing
```

---

## 🔧 BACKEND OPTIONS

### Option 1: Supabase (RECOMMENDED - FREE tier) ⭐
**Best for:** Beginners, quick setup, real-time features
```
✅ Database (PostgreSQL)
✅ Authentication (Google, Email, Phone OTP)
✅ File Storage (product images)
✅ Real-time subscriptions
✅ Auto-generated REST API
✅ FREE for small projects
```

```bash
# Install
npm install @supabase/supabase-js

# Setup in your code
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('YOUR_URL', 'YOUR_KEY')

# Fetch products
const { data } = await supabase.from('products').select('*')

# Add to cart
await supabase.from('cart').insert({ user_id, product_id, quantity })

# User login
await supabase.auth.signInWithOtp({ phone: '+91XXXXXXXXXX' })
```

### Option 2: Firebase (Google - FREE tier)
**Best for:** Real-time apps, Google ecosystem
```bash
npm install firebase

# Firestore for products
# Firebase Auth for login
# Firebase Storage for images
# Firebase Functions for server logic
```

### Option 3: Node.js + Express (Custom Backend)
**Best for:** Full control, custom logic
```bash
# Create backend folder
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv jsonwebtoken bcryptjs razorpay

# Project structure:
backend/
├── server.js
├── routes/
│   ├── products.js
│   ├── users.js
│   ├── orders.js
│   └── cart.js
├── models/
│   ├── Product.js
│   ├── User.js
│   └── Order.js
├── middleware/
│   └── auth.js
└── .env
```

**Sample server.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));

app.listen(5000, () => console.log('Server running on port 5000'));
```

### Option 4: Strapi (Headless CMS - FREE)
**Best for:** Non-developers managing content
```bash
npx create-strapi-app@latest backend --quickstart
# Gives you admin panel at localhost:1337/admin
# Auto-generates API for products, orders, etc.
```

### Option 5: Shopify / WooCommerce (Paid)
**Best for:** Business-ready, no coding needed
```
Shopify: ₹1,499/month - Full e-commerce platform
WooCommerce: Free plugin for WordPress (hosting ₹200-500/month)
```

---

## 🗄️ DATABASE SETUP

### MongoDB Atlas (FREE - 512MB)
```
1. Go to mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Use in your backend:
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/velchekku
```

### Supabase PostgreSQL (FREE - 500MB)
```
1. Go to supabase.com
2. Create new project
3. Go to SQL Editor
4. Create tables:

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  original_price DECIMAL,
  category TEXT,
  image_url TEXT,
  rating DECIMAL DEFAULT 0,
  stock INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  items JSONB NOT NULL,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_id TEXT,
  address JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 💳 PAYMENT GATEWAY

### Razorpay (Most Popular in India) ⭐
```bash
npm install razorpay

# Frontend integration:
const options = {
  key: 'rzp_live_XXXXXXXXX',
  amount: totalAmount * 100, // in paise
  currency: 'INR',
  name: 'Velchekku',
  description: 'Order Payment',
  handler: function(response) {
    // Verify payment on backend
    verifyPayment(response.razorpay_payment_id);
  },
  prefill: {
    name: 'Customer Name',
    email: 'customer@email.com',
    contact: '9999999999'
  }
};
const rzp = new window.Razorpay(options);
rzp.open();
```

**Steps:**
1. Go to razorpay.com → Sign up
2. Complete KYC verification
3. Get API Key & Secret from Dashboard → Settings → API Keys
4. Test with test mode keys first
5. Switch to live keys when ready

### PhonePe / Paytm / Cashfree
Similar process - sign up, get API keys, integrate SDK.

---

## 🌍 CUSTOM DOMAIN

### Buy Domain (₹99 - ₹800/year)
- **GoDaddy** - godaddy.com
- **Namecheap** - namecheap.com  
- **Google Domains** - domains.google
- **Hostinger** - hostinger.in (cheapest)
- **BigRock** - bigrock.in

### Connect Domain to Vercel
```
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: velchekku.in
3. Update DNS at your domain registrar:
   - Type: A, Name: @, Value: 76.76.19.19
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
4. SSL certificate is automatic! ✅
```

### Connect Domain to Netlify
```
1. Go to Netlify → Site Settings → Domain Management
2. Add custom domain
3. Update DNS records as shown
4. SSL is automatic ✅
```

---

## 📱 QUICK START RECOMMENDATION

For a **small to medium e-commerce** like Velchekku, here's the fastest path:

| Component | Recommendation | Cost |
|-----------|---------------|------|
| Frontend | React (this project) | FREE |
| Hosting | Vercel | FREE |
| Backend + DB | Supabase | FREE (up to 500MB) |
| Auth | Supabase Auth | FREE |
| Payments | Razorpay | 2% per transaction |
| Domain | Hostinger | ₹99/year |
| Images | Supabase Storage / Cloudinary | FREE tier |
| Email | EmailJS / Resend | FREE tier |
| SMS OTP | MSG91 / Twilio | ₹0.2/SMS |

**Total Monthly Cost: ₹0 - ₹500** (until you scale!)

---

## 🔐 ENVIRONMENT VARIABLES

Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx
VITE_RAZORPAY_KEY=rzp_test_xxxxx
VITE_API_URL=https://your-backend.com/api
```

---

## 📞 NEED HELP?

- Vercel Docs: vercel.com/docs
- Supabase Docs: supabase.com/docs
- Razorpay Docs: razorpay.com/docs
- React Docs: react.dev
