import { Photo } from "../../../typing";
import { ImageQuestion } from "../components/GameQuestion";
import { Option } from "../components/Answers";

const url = process.env.NEXT_PUBLIC_BASE_URL;

// helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// get photo questions and construct multiple choice questions
export const fetchPhotos = async () => {
    try{
      // grab photo questions
      const response = await fetch(url+'/api/photos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
      const responseText = await response.text();
      const photos:Photo[] = JSON.parse(responseText);

      // grab multiple choice options
      const answers:string[] = await fetchAnswers();

      if (!answers || answers.length === 0) {
        throw new Error(`Could not process photos into questions due to there being no answers`);
      }

      // generate multiple choice questions from photos and answers  
      const imageQuestions:ImageQuestion[] = photos.map(photo=> {
        const options: Option[] = [];
        const uniqueOptionsSet = new Set<string>(); // Use a set to avoid duplicates
        
        uniqueOptionsSet.add(photo.answer);
        options.push({ option: photo.answer, selected: false });

        if (photo.throwOffAnswer) {
            uniqueOptionsSet.add(photo.throwOffAnswer);
            options.push({ option: photo.throwOffAnswer, selected: false });
        }

        // add answers randomly until there are 4 multiple choice options
        while (options.length < 4) {
            const randomIndex = Math.floor(Math.random() * answers.length);
            const randomAnswer = answers[randomIndex];
    
            if (!uniqueOptionsSet.has(randomAnswer)) {
              uniqueOptionsSet.add(randomAnswer);
              options.push({ option: randomAnswer, selected: false });
            }
        }
    
        // randomize order of multiple choice options
        const shuffledOptions = shuffleArray(options);
        const answerIndex = shuffledOptions.findIndex(opt => opt.option === photo.answer);

        // convert photo image data to url
        const photoImg = getSanityImageUrl(photo.img.asset!._ref);


        const imageQuestion:ImageQuestion = {
            image: photoImg,
            author: photo.author,
            authorLink: photo.authorLink,
            answer: answerIndex,
            options: shuffledOptions,
            finished: false,
        }

        return imageQuestion;
      });
    
      // shuffle image questions
      const shuffleImageQuestion = shuffleArray(imageQuestions);
        
      return shuffleImageQuestion;
    } catch (err) {
      console.error("Fetch Error:", err);
      return [];
    }
};

// Construct the Sanity image URL from the asset reference.
const getSanityImageUrl = (imageRef: string) => {
  const imageUrl = imageRef.slice(6,-4);
  const imageType = imageRef.slice(-3);

  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${imageUrl}.${imageType}`;
}

//grab multiple choice options
export const fetchAnswers = async () => {
  try {
    const response = await fetch(url + '/api/answers', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const responseText = await response.text();
    const answers = JSON.parse(responseText);

    if (!answers[0].answer) {
      throw new Error('Failed to fetch: answers response');
    }
    return answers[0].answer;
  } catch (err) {
    console.error("Fetch Error:", err);
    return [];
  }
};