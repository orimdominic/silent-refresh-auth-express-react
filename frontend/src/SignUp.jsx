import { useState } from "react";
import apiClient from "./api-client";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data} = await apiClient.post("/signup", {email, password});
      e.target.reset();
      setFeedback(data);
    } catch (error) {
      console.log(error)
      setFeedback(error.message ?? error.response.data);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Sign up</button>{" "}
        <span>{feedback}</span>
      </form>
    </>
  );
};

export default SignUp;
