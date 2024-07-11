import React from 'react';


const EntriesList = ({entries}) => {
 console.log(entries)

  return (
    <ul className='bg-zinc-200 w-full p-4 rounded-xl '>
      <li>ahoj</li>
      {entries?.map(entry => {
        <li>${entry}</li>
      })}
    </ul>
  );
};

export default EntriesList;
