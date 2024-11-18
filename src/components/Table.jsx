import React, { useState } from "react";

export default function Table({ headers, data, pageNumber }) {
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = pageNumber; // Número de registros por página

    // Calcula os dados para a página atual
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Total de páginas
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Manipulador de mudança de página
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
                                <th key={index} className="px-6 py-3">
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
                                        className="px-6 py-4 text-gray-900 truncate max-w-xs"
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
                <button
                    onClick={() => changePage(currentPage - 1)}
                    className="px-4 py-2 bg-blue-300 text-gray-700 rounded-md hover:bg-gray-300"
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => changePage(currentPage + 1)}
                    className="px-4 py-2 bg-blue-300 text-gray-700 rounded-md hover:bg-gray-300"
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}
