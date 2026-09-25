const fs = require('fs');
const path = require('path');

// Create postman directory if it doesn't exist
const postmanDir = path.join(__dirname, 'postman');
if (!fs.existsSync(postmanDir)) {
    fs.mkdirSync(postmanDir);
}

// Read and export the collection
const collectionPath = path.join(__dirname, 'postman_collection.json');
if (fs.existsSync(collectionPath)) {
    const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
    const exportPath = path.join(postmanDir, 'Photo_Gallery_API.postman_collection.json');
    fs.writeFileSync(exportPath, JSON.stringify(collection, null, 2));
    console.log(' Postman collection exported to:', exportPath);
} else {
    console.log(' postman_collection.json not found!');
}

// Create README
const readmeContent = `# Postman Collection - Photo Gallery API

## Overview
This Postman collection contains comprehensive tests for all Photo Gallery API endpoints.

## Setup

### 1. Import Collection
- Open Postman
- Click "Import" button
- Select \`Photo_Gallery_API.postman_collection.json\`

### 2. Create Environment
Create a new environment with these variables:
| Variable | Value |
|----------|-------|
| baseUrl | http://localhost:5000 |
| token | (auto-populated) |
| userId | (auto-populated) |
| photoId | (auto-populated) |

### 3. Run Tests

#### Order of Execution:
1. **AUTH TESTS** - Create account and login
2. **USER TESTS** - Manage user profile
3. **PHOTO TESTS** - Upload, update, delete photos
4. **ADMIN TESTS** - Admin-only operations
5. **SECURITY TESTS** - Authentication and authorization

## Test Categories

### AUTH TESTS
- Signup new user
- Login existing user
- Invalid login attempt

### USER TESTS
- Get profile
- Update profile
- Create second user (for admin tests)

### PHOTO TESTS
- Get gallery (empty)
- Upload photo (requires image file)
- Get gallery (with photos)
- Get single photo
- Update photo
- Delete photo

### ADMIN TESTS
- Get all users
- Get all photos
- Promote user to admin
- Demote user from admin
- Delete user

### SECURITY TESTS
- Access without token
- Admin route with normal token

## Important Notes

### Photo Upload
- You need to select an actual image file in the "Upload Photo" request
- Click "Select File" in the form-data body

### Admin Access
- By default, new users have "user" role
- To test admin routes, either:
  1. Manually set a user's role to "admin" in MongoDB
  2. Have an admin user sign up first

### Environment Variables
The collection automatically sets these variables during tests:
- \`token\` - JWT authentication token
- \`userId\` - Current user ID
- \`photoId\` - Uploaded photo ID
- \`signupEmail\` - Email used for signup

## Running All Tests

### Using Collection Runner:
1. Click the collection name
2. Click "Run"
3. Select environment
4. Click "Run Photo Gallery API"

### Expected Results:
- All green = Everything working
- Some yellow = Admin tests may be skipped
- Red = Check server and configuration

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Start server with \`npm start\` |
| Signup fails | Check MongoDB connection |
| Upload fails | Select an image file |
| Admin route 403 | User is not admin - create admin user |
| Token not saved | Check environment is selected |

## Test Coverage

| Route | Method | Tested |
|-------|--------|--------|
| /api/auth/signup | POST |
| /api/auth/login | POST |          
| /api/users/me | GET | 
| /api/users/me | PUT | 
| /api/photos | GET | 
| /api/photos | POST | 
| /api/photos/:id | GET | 
| /api/photos/:id | PUT | 
| /api/photos/:id | DELETE | 
| /api/users | GET | 
| /api/photos/all | GET | 
| /api/users/:id/promote | PUT | 
| /api/users/:id/demote | PUT | 
| /api/users/:id | DELETE | 

---

**Last Updated:** ${new Date().toISOString()}
`;

fs.writeFileSync(path.join(postmanDir, 'README.md'), readmeContent);
console.log(' README.md created in postman folder');