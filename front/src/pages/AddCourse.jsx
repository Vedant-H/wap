import { useState } from 'react';
import axios from 'axios';
/**
 * 





 */
const AddCourse = () => {
  const [data, setData] = useState({ title: '', description: '', category: '' });
  const [video, setVideo] = useState(null);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleVideo = (e) => setVideo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video);
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const res = await axios.post('http://localhost:3000/api/courses/add', formData);
    alert('Course uploaded!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} placeholder="Title" />
      <input name="category" onChange={handleChange} placeholder="Category" />
      <textarea name="description" onChange={handleChange} placeholder="Description" />
      <input type="file" accept="video/*" onChange={handleVideo} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default AddCourse;
