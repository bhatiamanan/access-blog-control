
# Role-Based Access Control (RBAC) Blog Platform

This project implements a secure blog platform with role-based access control (RBAC), allowing different permissions for admin and regular user roles.

## Features

- **Authentication with JWT**: Secure login and registration
- **Role-Based Access Control**: Different permissions for admins and users
- **Blog Management**: Create, read, update, delete functionality for blog posts
- **User Management**: Admin dashboard for managing users and their roles
- **Responsive Design**: Works on mobile, tablet, and desktop

## Architecture

This is a full-stack application with:

- **Frontend**: React with TypeScript and Tailwind CSS (shadcn/ui components)
- **Backend**: NestJS (mock implementation for this project)
- **Database**: MongoDB (mock implementation for this project)

## Project Structure

```
├── src/
│   ├── components/     # React components
│   │   ├── admin/      # Admin-specific components
│   │   ├── layouts/    # Layout components
│   │   └── ui/         # UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and dummy data
│   └── pages/          # Page components
│       ├── admin/      # Admin pages
│       ├── auth/       # Authentication pages
│       ├── blogs/      # Blog-related pages
│       └── user/       # User-specific pages
```

## Running Locally

Follow these steps to run the application on your local machine:

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd rbac-blog-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

## User Roles and Permissions

### Admin
- View all blog posts
- Create new blog posts
- Edit any blog post
- Delete any blog post
- Manage users (change roles, delete users)
- Access admin dashboard

### Regular User
- View all blog posts
- View their own profile
- Edit their own profile
- Cannot access admin features

## Demo Credentials

For testing purposes, you can use these demo accounts:

**Admin User:**
- Email: admin@example.com
- Password: admin123

**Regular User:**
- Email: user@example.com
- Password: user123

## Backend Implementation Notes

This project includes a mock backend implementation for demonstration purposes. In a production environment, you would:

1. Set up a real NestJS backend with MongoDB
2. Implement proper JWT authentication with token refresh
3. Create proper database models and schemas
4. Set up proper API endpoints with role-based middleware
5. Implement proper error handling and validation

## Security Considerations

In a production environment, additional security measures would include:

- HTTPS for all API communications
- Proper password hashing (bcrypt)
- Rate limiting for login attempts
- CSRF protection
- XSS protection
- Input validation on all forms
- Secure HTTP headers
