import React, { useState } from 'react';
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai'; // Ícones de upload e exclusão
import Table from '../components/Table';

export default function Home() {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [headersInclusion, setHeadersInclusion] = useState([]);
    const [dataInclusion, setDataInclusion] = useState([]);
    const [headersExclusion, setHeadersExclusion] = useState([]);
    const [dataExclusion, setDataExclusion] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (file, type) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            console.log(`Conteúdo do arquivo (${type}):`, fileContent); // Debug
            const parsedData = parseCSV(fileContent);
            console.log(`Dados processados (${type}):`, parsedData); // Debug
            if (type === 'main') {
                setHeaders(parsedData.headers);
                setData(parsedData.data);
            } else if (type === 'inclusion') {
                setHeadersInclusion(parsedData.headers);
                setDataInclusion(parsedData.data);
            } else if (type === 'exclusion') {
                setHeadersExclusion(parsedData.headers);
                setDataExclusion(parsedData.data);
            }
        };
        reader.onerror = () => {
            console.error('Erro ao ler o arquivo:', reader.error);
        };
        reader.readAsText(file);
    };


    const handleInputChange = (event, type) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file, type);
        }
    };

    const handleFileDelete = (type) => {
        if (type === 'main') {
            setHeaders([]);
            setData([]);
        } else if (type === 'inclusion') {
            setHeadersInclusion([]);
            setDataInclusion([]);
        } else if (type === 'exclusion') {
            setHeadersExclusion([]);
            setDataExclusion([]);
        }
    };

    const parseCSV = (csvText) => {
        const lines = csvText.trim().split('\n').filter(Boolean); // Remove linhas vazias
        const headers = lines[0]?.split(';').map((header) => header.trim());
        const data = lines.slice(1).map((line) =>
            line.split(';').map((item) => item.trim())
        );
        return { headers, data };
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event, type) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file && file.name.endsWith('.csv')) {
            handleFileUpload(file, type);
        } else {
            alert('Por favor, arraste um arquivo válido do tipo .csv.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
            <div className="bg-gray-50 shadow-lg rounded-lg w-full max-w-5xl p-6">
                {/* Tabela principal */}
                <div className="mb-6">
                    {!data.length ? (
                        <div
                            className={`h-96 flex flex-col items-center justify-center border-2 ${isDragging ? 'border-blue-500' : 'border-dashed border-gray-300'
                                } rounded-lg`}
                            onDragOver={(e) => handleDragOver(e)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'main')}
                        >
                            <label
                                htmlFor="file-upload-main"
                                className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
                            >
                                <AiOutlineUpload className="text-5xl mb-4" />
                                <p className="text-lg font-semibold">
                                    Arraste ou Faça Upload do Arquivo Principal
                                </p>
                                <input
                                    id="file-upload-main"
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => handleInputChange(e, 'main')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="flex justify-between mb-4">
                            <h2 className='font-semibold'>Arquivo de Inclusão!</h2>
                            <button
                                onClick={() => handleFileDelete('main')}
                                className="text-red-500 hover:text-red-600"
                            >
                                <AiOutlineDelete className="text-2xl" />
                            </button>
                        </div>
                    )}

                    <div className="relative overflow-x-auto max-h-96">
                        {headers.length > 0 && <Table headers={headers} data={data} pageNumber={5} />}
                    </div>
                </div>

                {/* Tabela de Inclusão */}
                <div className="mb-6">
                    {!dataInclusion.length ? (
                        <div
                            className={`h-52 flex flex-col items-center justify-center border-2 ${isDragging ? 'border-blue-500' : 'border-dashed border-gray-300'
                                } rounded-lg`}
                            onDragOver={(e) => handleDragOver(e)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'inclusion')}
                        >
                            <label
                                htmlFor="file-upload-inclusion"
                                className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
                            >
                                <AiOutlineUpload className="text-5xl mb-4" />
                                <p className="text-lg font-semibold">
                                    Arraste ou Faça Upload do Arquivo de Inclusão
                                </p>
                                <input
                                    id="file-upload-inclusion"
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => handleInputChange(e, 'inclusion')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="flex mb-4 justify-between">
                            <h2 className='font-semibold'>Arquivo de Inclusão!</h2>
                            <button
                                onClick={() => handleFileDelete('inclusion')}
                                className="text-red-500 hover:text-red-600"
                            >
                                <AiOutlineDelete className="text-2xl" />
                            </button>
                        </div>
                    )}

                    <div className="relative overflow-x-auto max-h-96">
                        {headersInclusion.length > 0 && <Table headers={headersInclusion} data={dataInclusion} pageNumber={3} />}
                    </div>
                </div>

                {/* Tabela de Exclusão */}
                <div>
                    {!dataExclusion.length ? (
                        <div
                            className={`h-52 flex flex-col items-center justify-center border-2 ${isDragging ? 'border-blue-500' : 'border-dashed border-gray-300'
                                } rounded-lg`}
                            onDragOver={(e) => handleDragOver(e)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'exclusion')}
                        >
                            <label
                                htmlFor="file-upload-exclusion"
                                className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
                            >
                                <AiOutlineUpload className="text-5xl mb-4" />
                                <p className="text-lg font-semibold">
                                    Arraste ou Faça Upload do Arquivo de Exclusão
                                </p>
                                <input
                                    id="file-upload-exclusion"
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => handleInputChange(e, 'exclusion')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="flex justify-between mb-4">
                            <h2 className='font-semibold'>Arquivo de Inclusão!</h2>

                            <button
                                onClick={() => handleFileDelete('exclusion')}
                                className="text-red-500 hover:text-red-600"
                            >
                                <AiOutlineDelete className="text-2xl" />
                            </button>
                        </div>
                    )}

                    <div className="relative overflow-x-auto max-h-96">
                        {headersExclusion.length > 0 && <Table headers={headersExclusion} data={dataExclusion} pageNumber={3} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
