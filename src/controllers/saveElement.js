export const saveViewElement = (element) => {
    typeof window !== 'undefined' && localStorage.setItem('lastViewed', JSON.stringify(element));
}

export const loadViewElement = () => {
    return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lastViewed')) : null;
}