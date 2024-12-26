"use client";

import { Game, GraphQLResponse, ListGamesResponse, Question, CreateGameResponse, HostGame } from "./responseInterfaces";

const url = process.env.NEXT_PUBLIC_SERVER_URL + "/graphql" || "http://localhost:4000/graphql";

const getAuthHeader = () => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      return token ? `Bearer ${token}` : "";
    }
    return ""; // No token for server-side rendering
  };

// Fetch the list of games
const fetchGames = async() => {
    const query = `
    query {
        listGames {
            id
            gameName
            attendees
            updateDate
        }
    }
    `;
    console.log(query)
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader()
        },
        body: JSON.stringify({ query }),
        });

        console.log(response)

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ listGames: ListGamesResponse }> = await response.json();
        // Validate array is returned
        if (!Array.isArray(result.data?.listGames)) {
            throw new Error("Invalid response from server");
        }

        return result.data?.listGames;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
};

// Create a new game
const createGame = async (gameName: string, questions: Question[]) => {
    const query = `
        mutation CreateGame($gameName: String!, $questions: [QuestionInput!]!) {
        createGame(gameName: $gameName, questions: $questions) {
            id
            gameName
            attendees
            updateDate
            questions {
                id
                gameId
                author
                authorLink
                answer
                throwOffAnswer1
                throwOffAnswer2
                throwOffAnswer3
                questionOrder
                img
                text
                updateDate
            }
        }
    }
    `;

    const variables = {
        gameName,
        questions,
    };

    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader()

        },
        body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ createGame: CreateGameResponse }> = await response.json();

        if (result.data?.createGame) {
            console.log("Game created successfully:", result.data.createGame);
        }

        return result.data?.createGame;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
};
  
  // Fetch a single game by ID
const fetchGame = async (gameId: string) => {
    const query = `
        query GetGame($gameId: String!) {
            getGame(id: $gameId) {
            id
            gameName
            attendees
            updateDate
            questions {
                id
                gameId
                author
                authorLink
                answer
                throwOffAnswer1
                throwOffAnswer2
                throwOffAnswer3
                questionOrder
                img
                text
                updateDate
            }
        }
    }`;

    const variables = {
        gameId,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ getGame: Game }> = await response.json();

        if (result.data?.getGame) {
            console.log("Game fetched successfully:", result.data.getGame);
        }

        return result.data?.getGame;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
};
  
// Delete a game by ID
const deleteGame = async (gameId: string, date: string) => {
    const query = `
        mutation DeleteGame {
            deleteGame(id: "${gameId}", date: "${date}") {
        }
    `;

    const variables = {
        gameId,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ deleteGame: Game }> = await response.json();

        if (result.data?.deleteGame) {
            console.log("Game deleted successfully:", result.data.deleteGame);
        }

        return true;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
    return false;
};

const setHostGame = async (gameId: string, createDate: string) => {
    const query = `
        mutation SetHostGame {
            setHostGame(id: "${gameId}", date: "${createDate}") {
                gameId
                createDate
                attendees
                completed
                currentQuestionId
                gameName
                paused
                startDate
                questions {
                    gameId
                    id
                    author
                    authorLink
                    answer
                    throwOffAnswer1
                    throwOffAnswer2
                    throwOffAnswer3
                    questionOrder
                    img
                    text
                    updateDate
                }
            }
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ setHostGame: Game }> = await response.json();

        if(result.errors) {
            throw new Error(result.errors.map(err => err.message).join(", "));
        }
        console.log(result);
        console.log("Host game set successfully:", result.data?.setHostGame);
    } catch (err) {
        console.error("Fetch Error:", err);
        throw "Failed to set host game. Please try again later.";
    }
};

const getHostGame = async () => {
    const query = `
        query GetHostGame {
            getHostGame {
                gameId
                createDate
                attendees
                completed
                currentQuestionId
                gameName
                paused
                startDate
                questions {
                    gameId
                    id
                    author
                    authorLink
                    answer
                    throwOffAnswer1
                    throwOffAnswer2
                    throwOffAnswer3
                    questionOrder
                    img
                    text
                    updateDate
                }
            }
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ getHostGame: HostGame }> = await response.json();
        console.log("Host game retrieved successfully:", result.data?.getHostGame);
        if (!result.data?.getHostGame) {
            console.log("No host game found");
        }
        return result.data?.getHostGame;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
};

