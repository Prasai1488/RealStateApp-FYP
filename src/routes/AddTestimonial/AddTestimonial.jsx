import React, { useState, useContext } from 'react';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './addTestimonial.scss';

const AddTestimonial = () => {
  const { currentUser } = useContext(AuthContext);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiRequest.post('/testimonials/post-testimonials', {
        rating,
        comment,
        userId: currentUser.id,
      });

      navigate('/testimonials');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="add-testimonial">
      <h1>Add Testimonial</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= rating ? "on" : "off"}
                  onClick={() => handleRating(index)}
                >
                  <FaStar className="star" />
                </button>
              );
            })}
          </div>
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTestimonial;

