"use client";

import React, { useState } from "react";
import Papa from "papaparse"; 
import TextInput from "./Components/TextBox";
import InputFile from "./Components/InputFile"; 
interface CSVRow {
  author: string;
  authorLink: string;
  answer: string;
  throwOffAnswer1: string;
  throwOffAnswer2: string;
  throwOffAnswer3: string;
  img: string;
}

const ManageGame = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    csvData: null as CSVRow[] | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    number: "",
    csvFile: "",
  });

  const [fileName, setFileName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "number" ? value : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && (file.type === "text/csv" || file.type === "application/vnd.ms-excel")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log("Parsed CSV Data:", result.data);

          setFormData({
            ...formData,
            csvData: result.data as CSVRow[],
          });
          setFileName(file.name);
          setErrors({
            ...errors,
            csvFile: "",
          });
        },
        error: () => {
          setErrors({
            ...errors,
            csvFile: "Error parsing the CSV file.",
          });
        },
      });
    } else {
      setErrors({
        ...errors,
        csvFile: "Please select a valid CSV file.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { name: "", number: "", csvFile: "" };

    if (!formData.name) {
      valid = false;
      newErrors.name = "Name is required.";
    }

    if (!formData.number || isNaN(Number(formData.number)) || Number(formData.number) < 1) {
      valid = false;
      newErrors.number = "Maximum Participants must be 1 or greater.";
    }

    if (!formData.csvData) {
      valid = false;
      newErrors.csvFile = "CSV file is required.";
    }

    setErrors(newErrors);

    if (valid) {
      alert(`Submitted Data:
      Name: ${formData.name}
      Number: ${formData.number}
      CSV Data: ${JSON.stringify(formData.csvData, null, 2)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-5 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <label className="block text-center text-lg font-semibold text-black mb-2">
          Create A Game
        </label>

        <TextInput
          label="Name"
          name="name"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          errormessage={errors.name}
          placeholder="Enter your name"
        />

        <TextInput
          label="Number"
          name="number"
          id="number"
          type="number"
          value={formData.number}
          onChange={handleInputChange}
          errormessage={errors.number}
          placeholder="Max Participants"
          min={1}
        />

        <InputFile
          label="Upload CSV"
          name="csvFile"
          id="csv-upload"
          errormessage={errors.csvFile}
          onChange={handleFileChange}
          fileName={fileName}
        />

        <div className="mt-auto">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white rounded-full shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageGame;
