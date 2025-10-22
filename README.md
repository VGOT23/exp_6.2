
# 🏦 Secure Banking API using JWT Authentication

This project demonstrates how to secure Express.js API endpoints using **JWT (JSON Web Token)** authentication.
It simulates a basic banking system with endpoints for **login**, **viewing balance**, **depositing**, and **withdrawing money**, protected by token-based access control.

---



## ⚙️ **Features**

* ✅ **JWT-based authentication**
* ✅ **Login endpoint** returning a signed token
* ✅ **Protected banking operations:**

  * `/balance` — View current balance
  * `/deposit` — Add funds
  * `/withdraw` — Withdraw money (with balance check)
* ✅ **Error handling** for invalid tokens, missing headers, or insufficient funds
* ✅ **Middleware-based authentication check**

---

## 🧠 **Tech Stack**

* **Node.js** — Runtime environment
* **Express.js** — Web framework
* **jsonwebtoken** — For signing and verifying tokens
* **body-parser** — For parsing JSON request bodies

---

## 🏗️ **Project Structure**

```
banking-api-jwt/
│
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

---

## 🚀 **Setup & Installation**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/banking-api-jwt.git
cd banking-api-jwt
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
npm start
```

Server runs on → **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 **Authentication Flow**

1. **Login** using username and password (hardcoded credentials)
2. Server returns a **JWT token** (valid for 1 hour)
3. Include the token in the **Authorization header** for all protected routes:

   ```
   Authorization: Bearer <your-token>
   ```

---

## 🧪 **Testing the API**

### **1️⃣ Login to get the token**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user123","password":"password123"}'
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "<your-jwt-token>"
}
```

---

### **2️⃣ Access /balance**

```bash
curl -X GET http://localhost:3000/balance \
  -H "Authorization: Bearer <your-jwt-token>"
```

**Response:**

```json
{"username":"user123","balance":1000}
```

---

### **3️⃣ Deposit money**

```bash
curl -X POST http://localhost:3000/deposit \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":500}'
```

**Response:**

```json
{"message":"Deposited ₹500","newBalance":1500}
```

---

### **4️⃣ Withdraw money**

```bash
curl -X POST http://localhost:3000/withdraw \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":300}'
```

**Response:**

```json
{"message":"Withdrawn ₹300","newBalance":1200}
```

---

### **5️⃣ Invalid or missing token**

```bash
curl -X GET http://localhost:3000/balance -H "Authorization: Bearer wrongtoken"
```

**Response:**

```json
{"error":"Invalid or expired token"}
```

---

## 🧱 **Error Handling**

| Case                         | Response Code | Message                        |
| ---------------------------- | ------------- | ------------------------------ |
| Missing Authorization Header | 401           | `Missing Authorization header` |
| Invalid Token                | 403           | `Invalid or expired token`     |
| Invalid Credentials          | 401           | `Invalid username or password` |
| Insufficient Balance         | 400           | `Insufficient balance`         |
| Negative or Zero Amount      | 400           | `Amount must be positive`      |

---

## 🔒 **Security Notes**

* Tokens expire in **1 hour** to enhance security.
* In real-world use cases:

  * Store user data in a **database**.
  * Use **bcrypt** for password hashing.
  * Store **JWT secret** in environment variables.

---

## 📈 **Future Enhancements**

* Add multiple user accounts with persistent database storage
* Add transaction history endpoint
* Implement role-based access control (admin/user)
* Use `dotenv` for environment configuration

---

## 👨‍💻 **Author**

**OG**
🎓 CSE (AI & ML) | 3rd Year | Building projects for placement prep
💡 Focused on practical learning, DSA, and backend development

---

## 🪪 **License**

This project is open-source and available under the **MIT License**.
