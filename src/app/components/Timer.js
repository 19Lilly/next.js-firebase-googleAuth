'use client';

import { useEffect, useState } from 'react';
import PauseButton from './PauseButton';
import StartButton from './StartButton';
import { auth } from '../config';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';
import { clearInterval, setInterval } from 'worker-timers';

const Timer = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  const toggleTimer = () => {
    setTimerOn(prevVal => !prevVal);
  };

  const convertTimetoString = time => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;
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
    const userInputTime = time;
    const referenceInDB = ref(
      database,
      `users/${auth.currentUser.uid}/timeEntries`
    );

    const timeEntryObject = {
      date: date,
      time: userInputTime,
      createdAt: serverTimestamp(),
    };
    if (time !== 0) {
      push(referenceInDB, timeEntryObject);
      setTime(0);
      setTimerOn(false);
    } else {
      window.alert('please enter a valid time entry');
    }
  };

  return (
    <div className='bg-emerald-200 mt-6 p-4 w-full rounded-xl flex flex-col min-[450px]:flex-row justify-between gap-6 items-center text-2xl '>
      <div>{date}</div>
      <div className=' sm:mr-auto'>{convertTimetoString(time)}</div>
      <div className='flex gap-2 '>
        {timerOn && <PauseButton toggleTimer={toggleTimer} />}
        {!timerOn && <StartButton toggleTimer={toggleTimer} />}
        <button
          className='rounded p-2 border font-semibold border-zinc-950 hover:bg-zinc-950 hover:text-emerald-600 hover:shadow-[0px_0px_10px_2px_#10B981]'
          onClick={saveData}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Timer;
