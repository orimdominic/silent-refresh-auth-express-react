import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Protected from "./Protected";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <div>
      <h1>App</h1>
      <AuthProvider>
        <SignUp />
        <SignIn />
        <Protected />
      </AuthProvider>
    </div>
  );
}

export default App;
