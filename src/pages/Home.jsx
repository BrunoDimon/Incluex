import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const [headers, setHeaders] = useState(() => JSON.parse(localStorage.getItem('headers')) || []);
    const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data')) || []);
    const [headersInclusion, setHeadersInclusion] = useState(() => JSON.parse(localStorage.getItem('headersInclusion')) || []);
    const [dataInclusion, setDataInclusion] = useState(() => JSON.parse(localStorage.getItem('dataInclusion')) || []);
    const [headersExclusion, setHeadersExclusion] = useState(() => JSON.parse(localStorage.getItem('headersExclusion')) || []);
    const [dataExclusion, setDataExclusion] = useState(() => JSON.parse(localStorage.getItem('dataExclusion')) || []);

    useEffect(() => {
        localStorage.setItem('headers', JSON.stringify(headers));
    }, [headers]);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('headersInclusion', JSON.stringify(headersInclusion));
    }, [headersInclusion]);

    useEffect(() => {
        localStorage.setItem('dataInclusion', JSON.stringify(dataInclusion));
    }, [dataInclusion]);

    useEffect(() => {
        localStorage.setItem('headersExclusion', JSON.stringify(headersExclusion));
    }, [headersExclusion]);

    useEffect(() => {
        localStorage.setItem('dataExclusion', JSON.stringify(dataExclusion));
    }, [dataExclusion]);

    const handleNavigate = () => {
        const combinedData = mergeData(data, dataInclusion, dataExclusion);
        localStorage.setItem('finalHeaders', JSON.stringify(headers));
        localStorage.setItem('finalData', JSON.stringify(combinedData));
        navigate('/FinishedFile', { state: { headers, data: combinedData } });
        window.scrollTo(0, 0);
    };

    const mergeData = (main, inclusion, exclusion) => {
        const result = [...main];
        inclusion.forEach(item => {
            if (!result.some(row => JSON.stringify(row) === JSON.stringify(item))) {
                result.push(item);
            }
        });
        exclusion.forEach(item => {
            const index = result.findIndex(row => JSON.stringify(row) === JSON.stringify(item));
            if (index !== -1) result.splice(index, 1);
        });
        return result;
    };

    const handleFileParsed = (parsedHeaders, parsedData, type) => {
        switch (type) {
            case 'main':
                setHeaders(parsedHeaders);
                setData(parsedData);
                break;
            case 'inclusion':
                setHeadersInclusion(parsedHeaders);
                setDataInclusion(parsedData);
                break;
            case 'exclusion':
                setHeadersExclusion(parsedHeaders);
                setDataExclusion(parsedData);
                break;
            default:
                console.error('Tipo de arquivo inválido:', type);
        }
    };

    const isGenerateButtonVisibled =
        Array.isArray(data) &&
        data.length > 0 &&
        (
            (Array.isArray(dataInclusion) && dataInclusion.length > 0) ||
            (Array.isArray(dataExclusion) && dataExclusion.length > 0)
        );

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
            <div className="grid gap-3 grid-rows-1 w-full max-w-5xl">
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, 'main')}
                        title="Arquivo Principal!"
                        height="22rem"
                        fileName="Principal"
                        UploadedFile={data.length > 0 && headers.length > 0 ? "Yes" : "No"}
                    />
                    {data.length > 0 && headers.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table headers={headers} data={data} pageNumber={4} />
                        </div>
                    )}
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, 'inclusion')}
                        title="Arquivo de Inclusão!"
                        height="13rem"
                        fileName="de Inclusão"
                        UploadedFile={dataInclusion.length > 0 && headersInclusion.length > 0 ? "Yes" : "No"}
                    />
                    {dataInclusion.length > 0 && headersInclusion.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table headers={headersInclusion} data={dataInclusion} pageNumber={3} />
                        </div>
                    )}
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, 'exclusion')}
                        title="Arquivo de Exclusão!"
                        height="13rem"
                        fileName="de Exclusão"
                        UploadedFile={dataExclusion.length > 0 && headersExclusion.length > 0 ? "Yes" : "No"}
                    />
                    {dataExclusion.length > 0 && headersExclusion.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table headers={headersExclusion} data={dataExclusion} pageNumber={3} />
                        </div>
                    )}
                </div>

                <div className='w-full flex justify-center'>
                    <Button onClick={handleNavigate} variant={isGenerateButtonVisibled ? 'default' : 'disabled'} >Gerar Arquivo</Button>
                </div>


            </div>
        </div>
    );
}
