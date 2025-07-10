import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/courses').then((res) => setCourses(res.data));
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Course List</h2>
      <div className="space-y-4">
        {courses.map((c, i) => (
          <div key={c._id} className="border rounded-lg shadow-sm">
            <button
              className="w-full px-4 py-2 text-left font-medium bg-gray-100 hover:bg-gray-200"
              onClick={() => toggle(i)}
            >
              📘 Course {i + 1}: {c.title}
            </button>

            {openIndex === i && (
              <div className="p-4 bg-white">
                <p className="mb-2 text-gray-700">{c.description}</p>
                <video width="100%" controls className="rounded shadow">
                  <source
                    src={`http://localhost:3000/api/courses/video/${c.videoFilename}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
