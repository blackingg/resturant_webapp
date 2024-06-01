import React from "react";
import { useNavigate } from "react-router-dom";

import { IoArrowBackCircle } from "react-icons/io5";

const BlogPost = ({ post }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/blog");
  };
  return (
    <div className="max-w-4xl mx-auto p-4 pt-24">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <button
          onClick={handleBackClick}
          className="mb-4 text-[#B22222] font-semibold hover:underline"
        >
          <IoArrowBackCircle size={30} />
        </button>
      </div>

      <div className="flex justify-between items-center text-gray-600 mb-8">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
      <div className="prose pt-16 lg:prose-xl">{post.content}</div>
    </div>
  );
};

export default BlogPost;
