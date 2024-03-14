import { Button } from '@material-tailwind/react';
import React from 'react';
import { findResultsByTag } from '../controllers/searchContoller';
import { loadTags } from '../controllers/saveTagController';
import { loadViewElement } from '../controllers/saveElement';
import Preview from './Preview';
import multimediaIcon from '../images/multimedia.png';
import tagsIcon from '../images/tags.png';
import infoIcon from '../images/info.png';

const Welcome = ({ setResultList, setLoading, showViewer, setShowViewer }) => {
    const recentTags = loadTags();

    const lastViewed = loadViewElement();

    const searchTag = async (tag) => {
        setLoading(true);
        await findResultsByTag(tag)
            .then((r) => setResultList(r.data.collection.items))
            .catch((e) => console.log(e));
        setLoading(false);
    };

    return (
        <main className="flex sm:my-8 flex-col gap-20 pb-16 text-blue-gray-50">
            <section className="flex animate-appear flex-col gap-6 bg-blue-800 p-12 md:mr-[25%] sm:rounded-se-[100px] sm:py-16">
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
            {!lastViewed && !recentTags && (
                <section className="flex sm:px-32 justify-around flex-wrap gap-8">
                    <div className="flex gap-4 items-center text-blue-600 font-bold">
                        <img src={multimediaIcon} alt="multimedia" width={80} />
                        <p className="w-20">Images, Videos & Audios</p>
                    </div>
                    <div className="flex gap-4 items-center text-blue-600 font-bold">
                        <img src={tagsIcon} alt="tags" width={80} />
                        <p className="w-20">Saves last viewed tags</p>
                    </div>
                    <div className="flex gap-4 items-center text-blue-600 font-bold">
                        <img src={infoIcon} alt="info" width={80} />
                        <p className="w-20">This app is just a development exercise</p>
                    </div>
                </section>
            )}
            {lastViewed && (
                <section className="mx-2 max-w-[600px] items-center gap-16 self-center">
                    <h3 className="m-2 text-lg sm:text-2xl text-blue-600 sm:-ml-12">Last Viewed</h3>
                    <Preview
                        filterByTag={searchTag}
                        setShowViewer={() => setShowViewer(!showViewer)}
                        setLoading={setLoading}
                        result={lastViewed}
                    />
                </section>
            )}
            {recentTags && (
                <section className="mx-auto flex gap-6 px-4 text-white sm:text-lg">
                    <span className="inline-flex items-center">
                        Recent tags:{' '}
                    </span>
                    <ul className="flex flex-wrap gap-4">
                        {recentTags.map((tag, index) => (
                            <li key={index}>
                                <Button
                                    className="tracking-widest sm:text-sm"
                                    onClick={() => searchTag(tag)}
                                >
                                    {tag.length > 20 ? tag.slice(0, 20) + '...' : tag}
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
