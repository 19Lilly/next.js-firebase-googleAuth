'use client'
import React, { useState, useEffect } from 'react'
import { MdOutlineWbSunny } from 'react-icons/md';
import { LuMoonStar } from 'react-icons/lu';

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
      setDarkMode(prevMode => !prevMode);
    };

    return (
      <button
        onClick={toggleDarkMode}
        className='px-4 py-2 rounded-md bg-gray-800 text-white'
      >
        {darkMode ? <MdOutlineWbSunny /> : <LuMoonStar />}
      </button>
    );


}

export default ThemeSwitcher;