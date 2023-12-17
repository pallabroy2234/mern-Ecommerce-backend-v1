import React from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Pagination = ({ pageNumber, setPageNumber, parPage, showItem, totalItem }) => {
    const totalPage = Math.ceil(totalItem / parPage);
    
    let startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
    let endPage = Math.min(totalPage, startPage + showItem - 1);
    
    if (endPage - startPage < showItem - 1) {
        startPage = Math.max(1, endPage - showItem + 1);
    }
    
    const createButton = () => {
        const buttons = [];
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li
                    key={i}
                    onClick={() => setPageNumber(i)}
                    className={`${pageNumber === i ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white' : 'bg-slate-700 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-gray-300'} w-[33px] h-[33px] flex justify-center items-center rounded-full cursor-pointer `}
                >
                    {i}
                </li>
            );
        }
        return buttons;
    };
    
    return (
        <ul className="flex gap-3">
            {pageNumber > 1 ? (
                <li
                    onClick={() => setPageNumber(pageNumber - 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-white cursor-pointer"
                >
                    <BsChevronDoubleLeft />
                </li>
            ) : (
                <li className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-500 text-white cursor-not-allowed opacity-50">
                    <BsChevronDoubleLeft />
                </li>
            )}
            {createButton()}
            {pageNumber < totalPage ? (
                <li
                    onClick={() => setPageNumber(pageNumber + 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-white cursor-pointer"
                >
                    <BsChevronDoubleRight />
                </li>
            ) : (
                <li className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-500 text-white cursor-not-allowed opacity-50">
                    <BsChevronDoubleRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
