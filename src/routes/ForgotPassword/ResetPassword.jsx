import { useState } from "react";
import "./ResetPassword.scss";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await apiRequest.post(`/reset/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="resetPassword">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
