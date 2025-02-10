import { Image } from "sanity";

export interface Answer extends SanityBody {
    _type: "answer";
    _id: string,
    text: string,
}

export interface Photo extends SanityBody {
    _type: "photo";
    author: string;
    authorLink: string;
    answer: [AnswerItem];
    throwOffAnswer: string;
    img: Image;
}

interface AnswerItem {
    id: string;
    text: string;
}