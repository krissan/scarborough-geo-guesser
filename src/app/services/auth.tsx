"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginResponse,LogoutResponse, GraphQLResponse } from "./responseInterfaces";

const url = process.env.NEXT_PUBLIC_SERVER_URL + "/graphql" || "http://localhost:4000/graphql";

// Create the getAuth function
const getAuth = async (email: string, password: string): Promise<LoginResponse> => {
  const query = `
    mutation {
      login(email: "${email}", password: "${password}") {
        userId
        token
        accessToken
        refreshToken
        tokenExpiration
      }
    }
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<{ login: LoginResponse }> = await response.json();

    if (result.errors) {
      throw new Error(result.errors.map(err => err.message).join(", "));
    }

    return result.data.login;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

// Admin logout from server
const logout = async () => {
  const query = `
    mutation {
    logout
    }
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({ query }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<{ logout: LogoutResponse }> = await response.json();

    if(result.data.logout.success)
    {
      console.log("User logged out");
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

const checkAuth = async (router:AppRouterInstance) => {
  const tokenExpiration = sessionStorage.getItem("tokenExpiration");
  console.log(tokenExpiration);
  if (tokenExpiration) {
    const expirationTime = new Date(tokenExpiration).getTime();
    const currentTime = new Date().getTime();
    if (currentTime >= expirationTime) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("tokenExpiration");
      router.push('/login'); // Redirect to login if token has expired
    }
  } 
  /*
    const query = `
      query {
        checkAuth
      }
    `;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: GraphQLResponse<{ checkAuth: boolean }> = await response.json();

      return result.data.checkAuth;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  */
}


export { getAuth, logout, checkAuth };