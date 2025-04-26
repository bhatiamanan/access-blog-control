
export const featuredPosts = [
  {
    id: "1",
    title: "Understanding Role-Based Access Control (RBAC)",
    excerpt: "Learn about the fundamental concepts of RBAC and how it enhances security in modern applications by limiting system access to authorized users.",
    author: {
      name: "Admin User",
      role: "admin"
    },
    createdAt: "2023-04-15",
    category: "Security"
  },
  {
    id: "2",
    title: "Implementing JWT Authentication in NestJS",
    excerpt: "A step-by-step guide to implementing secure JWT authentication in your NestJS applications with proper token management.",
    author: {
      name: "Alice Johnson",
      role: "admin"
    },
    createdAt: "2023-04-10",
    category: "Development"
  },
  {
    id: "3",
    title: "Best Practices for MongoDB Security",
    excerpt: "Discover the essential security practices for MongoDB to protect your data, including authentication, authorization, and encryption.",
    author: {
      name: "Bob Smith",
      role: "user"
    },
    createdAt: "2023-04-05",
    category: "Database"
  }
];

export const allPosts = [
  ...featuredPosts,
  {
    id: "4",
    title: "Building User Interfaces with React and Tailwind CSS",
    excerpt: "Learn how to create beautiful and responsive user interfaces combining the power of React with the utility-first CSS framework Tailwind.",
    author: {
      name: "Claire Davis",
      role: "user"
    },
    createdAt: "2023-03-28",
    category: "Frontend"
  },
  {
    id: "5",
    title: "Creating a Full-Stack Blog with React and NestJS",
    excerpt: "Step-by-step guide to building a modern blog application with React on the frontend and NestJS on the backend.",
    author: {
      name: "Admin User",
      role: "admin"
    },
    createdAt: "2023-03-20",
    category: "Full Stack"
  },
  {
    id: "6",
    title: "Managing State in React Applications",
    excerpt: "Compare different state management approaches in React and learn when to use each one in your projects.",
    author: {
      name: "David Wilson",
      role: "user"
    },
    createdAt: "2023-03-15",
    category: "Frontend"
  },
  {
    id: "7",
    title: "API Security Best Practices",
    excerpt: "Essential security measures to protect your APIs from common vulnerabilities and attacks.",
    author: {
      name: "Emma Brown",
      role: "admin"
    },
    createdAt: "2023-03-10",
    category: "Security"
  },
  {
    id: "8",
    title: "Working with MongoDB and NestJS",
    excerpt: "Learn how to integrate MongoDB with NestJS using Mongoose for efficient database operations.",
    author: {
      name: "Frank Miller",
      role: "user"
    },
    createdAt: "2023-03-05",
    category: "Backend"
  },
];

export const fullPostContent = {
  "1": {
    title: "Understanding Role-Based Access Control (RBAC)",
    content: `
# Understanding Role-Based Access Control (RBAC)

Role-Based Access Control (RBAC) is a method of restricting system access to authorized users based on roles. It's one of the main methods for advanced access control in modern applications.

## What is RBAC?

RBAC is a security model that restricts system access to authorized users based on their role within an organization. The components of RBAC include:

1. **Users**: Individual system users who need access to various resources
2. **Roles**: Collections of permissions that can be assigned to users
3. **Permissions**: Authorizations to perform specific operations on specific resources
4. **Operations**: Actions that can be performed on resources (CRUD operations)
5. **Objects**: Resources that users want to access (pages, features, data)

## Benefits of RBAC

- **Simplified Access Management**: Administrators can manage users and permissions through roles rather than individually
- **Improved Security**: Principle of least privilege ensures users only have access to what they need
- **Regulatory Compliance**: Helps meet requirements for access control in regulations like HIPAA, SOX, GDPR
- **Reduced Administrative Work**: Less overhead in managing individual user permissions
- **Scalability**: Works for organizations of any size

## RBAC Implementation Approaches

### Three-Tier Model

1. **Core RBAC**: Basic model with users, roles, permissions, and sessions
2. **Hierarchical RBAC**: Adds role hierarchy, allowing inheritance of permissions
3. **Constrained RBAC**: Adds separation of duties constraints

## Best Practices for RBAC Implementation

1. Start with a role analysis to identify all necessary roles
2. Follow the principle of least privilege
3. Implement role hierarchies for better management
4. Regularly review and audit roles and permissions
5. Document your RBAC model thoroughly
6. Provide proper training for administrators

By implementing RBAC correctly, organizations can significantly improve their security posture while simplifying access management.
    `,
    author: {
      name: "Admin User",
      role: "admin"
    },
    createdAt: "2023-04-15",
    category: "Security"
  },
  // Add more full post content as needed
};
