import { useContext, useState } from "react";
import apiClient from "./api-client";
import { AuthContext } from "./AuthProvider";

const Protected = () => {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("No message");

  const handleGetMessage = async () => {
    if (!currentUser) {
      return setMessage("Please sign in");
    }

    try {
      const { data } = await apiClient.get("/protected", {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      setMessage(data);
    } catch (error) {
      setMessage(error.response.data ?? error.message);
    }
  };

  return (
    <>
      <h2>Protected</h2>
      <div>
        <p>{message}</p>
        <button onClick={handleGetMessage}>Access protected</button>
      </div>
    </>
  );
};

export default Protected;
