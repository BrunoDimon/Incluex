import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Button from '../components/Button';

export default function FinishedFile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { headers, data } = location.state || { headers: [], data: [] };

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
                <div className="relative overflow-x-auto max-h-screen">
                    <Table headers={headers} data={data} pageNumber={15} />
                </div>
                <div className="mt-6 flex justify-center">
                    <Button onClick={() => navigate('/')}> Voltar</Button>
                    <Button onClick={downloadCSV}>Baixar Arquivo CSV</Button>

                </div>
            </div>
        </div>
    );
}
