import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../slices/blogSlice';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBlog({ title, content }));
        setTitle('');
        setContent('');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
