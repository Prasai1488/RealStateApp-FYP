import React, { useEffect, useState, useContext } from 'react';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import './testimonials.scss';

const Testimonials = () => {
  const { currentUser } = useContext(AuthContext);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await apiRequest.get('/testimonials/get-testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (testimonialId) => {
    try {
      await apiRequest.delete(`/testimonials/delete-testimonials/${testimonialId}`);
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== testimonialId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="testimonials">
      <h1>Testimonials</h1>
      {currentUser && (
        <Link to="/add-testimonial" className="add-review">
          Add Review
        </Link>
      )}
      <div className="testimonial-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item">
            <div className="testimonial-header">
              <p><strong>Rating:</strong></p>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <FaStar
                      key={index}
                      className={index <= testimonial.rating ? "on" : "off"}
                    />
                  );
                })}
              </div>
            </div>
            <p><strong>Comment:</strong> {testimonial.comment}</p>
            <p><strong>From:</strong> {testimonial.user.username}</p>
            <p><strong>Created at:</strong> {new Date(testimonial.createdAt).toLocaleDateString()}</p>
            {currentUser && currentUser.id === testimonial.user.id && (
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleDelete(testimonial.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

