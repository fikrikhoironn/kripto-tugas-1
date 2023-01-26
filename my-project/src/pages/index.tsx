import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="bg-black flex flex-col justify-center items-center h-screen gap-6">
        <div className="text-4xl font-extrabold text-blue-700">
          Online Decrypt Encrypt
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="font-helvetica">Algorithms</div>
          <div className="dropdown inline-block relative">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown button{" "}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-200 pt-2">
              <li className="">
                <a
                  className="rounded-t bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                  href="#"
                >
                  Vigenere Cipher
                </a>
              </li>
              <li className="">
                <a
                  className=" bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                  href="#"
                >
                  Varian Vigenere Cipher
                </a>
              </li>
              <li className="">
                <a
                  className=" bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                  href="#"
                >
                  Extended Vigenere Cipher
                </a>
              </li>
              <li className="">
                <a
                  className=" bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                  href="#"
                >
                  Affine Cipher
                </a>
              </li>
              <li className="">
                <a
                  className=" bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                  href="#"
                >
                  Playfair Cipher
                </a>
              </li>
              <li className="">
                <a
                  className="rounded-b bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                  href="#"
                >
                  Hill Cipher
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <label
            htmlFor="key"
            className="block text-white text-sm font-medium mb-2"
          >
            Enter Key
          </label>
          <input
            type="text"
            className="border w-max rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
        </div>
      </div>
    </>
  );
}
