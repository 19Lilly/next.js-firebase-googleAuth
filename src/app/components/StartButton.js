import React from 'react'

const StartButton = ({toggleTimer}) => {
  return (
    <button
      className='rounded p-2 border border-zinc-950 hover:bg-zinc-950 hover:text-emerald-600 hover:shadow-[0px_0px_10px_2px_#10B981]'
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
        <path d='M7 4v16l13 -8z' />
      </svg>
    </button>
  );
}

export default StartButton