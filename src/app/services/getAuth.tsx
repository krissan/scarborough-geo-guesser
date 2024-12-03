// Define types for the response data
interface LoginResponse {
  userId: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiration: string;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

// Create the getAuth function
export const getAuth = async (email: string, password: string): Promise<LoginResponse> => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  console.log(url)
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