import Head from "next/head";
import Image from "next/image";
import {Inter} from "@next/font/google";
import styles from "@/styles/Home.module.css";
import React, {useState} from "react";
import ButtonText from "@/components/button";
import Navbar from "@/components/navbar";
import axios from "axios";
import {string} from "prop-types";

const inter = Inter({subsets: ["latin"]});
const algorithms = [
    {id: 0, label: "Vigenere Cipher standard", endpoint: "vigenere-simple"},
    {id: 1, label: "Varian Vigenere Cipher", endpoint: "vigenere-autokey"},
    {id: 2, label: "Extended Vigenere Cipher", endpoint: "vigenere-extended"},
    {id: 3, label: "Affine Cipher", endpoint: "affine"},
    {id: 4, label: "Playfair Cipher", endpoint: "playfair"},
    {id: 5, label: "Hill Cipher", endpoint: "hill"},
];

export default function Home() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [key, setKey] = useState("");
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [statusCheckbox, setStatusCheckbox] = useState(true);
    const [groupText, setGroupText] = useState("");

    const handleItemClick = (id: any) => {
        setSelectedItem(id);
        console.log(algorithms[id].label);
    };

    const print = () => {
        console.log("print");
    }
    const encrypt = () => {
        // @ts-ignore
        axios
            .post(`http://127.0.0.1:5000/encrypt/${algorithms[selectedItem].endpoint}`, {
                plaintext: plainText,
                key: key,
                group: groupText,
            }).then((res) => {
            console.log(res.data);
            setCipherText(res.data);
        });
    }
    const handleCheckbox = () => {
        setStatusCheckbox(!statusCheckbox);
        if (statusCheckbox) {
            setGroupText("true");
        }
        else {
            setGroupText("false");
        }
        console.log(statusCheckbox);
    }
    return (
        <>
            <div className="bg-black flex flex-col justify-center items-center h-full gap-6">
                <div className="fixed top-0">
                    <Navbar/>
                </div>
                <div className="text-4xl font-extrabold text-blue-600 mt-24">Enkripsi</div>
                <div className="flex flex-row gap-8 w-screen justify-center">
                    <div>
                        <div className="text-white mb-2 font-medium">Plaintext</div>
                        <textarea
                            name="plaintext"
                            cols={60}
                            rows={22}
                            className="overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                            onKeyUp={(e) => setPlainText(e.currentTarget.value)}
                        >{}
</textarea>
                    </div>
                    <div>
                        <div className="text-white mb-2 font-medium">Ciphertext</div>
                        <div
                            className="relative bg-white w-[500px] h-[400px] rounded-lg shadow overflow-y-auto text-[12px] font-helvetica">
                            {cipherText.ciphertext}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-6">
                    <div className="dropdown inline-block relative">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            {selectedItem !== null ? algorithms[selectedItem].label : "Algorithms"}{" "}
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
                            {algorithms.map((algorithm) => (
                                // eslint-disable-next-line react/jsx-key
                                <li className="">
                                    <a
                                        className="rounded-t bg-gray-700 py-2 px-4 block whitespace-no-wrap text-[12px] hover:bg-gray-400 hover:text-white "
                                        onClick={() => handleItemClick(algorithm.id)}
                                    >
                                        {algorithm.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-row">
                        <label className="block items-center">
                            <input type="checkbox" value={""} onChange={handleCheckbox}/>
                            <span className="ml-2 text-white">Kelompokkan 5 huruf</span>
                        </label>
                    </div>

                </div>
                <div className="flex flex-col justify-center items-center">
                    <label
                        htmlFor="key"
                        className="block text-white text-sm font-medium mb-2 "
                    >
                        Enter Key
                    </label>
                    <textarea
                        name="key"
                        id="key"
                        cols={60}
                        rows={5}
                        className="overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                        onKeyUp={(e) => setKey(e.currentTarget.value)}
                    ></textarea>
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
                    <ButtonText text={"Encrypt"} onClick={encrypt}></ButtonText>
                </div>

                <div className="pb-14">
                    <ButtonText text={"Download Ciphertext"}></ButtonText>
                </div>
            </div>
        </>
    );
}
