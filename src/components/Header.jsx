import React from 'react';
import logo from '../images/rocket1.png';

const Header = () => {
    return (
        <header className="w-full flex flex-col justify-center items-center gap-6 backdrop-blur-sm bg-slate-600/50 text-center p-8">
            <div className="flex justify-center items-center gap-6">
                <img className=" bg-slate-300 border rounded-full p-2 w-11 border-blue-600" src={logo} alt="logo" width={35}/>
                <h1 className="font-anta text-3xl tracking-wide font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-700">Space Explorer</h1>
            </div>
            <h2 className="text-white text-sm">Explore the media content provided by the NASA</h2>
        </header>
    )
}

export default Header