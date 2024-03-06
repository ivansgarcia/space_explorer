import * as React from 'react';
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import { useState } from 'react';
import Results from '../components/Results';
import '../../node_modules/tw-elements-react/dist/css/tw-elements-react.min.css';
import loadingIcon from '../images/satellite.png';

const IndexPage = () => {
    const [resultList, setResultList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="min-h-screen flex flex-col w-full bg-[url('../images/space.jpg')] bg-cover">
            <Header />
            <Navigator
                setResultList={setResultList}
                setIsLoading={setIsLoading}
            />
            {isLoading ? (
                <div className="flex-1 animate-pulse w-full h-full flex flex-col gap-6 justify-center items-center">
                    <h3 className="text-white text-xl">Loading...</h3>
                    <img
                        className="w-24 object-contain bg-white rounded-full p-4"
                        src={loadingIcon}
                        width={80}
                    />
                </div>
            )
            :
            (
            <Results resultList={resultList} setResultList={setResultList} />
            )}
        </div>
    );
};

export default IndexPage;

export const Head = () => <title>Space Explorer</title>;
