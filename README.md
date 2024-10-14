Resume Builder App
This project is a Resume Builder web application built using Node.js, Express, MongoDB, JWT, and bcrypt for user authentication. The app allows users to sign up, log in, and access a main page where they can build their resumes. Static files such as HTML, CSS, and JavaScript are used to provide a user-friendly interface.

Features
User Signup: Users can create an account by providing their email and password. Passwords are securely hashed using bcrypt before being stored in MongoDB.
User Login: Users log in using their email and password. A JWT (JSON Web Token) is generated upon successful login, and it's used to authenticate users on protected routes.
Resume Builder Page: After logging in, users are redirected to the main page where they can build and manage their resumes.
Static File Serving: Serves static HTML pages for the homepage, signup, login, and resume builder.
JWT Authentication: Protects routes like the resume builder page, ensuring only authenticated users with a valid token can access it.
MIME Type Handling: Ensures correct MIME types for static files like .html, .css, .js, and .ico.
Technologies Used
Node.js: Server-side JavaScript runtime.
Express: Web framework for building the backend server.
MongoDB: NoSQL database to store user information.
JWT (JSON Web Tokens): Used for secure user authentication.
bcrypt: Password hashing library for secure storage of user passwords.
HTML/CSS/JavaScript: Frontend interface for user interaction.
