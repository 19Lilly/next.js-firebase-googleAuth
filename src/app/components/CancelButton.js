import React from 'react';

const CancelButton = ({ handleDoubleClick }) => {
  return (
    <button
      className='rounded p-2 border border-zinc-950 hover:bg-zinc-950 hover:text-emerald-600 hover:shadow-[0px_0px_10px_2px_#10B981]'
      onDoubleClick={handleDoubleClick}
    >
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          <path
            d='M10 11V17'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M14 11V17'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M4 7H20'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </g>
      </svg>
    </button>
  );
};

export default CancelButton;
