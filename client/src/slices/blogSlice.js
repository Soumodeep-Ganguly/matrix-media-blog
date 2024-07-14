import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from './../components/toast'

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get('/api/blogs');
  return response.data;
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData, { getState }) => {
  const response = await axios.post('/api/blog', blogData);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { getState }) => {
  await axios.delete(`/api/blog/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        Toast.fire({ icon: 'error', title: action.error.message || "Unexpected error from server." })
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        Toast.fire({ icon: 'success', title: "Blog post created successfully." })
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        Toast.success('Blog deleted successfully.');
      });
  },
});

export default blogSlice.reducer;
