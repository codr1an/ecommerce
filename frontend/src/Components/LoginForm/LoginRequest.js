import axios from "axios";
import { message } from "react-message-popup";

const LoginRequest = async (formData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/users/login", {
      username: formData.username,
      password: formData.password,
    });

    if (response.status === 200) {
      message.success("Successfully logged in", 1500);
      return response.data.jwt;
    } else {
      message.error("Username or Password are wrong", 1500);
    }
  } catch (error) {
    message.error("Username or Password are wrong", 1500);
  }
};

export default LoginRequest;
