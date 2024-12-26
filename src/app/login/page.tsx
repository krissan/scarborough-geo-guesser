"use client";

import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import LinkButton from "../components/buttons/LinkButton";
import { getAuth } from "../services/auth";
import { useRouter } from 'next/navigation';
import AuthSubmitButton from "../components/buttons/AuthButton";
import Title from "../components/Title";

const LoginPage = () => {
  const router = useRouter();

  //navigate if session token exists
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      router.push('/gamesMenu');
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      valid = false;
      newErrors.username = "Username is required.";
    }

    if (!formData.password.trim()) {
      valid = false;
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (valid) {  
      try {
        const response = await getAuth(formData.username, formData.password);
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("tokenExpiration", response.tokenExpiration);
        router.push('/gamesMenu');

      } catch (error) {
        // Handle errors from the async operation
        console.error("Error during login:", error);
        setErrors({ username: "", password: "Invalid credentials." });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-black">
      <div className="flex-grow flex flex-col justify-center p-5 w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Title>Admin Login</Title>

          <TextInput
            label="Username"
            name="username"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            errormessage={errors.username}
            placeholder="username"
          />

          <TextInput
            label="Password"
            name="password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            errormessage={errors.password}
            placeholder="password"
          />

          <div className="mt-6">
            <AuthSubmitButton type="submit" text="LOGIN" />
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="h-auto py-2 flex justify-around bg-gray-100">
        <LinkButton link="https://krissan-portfolio-site-krissans-projects.vercel.app/">
          A project by Krissan Veerasingam
        </LinkButton>
        <LinkButton link="https://www.scarboroughspots.com/">
          Inspired by Scarborough Spots
        </LinkButton>
      </div>
    </div>
  );
};

export default LoginPage;
