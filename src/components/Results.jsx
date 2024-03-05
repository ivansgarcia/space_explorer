import React from 'react';
import Preview from './Preview';
import { useState } from 'react';
import { TESelect } from 'tw-elements-react';
import imageIcon from '../images/image.svg';
import videoIcon from '../images/video.svg';
import audioIcon from '../images/audio.svg';
import { findResultsByTag } from "../controllers/searchContoller";
import { useEffect } from "react";

const Results = ({ resultList, setResultList }) => {
    const [showViewer, setShowViewer] = useState(false);
    const [mediaTypeShow, setMediaTypeShow] = useState([
        'image',
        'video',
        'audio',
    ]);

    const [cuttedList, setCuttedList] = useState(resultList);

    useEffect(() => {
        setCuttedList([...resultList].slice(0, 20));    
    }, [resultList]);


    console.log('resultList: ', resultList);
    console.log('cuttedList: ', cuttedList);

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

    const filteredList = cuttedList.filter((result) =>
        mediaTypeShow.includes(result.data[0].media_type)
    );
    console.log('filteredList: ', filteredList);

    const filterByTag = async (tag) => {
        const newList = await findResultsByTag(tag).then(r => ((r.data.collection.items)));
        console.log(newList);
        // const orderedList = newList.sort((a, b) => new Date(a.data[0].date_created) - new Date(b.data[0].date_created))
        setResultList(newList);
    }

    return (
        <main className="w-full p-4">
            <div className="w-full flex justify-between items-center">
                <TESelect
                    className="self-end my-2 text-white"
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
                
            </div>
            {filteredList.length ? (
                <div className="flex flex-col items-center gap-2">
                    {filteredList.map((result, index) => (
                        <Preview
                            filterByTag={filterByTag}
                            setShowViewer={() => setShowViewer(!showViewer)}
                            key={index}
                            result={result}
                        />
                    ))}
                    <button className="text-white bg-blue-500 rounded-2xl px-4 py-1 my-4">Show More</button>
                </div>
            ) : (
                <p>No results</p>
            )}
        </main>
    );
};

export default Results;
