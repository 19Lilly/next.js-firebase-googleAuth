'use client';

import { useEffect, useState, useRef } from 'react';
import PauseButton from './PauseButton';
import StartButton from './StartButton';
import CancelButton from './CancelButton';
import SaveButton from './SaveButton';
import { auth } from '../config';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';
import { clearInterval, setInterval } from 'worker-timers';

const REFRESH_FREQ = 1000;

const Timer = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'));

  const watchDogRef = useRef(0);
  const [paused, setPaused] = useState(true);
  const [timer, setTimer] = useState({
    timerValue: 0,
    lastTime: Date.now(),
  });

  const refreshTimer = () => {
    const now = Date.now();
    setTimer(ps => ({
      timerValue: ps.timerValue + (now - ps.lastTime),
      lastTime: now,
    }));
  };

  const resetTimer = () => {
    setTimer(() => ({
      timerValue: 0,
      lastTime: Date.now(),
    }));
  };

  useEffect(() => {
    // Starting timer for the first time.
    if (!watchDogRef.current && !paused) {
      watchDogRef.current = setInterval(refreshTimer, REFRESH_FREQ);
    }
  }, []);

  useEffect(() => {
    // paused turned true, so we clear the interval.
    if (paused) {
      // Clearing the interval.
      clearInterval(watchDogRef.current);
      // Clearing the reference to the interval.
      watchDogRef.current = 0;
      // Updating the timer with remaining of the second when the value is set to pause as the timer will not be updated.
      refreshTimer();
    }

    // paused turned false, so we resume the timer
    else if (!watchDogRef.current) {
      // Setting last time to now() since we need to calculate the time from the moment timer was resumed.
      setTimer(ps => ({ ...ps, lastTime: Date.now() }));
      // Creating creating the watchdog interval.
      watchDogRef.current = setInterval(refreshTimer, REFRESH_FREQ);
    }
  }, [paused]);

  const convertTimetoString = time => {
    let time1 = Math.floor(time / 1000);
    let hours = Math.floor(time1 / 3600);
    let minutes = Math.floor((time1 - hours * 3600) / 60);
    let seconds = time1 - hours * 3600 - minutes * 60;
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  };

  const saveData = () => {
    const database = getDatabase();
    const userInputTime = Math.round(timer.timerValue / 1000);
    const referenceInDB = ref(
      database,
      `users/${auth.currentUser.uid}/timeEntries`
    );

    const timeEntryObject = {
      date: date,
      time: userInputTime,
      createdAt: serverTimestamp(),
    };
    if (timer.timerValue !== 0) {
      push(referenceInDB, timeEntryObject);
      resetTimer();
    } else {
      window.alert('please enter a valid time entry');
    }
  };

  return (
    <div className='bg-emerald-400 dark:bg-emerald-200 mt-6 p-6 w-full rounded-xl flex flex-col min-[450px]:flex-row justify-between gap-6 items-center text-3xl md:text-4xl'>
      <div>{date}</div>
      <div className=' sm:mr-auto'>{convertTimetoString(timer.timerValue)}</div>
      <div className='flex gap-2 '>
        {!paused && (
          <PauseButton toggleTimer={() => setPaused(prevVal => !prevVal)} />
        )}
        {paused && (
          <StartButton toggleTimer={() => setPaused(prevVal => !prevVal)} />
        )}
      <SaveButton handleClick={saveData}/> 
      <CancelButton handleDoubleClick={resetTimer} />
      </div>
    </div>
  );
};

export default Timer;
