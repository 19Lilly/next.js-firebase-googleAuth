import React, { useState, useEffect, useId } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from '../config';
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
      }
    });
  }, []);

  const deleteEntry = id => {
    const database = getDatabase();
    const referenceInDB = ref(
      database,
      `users/${auth.currentUser.uid}/timeEntries/${id}`
    );
    const refInDB = ref(database, `users/${auth.currentUser.uid}/timeEntries`)
    onValue(refInDB, snapshot => {
       const snapshotDoesExist = snapshot.exists();
      if (snapshotDoesExist) {
        const dataArray = Object.entries(snapshot.val());
          setEntries(dataArray);
      } else {
        setEntries([])
      }
    })

    remove(referenceInDB);
    setEntries
    
  };

  return (
    <div className='w-full'>
      <h1 className='text-3xl dark:text-white py-2'>Your entries:</h1>
      <ul
        key={useId()}
        className='gap-2 grid md:grid-cols-2 lg:grid-cols-3 pt-2 pb-4'
      >
        {entries.length !== 0 ? (
          entries.map(entry => {
            return (
              <li
                key={entry[0]}
                className='text-white flex justify-between gap-6 items-center p-3 bg-zinc-500 rounded-xl shadow-[0px_0px_3px_1px_#059669] dark:shadow-[0px_0px_3px_1px_#DB2777]'
              >
                <p>{entry[1].date}</p>
                <p className='mr-auto '>
                  {convertTimetoString(entry[1].time)}
                </p>
                <button
                  onDoubleClick={() => deleteEntry(entry[0])}
                  className='size-8 flex items-center justify-center border-l border-emerald-950 hover:text-emerald-400 hover:scale-105'
                >
                  &times;
                </button>
              </li>
            );
          })
        ) : (
          <h2 className='p-4 bg-white rounded-lg'>No entries yet</h2>
        )}
      </ul>
    </div>
  );
};

export default EntriesList;
