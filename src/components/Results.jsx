import React from 'react';
import Preview from './Preview';
import { useState } from 'react';
import { TESelect } from 'tw-elements-react';
import imageIcon from '../images/image.svg';
import videoIcon from '../images/video.svg';
import audioIcon from '../images/audio.svg';
import { findResultsByTag } from '../controllers/searchContoller';
import { useEffect } from 'react';
import ResultPage from './ResultPage';

const Results = ({ resultList, setResultList }) => {
    const [showViewer, setShowViewer] = useState(false);
    const [mediaTypeShow, setMediaTypeShow] = useState([
        'image',
        'video',
        'audio',
    ]);

    const [pages, setPages] = useState([1]);

    const filterData = [
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

    const filteredList = resultList.filter((result) =>
        mediaTypeShow.includes(result.data[0].media_type)
    );

    // console.log('resultList: ', resultList);
    // console.log('filteredList: ', filteredList);
    console.log(pages);

    const filterByTag = async (tag) => {
        const newList = await findResultsByTag(tag).then(
            (r) => r.data.collection.items
        );
        // console.log(newList);
        // const orderedList = newList.sort((a, b) => new Date(a.data[0].date_created) - new Date(b.data[0].date_created))
        setResultList(newList);
        setPages([1]);
        window.scrollTo(0, 0);

    };

    return (
        <main className="w-full p-4">
            <div className="w-full flex justify-between items-center">   
            </div>
            {filteredList.length ? (
                <div className="flex flex-col items-center pb-24 gap-2">
                <TESelect
                    className="self-start mb-6 text-white"
                    data={filterData}
                    value={mediaTypeShow}
                    multiple
                    label="Show"
                    size="sm"
                    onValueChange={(e) => {
                        const newValue = e.map((el) => el.value);
                        setMediaTypeShow(newValue);
                    }}
                />
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
                        />
                    ))}
                    {pages.length  * 20 <= resultList.length && (
                        <button
                            onClick={() => setPages([...pages, pages.length + 1])}
                            className="text-white bg-blue-500 rounded-2xl px-4 py-1 my-8 mx-auto"
                        >
                            Show More
                        </button>
                    )}
                </div>
            ) : (
                <p>No results</p>
            )}
        </main>
    );
};

export default Results;
