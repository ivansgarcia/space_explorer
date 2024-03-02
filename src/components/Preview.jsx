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

const Preview = ({ result, setShowViewer }) => {
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
    }

    const expand = () => {
        if (expanded) {
            // document.body.style.overflow = '';
            setExpanded(false);
        } else {
            getURLFromJson(href).then((response) => setLink(response.data));
            // document.body.style.overflow = 'hidden';
            setExpanded(true);
        }
    };

    return (
        <>
            <div
                onClick={expand}
                className="w-full h-full p-4 flex flex-col items-center gap-4 bg-slate-200"
            >
                <figure className="relative">
                    <img className="absolute left-0 w-8 p-1 m-2 rounded-full opacity-70 bg-slate-300" src={mediaIcon[mediaType]} alt="media type" />
                    <img
                        loading="lazy"
                        src={mediaType === 'audio' ? speakerIcon : previewImage}
                        alt="preview"
                    />
                </figure>
                <p className="text-xs text-right">{date}</p>
                <p>{title ?? ''}</p>
            </div>

            <TEModal show={expanded} setShow={setShowViewer}>
                <TEModalDialog centered>
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
                            <div className="w-full bg-white flex flex-col items-center gap-4">
                                {mediaType === 'image' && <img src={link[2]} />}
                                {mediaType === 'video' && (
                                    <div className="w-full bg-slate-400 rounded-lg">
                                        <iframe
                                            className="w-full"
                                            src={link[3]}
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            webkitallowfullscreen="true"
                                            mozallowfullscreen="true"
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                                <h2 className="font-bold my-2 self-start">
                                    {title}
                                </h2>
                                {mediaType === 'video' && (
                                    <p className="text-sm">{description}</p>
                                )}
                                <ul className="flex gap-2 items-center flex-wrap text-sm">
                                    tags:
                                    {data[0].keywords?.map((tag, index) => (
                                        <li key={index} className="rounded-xl bg-slate-200 px-2">
                                            {tag}
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
