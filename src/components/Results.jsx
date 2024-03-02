import React from 'react';
import Preview from './Preview';
import { useState } from 'react';
import { TESelect } from "tw-elements-react";
import { useRef } from "react";
import imageIcon from '../images/image.svg';
import videoIcon from '../images/video.svg';
import audioIcon from '../images/audio.svg';

const Results = ({ resultList }) => {
    const [showViewer, setShowViewer] = useState(false);
    // console.log('result', resultList);
    const filterRef = useRef(null);
    const filterData = [
        {
            text: "Images",
            value: 1,
            icon: imageIcon
        },
        {
            text: "Video",
            value: 2,
            icon: videoIcon
        },
        {
            text: "Audio",
            value: 3,
            icon: audioIcon
        },
    ]

    return resultList.length ? (
        <main className="w-full flex flex-col gap-2 items-center p-4">
            <TESelect ref={filterRef} className="self-end my-2" data={filterData} multiple label="Show" size="sm" />
            {resultList.map((result, index) => (
                <Preview
                    setShowViewer={() => setShowViewer(!showViewer)}
                    key={index}
                    result={result}
                />
            ))}
        </main>
    ) : (
        <p>No results</p>
    );
};

export default Results;
