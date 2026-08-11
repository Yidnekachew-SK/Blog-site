# Blog-site

A blog site web app built using node, express and react.
It is separated into two parts for admin user and normal users where normal users can read and comment on the blog posts where as admin user can create and delete blog posts, publish and unpublish them and delete comments.

## Live Demo
[Live Demo](https://yidnekachewsk-blog-site.netlify.app/)

## Features
- Integrated TinyMCE editor for styling blog text
- Protected routes
- Separated routes for admin and normal users
- JWT authentication for protected routes

### Upcoming Features  
- [ ] Comment likes and replies
- [ ] Searching blog posts

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Frontend Library:** React
- **Database:** PostgreSQL
- **Authentication & Security:** JWT, Passport.js (local & jwt strategy), bcryptjs
- **Validation:** express-validator
- **ORM:** Prisma

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Yidnekachew-SK/Blog-site.git
cd blog-site
```

### 2. Install dependencies
```bash
cd backend
npm install
#and
cd frontend
npm install
```

### 3. Environment Variables
Create **.env** file in the root directory of backend and frontend folders.  
```bash
#For backend
SECRET=JWT_secret_key
DATABASE_URL=your_database_url

#For frontend
VITE_API_URL=your_backend_api_url
VITE_EDITOR_API=your_TinyMCE_editor_api_key
```

### 4. Generate Prisma client
Run the command below to generate the Prisma client.  
```bash
cd backend
npx prisma generate
```
### 5. Populate the DB
Run the command below to create the DB tables.  
```bash
npx prisma migrate deploy
```

### 6. Start the server
Start the backend server using the command below.
```bash
cd backend
node app.js
#or
npm run watch (like nodemon)
```
Start the frontend react server using the command below.
```bash
cd frontend
npm run dev
```
Visit **http://localhost:5173** in your browser.  
