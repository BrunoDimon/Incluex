import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import Button from "./Button";

export default function Table({ headers, data, pageNumber, onEdit, onDelete, onFilter }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [editableData, setEditableData] = useState([]); // Inicializa com array vazio
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setEditableData(data);
    }, [data]);

    const filteredData = filter
        ? editableData.filter((row) =>
            row.some((cell) => cell?.toString().toLowerCase().includes(filter.toLowerCase()))
        )
        : editableData;

    const itemsPerPage = pageNumber;
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleInputChange = (e, rowIndex, colIndex) => {
        const updatedRow = [...editableData[rowIndex]];
        updatedRow[colIndex] = e.target.value;
        const updatedData = [...editableData];
        updatedData[rowIndex] = updatedRow;
        setEditableData(updatedData);
    };

    const saveEdit = (rowIndex) => {
        if (onEdit) {
            onEdit(rowIndex, editableData[rowIndex]);
        }
        setEditRowIndex(null);
    };

    const deleteRow = (rowIndex) => {
        const realIndex = editableData.indexOf(filteredData[rowIndex]);
        if (realIndex === -1) return;

        const updatedData = editableData.filter((_, index) => index !== realIndex);
        setEditableData(updatedData);

        if (onDelete) {
            onDelete(realIndex);
        }
    };

    return (
        <div>
            {onFilter && (
                <div className="bg-white relative overflow-x-auto max-w-5xl mx-auto shadow-sm border rounded-lg mb-2">
                    <input type="text" placeholder="Filtrar" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full px-3 py-2 rounded focus:outline-none " />
                </div>
            )}
            <div className="bg-white relative overflow-x-auto max-w-5xl mx-auto shadow-md rounded-lg
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
                <table className="table-auto w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="px-4 py-2">
                                    {header}
                                </th>
                            ))}
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} border-b whitespace-nowrap overflow-hidden text-ellipsis`}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2 text-gray-900 min-w-lg">
                                        {editRowIndex === rowIndex ? (
                                            <input
                                                type="text"
                                                value={cell}
                                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                                onInput={(e) => { e.target.style.width = `${Math.max(50, e.target.value.length * 8)}px`; }}
                                                className="border-n rounded bg-transparent w-full focus:outline-none focus:ring-1 focus:ring-black px-1 " />
                                        ) : (
                                            cell
                                        )}
                                    </td>
                                ))}
                                <td className={`px-2 py-2 flex space-x-2 sticky right-0 ${rowIndex % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} `}>
                                    {editRowIndex === rowIndex ? (
                                        <button className="text-green-500 hover:text-green-700" onClick={() => saveEdit(rowIndex)}>
                                            <AiOutlineCheckCircle size={20} />
                                        </button>
                                    ) : (
                                        <button className="text-blue-500 hover:text-blue-700" onClick={() => setEditRowIndex(rowIndex)}>
                                            <AiOutlineEdit size={20} />
                                        </button>
                                    )}
                                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteRow(rowIndex)}>
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Button onClick={() => changePage(currentPage - 1)} variant={currentPage === 1 ? "disabled" : "default"}>
                    Anterior
                </Button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <Button onClick={() => changePage(currentPage + 1)} variant={currentPage === totalPages ? "disabled" : "default"}>
                    Próxima
                </Button>
            </div>
        </div>
    );
}
