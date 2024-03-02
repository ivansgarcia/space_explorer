import React from 'react';
import { useState } from 'react';
import findResults from "../controllers/searchContoller";

const Navigator = ({ setResultList }) => {
    const [searchValue, setSearchValue] = useState('');

    const search = (params) => {
        console.log('searching for: ', params);
        findResults(params).then(r => setResultList(r.data.collection.items));
    };

    return (
        <nav className="w-full bg-slate-100 p-4 flex justify-center gap-4">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                placeholder="Search for..."
            />
            <button
                onClick={() => searchValue && search(searchValue)}
                className="bg-slate-300 px-2"
            >
                Find
            </button>
        </nav>
    );
};

export default Navigator;
