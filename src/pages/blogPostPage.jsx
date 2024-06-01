import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "../components/blogPost";
import { samplePosts } from "../samplePosts";

import { TbError404 } from "react-icons/tb";

const BlogPostPage = () => {
  const { id } = useParams();
  const post = samplePosts.find((post) => post.id === parseInt(id));

  return post ? (
    <div className="max-w-4xl mx-auto p-4 ">
      <BlogPost post={post} />
    </div>
  ) : (
    <div className="grid place-items-center h-screen">
      <h1 className="text-[#B22222] font-semibold flex flex-col items-center">
        <TbError404 size={60} />
        Post not found
      </h1>
    </div>
  );
};

export default BlogPostPage;
