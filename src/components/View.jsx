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
import { useEffect } from 'react';
import { getURLFromJson } from '../controllers/searchContoller';

const View = ({
    expand,
    showTag,
    data,
    href,
    expanded,
    setShowViewer,
    previewImage,
}) => {
    const description = data[0] ? data[0].description : null;
    const title = data[0] ? data[0].title : 'not found';
    const mediaType = data[0] ? data[0].media_type : null;
    const location = data[0] ? data[0].location : null;

    const [fullscreen, setFullscreen] = useState(false);
    const [link, setLink] = useState(null);
    const [fullscreenLink, setFullscreenLink] = useState('');

    useEffect(() => {
        const getLinks = async () => {
            const links = await getURLFromJson(href).then(
                (response) => response.data
            );
            if (mediaType === 'video') {
                const videoLink = links
                    .find(
                        (l) => l.endsWith('orig.mp4') || l.endsWith('orig.mov')
                    )
                    .replaceAll(' ', '%20');
                setLink(videoLink);
            } else if (mediaType === 'image') {
                const imageLink =
                    links.find((l) => l.endsWith('small.jpg')) ??
                    links.find((l) => l.endsWith('.jpg'));
                setFullscreenLink(links.find((l) => l.endsWith('.jpg')));
                setLink(imageLink);
            } else if (mediaType === 'audio') {
                const audioLink = links[0];
                setLink(audioLink);
            }
        };
        getLinks();
    }, [href, mediaType]);

    return (
        <Dialog
            open={expanded}
            handler={setShowViewer}
            size="lg"
            className="max-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-gray-900 to-gray-900 transition-transform duration-500"
        >
            <DialogHeader className="flex justify-between gap-4 p-2 font-open-sans sm:p-4">
                <h2 className="mt-2 self-start text-base font-bold leading-5 text-white sm:text-xl">
                    {title}
                </h2>
                <Button className="min-w-8 p-2" variant="text" onClick={expand}>
                    <img
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        src={closeIcon}
                        width={20}
                        height={20}
                        alt="close"
                    />
                </Button>
            </DialogHeader>
            <DialogBody className="p-2 sm:p-4">
                <div className="flex w-full flex-col items-center font-open-sans text-white">
                    {mediaType === 'image' && (
                        <>
                            <button onClick={() => setFullscreen(true)}>
                                <img
                                    className={`${fullscreen ? 'fixed left-0 top-0 h-screen w-full cursor-default overflow-hidden bg-black object-contain' : 'max-h-72 min-h-40 cursor-zoom-in rounded-lg hover:brightness-125'}`}
                                    src={`${fullscreen ? fullscreenLink : link ?? previewImage}`}
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
                                        className="min-w-10 p-2"
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
                        <p className="view-description my-4 max-h-44 w-full overflow-y-auto overflow-x-hidden px-2 text-sm sm:text-base">
                            {description.split('<')[0]}
                        </p>
                    )}
                    {location && (
                        <p className="text-sm font-semibold text-blue-500">
                            Location: {location}
                        </p>
                    )}
                </div>
            </DialogBody>
            {data[0].keywords && (
                <DialogFooter className="pb-4 pt-0">
                    <ul className="flex w-full flex-wrap items-center justify-center gap-2 text-sm text-white sm:text-base">
                        tags:
                        {data[0].keywords?.slice(0, 6).map((tag, index) => (
                            <li key={index}>
                                <Button
                                    color="blue-gray"
                                    size="sm"
                                    onClick={() => showTag(tag)}
                                    className="p-1.5 text-xs tracking-widest"
                                >
                                    {tag.length > 12
                                        ? tag.slice(0, 12) + '...'
                                        : tag}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </DialogFooter>
            )}
        </Dialog>
    );
};

export default View;
