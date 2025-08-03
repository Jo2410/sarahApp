# 🧠 Sarah App Backend

A secure and scalable backend API for the Sarah App, built with Node.js, Express, and MongoDB. This project includes user authentication, encrypted data handling, token-based session management, and secure refresh token workflows.

---

## 🚀 Features

- ✅ User registration & login with validation
- 🔒 Password hashing using **bcrypt**
- 🔐 JWT-based access & refresh tokens
- 🧠 Role-based token signatures: `Bearer` (users) & `System` (admins)
- 🔁 Secure refresh token endpoint
- 🔄 Encrypted phone number field (AES)
- ⏳ Token expiration handling with custom lifetimes
- 📂 Modular code structure (controllers, services, middlewares)
- 🌍 MongoDB Atlas with Mongoose
- 🧪 Postman collection for API testing

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (`jsonwebtoken`)
- bcrypt
- dotenv

---

## 📁 Project Structure

sarahApp/
│
├── src/
│ ├── controllers/ # Route logic
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route definitions
│ ├── utils/ # Security utils: hashing, encryption, JWT
│ └── DB/ # DB connection & services
│
├── .env
├── .gitignore
├── package.json
└── README.md

makefile
Copy
Edit

---

## ⚙️ Environment Variables

Create a `.env` file in the root with:

```env
PORT=3000
DB_URI="your-mongodb-uri"
SALT=12

ENCRYPTION_SECRET="your-encryption-secret"

ACCESS_USER_TOKEN_SIGNATURE="your-user-access-token-secret"
ACCESS_TOKEN_EXPIRES_IN=1800

REFRESH_USER_TOKEN_SIGNATURE="your-user-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN=31536000

ACCESS_SYSTEM_TOKEN_SIGNATURE="your-admin-access-token-secret"
REFRESH_SYSTEM_TOKEN_SIGNATURE="your-admin-refresh-token-secret"
🛑 Important: Do not commit this file. It's ignored via .gitignore.

▶️ Getting Started
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/sarahApp.git
cd sarahApp
Install dependencies:

bash
Copy
Edit
npm install
Add your .env file.

Run the development server:

bash
Copy
Edit
npm run start:dev
📬 API Testing
Use the Postman collection to explore and test all endpoints:

👉 View Postman Documentation  https://documenter.getpostman.com/view/45299579/2sB3B7PDuo

✅ Sample Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	User login
GET	/api/user/	Get user profile (access token)
GET	/api/user/refresh-token	Refresh token for new credentials

🔐 Security Features
Encrypted phone numbers using AES

Role-based token signature handling (different secrets for user/admin)

Access & Refresh token separation with independent expiration

Middleware authentication with decoded JWT payload

Secure token generation & storage practices

🛠 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

🛡️ License
This project is open source and available under the MIT License.

🌐 Languages & Skills
English – C1 Advanced
EF SET English Certificate – 62/100
https://www.efset.org/cert

📞 Contact
Made by jo2410
Feel free to reach out via GitHub or open an issue.

pgsql
Copy
Edit

---

### ✅ Summary of Updates

- Added new features like token refreshing, role-based signatures, encrypted phone numbers
- Clarified `.env` structure for system vs user tokens
- Polished markdown formatting and section organization
- Included accurate endpoint documentation
