
interface GraphQLResponse<T> {
    data: T;
    errors?: { message: string }[];
}

interface LoginResponse {
    userId: string;
    token: string;
    accessToken: string;
    refreshToken: string;
    tokenExpiration: string;
}

interface LogoutResponse {
    success: boolean;
}


interface Game {
    id: string;
    gameName: string;
    attendees: number;
    updateDate: string;
    questions: Question[];
}
 
interface HostGame {
    gameId: string;
    createDate: string;
    attendees: number;
    completed: boolean;
    currentQuestionId: string;
    gameName: string;
    paused: boolean;
    startDate: string;
    questions: Question[];
}

interface ListGamesResponse {
    games: {
      id: string;
      gameName: string;
      attendees: number;
      updateDate: string;
    }[];
}

interface CreateGameResponse {
    id: string;
    gameName: string;
    attendees: number;
    updateDate: string;
    questions: Question[];
}

interface Question {
    id: string;
    gameId: string;
    author: string;
    authorLink?: string;
    answer: string;
    throwOffAnswer1: string;
    throwOffAnswer2: string;
    throwOffAnswer3: string;
    questionOrder: number;
    img?: string;
    text: string;
    updateDate: string;
}


export type { GraphQLResponse, LoginResponse, LogoutResponse, ListGamesResponse, CreateGameResponse, Game, HostGame, Question };