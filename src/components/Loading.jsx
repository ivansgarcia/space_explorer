import React from 'react';
import loadingIcon from '../images/satellite.png';

const Loading = () => {
    return (
        <div className="z-10 -mt-32 flex h-full w-full flex-1 flex-col justify-center bg-light-black">
            <div className="flex animate-pulse-fast flex-col items-center justify-center gap-6">
                <h3 className="text-xl text-white sm:text-2xl">Loading...</h3>
                <figure
                    className={`flex h-24 w-24 items-center justify-center rounded-full bg-blue-gray-900 dark:bg-black sm:h-36 sm:w-36`}
                >
                    <img
                        className="sm:w-20"
                        src={loadingIcon}
                        width={60}
                        alt="loading"
                    />
                </figure>
            </div>
        </div>
    );
};

export default Loading;
