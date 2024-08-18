"use client"

import React from "react";
import { Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@/components/ui/Box";
import { DTColumn } from "@/libs/types";
import Link from "next/link";
import Button from "@components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@components/ui/Modal";

interface DataTableProps {
    data?: any;
    columns: DTColumn[];
    title: string;
    paginationURL?: string;
    totalPages?: number;
    showNewButton?: boolean;
    limitDisplay?: number;
    icon?: React.ReactNode;
    color?: string;
    form?: React.ReactNode;
};

const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    title,
    paginationURL,
    totalPages,
    showNewButton = false,
    limitDisplay = 10,
    icon,
    color = "blue",
    form = <></>
}) => {

    const auth = useAuth()

    const router = useRouter()

    const [page, setPage] = useState(1)
    const [tableData, setTableData] = useState(data)
    const [reachedEnd, setReachedEnd] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [successElmOpen, setSuccessElmOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [errorElmOpen, setErrorElmOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [tableLoading, setTableLoading] = useState(false)

    const [formElement, setFormElement] = useState(React.cloneElement(
        form as React.ReactElement<any>,
        {
            submit: () => {
                setOpenModal(false)
                refreshDataTable()
                setTimeout(() => {
                    setSuccessElmOpen(true)
                    setSuccessMsg("Successfully added new hardware.")
                    setTimeout(() => {
                        setSuccessElmOpen(false)
                    }, 3000)
                }, 500)
            }
        }));

    function handleDelete(id: number) {
        fetch(`${paginationURL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }})
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setErrorMsg(data.error)
                    setErrorElmOpen(true)
                    setTimeout(() => {
                        setErrorElmOpen(false)
                    }, 3000)
                } else {
                    setSuccessMsg("Successfully deleted hardware.")
                    setSuccessElmOpen(true)
                    setTimeout(() => {
                        setSuccessElmOpen(false)
                    }, 3000)
                    refreshDataTable()
                }
            })
    }

    function openEditModal(row: any) {
        setOpenModal(true)
        const fElement = React.cloneElement(
            form as React.ReactElement<any>,
            {
                submit: () => {
                    setOpenModal(false)
                    refreshDataTable()
                    setTimeout(() => {
                        setSuccessElmOpen(true)
                        setSuccessMsg("Successfully updated hardware.")
                        setTimeout(() => {
                            setSuccessElmOpen(false)
                        }, 3000)
                    }, 500)
                },
                data: row,
                action: "edit"
            })
        setFormElement(fElement)
    }

    function handleNextPage() {
        // Increment the page number.
        const nextPage = page + 1;

        // If the next page is greater than the total number of pages, don't make a fetch request.
        if (totalPages !== undefined && nextPage > totalPages+1) {
            setReachedEnd(true);
            return;
        }


        fetch(`${paginationURL}?page=${nextPage}`, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }})
            .then((res) => res.json())
            .then((data) => {
                if (data.currentPage === data.totalPages) {
                    // If there is no data for the next page, don't update the page or tableData.
                    setReachedEnd(true);
                }

                // Update the page and the table data.
                setPage(nextPage);
                setTableData(data.rows);
            });
    }

    function handlePrevPage() {
        // Decrement the page number.
        const prevPage = page - 1;

        // If the previous page is less than 1, don't make a fetch request.
        if (prevPage < 1) {
            return;
        }


        fetch(`${paginationURL}?page=${prevPage}`, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }})
            .then((res) => res.json())
            .then((data) => {
                // Update the page and the table data.
                setPage(prevPage);
                setTableData(data.rows);
                setReachedEnd(false);
            }
        );

    }

    if(form === undefined) {
        form = <></>
    }

    function openAddModal() {
        setOpenModal(true)
        const fElement = React.cloneElement(
            form as React.ReactElement<any>,
            {
            submit: () => {
                setOpenModal(false)
                refreshDataTable()
                setTimeout(() => {
                    setSuccessElmOpen(true)
                    setSuccessMsg("Successfully added new hardware.")
                    setTimeout(() => {
                        setSuccessElmOpen(false)
                    }, 3000)
                }, 500)
            },
            action: "add"
        })
        setFormElement(fElement)
    }
    
    function refreshDataTable() {
        setTableLoading(true)
        fetch(`${paginationURL}?page=1`, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }})
            .then((res) => res.json())
            .then((data) => {
                setTableData(data.rows);
                setTableLoading(false)
            }
        );
    }

    return (
        <Box className="bg-white rounded-md border border-gray-100 overflow-y-hidden w-full">

            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                </h3>
                <h1 className={`text-lg font-bold text-green-700 py-5 px-5 transition 
                    duration-300 ease-in-out
                ${successElmOpen ? "opacity-100" : "opacity-0"}`}>{successMsg}</h1>

                <h1 className={`text-lg font-bold text-center text-red-700 py-5 transition
                    duration-300 ease-in-out
                ${errorElmOpen ? "opacity-100" : "hidden opacity-0"}`}>{errorMsg}</h1>
                {totalPages && (
                    <>
                    <span className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </span>
                    <div className="flex justify-center flex-row gap-2 my-5">
                        {page <= 1 ? (
                        <button 
                            className="bg-gray-400 text-white font-bold p-2 rounded" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        ):(
                        <button 
                            onClick={handlePrevPage}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded">
                            <ChevronLeft size={16} />
                        </button>
                        )}
                        {reachedEnd ? (
                        <button 
                            className="bg-gray-400 text-white font-bold p-2 rounded" disabled>
                            <ChevronRight size={16} />
                        </button>
                        ):(
                        <button 
                            onClick={handleNextPage}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded">
                            <ChevronRight size={16} />
                        </button>
                        )}
                    </div>
                    </>
                )}
                {showNewButton && (
                    <>
                    <Button 
                        onClick={() => openAddModal()}
                        className="bg-dmg-light text-white p-2 rounded-md justify-start gap-2 flex hover:bg-dmg-dark hover:border-dmg-dark
                        w-auto
                        transition duration-100 ease-linear">
                        Add New {title}
                    </Button>
                    <Modal
                        isOpen={openModal}
                        title={title}
                        description={`fill out the form below`}
                        onChange={setOpenModal}
                    >
                        {formElement}
                    </Modal>
                    </>
                )}
                {icon && (
                    <div className={`flex-shrink-0 text-${color}-500`}>
                        {icon}
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200">
                <table className={`min-w-full divide-y divide-gray-200 ${tableLoading ? "blur-sm" : ""}`}>
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.length === 0 && (
                            <tr>
                            </tr>
                        )}
                        {tableData.length > 0 &&
                            tableData.map((row: any, index: number) => {
                            if (index >= limitDisplay) {
                                return;
                            }
                            return (
                                <tr key={index}>
                                    {columns.map((column, index) => {
                                        if (column.key === "options") {
                                            return (
                                                <td
                                                    key={index}
                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 flex justify-between gap-2 w-5/12"
                                                >
                                                    <Button 
                                                        onClick={() => openEditModal(row)}
                                                        className="bg-dmg-light text-white p-2 rounded-md justify-start gap-2 flex">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        onClick={() => handleDelete(row.id)}
                                                        className="bg-red-400 text-white p-2 rounded-md justify-start flex gap-2 hover:bg-red-500 hover:border-red-500">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            );
                                        } else if(column.key === "hashRate") {
                                                return (
                                                    <td
                                                        key={index}
                                                        className="px-6 py-4 whitespace-nowrap text-gray-700"
                                                    >
                                                        {row[column.key]} TH/s
                                                    </td>
                                                );
                                        } else {
                                            return (
                                                <td
                                                    key={index}
                                                    className="px-6 py-4 whitespace-nowrap text-gray-700"
                                                >
                                                    {row[column.key]}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Box>
    );
}

export default DataTable;
