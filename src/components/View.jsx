import React from 'react';
import ReactPlayer from 'react-player';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react';
import { useState } from 'react';
import closeIcon from '../images/close.png';

const View = ({
    expand,
    showTag,
    data,
    link,
    fullscreenLink,
    expanded,
    setShowViewer,
}) => {
    const description = data[0] ? data[0].description : null;
    const title = data[0] ? data[0].title : 'not found';
    const mediaType = data[0] ? data[0].media_type : null;
    const location = data[0] ? data[0].location : null;

    const [fullscreen, setFullscreen] = useState(false);

    return (
        <Dialog
            open={expanded}
            handler={setShowViewer}
            size="md"
            className="max-h-screen bg-blue-800 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-gray-900 to-gray-900 p-2 transition-transform duration-500"
        >
            <DialogHeader className="flex justify-between gap-4 font-open-sans ">
                <h2 className="mt-2 self-start text-lg font-bold leading-5 text-white sm:text-xl">
                    {title}
                </h2>
                <div className="flex items-center justify-center self-start">
                    <Button
                        className="h-4 w-4 p-0 sm:h-6 sm:w-6"
                        variant="text"
                        onClick={expand}
                    >
                        <img
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            src={closeIcon}
                            width={20}
                            height={20}
                            alt="close"
                        />
                    </Button>
                </div>
            </DialogHeader>
            <DialogBody className="p-2">
                <div className="flex w-full flex-col items-center gap-4 font-open-sans text-white">
                    {mediaType === 'image' && (
                        <>
                            <button onClick={() => setFullscreen(true)}>
                                <img
                                    className={`${fullscreen ? 'fixed left-0 top-0 h-screen w-screen bg-black object-contain cursor-default' : 'max-h-80 min-h-44 rounded-lg hover:brightness-125 cursor-zoom-in'}`}
                                    src={`${fullscreen ? fullscreenLink : link}`}
                                    alt={
                                        (data[0]?.keywords &&
                                            data[0].keywords[0]) ??
                                        'preview'
                                    }
                                />
                            </button>
                            {fullscreen && (
                                <div className="fixed right-0 top-0 m-3 flex items-center justify-center">
                                    <Button
                                        className="p-0"
                                        variant="text"
                                        onClick={() => setFullscreen(false)}
                                    >
                                        <img
                                            className="h-4 w-4 sm:h-6 sm:w-6"
                                            src={closeIcon}
                                            width={30}
                                            alt="close"
                                        />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                    {mediaType === 'audio' && (
                        <audio className="my-16" src={link} autoPlay controls />
                    )}
                    {mediaType === 'video' && (
                        <ReactPlayer
                            url={link}
                            controls
                            playing
                            width={'100%'}
                            height={'auto'}
                        />
                    )}
                    {mediaType !== 'audio' && description && (
                        <p className="view-description max-h-48 w-full overflow-y-auto overflow-x-hidden px-2 text-sm sm:max-h-64 sm:text-base">
                            {description.split('<')[0]}
                        </p>
                    )}
                    {location && (
                        <p className="text-sm">Location: {location}</p>
                    )}
                </div>
            </DialogBody>
            <DialogFooter >
                {data[0].keywords && (
                    <ul className="flex w-full flex-wrap items-center justify-center gap-2 text-sm text-white sm:text-base">
                        tags:
                        {data[0].keywords?.slice(0, 6).map((tag, index) => (
                            <li key={index}>
                                <Button
                                    color="blue-gray"
                                    size="sm"
                                    onClick={() => showTag(tag)}
                                    className="tracking-widest"
                                >
                                    {tag.length > 20 ? tag.slice(0, 20) + '...' : tag}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </DialogFooter>
        </Dialog>
    );
};

export default View;
