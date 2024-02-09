import { useState } from "react";
import apiClient from "./api-client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await apiClient.post("/signin", JSON.stringify(email, password));
      e.target.reset();
      setFeedback("success");
    } catch (error) {
      console.error(error);
      setFeedback("error");
    }
  };

  return (
    <>
      <h2>Sign In</h2>
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
        <button>Sign in</button>
        <span color={feedback == "error" ? "red" : "green"}>{feedback}</span>
      </form>
    </>
  );
};

export default SignIn;
