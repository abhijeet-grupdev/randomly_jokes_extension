/* global chrome */
import React from 'react';

export const PopupModel = ({ setOpenPopup, emoji, joke }) => {

    return (
        <div className="w-[400px] h-[200px]  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-8">
            <div className="flex">
              
                        <h3 className="text-xl font-semibold mb-4">😂 Joke of the day 🤣</h3>
            
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setOpenPopup(false)}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
                <p className="text-base leading-relaxed text-gray-500 mt-5">
                    {joke.map((item, index) => (
                        <p key={index}>
                            {emoji} {item.fallback}
                        </p>
                    ))}
                </p>
        </div>
    );
};
