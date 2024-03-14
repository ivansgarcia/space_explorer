import React from 'react';
import { useState } from 'react';
import imageIcon from '../images/image.svg';
import videoIcon from '../images/video.svg';
import audioIcon from '../images/audio.svg';
import { findResultsByTag } from '../controllers/searchContoller';
import ResultPage from './ResultPage';
import { Button, Option, Select } from '@material-tailwind/react';

const Results = ({
    resultList,
    setResultList,
    setLoading,
    showViewer,
    setShowViewer,
}) => {
    const [mediaTypeShow, setMediaTypeShow] = useState('all');

    const [pages, setPages] = useState([1]);

    const filterData = [
        {
            text: 'All',
            value: 'all',
        },
        {
            text: 'Images',
            value: 'image',
            icon: imageIcon,
        },
        {
            text: 'Video',
            value: 'video',
            icon: videoIcon,
        },
        {
            text: 'Audio',
            value: 'audio',
            icon: audioIcon,
        },
    ];

    const filteredList =
        resultList !== 'NOT_FOUND' && mediaTypeShow !== 'all'
            ? resultList.filter(
                (result) => result.data[0].media_type === mediaTypeShow
            )
            : resultList;

    const filterByTag = async (tag) => {
        const newList = await findResultsByTag(tag).then(
            (r) => r.data.collection.items
        );
        setResultList(newList);
        setPages([1]);
        window.scrollTo(0, 0);
        setLoading(false);
    };

    return (
        <main className="w-full px-2 sm:px-16">
            <div className="flex w-full items-center justify-between"></div>
            {filteredList !== 'NOT_FOUND' ? (
                <div className="flex w-full flex-col items-center gap-2 pb-24">
                    <div className="self-start">
                        <div className="filter-selector mb-6">
                            <Select
                                color="blue"
                                className="self-start text-white"
                                value={mediaTypeShow}
                                label="Show"
                                defaultValue={mediaTypeShow}
                                onChange={(val) => setMediaTypeShow(val)}
                            >
                                {filterData.map((opt, index) => (
                                    <Option
                                        className="bg-transparent text-white hover:bg-gray-900 hover:text-white"
                                        key={index}
                                        value={opt.value}
                                    >
                                        {opt.text}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {pages.map((page, index) => (
                        <ResultPage
                            key={index}
                            list={filteredList.slice(
                                20 * (page - 1),
                                20 * page
                            )}
                            filterByTag={filterByTag}
                            showViewer={showViewer}
                            setShowViewer={setShowViewer}
                            setLoading={setLoading}
                        />
                    ))}
                    {pages.length * 20 <= filteredList.length && (
                        <Button
                            variant="filled"
                            color="blue"
                            onClick={() =>
                                setPages([...pages, pages.length + 1])
                            }
                            className="m-6 text-base text-white"
                        >
                            Show More
                        </Button>
                    )}
                </div>
            ) : (
                <p className="text-center text-xl text-white my-16">No results found...</p>
            )}
        </main>
    );
};

export default Results;
