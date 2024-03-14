import React from 'react';
import { useState } from 'react';
import speakerIcon from '../images/audio.png';
import { getURLFromJson } from '../controllers/searchContoller';
import imageIcon from '../images/image.svg';
import videoIcon from '../images/video.svg';
import audioIcon from '../images/audio.svg';
import { saveTag } from '../controllers/saveTagController';
import { saveViewElement } from '../controllers/saveElement';
import View from './View';

const Preview = ({ result, setShowViewer, filterByTag, setLoading }) => {
    const [expanded, setExpanded] = useState(false);
    const { data, href, links } = result;
    const previewImage = links && links[0] ? links[0].href : null;
    const date = data[0] ? data[0].date_created : 'not found';
    const title = data[0] ? data[0].title : 'not found';
    const mediaType = data[0] ? data[0].media_type : null;

    const [link, setLink] = useState('');
    const [fullscreenLink, setFullscreenLink] = useState('');

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
            saveViewElement(result);
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
                const fullscreenLink = links.find((l) => l.endsWith('.jpg'));
                setLink(imageLink);
                setFullscreenLink(fullscreenLink);
            } else if (mediaType === 'audio') {
                const audioLink = links[0];
                setLink(audioLink);
            }
            setExpanded(true);
        }
    };

    const showTag = (tag) => {
        window.scrollTo(0, 0);
        saveTag(tag);
        setLoading(true);
        setLink('');
        setExpanded(false);
        filterByTag(tag);
    };

    return (
        <>
            <button
                onClick={expand}
                className="relative flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-lg border bg-gradient-to-br from-light-black to-blue-gray-dark p-4 text-white transition border-blue-600/30 hover:brightness-125 sm:h-auto sm:w-auto sm:rounded hover:border-white/50"
            >
                <figure className="h-48 sm:h-64">
                    <img
                        className="absolute left-3 top-3 w-8 rounded-full bg-white/70 p-1"
                        src={mediaIcon[mediaType]}
                        alt="media type"
                    />
                    <img
                        className={`${
                            mediaType === 'audio' && 'p-16'
                        } mx-auto h-full w-auto rounded-lg`}
                        loading="lazy"
                        src={mediaType === 'audio' ? speakerIcon : previewImage}
                        alt="preview"
                    />
                </figure>
                <div className="flex w-full justify-between gap-4 pt-4">
                    <p className="h-auto max-h-24 text-left">
                        {title?.length > 40 ? title.slice(0, 40) : title}
                    </p>
                    <p className="text-right text-sm  text-blue-500">
                        {date.slice(0, 4)}
                    </p>
                </div>
            </button>
            <View
                expand={expand}
                showTag={showTag}
                data={data}
                link={link}
                fullscreenLink={fullscreenLink}
                expanded={expanded}
                setShowViewer={setShowViewer}
            />
        </>
    );
};

export default Preview;
