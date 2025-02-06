
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
    gameId: string;
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
    gameUpdateDate: string;
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

interface PlayerResponse {
    id: string;
    gameId: string;
    playernName: string;
    connected: boolean;
    score: number;
    createDate: string;
}

interface HostGameForPlayerResponse {
    gameId: string;
    createDate: string;
    attendees: number;
    completed: boolean;
    currentQuestionId: string;
    gameName: string;
    paused: boolean;
    startDate: string;
}

interface PlayerFinalResultResponse {
    playerId: string;
    score: number;
    position: number;
    attendees: number;
}

interface SetScoreResponse {
    playerId: string;
    score: number;
}

interface QuestionImageResponse {
    id: string;
    author: string;
    authorLink: string;
    answers: string[];
    questionOrder: number;
    img: string;
    text: string;    
}

interface PlayerListResponse {
    id: string;
    gameId: string;
    playerName: string;
    connected: boolean;
    score: number;
}

interface PlayerScoreResponse {
    playerId: string;
    playerName: string;
    score: number;
}

interface DailyHighScoreResponse {
    playerName: string;
    score: number;
}


interface PlayerQuestionScoreResponse {
    playerId: string;
    playerName: string;
    questionId: string;
    score: number;  
}

export type { GraphQLResponse, LoginResponse, LogoutResponse, ListGamesResponse, CreateGameResponse, Game, HostGame, Question, PlayerResponse, HostGameForPlayerResponse, PlayerFinalResultResponse, SetScoreResponse, QuestionImageResponse, PlayerListResponse, PlayerScoreResponse, PlayerQuestionScoreResponse, DailyHighScoreResponse };