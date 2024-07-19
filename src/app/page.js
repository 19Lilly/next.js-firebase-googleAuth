'use client';
import { useState, useEffect } from 'react';
import { auth } from '../app/config';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import TimeTracker from './TimeTracker/page.js';
import GoogleLogo from './components/GoogleLogo.js';

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/TimeTracker');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-center h-[85vh]'>
        {user ? (
        <TimeTracker />
      ) : (
        <>
          <h1 className='text-emerald-600 text-6xl md:text-7xl lg:text-8xl mb-2 md:mb-0'>
            Time Tracker App
          </h1>
          <h2 className='text-pink-600 font-semibold dark:text-white text-2xl md:text-3xl lg:text-4xl'>
            Know how long exactly it takes...
          </h2>
          <button
            className='py-2 px-6 mt-6 flex gap-2 items-center text-2xl text-emerald-500 font-semibold rounded-full bg-zinc-950 hover:bg-zinc-200 hover:shadow-[0px_0px_10px_1px_#DB2777] dark:bg-zinc-200 dark:hover:bg-zinc-950 dark:hover:shadow-[0px_0px_10px_1px_#059669]'
            onClick={signInWithGoogle}
          >
            Sign In with <GoogleLogo />
          </button>
        </>
      )}
    </div>  
  );
};

export default Home;
