import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Button from '../components/Button';

export default function FinishedFile() {
    const location = useLocation();
    const navigate = useNavigate();

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedHeaders = JSON.parse(localStorage.getItem('finalHeaders')) || [];
        const storedData = JSON.parse(localStorage.getItem('finalData')) || [];
        setHeaders(location.state?.headers || storedHeaders);
        setData(location.state?.data || storedData);
    }, [location.state]);


    useEffect(() => {
        console.log('alterou')
        localStorage.setItem('finalHeaders', JSON.stringify(headers));
        localStorage.setItem('finalData', JSON.stringify(data));
    }, [headers], [data]);

    const handleEdit = (updatedRow, rowIndex) => {
        const updatedData = [...data];
        updatedData[rowIndex] = updatedRow;
        setData(updatedData);
    };

    const handleDelete = (rowIndex) => {
        const updatedData = data.filter((_, index) => index !== rowIndex);
        setData(updatedData);
    };


    const getTotal = () => {
        const columnIndex = headers.indexOf('valor');
        if (columnIndex === -1) return 0;

        return data.reduce((sum, row) => {
            const value = parseFloat(row[columnIndex]);
            return sum + (isNaN(value) ? 0 : value);
        });
    };

    const downloadCSV = () => {
        const csvHeaders = headers.join(';');
        const csvRows = data.map(row => row.join(';')).join('\n');
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
                {headers.length > 0 && data.length > 0 ? (
                    <div className="relative overflow-x-auto max-h-screen">
                        <Table headers={headers} data={data} pageNumber={15} onEdit={handleEdit} onDelete={handleDelete} onFilter={true} />
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
