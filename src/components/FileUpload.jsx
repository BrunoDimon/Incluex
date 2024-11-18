import React, { useState } from 'react';
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai'; // Ícones de upload e exclusão

export default function FileUpload({ onFileUpload, onFileDelete }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            const parsedData = parseCSV(fileContent);
            onFileUpload(parsedData.headers, parsedData.data);
        };
        reader.readAsText(file);
    };

    const parseCSV = (csvText) => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(';');
        const data = lines.slice(1).map((line) => line.split(';'));
        return { headers, data };
    };

    const handleInputChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    return (
        <div
            className={`h-96 flex flex-col items-center justify-center border-2 ${isDragging ? 'border-blue-500' : 'border-dashed border-gray-300'
                } rounded-lg`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
            >
                <AiOutlineUpload className="text-5xl mb-4" />
                <p className="text-lg font-semibold">Arraste ou Faça Upload do Arquivo</p>
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleInputChange}
                    className="hidden"
                />
            </label>
            <div className="flex justify-end mb-4">
                <button
                    onClick={onFileDelete}
                    className="text-red-500 hover:text-red-600"
                >
                    <AiOutlineDelete className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

