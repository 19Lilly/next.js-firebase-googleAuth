'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/app/config.js'
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import TimeTracker from './TimeTracker/page.jsx';
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
    <div className='flex flex-col items-center justify-center h-screen'>
      {user ? (
        <TimeTracker />
      ) : (
        <>
          <h1 className='text-emerald-600 text-6xl'>Time Tracker App</h1>
          <h2 className='text-white text-2xl'>
            Know how long exactly it takes...{' '}
          </h2>
          <button
            className='py-2 px-6 mt-6 flex gap-2 items-center bg-zinc-200 text-2xl text-emerald-500 font-semibold rounded-full hover:bg-zinc-950 hover:shadow-[0px_0px_10px_1px_#059669]'
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
