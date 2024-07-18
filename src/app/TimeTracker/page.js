'use client';
import React, { useEffect, useState } from 'react';
import {auth} from '../config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import LogOutIcon from '../components/LogOutIcon';
import Timer from '../components/Timer';
import EntriesList from '../components/EntriesList';

const TimeTracker = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className='flex flex-col  w-full max-w-6xl mx-auto'>
      <header className='pb-6 flex flex-col items-start sm:flex-row sm:justify-between sm:gap-4 gap-0 border-b-2 border-pink-600 w-full'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 dark:text-white text-pretty w-full lg:w-[70%]'>
          Welcome to the Time Tracker App, {user ? user.displayName : 'Guest'}!
        </h1>
        <button
          onClick={handleLogout}
          className='self-end  px-8 py-2 bg-zinc-950 hover:bg-zinc-200 dark:bg-zinc-200 dark:hover:bg-zinc-950 text-2xl text-emerald-500 font-semibold rounded-full hover:shadow-[0px_0px_10px_1px_#DB2777] dark:hover:shadow-[0px_0px_10px_1px_#059669]'
        >
          <LogOutIcon />
        </button>
      </header>
      <Timer />
      <EntriesList />
    </div>
  );
};

export default TimeTracker;
