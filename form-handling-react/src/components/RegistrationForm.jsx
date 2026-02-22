import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("Submitted data:", formData);
    alert("User registered successfully!");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration (Controlled Form)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Username: </label>
        <input name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label>Email: </label>
        <input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password: </label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}