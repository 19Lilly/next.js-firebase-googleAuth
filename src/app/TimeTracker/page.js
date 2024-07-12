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
    <div className='flex flex-col items-center w-full max-w-3xl h-screen mx-auto'>
      <header className='p-6 flex justify-between gap-10 border-b-2'>
        <h1 className='text-3xl font-bold  text-white text-wrap'>
          Welcome to the Time Tracker App, {user ? user.displayName : 'Guest'}!
        </h1>
        <button
          onClick={handleLogout}
          className=' self-center  px-8 py-2 bg-zinc-200 text-2xl text-emerald-500 font-semibold rounded-full hover:bg-zinc-950 hover:shadow-[0px_0px_10px_1px_#059669]'
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
