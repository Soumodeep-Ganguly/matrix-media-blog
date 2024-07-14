import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../slices/blogSlice';

const BlogList = () => {
    const [selectedBlog, setSelectedBlog] = useState(null)
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const user = useSelector((state) => state.auth.user);

    const handleDelete = (id) => {
        dispatch(deleteBlog(id));
    };

    if(!selectedBlog) return (
        <div className="p-4">
            {blogs.map((blog) => (
                <div key={blog._id} className="mb-4 p-4 border rounded shadow-sm">
                    <h2 className="text-xl font-bold cursor-pointer" onClick={() => setSelectedBlog(blog)}>{blog.title}</h2>
                    <p>{blog.content.substring(0, 100)}...</p>
                    {user && blog.author === user.userId && (
                        <button
                            onClick={() => handleDelete(blog._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    return <div className="p-4">
        <div className='flex'>
            <button
                onClick={() => setSelectedBlog(null)}
                className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
            >
                Back
            </button>
            <div className='ml-auto'>
                Author: {selectedBlog.author?.name}
            </div>
        </div>
        <div key={selectedBlog._id} className="mb-4 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-bold">
                {selectedBlog.title}
            </h2>
            <p>{selectedBlog.content}</p>
            {user && selectedBlog.author === user.userId && (
                <button
                    onClick={() => handleDelete(selectedBlog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                    Delete
                </button>
            )}
        </div>
    </div>
};

export default BlogList;
