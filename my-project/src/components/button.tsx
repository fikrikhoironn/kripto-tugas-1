'use client';

import React from 'react';
import clsx from 'clsx';
interface ButtonTextProps {
    text?: string;
    onClick?: () => void;
}


const ButtonText: React.FC<ButtonTextProps> = ({ text, onClick }) => {
    // @ts-ignore
    return (
        <>
            <div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={onClick}
                >
                    {text}
                </button>
            </div>
        </>
    );
};

export default ButtonText;
