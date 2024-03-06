import React from 'react';
import Preview from './Preview';

const ResultPage = ({ list, filterByTag, showViewer, setShowViewer }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            {list.map((result, index) => (
                <Preview
                    filterByTag={filterByTag}
                    setShowViewer={() => setShowViewer(!showViewer)}
                    key={index}
                    result={result}
                />
            ))}
        </div>
    );
};

export default ResultPage;
