"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginResponse,LogoutResponse, GraphQLResponse } from "./responseInterfaces";

const url = process.env.NEXT_PUBLIC_SERVER_URL + "/graphql" || "http://localhost:4000/graphql";

// Create the getAuth function
const getAuth = async (email: string, password: string) => {
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

    const { userId, token, accessToken, refreshToken, tokenExpiration } = result.data.login;

    //store access token and token and set token expiration        
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("tokenExpiration", tokenExpiration);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("userId", userId);

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

  if (tokenExpiration) {
    const expirationTime = new Date(tokenExpiration);
    const currentTime = new Date();
    if (currentTime >= expirationTime) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("tokenExpiration");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId");
      router.push('/login'); // Redirect to login if token has expired
    }
    else
    {
      // Refresh token
      refreshAuth();
    }
  } else {
    router.push('/login'); // Redirect to login if no token
  }
}

const refreshAuth = async () => {
  const query = `
    mutation {
      refreshToken {
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
        "Authorization": "Bearer " + sessionStorage.getItem("refreshToken"),
      },  
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<{ refreshToken: LoginResponse }> = await response.json();

    if(result.data.refreshToken)
    {
      const { refreshToken, accessToken, token, tokenExpiration, userId } = result.data.refreshToken;
     
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("tokenExpiration", tokenExpiration);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("userId", userId);
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}


export { getAuth, logout, checkAuth };