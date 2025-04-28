
# Role-Based Access Control (RBAC) Blog Platform

This project implements a secure blog platform with role-based access control (RBAC), allowing different permissions for admin and regular user roles.

## Features

- **Authentication with Supabase Auth**: Secure login and registration
- **Role-Based Access Control**: Different permissions for admins and users
- **Blog Management**: Create, read, update, delete functionality for blog posts
- **User Management**: Admin dashboard for managing users and their roles
- **Responsive Design**: Works on mobile, tablet, and desktop

## Architecture

This is a full-stack application with:

- **Frontend**: React with TypeScript and Tailwind CSS (shadcn/ui components)
- **Backend**: Supabase for authentication, database, and storage
- **Database**: PostgreSQL (via Supabase)

## Project Structure

```
├── src/
│   ├── components/     # React components
│   │   ├── admin/      # Admin-specific components
│   │   ├── layouts/    # Layout components
│   │   └── ui/         # UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and Supabase client
│   └── pages/          # Page components
│       ├── admin/      # Admin pages
│       ├── auth/       # Authentication pages
│       ├── blogs/      # Blog-related pages
│       └── user/       # User-specific pages
```

## Database Structure

### Tables

1. **profiles** - User profiles with roles
   - id (primary key, references auth.users)
   - name
   - email
   - role (admin or user)
   - created_at

2. **posts** - Blog posts
   - id (primary key)
   - title
   - content
   - excerpt
   - category
   - author_id (references profiles.id)
   - created_at

## Row Level Security (RLS) Policies

- **posts**:
  - Users can read all posts
  - Users can insert their own posts
  - Users can update/delete their own posts
  - Admins can update/delete any post

- **profiles**:
  - Users can read all profiles
  - Users can update their own profiles
  - Admins can update any profile

## User Roles and Permissions

### Admin
- View all blog posts
- Create new blog posts
- Edit any blog post
- Delete any blog post
- Manage users (view user information)
- Access admin dashboard

### Regular User
- View all blog posts
- Create their own blog posts
- Edit their own blog posts
- Delete their own blog posts
- View their own profile
- Edit their own profile
- Cannot access admin features

## Security Considerations

- Supabase Auth for secure authentication
- JWT tokens for session management
- Row-Level Security (RLS) policies for database protection
- Role-based authorization middleware
- Input validation and sanitization

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rbac-blog-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create a Supabase account and project
   - Set up authentication in the Supabase dashboard
   - Run the database schema setup (SQL provided below)
   - Set appropriate RLS policies

4. **Set environment variables**
   - Create a `.env` file with Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. **Run the application**
   ```bash
   npm run dev
   ```

## Database Setup SQL

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Set up RLS
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Allow public read access to profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow admin to update any profile" ON profiles
  FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Posts policies
CREATE POLICY "Allow public read access to posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow users to create their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Allow users to update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Allow users to delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Allow admins to update any post" ON posts
  FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Allow admins to delete any post" ON posts
  FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Function to create an admin user
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'admin@example.com' THEN
    UPDATE profiles
    SET role = 'admin'
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run after user signup
CREATE TRIGGER after_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_admin_user();
```

## Manual Admin Creation

To manually set a user as admin (from Supabase SQL editor):

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'user_email@example.com';
```
