🧠 Sarah App Backend
A secure and scalable backend API for the Sarah App, built with Node.js, Express, and MongoDB.
It supports advanced authentication workflows, email verification with OTP, secure data handling, and Gmail OAuth integration.

🚀 Features
✅ User registration & login with request validation

📧 Email verification using Nodemailer & HTML templates

🔢 OTP-based verification for secure account activation

🔒 Password hashing with bcrypt

🔐 JWT-based access & refresh tokens

🧠 Role-based token signatures:

Bearer → Users

System → Admins

🔁 Secure refresh token endpoint

🔄 Encrypted phone number field (AES)

📩 Signup with Gmail (Google OAuth workflow)

🌍 CORS enabled for cross-origin requests

⏳ Token expiration handling with custom lifetimes

📂 Modular MVC code structure

🌐 MongoDB Atlas with Mongoose ODM

🧪 Postman collection for API testing

📦 Technologies Used
Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT (jsonwebtoken)

bcrypt

dotenv

nodemailer

cors

📁 Project Structure
bash
Copy
Edit
sarahApp/
│
├── src/
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth middleware & validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── utils/          # Security utils: hashing, encryption, JWT
│   └── DB/             # DB connection & services
│
├── .env
├── .gitignore
├── package.json
└── README.md
⚙️ Environment Variables
Create a .env file in the root:

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

APP_EMAIL="your-email@gmail.com"
APP_PASSWORD="your-email-password"
FACEBOOK_LINK="https://facebook.com/..."
INSTAGRAM_LINK="https://instagram.com/..."
TWITTER_LINK="https://twitter.com/..."
🛑 Do not commit this file — it’s ignored via .gitignore.

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
Run the development server:

bash
Copy
Edit
npm run start:dev
📬 API Testing
Use the Postman collection to explore and test all endpoints:
👉 View Postman Documentation

✅ Sample Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	User login
POST	/api/auth/signup/gmail	Signup with Gmail OAuth
GET	/api/user/	Get user profile (access token)
GET	/api/user/refresh-token	Refresh token for new creds
POST	/api/auth/verify-email	Verify email with OTP

🔐 Security Features
AES encryption for phone numbers

Role-based token signature handling (separate secrets for user/admin)

Access & refresh token separation with independent expiration

Middleware authentication with decoded JWT payload

Secure token generation & storage

CORS-enabled API for cross-domain communication

🛠 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the changes.

🛡️ License
This project is open source and available under the MIT License.

📞 Contact
Made by megatron24100@gmail.com
Feel free to reach out via GitHub or open an issue.
