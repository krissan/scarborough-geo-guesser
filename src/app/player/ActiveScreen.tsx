import React, { useEffect, useState } from "react";
import AnswersSkeleton from "../components/loading/AnswersSkeleton";
import { checkQuestionAnswered, getCurrentQuestionOptions, setScore } from "../services/player";
import Title from "../components/Title";

interface ActiveScreenProps {
    currentQuestionId: string;
    playerId: string;
    gameId: string;
    toggleRefresh: boolean; //trigger refresh whenever this changes
}

const ActiveScreen: React.FC<ActiveScreenProps> = ({ gameId, currentQuestionId, playerId, toggleRefresh }) => {
    //Check if question is answered by player if not allow question to be answered
    const [answered, setAnswered] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if(currentQuestionId)
            {
                //check if player has already answered
                const answered = await checkQuestionAnswered(currentQuestionId, playerId);
                
                //if not get question options
                if(!answered)
                {
                    //get question options
                    const questionOptions = await getCurrentQuestionOptions(gameId, currentQuestionId);
                    if (Array.isArray(questionOptions)) {
                        setOptions(questionOptions);
                    }
                }
                else
                {
                    setAnswered("answered");
                }
            }
            //wait 1 second before setting loading to false
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };  
        fetchData();
    }, [currentQuestionId, toggleRefresh]);

    const handleAnswerSelection = async(value: string) => {
        setLoading(true);
        const score = await setScore(playerId, gameId, currentQuestionId, value);

        if (score) {
            setAnswered(value);
        }
        else
        {
            console.error("Error answer");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen">
            {/* Display question ?add later? */}
            {!loading ? 
                answered == "answered" ? <Title className="text-center mt-5 text-black">Hold For Next Question...</Title> :
                (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col py-6 items-center mx-auto md:grid md:grid-cols-2 md:gap-4md:justify-items-center">
                        {options.map((value, index) => (
                            <button
                            key={index}
                            disabled={value == answered}
                            onClick={() => handleAnswerSelection(value)}
                            className={`flex flex-row items-center justify-start p-2 m-2 rounded-lg border-black border-2 hover:border-4 w-48 min-h-10 text-left
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:${value == answered ? "":"shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"}
                                transition-shadow duration-200 ease-in-out
                                ${value == answered ? "bg-darkGray text-white" : ""}
                                ${value != answered ? "bg-white text-black hover:font-bold" : ""}`}
                            >
                            <div className="pl-2 pr-4">{index+1}.</div>{value}
                            </button>
                        ))}
                        </div>
                    </div>
                ) : (
                    <AnswersSkeleton/>
                )
            }
        </div>
    );
};

export default ActiveScreen;
