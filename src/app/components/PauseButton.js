import React from 'react';

const PauseButton = ({ toggleTimer }) => {
  return (
    <button
      className='rounded p-2 border border-zinc-950 hover:bg-zinc-950 hover:text-emerald-600 hover:shadow-[0px_0px_10px_2px_#DB2777] dark:hover:shadow-[0px_0px_10px_2px_#10B981]'
      onClick={toggleTimer}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
        <path d='M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
      </svg>
    </button>
  );
};

export default PauseButton;
