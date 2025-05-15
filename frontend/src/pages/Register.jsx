import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../axiosConfig";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useToast } from "../context/toastContext";
import { registerSchema } from "../validation/user";

const Register = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/api/auth/register", data);
      // alert("Registration successful. Please log in.");
      // Show success toast
      addToast({
        title: "Success",
        description: "Registration successful. Please log in.",
        variant: "success",
        duration: 3000,
      });
      navigate("/login");
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        // setError(error.response.data?.error);
        console.log(error);
        addToast({
          title: "Error",
          description: error.response.data?.message || "An error occurred.",
          variant: "error",
          duration: 3000,
        });
        return;
      }

      addToast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "error",
        duration: 3000,
      });
      // alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center px-4">
      {/* Gahokef Logo */}
      <div className="mb-6 text-3xl font-bold">Gahokef</div>
      {/* Login Form */}
      <div className="w-[384px] max-w-sm lg:max-w-xl space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-left space-y-2">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-gray-500">Join us and explore more</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            )}
          </div>
          {/* Email */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            )}
          </div>

          {/* Log in button*/}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Creat Account →
          </Button>

          {/* Sign up button */}
          <p className="mt-4 text-sm text-gray-500">
            Don’t have an account?
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
    // <div className="max-w-md mx-auto mt-20">
    //   <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded flex flex-col space-y-4">
    //     <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
    //     <div>
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         value={formData.name}
    //         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //         aria-errormessage='Name error'
    //         className="w-full p-2 border rounded"
    //       />
    //       <FieldError error={error?.["name"]?._errors} />
    //     </div>

    //     <div>
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         value={formData.email}
    //         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //         aria-errormessage='Email error'
    //         className="w-full p-2 border rounded"
    //       />
    //       <FieldError error={error?.["email"]?._errors} />
    //     </div>

    //     <div>
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    //         aria-errormessage='Password error'
    //         className="w-full p-2 border rounded"
    //       />
    //       <FieldError error={error?.["password"]?._errors} />
    //     </div>

    //     <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
    //       Register
    //     </button>
    //   </form>
    // </div>
  );
};

export default Register;
