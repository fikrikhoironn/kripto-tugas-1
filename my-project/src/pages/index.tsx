import ButtonText from "@/components/button";
import Navbar from "@/components/navbar";
import { Inter } from "@next/font/google";
import axios from "axios";
import { useState } from "react";

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
    const [keyB, setKeyB] = useState("");
    const [matrix, setMatrix] = useState("");
    const [hillMat, setHillMat] = useState([] as string[][])
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [statusCheckbox, setStatusCheckbox] = useState(true);
    const [groupText, setGroupText] = useState("");

    const handleItemClick = (id: any) => {
        setSelectedItem(id);
        console.log(algorithms[id].label);
    };
    
    const handleMatrix = (text: string) => {
        let line = text.split("\n");
        let mat = [];
        for (let i = 0; i < line.length; i++) {
            let row = line[i].split(" ");
            mat.push(row);
        }
        console.log(mat)
        setHillMat(mat);
    }
    
    const encrypt = () => {
        if (selectedItem === null) return;
        let obj;
        if (selectedItem === 3) {
            obj = {
                plaintext: plainText,
                m: key,
                group: groupText,
                b: keyB,
            }
        } else if (selectedItem === 5) {
            handleMatrix(matrix)
            obj = {
                plaintext: plainText,
                m: key,
                group: groupText,
                matrix: hillMat,
            }
        } else {
            obj = {
                plaintext: plainText,
                key: key,
                group: groupText,
            }
        }

        // @ts-ignore
        axios
            .post(`http://127.0.0.1:5000/encrypt/${algorithms[selectedItem].endpoint}`,obj).then((res) => {
            console.log(res.data);
            setCipherText(res.data.ciphertext);
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
    // read file from upload
    const handleUploadFile = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            // @ts-ignore
            setPlainText(reader.result);
            console.log("textFile: "+plainText);
        };
    }

    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([cipherText], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "ciphertext.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    return (
        <>
            <div className="bg-black flex flex-col justify-center items-center h-[100vh] gap-4">
                <div className="fixed top-0">
                    <Navbar/>
                </div>
                <div className="text-4xl font-extrabold text-blue-600 mt-24">Enkripsi</div>
                <div className="flex flex-row gap-8 w-screen justify-center">
                    <div>
                        <div className="text-white mb-2 font-medium border-box">Plaintext</div>
                        <textarea
                            name="plaintext"
                            cols={60}
                            rows={12}
                            className="p-3 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50 "
                            onKeyUp={(e) => setPlainText(e.currentTarget.value)}
                        >{}
                        </textarea>
                    </div>
                    <div>
                        <div className="text-white mb-2 font-medium">Ciphertext</div>
                        <textarea
                            name="ciphertext"
                            cols={60}
                            rows={12}
                            className="p-3 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                            value={cipherText}
                        >
                        </textarea>
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
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-gray-200 pt-2">
                            {algorithms.map((algorithm) => (
                                // eslint-disable-next-line react/jsx-key
                                <li className="" key={algorithm.id}>
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
                    <div className=" flex flex-col justify-center items-center">
                        <label
                            htmlFor="key"
                            className="block text-white text-sm font-medium mb-2 "
                        >
                            {selectedItem === 3 ? "Enter Key M" : "Enter Key"}
                        </label>
                        <textarea
                            name="key"
                            id="key"
                            cols={40}
                            rows={2}
                            className="p-2 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                            onKeyUp={(e) => setKey(e.currentTarget.value)}
                        ></textarea>
                    </div>
                    {selectedItem === 3 && (<div className="mt-3 flex flex-col justify-center items-center">
                        <label
                            htmlFor="key"
                            className="block text-white text-sm font-medium mb-2 "
                        >
                            Enter Key B
                        </label>
                        <textarea
                            name="key"
                            id="key"
                            cols={40}
                            rows={2}
                            className="p-2 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                            onKeyUp={(e) => setKeyB(e.currentTarget.value)}
                        ></textarea>
                    </div>)}
                    {selectedItem === 5 && (<div className="mt-3 flex flex-col justify-center items-center">
                        <label
                            htmlFor="key"
                            className="block text-white text-sm font-medium mb-2 "
                        >
                            Enter Matrix
                        </label>
                        <textarea
                            name="key"
                            id="key"
                            cols={40}
                            rows={5}
                            className="p-2 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                            onKeyUp={(e) => setMatrix(e.currentTarget.value)}
                        ></textarea>
                    </div>)}
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
                            onChange={handleUploadFile}
                        />
                    </div>
                </div>
                <div>
                    <ButtonText text={"Encrypt"} onClick={encrypt}></ButtonText>
                </div>

                <div className="pb-14">
                    <ButtonText text={"Download Ciphertext"} onClick={downloadFile}></ButtonText>
                </div>
            </div>
        </>
    );
}
