import { Image } from "sanity";

export interface Answer extends SanityBody {
    _type: "answer";
    answers: string[];
}

export interface Photo extends SanityBody {
    _type: "photo";
    author: string;
    authorLink: string;
    answer: string;
    throwOffAnswer: string;
    img: Image;
}
