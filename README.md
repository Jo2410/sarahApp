# 🧠 Sarah App Backend

A secure and scalable backend API for the **Sarah App**, built with Node.js, Express, and MongoDB. This project provides user authentication, encrypted data storage, and token-based session handling.

---

## 🚀 Features

- ✅ User registration & login
- 🔒 Password hashing with bcrypt
- 🔐 JWT-based access & refresh tokens
- 🛡️ Token expiration and signature security
- 🧠 Environment-based config using `.env`
- 🌍 MongoDB Atlas with Mongoose
- 🧪 Postman collection available for testing

---

## 📦 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**

---

## 📁 Project Structure

sarahApp/
│
├── src/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── routes/
│ ├── utils/
│ └── ...
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

ACCESS_TOKEN_SIGNATURE="your-access-token-secret"
ACCESS_TOKEN_EXPIRES_IN=1800

REFRESH_TOKEN_SIGNATURE="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN=31536000
🛑 Important: Do not commit this file. It's already listed in .gitignore.

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
Add your .env file

Run the development server:

bash
Copy
Edit
npm run start:dev
📬 API Testing
Use the Postman collection below to explore and test all endpoints:

👉 View Postman Documentation  https://documenter.getpostman.com/view/45299579/2sB3B7PDuo

✅ Sample Endpoints
Method	Endpoint	Description
POST	/api/auth/login	User login
POST	/api/auth/signup	Register new user
GET	/api/user/profile	Get user profile (protected)

🛠 Contributing
Pull requests are welcome. If you'd like to propose a major change, please open an issue first to discuss it.

🛡️ License
This project is open source and available under the MIT License.

🌐 Languages & Skills
English – C1 Advanced (EF SET English Certificate – 62/100)
efset.org

📞 Contact
Made by jo2410
Feel free to reach out via GitHub or open an issue.

