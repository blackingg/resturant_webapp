import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ posts }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 pt-24">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link
              to={`/blog/${post.id}`}
              className="text-[#B22222] font-semibold hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
