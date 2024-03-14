export const saveTag = (tag) => {
    if (typeof window !== 'undefined') {
        const savedTags = JSON.parse(localStorage.getItem('savedTags')) ?? [];
        const newRecentTags = savedTags.includes(tag) ? savedTags : [tag, ...savedTags].slice(0, 8);
        localStorage.setItem('savedTags', JSON.stringify(newRecentTags));
    }
}

export const loadTags = () => {
    return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('savedTags')) : null;
}
