import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Post } from "../types/Post";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";

// Define the props type
interface BlogsPageProps {
  unique: boolean;
}

const BlogsPage: React.FC<BlogsPageProps> = ({ unique }) => {
  const [posts, setPosts] = useState<Post[]>([]); // Posts state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found. Please login.");
        }

        // Conditional server URL based on the `unique` prop
        const serverUrl = unique
          ? `${BACKEND_URL}/api/v1/post/bulk`
          : `${BACKEND_URL}/api/v1/post/AllPosts`;

        // Make an authorized request
        const response = await axios.get(serverUrl, {
          headers: {
            Authorization: token, // Include the token in the Authorization header
          },
        });

        setPosts(response.data.posts); // Access the `posts` array in the response
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [unique]); // Re-run when the `unique` prop changes

  // Function to handle post deletion
  const handlePostDelete = (id: string) => {
    // Filter out the deleted post from the state
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-8 space-y-6 flex flex-col items-center">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorPage/>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Blogs</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <BlogCard key={post.id} post={post} onDelete={handlePostDelete} unique={unique} />
        )) // Render posts with delete functionality
      ) : (
        <p className="text-center text-gray-500">No blogs available.</p>
      )}
    </div>
  );
};

export default BlogsPage;
