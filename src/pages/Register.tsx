import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../libs/fetcher";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other",
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
    gender: GenderEnum;
}
const baseUrl = "http://localhost:3000";

export default function Register() {
    const registerUser = useMutation({
        mutationFn: (userData: RegisterInput) => {
            return axios.post(`${baseUrl}/auth/register`, userData);
        },
    });
    const { register, handleSubmit } = useForm<RegisterInput>();
    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        console.log(data);
        await registerUser.mutateAsync(data);
        //   try {
        //       const response = await registerUser.mutateAsync(data);
        //       if (response.status === 201) {
        //           return response;
        //       }
        //   } catch (err) {
        //       console.log(err);
        //   }
    };

    return (
        <div className="grid place-items-center w-full h-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[500px] h-[500px] shadow-md shadow-slate-600 grid place-items-center"
            >
                <div>
                    <label>Username</label>
                    <input
                        {...register("username", {
                            required: true,
                            maxLength: 20,
                        })}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input {...register("email", { required: true, min: 6 })} />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        {...register("password", { required: true, min: 6 })}
                    />
                </div>

                <input type="submit" />
            </form>
        </div>
    );
}
