import React from 'react';
import loadingIcon from '../images/satellite.png';

const Loading = () => {
    return (
        <div className="-mt-32 flex h-full w-full flex-1 animate-pulse flex-col items-center justify-center gap-6">
            <h3 className="text-xl text-white sm:text-2xl">Loading...</h3>
            <figure
                className={`w-24 h-24 flex justify-center items-center rounded-full bg-blue-gray-900 dark:bg-black sm:w-36 sm:h-36`}
            >
                <img
                    className="sm:w-20"
                    src={loadingIcon}
                    width={60}
                    alt="loading"
                />
            </figure>
        </div>
    );
};

export default Loading;
