"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Papa from "papaparse"; 
import TextInput from "../components/formComponents/TextBox";
import InputFile from "../components/formComponents/InputFile"; 
import LinkButton from "../components/buttons/LinkButton";
import MainButton from "../components/buttons/MainButton";
import Title from "../components/Title";
import { checkAuth } from "../services/auth";
import { createGame } from "../services/admin";
import { QuestionInput } from "../services/responseInterfaces";

interface CSVRow {
  author: string;
  authorLink: string;
  answer: string;
  throwOffAnswer1: string;
  throwOffAnswer2: string;
  throwOffAnswer3: string;
  img: string;
  text: string;
}

const CreateGame = () => {
  const router = useRouter();

  const [ formData, setFormData] = useState({
    name: "",
    attendees: 0,
    items: null as QuestionInput[] | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    attendees: "",
    items: "",
  });

  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
      const authenticate = async () => {
        await checkAuth(router);
      };
      authenticate();
    }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const expectedHeaders = [
    "author",
    "authorLink",
    "answer",
    "throwOffAnswer1",
    "throwOffAnswer2",
    "throwOffAnswer3",
    "img",
    "text"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file && (file.type === "text/csv" || file.type === "application/vnd.ms-excel")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data as CSVRow[];
          const headers = result.meta.fields;
  
          // Validate headers
          if (!headers || !expectedHeaders.every((header) => headers.includes(header))) {
            setErrors({
              ...errors,
              items: "CSV file is missing required headers or has invalid headers.",
            });
            e.target.value = ""; // Clear the file input
            return; // Do not overwrite existing data
          }
  
          // Validate rows
          const invalidRow = parsedData.find((row) =>
            expectedHeaders.some((key) => !row[key as keyof CSVRow]?.trim())
          );
  
          if (invalidRow) {
            setErrors({
              ...errors,
              items: "CSV file contains rows with empty values.",
            });
            e.target.value = ""; // Clear the file input
            return; // Do not overwrite existing data
          }
  
          // Add rowNumber to each row
          const questionInput: QuestionInput[] = parsedData.map((row, index) => ({
            author: row.author,
            authorLink: row.authorLink,
            answer: row.answer,
            throwOffAnswer1: row.throwOffAnswer1,
            throwOffAnswer2: row.throwOffAnswer2,
            throwOffAnswer3: row.throwOffAnswer3,
            img: row.img,
            text: row.text,
            questionOrder: index + 1, // Start question order from 1
          }));

          // If valid, update the state
          setFormData({
            ...formData,
            items: questionInput,
          });

          setFileName(file.name);
          setErrors({
            ...errors,
            items: "",
          });
        },
        error: () => {
          setErrors({
            ...errors,
            items: "Error parsing the CSV file.",
          });
          e.target.value = ""; // Clear the file input
        },
      });
    } else {
      setErrors({
        ...errors,
        items: "Please select a valid CSV file.",
      });
      e.target.value = ""; // Clear the file input
    }
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let valid = true;
    const newErrors = { name: "", attendees: "", items: "" };
  
    if (!formData.name) {
      valid = false;
      newErrors.name = "Name is required.";
    }
  
    if (!formData.attendees || isNaN(Number(formData.attendees)) || Number(formData.attendees) < 1) {
      valid = false;
      newErrors.attendees = "Maximum Participants must be 1 or greater.";
    }
  
    if (!formData.items) {
      valid = false;
      newErrors.items = "CSV file is required and must have correct headers.";
    }
  
    setErrors(newErrors);
  
    if (valid && formData.items) {
      console.log(`Submitted Data:
        name: ${formData.name}
        attendees: ${formData.attendees}
        items: ${JSON.stringify(formData.items, null, 2)}`);
      const response = await createGame(formData.name, formData.attendees, formData.items);
      if (response) {
        alert("Game created successfully!");
        router.push("/gamesMenu");
      }
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col text-black">
      <div className="flex-grow flex flex-col justify-center p-5 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Title>
            Create Game
          </Title>
          <div className="mb-20" />
            <TextInput
              label="Name"
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              errormessage={errors.name}
              placeholder="Name"
            />

            <TextInput
              label="Number"
              name="attendees"
              id="number"
              type="number"
              value={formData.attendees}
              onChange={handleInputChange}
              errormessage={errors.attendees}
              placeholder="Max Participants"
              min={1}
            />

            <InputFile
              label="Upload CSV"
              name="csvFile"
              id="csv-upload"
              errormessage={errors.items}
              onChange={handleFileChange}
              fileName={fileName}
            />

          <MainButton type="submit"> SUBMIT </MainButton>
        </form>
        <MainButton onClick={()=>{router.back()}}>Back</MainButton>
      </div>
  
      {/* Footer */}
      <div className="h-auto py-2 flex justify-around bg-gray-100">
        <LinkButton link="https://krissan-portfolio-site-krissans-projects.vercel.app/">
          A project by Krissan Veerasingam
        </LinkButton>
        <LinkButton link="https://www.scarboroughspots.com/">
          Inspired by Scarborough Spots
        </LinkButton>
      </div>
    </div>
  );
  
  
};

export default CreateGame;
