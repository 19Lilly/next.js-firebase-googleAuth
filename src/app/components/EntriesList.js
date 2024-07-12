
import React, { useState, useEffect, useId } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../config';
import { getAuth } from 'firebase/auth';

const EntriesList = () => {
  const [entries, setEntries] = useState([]);

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

  useEffect(() => {
    const getDataFromDB = () => {
    const database = getDatabase();
    const referenceInDB = ref(
      database,
      `users/${auth.currentUser.uid}/timeEntries`
    );

    onValue(referenceInDB, snapshot => {
      const snapshotDoesExist = snapshot.exists();
      if (snapshotDoesExist) {
        const dataArray = Object.entries(snapshot.val());
        setEntries(dataArray);
      } else {
        console.log('no entries');
      }
    });
    }

    getDataFromDB()
    
  }, []);

  console.log(entries)

  return (
    <div className='w-full'>
      <h1 className='text-3xl text-white py-2'>Your entries:</h1>
      <ul key={useId()} className='gap-2 grid md:grid-cols-2  lg:grid-cols-4 pt-2 pb-4'>
        {entries.map((entry) => { 
          return (
            <li
              key={entry[0].id}
              className='text-white flex gap-4 p-2 bg-zinc-500 rounded-xl shadow-[0px_0px_3px_1px_#A7F3D0]'
            >
              <p>{entry[1].date}</p>
              <p>{convertTimetoString(entry[1].time)} </p>
            </li>
          );  
        })}
      </ul>
    </div>
  );
};

export default EntriesList;
