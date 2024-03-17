import { Button } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { findResultsByTag } from '../controllers/searchContoller';
import { loadTags } from '../controllers/saveTagController';
import { loadViewElement } from '../controllers/saveElement';
import Preview from './Preview';
import multimediaIcon from '../images/multimedia.png';
import tagsIcon from '../images/tags.png';
import infoIcon from '../images/info.png';

const Welcome = ({ setResultList, setLoading, showViewer, setShowViewer, setSearchValue }) => {
    const [savedState, setSavedState] = useState({});

    useEffect(() => {
        const recentTags = loadTags();
        const lastViewed = loadViewElement();
        setSavedState({ lastViewed: lastViewed, recentTags: recentTags });
    }, []);

    const searchTag = async (tag) => {
        setSearchValue(tag);
        setLoading(true);
        await findResultsByTag(tag)
            .then((r) => setResultList(r.data.collection.items))
            .catch((e) => console.log(e));
        setLoading(false);
    };

    return (
        <main className="flex flex-col gap-20 pb-16 text-blue-gray-50">
            <section className="flex animate-appear flex-col gap-6 bg-blue-800 p-12 sm:rounded-se-[100px] sm:py-16 md:mr-[25%]">
                <h2 className="text-3xl text-white sm:text-4xl">
                    Welcome to{' '}
                    <span className="font-anta text-4xl font-semibold tracking-normal text-white sm:text-5xl">
                        Space Explorer
                    </span>
                </h2>
                <h3 className="mr-8 max-w-[600px] text-gray-200  sm:text-xl">
                    Enter your search queries into the search bar to begin
                    exploring the NASA media database (for example: Sun 2010)
                </h3>
            </section>
            <section className="flex flex-wrap justify-around gap-8 sm:px-32">
                <div className="p-2 flex items-center gap-4 font-bold text-blue-600">
                    <img className="" src={multimediaIcon} alt="multimedia" width={60} />
                    <p className="w-20">Images, Videos & Audios</p>
                </div>
                <div className="p-2 flex items-center gap-4 font-bold text-blue-600">
                    <img src={tagsIcon} alt="tags" width={60} />
                    <p className="w-20">Saves last viewed tags</p>
                </div>
                <div className="p-2 flex items-center gap-4 font-bold text-blue-600">
                    <img src={infoIcon} alt="info" width={60} />
                    <p className="w-20">
                        This app is just a development exercise
                    </p>
                </div>
            </section>
            {savedState.lastViewed && (
                <section className="mx-2 max-w-[600px] items-center gap-16 self-center">
                    <h3 className="m-2 text-lg text-blue-600 sm:-ml-12 sm:text-2xl">
                        Last Viewed
                    </h3>
                    <Preview
                        filterByTag={searchTag}
                        setShowViewer={() => setShowViewer(!showViewer)}
                        setLoading={setLoading}
                        result={savedState.lastViewed}
                    />
                </section>
            )}
            {savedState.recentTags && (
                <section className="mx-auto flex gap-6 px-4 text-white sm:text-lg">
                    <span className="inline-flex items-center">
                        Recent tags:{' '}
                    </span>
                    <ul className="flex flex-wrap gap-4">
                        {savedState.recentTags.map((tag, index) => (
                            <li key={index}>
                                <Button
                                    className="tracking-widest sm:text-sm"
                                    onClick={() => searchTag(tag)}
                                >
                                    {tag.length > 20
                                        ? tag.slice(0, 20) + '...'
                                        : tag}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
};

export default Welcome;
