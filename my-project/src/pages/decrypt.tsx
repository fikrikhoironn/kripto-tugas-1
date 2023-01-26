import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="bg-black flex flex-col justify-center items-center h-screen gap-6">
        <div className="text-4xl font-extrabold text-blue-600">Dekripsi</div>
        <div className="flex flex-col justify-center items-center">
          <div className="dropdown inline-block relative">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Algorithms{" "}
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
        <div className="flex flex-col justify-center items-center">
          <label
            htmlFor="key"
            className="block text-white text-sm font-medium mb-2 o"
          >
            Enter Key
          </label>
          <form action="">
            <textarea
              name="key"
              id="key"
              cols="60"
              rows="5"
              className="overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
            ></textarea>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col justify-center items-center">
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
        </div>
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Dekripsi{" "}
          </button>
        </div>
        <div className="flex flex-row gap-8 w-screen justify-center">
          <div>
            <div className="text-white mb-2 font-medium">Ciphertext</div>
            <div className="relative bg-white w-[500px] h-[400px] rounded-lg shadow overflow-y-auto text-[12px] font-helvetica"></div>
          </div>
          <div>
            <div className="text-white mb-2 font-medium">Plaintext</div>
            <div className="relative bg-white w-[500px] h-[400px] rounded-lg shadow overflow-y-auto text-[12px] font-helvetica"></div>
          </div>
        </div>
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Download Plaintext
          </button>
        </div>
      </div>
    </>
  );
}