const removeHostGame = async () => {
    const query = `
        mutation RemoveHostGame {
            removeHostGame
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ removeHostGame: Game }> = await response.json();
        console.log("Host game removed successfully:", result.data);
        if (!result.data?.removeHostGame) {
            console.log("No host game found");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
};

const updateCurrentQuestion = async (questionId: string, gameId: string, createDate: string) => {
    const query = `
        mutation UpdateCurrentQuestion {
            updateCurrentQuestion(gameId: "${gameId}", questionId: "${questionId}", createDate: "${createDate}") {
                gameId
                createDate
                attendees
                completed
                currentQuestionId
                gameName
                paused
                startDate
                questions {
                    gameId
                    id
                    author
                    authorLink
                    answer
                    throwOffAnswer1
                    throwOffAnswer2
                    throwOffAnswer3
                    questionOrder
                    img
                    text
                    updateDate
                }
            }
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ updateCurrentQuestion: Question }> = await response.json();
        console.log("Current question updated successfully:", result.data?.updateCurrentQuestion);
        if (!result.data?.updateCurrentQuestion) {
            console.log("No current question found");
        }
        return result.data?.updateCurrentQuestion;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const startHostGame = async (gameId:string, createDate:string) => {
    const query = `
        mutation StartHostGame {
            startHostGame(id: "${gameId}", date: "${createDate}") {
            gameId
            createDate
            attendees
            completed
            currentQuestionId
            gameName
            paused
            startDate
            questions {
                gameId
                id
                author
                authorLink
                answer
                throwOffAnswer1
                throwOffAnswer2
                throwOffAnswer3
                questionOrder
                img
                text
                updateDate
            }
        }
    }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ startHostGame: Game }> = await response.json();
        console.log("Host game started successfully:", result.data);
        if (!result.data?.startHostGame) {
            console.log("No host game found");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const completeHostGame = async (gameId: string, createDate: string) => {
    const query = `
        mutation SetCompleted {
            setCompleted(id: "${gameId}", date: "${createDate}")
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ setCompleted: boolean }> = await response.json();
        if (!result.data?.setCompleted) {
            console.log("No host game found");
            throw new Error("No host game found");
        }
        console.log("Host game completed successfully:", result.data);
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const restartHostGame = async (gameId: string, createDate: string) => {
    const query = `
        mutation RestartHostGame {
            restartHostGame(id: "${gameId}", date: "${createDate}")
            {
            gameId
            createDate
            attendees
            completed
            currentQuestionId
            gameName
            paused
            startDate
            questions {
            gameId
            id
            author
                    authorLink
                    answer
                    throwOffAnswer1
                    throwOffAnswer2
                    throwOffAnswer3
                    questionOrder
                    img
                    text
                    updateDate
            }
        }
    }

    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ restartHostGame: Game }> = await response.json();
        console.log("Host game restarted successfully:", result.data);
        if (!result.data?.restartHostGame) {
            console.log("No host game found");
        }
        return true;
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

//implement server side
const pauseHostGame = async (gameId: string, createDate: string) => {
    const query = `
        mutation PauseHostGame {
            pauseHostGame(id: "${gameId}", date: "${createDate}")
            {
                gameId
                createDate
                attendees
                completed
                currentQuestionId
                gameName
                paused
                startDate
                questions {
                    gameId
                    id
                    author
                    authorLink
                    answer
                    throwOffAnswer1
                    throwOffAnswer2
                    throwOffAnswer3
                    questionOrder
                    img
                    text
                    updateDate
                }
            }
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ pauseHostGame: Game }> = await response.json();
        console.log("Host game paused successfully:", result.data);
        if (!result.data?.pauseHostGame) {
            console.log("No host game found");
        }
        return true;
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
};

const unpauseHostGame = async (gameId: string, createDate: string) => {
    const query = `
        mutation UnpauseHostGame {
            unpauseHostGame(id: "${gameId}", date: "${createDate}")
            {
                gameId
                createDate
                attendees
                completed
                currentQuestionId
                gameName
                paused
                startDate
                questions {
                    gameId
                    id
                    author
                    authorLink
                    answer
                    throwOffAnswer1
                    throwOffAnswer2
                    throwOffAnswer3
                    questionOrder
                    img
                    text
                    updateDate
                }
            }
        }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthHeader()
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ unPauseHostGame: Game }> = await response.json();
        console.log("Host game unpaused successfully:", result.data);
        if (!result.data?.unPauseHostGame) {
            console.log("No host game found");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

export { fetchGames, createGame, fetchGame, deleteGame, setHostGame, getHostGame, removeHostGame, restartHostGame, updateCurrentQuestion, startHostGame, completeHostGame, pauseHostGame, unpauseHostGame };