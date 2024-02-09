import { useState } from "react";
import apiClient from "./api-client";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data} = await apiClient.post("/signup", {email, password});
      e.target.reset();
      setFeedback(data);
      setIsSuccess(true)
    } catch (error) {
      setIsSuccess(false)
      setFeedback(error.response.data);
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
        <span color={isSuccess === false ? "red" : "green"}>{feedback}</span>
      </form>
    </>
  );
};

export default SignUp;
