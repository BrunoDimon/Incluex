import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRow, editRow, setExclusionFile, setFinalData, setInclusionFile, setMainFile } from '../store/fileSLice';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { main, inclusion, exclusion } = useSelector((state) => state.file);

    const handleFileParsed = (parsedHeaders, parsedData, type) => {
        switch (type) {
            case 'main':
                dispatch(setMainFile({ headers: parsedHeaders, data: parsedData }));
                break;
            case 'inclusion':
                dispatch(setInclusionFile({ headers: parsedHeaders, data: parsedData }));
                break;
            case 'exclusion':
                dispatch(setExclusionFile({ headers: parsedHeaders, data: parsedData }));
                break;
            default:
                console.error('Tipo de arquivo inválido', type);
        }
    };

    const handleNavigate = () => {
        const mergeData = (main = [], inclusion = [], exclusion = []) => {
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

        const combinedData = mergeData(main.data, inclusion.data, exclusion.data);
        dispatch(setFinalData({ headers: main.headers, data: combinedData }));
        navigate('/FinishedFile');
    };

    const handleEdit = (rowIndex, updatedRow, key) => {
        dispatch(editRow({ rowIndex, updatedRow, key }));
    };

    const handleDelete = (rowIndex, key) => {
        dispatch(deleteRow({ rowIndex, key }));
    };

    const isGenerateButtonVisibled = main.data.length > 0 && (inclusion.data.length > 0 || exclusion.data.length > 0);

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
            <div className="grid gap-3 grid-rows-1 w-full max-w-5xl">
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, "main")}
                        title="Arquivo Principal!"
                        height="18rem"
                        fileName="Principal"
                        UploadedFile={main.data.length > 0 && main.headers.length > 0 ? "Yes" : "No"}
                        type="main"
                    />
                    {main.data.length > 0 && main.headers.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table
                                headers={main.headers}
                                data={main.data}
                                pageNumber={4}
                                onEdit={(rowIndex, updatedRow) => handleEdit(rowIndex, updatedRow, "main")}
                                onDelete={(rowIndex) => handleDelete(rowIndex, "main")}
                            />
                        </div>
                    )}
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, "inclusion")}
                        title="Arquivo de Inclusão!"
                        height="13rem"
                        fileName="de Inclusão"
                        UploadedFile={inclusion.data.length > 0 && inclusion.headers.length > 0 ? "Yes" : "No"}
                        type="inclusion"
                    />
                    {inclusion.data.length > 0 && inclusion.headers.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table
                                headers={inclusion.headers}
                                data={inclusion.data}
                                pageNumber={3}
                                onEdit={(rowIndex, updatedRow) => handleEdit(rowIndex, updatedRow, "inclusion")}
                                onDelete={(rowIndex) => handleDelete(rowIndex, "inclusion")}
                            />
                        </div>
                    )}
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-3 border border-gray-200">
                    <FileUpload
                        onFileParsed={(headers, data) => handleFileParsed(headers, data, "exclusion")}
                        title="Arquivo de Exclusão!"
                        height="13rem"
                        fileName="de Exclusão"
                        UploadedFile={exclusion.data.length > 0 && exclusion.headers.length > 0 ? "Yes" : "No"}
                        type="exclusion"
                    />
                    {exclusion.data.length > 0 && exclusion.headers.length > 0 && (
                        <div className="relative overflow-x-auto max-h-96 mt-4">
                            <Table
                                headers={exclusion.headers}
                                data={exclusion.data}
                                pageNumber={3}
                                onEdit={(rowIndex, updatedRow) => handleEdit(rowIndex, updatedRow, "exclusion")}
                                onDelete={(rowIndex) => handleDelete(rowIndex, "exclusion")}
                            />
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
