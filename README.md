🧠 Sarah App Backend
A secure and scalable backend API for the Sarah App, built with Node.js, Express, and MongoDB.
This project provides full-featured authentication, encrypted data handling, token-based sessions, email verification via OTP, and Google OAuth login.

🚀 Features
✅ User Registration & Login (with server-side validation)

📧 Email verification via OTP (One-Time Password)

🌐 Google OAuth signup & login

🔒 Password hashing using bcrypt

🔐 JWT-based access & refresh tokens

🧠 Role-based token signatures: Bearer (users) & System (admins)

🔁 Secure refresh token endpoint

🔄 Encrypted phone number field (AES)

⏳ Token expiration handling with custom lifetimes

📂 Modular & maintainable folder structure

📬 Event-based email sending using nodemailer & Gmail SMTP

🌍 MongoDB Atlas with Mongoose ORM

🧪 Postman collection for API testing

📦 Technologies Used
Node.js

Express.js

MongoDB (Atlas) + Mongoose

JWT (jsonwebtoken)

bcrypt

dotenv

nodemailer

google-auth-library

📁 Project Structure
bash
Copy
Edit
sarahApp/
│
├── src/
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Auth & validation middleware
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   ├── utils/         # Security helpers: hashing, encryption, JWT
│   ├── services/      # Business logic & DB abstraction
│   ├── events/        # Email event listeners
│   └── DB/            # DB connection & services
│
├── .env
├── .gitignore
├── package.json
└── README.md
⚙️ Environment Variables
Create a .env file in the root with:

env
Copy
Edit
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

APP_EMAIL="your-gmail-address"
APP_PASSWORD="your-gmail-app-password"

facebookLink="https://facebook.com/yourpage"
instegram="https://instagram.com/yourpage"
twitterLink="https://twitter.com/yourpage"
🛑 Important: .env is ignored in .gitignore — never commit it to GitHub.

▶️ Getting Started
1. Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/sarahApp.git
cd sarahApp
2. Install dependencies:

bash
Copy
Edit
npm install
3. Add your .env file.

4. Run the development server:

bash
Copy
Edit
npm run start:dev
📬 API Testing
Use the Postman collection to explore and test all endpoints:

👉 View Postman Documentation

✅ Sample Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user (system)
POST	/api/auth/login	User login (system)
POST	/api/auth/signup/gmail	Signup with Google account
POST	/api/auth/login/gmail	Login with Google account
POST	/api/auth/verify-email	Verify email with OTP
GET	/api/user/	Get user profile (access token)
GET	/api/user/refresh-token	Refresh token for new credentials

🔐 Security Features
Encrypted phone numbers using AES

Role-based token signature handling (different secrets for user/admin)

Access & Refresh token separation with independent expiration

Middleware authentication with decoded JWT payload

Secure password hashing with bcrypt

Email verification via OTP before account activation

Google OAuth 2.0 login/signup with token verification

🛠 Contributing
Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

🛡️ License
This project is open source and available under the MIT License.

🌐 Languages & Skills
English – C1 Advanced
EF SET English Certificate – 62/100
View Certificate

📞 Contact
📧 Email: megatron24100@gmail.com
🐙 GitHub: jo2410
