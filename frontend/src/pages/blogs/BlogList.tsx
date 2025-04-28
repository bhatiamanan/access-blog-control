
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";
import { allPosts } from "@/lib/dummyData";

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter posts based on search term
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">All Blog Posts</h1>
          <p className="text-gray-600 text-center mb-8">
            Explore our collection of articles on security, development, and best practices
          </p>
          
          <div className="relative mb-8">
            <Input
              type="search"
              placeholder="Search by title, content, or category..."
              className="w-full px-4 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found matching "{searchTerm}". Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogList;
