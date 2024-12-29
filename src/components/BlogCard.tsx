import React from "react";
import { Post } from "../types/Post";
import Avatar from "react-avatar"; // Import the Avatar component
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";

// Utility function to calculate time elapsed
const timeElapsed = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const differenceInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
  if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
  if (differenceInSeconds < 86400) return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
  return `${Math.floor(differenceInSeconds / 86400)} days ago`;
};

interface BlogCardProps {
  post: Post;
  onDelete: (id: string) => void; // Callback to notify the parent component about deletion
  unique: boolean; // Flag to show delete button
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onDelete, unique }) => {
  const authorName = post.author.name || "Unknown Author";
  const avatarSize = "40"; // Size of the avatar as a string

  // Get the first letter of the author's name
  const authorInitials = authorName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  const navigate = useNavigate(); // To navigate to the post's detail page
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found, unable to delete post.");
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/post/delete/${post.id}`, {
        headers: {
          Authorization: token, // Send JWT token for authorization
        },
      });

      // After successful deletion, call onDelete to remove the post from UI
      onDelete(post.id);

      // Optionally, redirect after deleting
      navigate("/blogs"); // Navigate back to the blogs page
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="border p-4 mb-4 rounded-lg shadow hover:shadow-lg transition w-4/5 min-w-96">
      <div className="flex items-center justify-between">
        {/* Avatar with first initials of the author's name */}
        <div className="flex items-center">
          <Avatar name={authorInitials} size={avatarSize} round={true} className="mr-3" />
          <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        </div>

        {/* Delete button */}
        {unique && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-semibold text-xl"
          >
            <MdDelete />
          </button>
        )}
      </div>
      <p className="text-gray-600 mt-2">
        {post.content.split(" ").slice(0, 100).join(" ")}...
      </p>
      <p className="text-sm text-gray-400 mt-4">By {authorName}</p>
      <p className="text-xs text-gray-500 mt-1">Created {timeElapsed(post.createdAt)}</p>
      {unique && (
        <Link
          to={`/blog/${post.id}`}
          className="text-blue-500 hover:underline mt-2 block text-sm"
        >
          Read more
        </Link>)}
      {!unique && (
        <Link
          to={`/others-blog/${post.id}`}
          className="text-blue-500 hover:underline mt-2 block text-sm"
        >
          Read more
        </Link>
      )}
    </div>
  );
};

export default BlogCard;
