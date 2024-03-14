import * as React from 'react';
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import { useState } from 'react';
import Results from '../components/Results';
import Welcome from '../components/Welcome';
import Loading from '../components/Loading';
import nasaLogo from '../images/NASA_logo.svg';

const IndexPage = () => {
    const [resultList, setResultList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showViewer, setShowViewer] = useState(false);

    const date = new Date().getFullYear();

    return (
        <div
            className={`flex min-h-screen w-full flex-col gap-6 bg-black  font-open-sans`}
        >
            <Header setResultList={setResultList} />
            <Navigator setResultList={setResultList} setLoading={setLoading} />
            {loading && <Loading />}
            {resultList && !loading ? (
                <Results
                    resultList={resultList}
                    setLoading={setLoading}
                    setResultList={setResultList}
                />
            ) : (
                !loading && (
                    <Welcome
                        showViewer={showViewer}
                        setShowViewer={setShowViewer}
                        setResultList={setResultList}
                        setLoading={setLoading}
                    />
                )
            )}
            <div className="text-white -mb-6 text-xs self-end mx-2">icons provided by <span className="text-blue-400" >Freepik</span></div>
            <footer className="flex items-center justify-between bg-gradient-to-b from-black/60 to-blue-gray-900/60 px-4 pb-3 pt-4 text-[10px] text-white sm:px-8 sm:pb-4 sm:pt-8 sm:text-base">
                <span className="text-white">{date}</span>
                <div className="flex items-center sm:gap-1">
                    <span>Content provided by the</span>
                    <img
                        className="w-8 sm:w-10"
                        src={nasaLogo}
                        width={32}
                        alt="Nasa logo"
                    />
                    <span> Image and Video Library</span>
                </div>
            </footer>
        </div>
    );
};

export default IndexPage;

export const Head = () => (
    <>
        <html lang="en" />
        <title>Space Explorer</title>;
        <meta name="description" content="Explore the NASA media database, images, videos and audios about space exploration."/>
    </>
);
