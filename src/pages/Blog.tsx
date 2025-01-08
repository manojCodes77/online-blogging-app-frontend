import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../types/Post';
import Avatar from 'react-avatar';
import Loader from '../components/Loader';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

interface Author {
    name: string | null;
}

interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: Author;
    published: boolean;
    createdAt: string; // Include createdAt field
}

const Card: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>{children}</div>
);

const CardHeader: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={`border-b pb-4 ${className}`}>{children}</div>
);

const CardContent: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={className}>{children}</div>
);

const CardFooter: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={`pt-4 ${className}`}>{children}</div>
);

const Badge: React.FC<{ variant: string; children: React.ReactNode }> = ({ variant, children }) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variant === 'default' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {children}
    </span>
);

const BlogPostView: React.FC<{ post: BlogPost; onDelete: (id: string) => void; unique:boolean }> = ({ post, onDelete,unique }) => {
    const navigate=useNavigate();
    const formatTimeOrDate = (createdAt: string): string => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const differenceInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

        if (differenceInSeconds < 86400) {
            if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
            if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
            return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
        }

        // Return formatted date if older than 24 hours
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(createdDate);
    };

    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL as string;

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert("No token found, unable to delete post.");
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/api/v1/post/delete/${post.id}`, {
                headers: {
                    Authorization: token,
                },
            });
            onDelete(post.id); // Notify parent to update UI
            navigate('/blogs');
        } catch (error) {
            alert("You are not authorized to delete this post.");
        }
    };

    const authorName = post.author.name || 'Unknown Author'; // Handle null case

    return (
        <Card className="max-w-3xl mx-auto my-8">
            <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar name={authorName} size="40" round={true} />
                        <div>
                            <p className="text-sm font-medium">{authorName}</p>
                            <p className="text-xs text-gray-500">Created: {formatTimeOrDate(post.createdAt)}</p>
                        </div>
                    </div>
                    <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                    </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            </CardHeader>

            <CardContent className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap">{post.content}</div>
            </CardContent>

            <CardFooter className="text-sm text-gray-500">
                <div className="flex justify-between items-center">
                    <p>Post ID: {post.id}</p>
                    {unique &&
                        <button
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 font-semibold text-xl"
                        >
                            <MdDelete/>
                        </button>
                    }
                </div>
            </CardFooter>
        </Card>
    );
};

interface BlogProps {
    unique: boolean;
}

const Blog: React.FC<BlogProps> = ({unique}) => {
    const { id } = useParams<{ id: string }>();
    const { loading, post, deletePost } = useBlog({ id: id! });

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if (confirm) {
            await deletePost();
            alert('Post deleted successfully');
        }
    };

    if (loading)
        return (
            <div className="text-center text-gray-500 mt-8 space-y-6 flex flex-col items-center">
                <Loader />
            </div>
        );

    return post ? (
        <BlogPostView post={post} onDelete={handleDelete} unique={unique} />
    ) : (
        <div>Post not found</div>
    );
};

export default Blog;
