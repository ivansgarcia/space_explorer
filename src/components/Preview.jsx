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
import ReactPlayer from "react-player";

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
        setExpanded(false);
        filterByTag(tag);
    };

    return (
        <>
            <div
                onClick={expand}
                className="w-full h-64 p-4 flex flex-col items-center gap-2 border border-blue-500 rounded-lg text-white"
            >
                <figure className="w-full relative max-h-40 flex justify-center flex-1">
                    <img
                        className="absolute left-0 w-8 p-1 m-2 rounded-full bg-white/70"
                        src={mediaIcon[mediaType]}
                        alt="media type"
                    />
                    <img
                        className={`h-full ${
                            mediaType === 'audio' && 'w-16'
                        } object-contain`}
                        loading="lazy"
                        src={mediaType === 'audio' ? speakerIcon : previewImage}
                        alt="preview"
                    />
                </figure>
                <p className="text-[10px] text-right self-end text-blue-500">
                    {date.slice(0, 4)}
                </p>
                <p className="self-start">{title ?? ''}</p>
            </div>

            <TEModal show={expanded} setShow={setShowViewer}>
                {/* <div className="m-6"> */}
                <TEModalDialog
                    centered
                    style={{ backgroundColor: '#000000' }}
                    size="fullscreen"
                >
                    <TEModalContent>
                        <div className="flex flex-col justify-around items-center m-4 gap-4">
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
                                {mediaType === 'image' && <img src={link} />}
                                {mediaType === 'audio' && (
                                    <audio src={link} autoPlay controls />
                                )}
                                {mediaType === 'video' && (
                                    <div className="w-full p-4 ">
                                        {/* <iframe
                                            className="w-full h-full rounded-lg"
                                            src={link}
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            webkitallowfullscreen="true"
                                            mozallowfullscreen="true"
                                            allowFullScreen
                                            
                                        /> */}
                                        {/* <video autoPlay controls muted>
                                            <source
                                                src={link}
                                                type="video/mp4"
                                            />
                                        </video> */}
                                        <ReactPlayer url={link} controls playing style={{width: '100%'}} />
                                    </div>
                                )}
                                <h2 className="font-bold my-2 self-start">
                                    {title}
                                </h2>
                                {mediaType === 'video' && (
                                    <p className="text-sm max-h-64 overflow-scroll">
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
                {/* </div> */}
            </TEModal>
        </>
    );
};

export default Preview;
