import React from 'react';
import Preview from './Preview';

const ResultPage = ({
    list,
    filterByTag,
    showViewer,
    setShowViewer,
    setLoading,
}) => {
    return (
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
            {list.map((result, index) => (
                <Preview
                    filterByTag={filterByTag}
                    setShowViewer={setShowViewer}
                    setLoading={setLoading}
                    key={index}
                    result={result}
                />
            ))}
        </div>
    );
};

export default ResultPage;
