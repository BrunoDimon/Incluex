import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRow, editRow } from '../store/fileSLice';

export default function FinishedFile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { finalData } = useSelector((state) => state.file);

    const handleEdit = (rowIndex, updatedRow, key) => {
        dispatch(editRow({ rowIndex, updatedRow, key }));
    };

    const handleDelete = (rowIndex, key) => {
        dispatch(deleteRow({ rowIndex, key }));
    };

    const getTotal = () => {
        const columnIndex = finalData.headers.indexOf('valor');
        if (columnIndex === -1) return 0;

        return finalData.data.reduce((sum, row) => {
            const value = parseFloat(row[columnIndex]);
            return sum + (isNaN(value) ? 0 : value);
        });
    };

    const downloadCSV = () => {
        const csvHeaders = finalData.headers.join(';');
        const csvRows = finalData.data.map(row => row.join(';')).join('\n');
        const blob = new Blob([`${csvHeaders}\n${csvRows}`], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'arquivo_final.csv';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-2xl font-bold mb-4">Pré-visualização do Arquivo Final</h1>
                {finalData.headers.length > 0 && finalData.data.length > 0 ? (
                    <div className="relative overflow-x-auto max-h-screen">
                        <Table
                            headers={finalData.headers}
                            data={finalData.data}
                            pageNumber={15}
                            onEdit={(rowIndex, updatedRow) => handleEdit(rowIndex, updatedRow, "finalData")}
                            onDelete={(rowIndex) => handleDelete(rowIndex, "finalData")}
                            onFilter={true}
                        />
                        <div className='mt-4'>
                            <p className='text-lg font-semibold'>
                                Total (valor): R$ {getTotal().toFixed(2)}
                            </p>

                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <p className='text-lg'>Arquivo não gerado, verificar arquivos na tela anterior!</p>
                    </div>
                )
                }
                <div className="mt-6 w-full flex justify-center space-x-3">
                    <Button onClick={() => navigate('/')}> Voltar</Button>
                    <Button onClick={downloadCSV}>Baixar Arquivo CSV</Button>
                </div>
            </div>
        </div>
    );
}
