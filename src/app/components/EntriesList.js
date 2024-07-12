
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
    <div className='w-full bg-zinc-400'>
      <h1>EntriesList</h1>
      <ul key={useId()} className=''>
        {entries.map((entry) => { 
          return (
            <li key={entry[0].id} className='bg-white text-black flex gap-4'>
              <p>{entry[1].date}</p>
              <p>{convertTimetoString(entry[1].time)} </p>
            </li>
          )  
        })}
      </ul>
    </div>
  );
};

export default EntriesList;
