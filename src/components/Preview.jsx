import React from 'react';
import { useState } from 'react';
import speakerIcon from '../images/speaker.png';
import { getURLFromJson } from '../controllers/searchContoller';
import imageIcon from '../images/image.svg';
import videoIcon from '../images/video.svg';
import audioIcon from '../images/audio.svg';
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from 'tw-elements-react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';

const Preview = ({ result, setShowViewer, filterByTag }) => {
    const [expanded, setExpanded] = useState(false);
    const { data, href, links } = result;
    const previewImage = links && links[0] ? links[0].href : null;
    const date = data[0] ? data[0].date_created : 'not found';
    const title = data[0] ? data[0].title : 'not found';
    const mediaType = data[0] ? data[0].media_type : null;
    const description = data[0] ? data[0].description : null;

    const [link, setLink] = useState('');

    const mediaIcon = {
        image: imageIcon,
        video: videoIcon,
        audio: audioIcon,
    };

    const expand = async () => {
        if (expanded) {
            setLink('');
            setExpanded(false);
        } else {
            const links = await getURLFromJson(href).then(
                (response) => response.data
            );
            if (mediaType === 'video') {
                const videoLink = links
                    .find((l) => l.endsWith('orig.mp4'))
                    .replaceAll(' ', '%20');
                setLink(videoLink);
            } else if (mediaType === 'image') {
                const imageLink = links[0];
                setLink(imageLink);
            } else if (mediaType === 'audio') {
                const audioLink = links[0];
                setLink(audioLink);
            }
            setExpanded(true);
        }
    };

    const showTag = (tag) => {
        setLink('');
        setExpanded(false);
        filterByTag(tag);
    };

    return (
        <>
            <div
                onClick={expand}
                className="w-full relative h-64 p-4 flex flex-col justify-around items-center border border-blue-500 rounded-lg text-white"
            >
                <figure className="w-full max-h-32 flex-1">
                    <img
                        className="absolute left-2 top-2 w-8 p-1 rounded-full bg-white/70"
                        src={mediaIcon[mediaType]}
                        alt="media type"
                    />
                    <img
                        className={`${
                            mediaType === 'audio' ? 'w-16' : 'w-auto'
                        } object-contain rounded-lg h-full mx-auto`}
                        loading="lazy"
                        src={mediaType === 'audio' ? speakerIcon : previewImage}
                        alt="preview"
                    />
                </figure>
                <p className="text-[10px] text-right self-end text-blue-500">
                    {date.slice(0, 4)}
                </p>
                <p className="self-start h-auto max-h-24 overflow-hidden">{title ?? ''}</p>
            </div>

            <TEModal show={expanded} setShow={setShowViewer} className="p-2 ">
                <TEModalDialog
                    centered
                    style={{ backgroundColor: '#00000075', padding: 0, width: '100%' }}
                    size="fullscreen"
                >
                    <TEModalContent>
                        <div className="max-h-screen flex flex-col justify-around items-center m-4 gap-4">
                            <button className="self-end" onClick={expand}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="w-full flex flex-col items-center gap-4">
                                {mediaType === 'image' && <img className="max-h-80 rounded-lg" src={link} />}
                                {mediaType === 'audio' && (
                                    <audio src={link} autoPlay controls />
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
                                <h2 className="font-bold mt-2 self-start h">
                                    {title}
                                </h2>
                                {mediaType === 'video' && (
                                    <p className="text-sm max-h-48 overflow-auto pr-2">
                                        {description}
                                    </p>
                                )}
                                <ul className="flex gap-2 items-center flex-wrap text-sm">
                                    tags:
                                    {data[0].keywords?.map((tag, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => showTag(tag)}
                                                className="rounded-xl bg-slate-200 px-2"
                                            >
                                                {tag}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </>
    );
};

export default Preview;
