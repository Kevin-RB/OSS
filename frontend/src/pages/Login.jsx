import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosConfig";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axiosInstance.post("/api/auth/login", formData);
      login(response.data);
      navigate("/product");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center px-4">
      {/* Gahokef Logo */}
      <div className="mb-6 text-3xl font-bold">Gahokef</div>

      {/* Login Form */}
      <div className="w-[384px] max-w-sm lg:max-w-xl space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-left space-y-2">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-gray-500">
            Enter your details below to login
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Log in button*/}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Login
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
  );
};

export default Login;
