import { DailyHighScoreResponse, GraphQLResponse, HostGameForPlayerResponse, PlayerFinalResultResponse, PlayerQuestionScoreResponse, PlayerResponse,   PlayerScoreResponse, QuestionImageResponse, SetScoreResponse } from "./responseInterfaces";

const url = process.env.NEXT_PUBLIC_SERVER_URL + "/graphql" || "http://localhost:4000/graphql";

const getPlayer = async (gameId: string, createDate: string) => {
    const query = `
        query GetPlayer {
            getPlayer(gameId: "${gameId}", createDate: "${createDate}") {
                id
                gameId
                playerName
                connected
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

        const result: GraphQLResponse<{ getPlayer: PlayerResponse }> = await response.json();
        if (!result.data?.getPlayer) {
            console.log("No player found");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const getPlayers = async () => {
    const query = `
        query GetPlayers {
            getPlayers {
                id
                gameId
                playerName
                connected
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

        const result: GraphQLResponse<{ getPlayers: PlayerResponse[] }> = await response.json();
        if (!result.data?.getPlayers) {
            console.log("No players list found");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const getPlayerCount = async (gameId: string, createDate: string) => {
    const query = `
        query GetPlayerCount {
            getPlayerCount(gameId: "${gameId}", createDate: "${createDate}")
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

        const result: GraphQLResponse<{ getPlayerCount: number }> = await response.json();
        if (!result.data?.getPlayerCount) {
            console.log("No player count found");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const  removePlayer = async (gameId: string, playerId: string) => {
    const query = `
        mutation RemovePlayer {
            removePlayer(gameId: "${gameId}", playerId: "${playerId}")
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GraphQLResponse<{ removePlayer: boolean }> = await response.json();
        if (!result.data?.removePlayer) {
            console.log("Player not removed");
        }
        return true
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const setPlayer = async (playerName: string, gameId: string) => {
    const query = `
        mutation SetPlayer {
            setPlayer(playerName: "${playerName}", gameId: "${gameId}" ) {
                id
                gameId
                playerName
                connected
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

        const result: GraphQLResponse<{ setPlayer: PlayerResponse }> = await response.json();
        if (!result.data?.setPlayer) {
            console.log("Player not set");
        }
        return result.data?.setPlayer;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const checkQuestionAnswered = async (questionId: string, playerId: string) => {
    const query = `
        query CheckQuestionAnswered {
            checkQuestionAnswered(questionId: "${questionId}", playerId: "${playerId}")
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

        const result: GraphQLResponse<{ checkQuestionAnswered: boolean }> = await response.json();
        if (!result.data?.checkQuestionAnswered) {
            console.log("Question not answered");
        }
        return result.data?.checkQuestionAnswered;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const getHostGameForPlayer = async () => {
    const query = `
        query GetHostGameForPlayer {
            getHostGameForPlayer {
                gameId
                createDate
                attendees
                completed
                currentQuestionId
                gameName
                paused
                startDate
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

        const result: GraphQLResponse<{ getHostGameForPlayer: HostGameForPlayerResponse }> = await response.json();
        if (!result.data?.getHostGameForPlayer) {
            console.log("No host game found");
        }
        return result.data?.getHostGameForPlayer;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}    

const getPlayerFinalResult = async (playerId: string) => {
    const query = `
        query GetPlayerResult {
            getPlayerResult(playerId: "${playerId}") {
                playerId
                score
                position
                attendees
            }
        }`;


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

        const result: GraphQLResponse<{ getPlayerResult: PlayerFinalResultResponse}> = await response.json();
        if (!result.data?.getPlayerResult) {
            console.log("No player final result found");
        }
        return result.data?.getPlayerResult;
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const getCurrentQuestionOptions = async (gameId: string, questionId: string) => {
    const query = `
        query GetCurrentQuestionOptions {
            getCurrentQuestionOptions(gameId: "${gameId}", questionId: "${questionId}")
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

        const result: GraphQLResponse<{ getCurrentQuestionOptions: string[] }> = await response.json();
        if (!result.data?.getCurrentQuestionOptions) {
            console.log("No current question options found");
        }
        return result.data?.getCurrentQuestionOptions;
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const setScore = async (
    playerId: string,
    gameId: string,
    questionId: string,
    answer: string
): Promise<SetScoreResponse | null> => {
    const query = `mutation SetPlayerScore {
        setScore(
            playerId: "${playerId}",
            gameId: "${gameId}",
            questionId: "${questionId}",
            answer: "${answer}"
        ) {
            playerId
            score
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

        const result: GraphQLResponse<{ setScore:SetScoreResponse}> = await response.json();
        if (!result.data?.setScore) {
            console.log("Score not set");
        }
        return result.data?.setScore;
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return null;
};

const getCurrentQuestionImage = async (gameId: string, createDate: string) => {
    const query = `
        query GetCurrentQuestionImage {
            getCurrentQuestionImage(gameId: "${gameId}", createDate: "${createDate}"){
                id
                author
                authorLink
                answers
                questionOrder
                img
                text  
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

        const result: GraphQLResponse<{ getCurrentQuestionImage: QuestionImageResponse }> = await response.json();
        if (!result.data?.getCurrentQuestionImage) {
            console.log("No current question image found");
        }
        return result.data?.getCurrentQuestionImage;
    } catch (err) {
        console.error("Fetch Error:", err);
    }

    return false;
}

const checkPlayerExists = async (playerId: string, gameId: string) => {
    const query=`
        query CheckPlayerExists {
            checkPlayerExists(playerId: "${playerId}", gameId: "${gameId}")
        }
    `;

    try{
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

        const result: GraphQLResponse<{ checkPlayerExists: boolean }> = await response.json();
        if (!result.data?.checkPlayerExists) {
            console.log("Player does not exist");
        }
        return result.data?.checkPlayerExists;
    }
    catch(err){
        console.error("Fetch Error:", err);
    }
}

const getPlayerScores = async (gameId: string) => {
    const query = `
        query GetPlayerScores {
            getPlayerScores(gameId: "${gameId}") {
                playerId
                playerName
                score
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

        const result: GraphQLResponse<{ getPlayerScores: PlayerScoreResponse[] }> = await response.json();
        if (!result.data?.getPlayerScores) {
            console.log("No player scores found");
        }
        return result.data?.getPlayerScores;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const getPlayerQuestionScores = async (gameId: string, questionId: string) => {
    const query = `
        query GetPlayerScoresByQuestion {
            getPlayerScoresByQuestion(questionId: "${questionId}", gameId: "${gameId}") {
                playerId
                playerName
                questionId
                score
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

        const result: GraphQLResponse<{ getPlayerQuestionScores: PlayerQuestionScoreResponse[] }> = await response.json();
        if (!result.data?.getPlayerQuestionScores) {
            console.log("No player question scores found");
        }
        return result.data?.getPlayerQuestionScores;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const getDailyHighScores = async () => {
    const query = `
        query GetDailyHighScores {
            getDailyHighScores {
                playerName
                score
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

        const result: GraphQLResponse<{ getDailyHighScore: DailyHighScoreResponse[] }> = await response.json();
        if (!result.data?.getDailyHighScore) {
            console.log("No daily high score found");
        }
        const scoreResult = result.data?.getDailyHighScore.map((score) => {
            const playerNumbers = score.playerName.split(" ");
            const playerName = verbs[parseInt(playerNumbers[0])] + scarborough[parseInt(playerNumbers[1])] + peopleNouns[parseInt(playerNumbers[2])];
            return {playerName: playerName, score: score.score}
        });

        return scoreResult;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const addDailyHighScore = async (nameNumberOne:number, nameNumberTwo:number, nameNumberThree:number, score:number) => {
    const query = `
        mutation AddDailyHighScore {
            addDailyHighScore(nameNumberOne: "${nameNumberOne}", nameNumberTwo: "${nameNumberTwo}", nameNumberThree: "${nameNumberThree}", score: "${score}") {
                playerName
                score
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

        const result: GraphQLResponse<{ addDailyHighScore: DailyHighScoreResponse[] }> = await response.json();
        if (!result.data?.addDailyHighScore) {
            console.log("Daily high score not added");
        }
        const scoreResult = result.data?.addDailyHighScore.map((score) => {
            const playerNumbers = score.playerName.split(" ");
            const playerName = verbs[parseInt(playerNumbers[0])] + scarborough[parseInt(playerNumbers[1])] + peopleNouns[parseInt(playerNumbers[2])];
            return {playerName: playerName, score: score.score}
        });

        return scoreResult;
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

const verbs = [
    "Playing", "Jumping", "Running", "Laughing", "Sharing",  
    "Learning", "Singing", "Dancing", "Smiling", "Helping",  
    "Growing", "Dreaming", "Reading", "Swimming", "Cheering"
];
  

const scarborough = [
    "Agincourt", "Malvern", "Woburn", "Guildwood", "HighlandCreek",  
    "Westhill", "Rouge", "Morningside", "PortUnion", "Cliffcrest",  
    "Birchcliff", "Bendale", "LAmoreaux", "Dorset", "Steeles",  
    "Milliken", "Village", "Ionview", "Eglinton", "Tamoshanter",  
    "Goldenmile", "Oakridge", "Kennedy", "Birchmount", "Cedarbrae",
    "Scarborough", "Patty", "MuttonRoll", "ensaymada", "Doubles", "STC", "Wexford", "WoodSide", 
    "VictoriaPark", "Bluffs", "Brimley", "Lawrence", "Kingston", 
    "Markham", "Ellesmere", "Finch", "Sheppard", "Nugget", "Morningside", 
    "Meadowvale", "DonMontgomery", "Centennial", "Brimorton", "MeadowWay",
    "UTSC", "PanAm", "TorontoZoo", "TTC", "KennedyCommons", "GOTrain"];
  

const peopleNouns = [
    "Man", "Woman", "Boy", "Girl", "Child", "Father", "Mother",
    "Brother", "Sister", "Grandfather", "Grandmother", "Uncle",
    "Aunt", "Cousin", "Friend", "Neighbor", "Teacher", "Student",
    "Baby", "Parent"
];


export { verbs, scarborough, peopleNouns, getPlayer, getPlayers, getPlayerCount, removePlayer, setPlayer, getHostGameForPlayer, getPlayerFinalResult, checkQuestionAnswered, getCurrentQuestionOptions, setScore, getCurrentQuestionImage, checkPlayerExists, getPlayerScores, getPlayerQuestionScores, getDailyHighScores, addDailyHighScore } ;

function getAuthHeader(): string {
    throw new Error("Function not implemented.");
}

