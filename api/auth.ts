import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/api/v1/user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response.data;
};
