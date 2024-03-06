import React from 'react';
import { useState } from 'react';
import findResults from "../controllers/searchContoller";
import { TEInput, TERipple } from "tw-elements-react";
import savedSearch from '../utils/moon.json';

const Navigator = ({ setResultList, setIsLoading }) => {
    const [searchValue, setSearchValue] = useState('');
    const [resultPage, setResultPage] = useState(1);

    const search = async (params) => {
        setIsLoading(true);
        console.log('searching for: ', params);
        const newList = await findResults(params).then(r => ((r.data.collection.items)));
        const shuffledList = newList.sort(() => Math.random() - 0.5);
        // console.log(newList);
        setResultList(shuffledList);
        setIsLoading(false);
        // setResultList(savedSearch.collection.items);
    };

    return (
        <nav className="w-full p-4 flex justify-center items-center">
            <TEInput
                className="text-white"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                label="Search for..."
            />
            <TERipple color='light'>
                    <button
                        onClick={() => /*searchValue &&*/ search(searchValue)}
                        className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                    </TERipple>
        </nav>
    );
};

export default Navigator;
