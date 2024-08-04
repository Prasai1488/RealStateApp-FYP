import { useState } from "react";
import "./ForgotPassword.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await apiRequest.post("/reset/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="forgotPassword">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          {message && <span>{message}</span>}
          {error && <span>{error}</span>}
          <Link to="/login">Back to login</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="https://skillsewa.com/storage/1376/o.jpg" alt="" />
      </div>
    </div>
  );
}

export default ForgotPassword;
