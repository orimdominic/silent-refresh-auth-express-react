import { useContext, useState } from "react";
import apiClient from "./api-client";
import { AuthContext } from "./AuthProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const { setCurrentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await apiClient.post("/signin", { email, password });
      e.target.reset();
      setFeedback(data.message);
      sessionStorage.setItem("accessToken", data.data.accessToken);
      setCurrentUser(data.data);
    } catch (error) {
      console.log(error);
      setFeedback(error.response.data ?? error.message);
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
        <button>Sign in</button>{" "}
        <span color={feedback == "error" ? "red" : "green"}>{feedback}</span>
      </form>
    </>
  );
};

export default SignIn;
