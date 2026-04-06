#  User Management API

## **📌 Overview**

This is a RESTful API built using Node.js and Express.js to manage users.
It supports creating users with validation, along with advanced features like filtering, sorting, and pagination.

---

## **▶️ How to Run**

1. Clone the repository:

```
git clone https://github.com/your-username/Crud_practise.git
```

2. Navigate to project:

```
cd Crud_practise
```

3. Install dependencies:

```
npm install
```

4. Start server:

```
npm start
```

---

## ✨ Features

### ✅ CRUD Operations

* Create a new user
* Read all users
* (Extendable for Update & Delete)

### ✅ Validation

* User name cannot be empty
* User name must be 3–12 characters
* Age must be an integer
* Duplicate usernames are not allowed

### ✅ Filtering

* Filter users by:

  * `user_name`
  * `age`

Example:

```
/api/users?filter=age&value=23
```

---

### ✅ Searching

* Case-insensitive search for usernames

Example:

```
/api/users?filter=user_name&value=to
```

---

### ✅ Sorting

* Sort by:

  * `user_name`
  * `age`
* Supports ascending & descending order

Example:

```
/api/users?sort=age&order=desc
```

---

### ✅ Pagination

* Control data using `page` and `limit`

Example:

```
/api/users?page=1&limit=5
```

---

### ✅ Combined Queries 

You can combine all features:

```
/api/users?filter=user_name&value=t&sort=age&order=desc&page=1&limit=2
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* express-validator

---

## 📂 Project Structure

First/
│
├── index.js
├── routes/
├── utils/
├── package.json
└── .gitignore

---

## 🌐 API Endpoint

```
GET /api/users
```

```
POST /api/users
PUT /api/users/:id
PATCH /api/users/:id
DELETE /api/users/:id
```

Body:

```
{
  "user_name": "tomi",
  "age": 23
}
```

---

## 📌 Future Improvements

* Integrate  database
* Authentication (JWT)

---

## 👩‍💻 Author

Iswarya M
