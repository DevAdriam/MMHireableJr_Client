import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RegisterInput } from "../pages/Register";

const baseUrl = "http://localhost:3000/";
export const registerUser = useMutation({
    mutationFn: (userData: RegisterInput) => {
        return axios.post(`${baseUrl}/auth/register`, userData);
    },
});
