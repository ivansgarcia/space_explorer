import React from 'react';
import logo from '../images/rocket.png';
import nasaText from '../images/NASA.png';

const Header = ({ setResultList }) => {
    const goToHome = () => {
        setResultList(null);
        window.scrollTo(0, 0);
    };

    return (
        <header className="fixed z-10 flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-t from-black to-blue-gray-800 py-2 shadow-md shadow-blue-gray-900 sm:static sm:flex-row sm:justify-between sm:px-6 sm:py-6">
            <button
                onClick={goToHome}
                className="group flex items-center justify-center gap-2 sm:gap-6"
            >
                <img
                    className="w-8 rounded-full border border-blue-600/50 bg-gray-900 p-1 transition group-hover:border-blue-200 sm:w-14 sm:border-2"
                    src={logo}
                    alt="logo"
                    width={56}
                />
                <h1 className="bg-gradient-to-r from-white to-blue-700 bg-clip-text font-anta text-2xl font-bold tracking-wide text-transparent transition group-hover:text-blue-200 sm:text-5xl">
                    Space Explorer
                </h1>
            </button>
            <h2 className="hidden text-sm text-white sm:flex sm:items-center sm:gap-2 sm:text-base">
                <span>Explore multimedia created by </span>
                <img
                    className="w-16"
                    src={nasaText}
                    width={64}
                    height={32}
                    alt="Nasa"
                />
            </h2>
        </header>
    );
};

export default Header;
