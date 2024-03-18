import React from 'react';
import findResults from '../controllers/searchContoller';
import { Button, Input } from '@material-tailwind/react';

const Navigator = ({
    setResultList,
    setLoading,
    searchValue,
    setSearchValue,
}) => {
    const search = async (params) => {
        setLoading(true);
        const newList = await findResults(params).then(
            (r) => r.data.collection.items
        );
        const shuffledList = newList.sort(() => Math.random() - 0.5);
        shuffledList.length
            ? setResultList(shuffledList)
            : setResultList('NOT_FOUND');
        setLoading(false);
    };

    return (
        <nav className="flex w-full items-center justify-center p-4 pt-28 sm:pt-4">
            <div className="flex items-center justify-center gap-2 sm:w-[65%] sm:gap-6">
                <Input
                    id="search-bar"
                    className="!text-base text-white sm:p-7 sm:!text-2xl"
                    value={searchValue}
                    onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        searchValue &&
                        search(searchValue) &&
                        e.target.blur()
                    }
                    onChange={(e) => setSearchValue(e.target.value)}
                    label="Search for..."
                    color="blue"
                    size="lg"
                    type="search"
                />
                <Button
                    aria-label="search"
                    color="blue"
                    onClick={() => searchValue && search(searchValue)}
                    className="relative flex h-12 w-12 items-center justify-center rounded-full sm:top-2 sm:h-16 sm:w-16"
                    id="button-addon1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="absolute h-5 w-5 sm:h-7 sm:w-7"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </div>
        </nav>
    );
};

export default Navigator;
