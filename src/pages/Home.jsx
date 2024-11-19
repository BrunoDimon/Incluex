import React, { useState } from 'react';
import Table from '../components/Table';
import FileUpload from '../components/FileUpload';

export default function Home() {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [headersInclusion, setHeadersInclusion] = useState([]);
    const [dataInclusion, setDataInclusion] = useState([]);
    const [headersExclusion, setHeadersExclusion] = useState([]);
    const [dataExclusion, setDataExclusion] = useState([]);

    const handleFileParsed = (parsedHeaders, parsedData, type) => {
        if (type === 'main') {
            setHeaders(parsedHeaders);
            setData(parsedData);
        } else if (type === 'inclusion') {
            setHeadersInclusion(parsedHeaders);
            setDataInclusion(parsedData);
        } else if (type === 'exclusion') {
            setHeadersExclusion(parsedHeaders);
            setDataExclusion(parsedData);
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
            <div className="grid gap-3 grid-rows-1 w-full max-w-5xl">
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, 'main')}
                        title="Arquivo Principal!"
                        height="22rem"
                        fileType="Principal"
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
                        fileType="de Inclusão"
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
                        fileType="de Exclusão"
                    />
                    {dataExclusion.length > 0 && headersExclusion.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table headers={headersExclusion} data={dataExclusion} pageNumber={3} />
                        </div>
                    )}
                </div>


                {data.length > 0 && headers.length > 0 &&
                    dataInclusion.length > 0 && headersInclusion.length > 0 &
                    dataExclusion.length > 0 && headersExclusion.length > 0 && (
                        <div>
                            <p>olá</p>
                        </div>

                    )}

            </div>
        </div>
    );
}
