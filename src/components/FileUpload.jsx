import React, { useState } from 'react';
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai';

export default function FileUpload({ onFileParsed, title, height, fileType }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            const parsedData = parseCSV(fileContent);
            onFileParsed(parsedData.headers, parsedData.data);
            setIsFileUploaded(true);
        };
        reader.onerror = () => {
            console.error('Erro ao ler o arquivo:', reader.error);
        };
        reader.readAsText(file);
    };

    const parseCSV = (csvText) => {
        const lines = csvText.trim().split('\n').filter(Boolean);
        const headers = lines[0]?.split(';').map((header) => header.trim());
        const data = lines.slice(1).map((line) =>
            line.split(';').map((item) => item.trim())
        );
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
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file && file.name.endsWith('.csv')) {
            handleFileUpload(file);
        } else {
            alert('Por favor, arraste um arquivo válido do tipo .csv.');
        }
    };

    const handleFileDelete = () => {
        setIsFileUploaded(false);
        onFileParsed([], []);
    };

    return (
        <div>
            {!isFileUploaded ? (
                <div
                    className={`flex flex-col items-center justify-center border-2 ${isDragging ? 'border-blue-500' : 'border-dashed border-gray-300'
                        } rounded-lg`}
                    style={{ height }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
                    >
                        <AiOutlineUpload className="text-5xl mb-4" />
                        <p className="text-lg font-semibold">
                            Arraste ou Faça Upload do Arquivo {fileType}
                        </p>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleInputChange}
                            className="hidden"
                        />
                    </label>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{title}</p>
                    <button
                        onClick={handleFileDelete}
                        className="text-red-500 hover:text-red-600"
                    >
                        <AiOutlineDelete className="text-2xl" />
                    </button>
                </div>
            )}
        </div>
    );
}
