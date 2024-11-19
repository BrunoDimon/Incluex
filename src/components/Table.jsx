import React, { useState } from "react";
import Button from "./Button";

export default function Table({ headers, data, pageNumber }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = pageNumber;

    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="bg-white relative overflow-x-auto max-w-5xl mx-auto shadow-lg rounded-lg
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500">
                <table className="table-auto w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="px-4 py-2">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`${rowIndex % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                                    } border-b`}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-4 py-2 text-gray-900 truncate max-w-xs"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Button onClick={() => changePage(currentPage - 1)} variant={currentPage === 1 ? 'disabled' : 'default'} disabled={currentPage === 1}>
                    Anterior
                </Button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <Button onClick={() => changePage(currentPage + 1)} variant={currentPage === totalPages ? 'disabled' : 'default'} disabled={currentPage === totalPages}>
                    Próxima
                </Button>
            </div>
        </div >
    );
}
