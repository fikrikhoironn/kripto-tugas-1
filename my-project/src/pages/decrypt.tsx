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
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [matrix, setMatrix] = useState("");
  const [hillMat, setHillMat] = useState([] as string[][]);
  const [statusCheckbox, setStatusCheckbox] = useState(true);
  const [groupText, setGroupText] = useState("");

  const handleItemClick = (id: any) => {
    setSelectedItem(id);
    console.log(algorithms[id].label);
  };

  const print = () => {
    console.log("print");
  }

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

  const decrypt = () => {
    // @ts-ignore
    if (!selectedItem) return;
    let obj;
    if (selectedItem === 3) {
      obj = {
        ciphertext: cipherText,
        m : key,
        b : keyB
      }
    } else if (selectedItem === 5) {
      obj = {
        ciphertext: cipherText,
        matrix: hillMat
      }
    } else {
      obj = {
        ciphertext: cipherText,
        key: key
      }
    }

    
    axios
        .post(`http://127.0.0.1:5000/decrypt/${algorithms[selectedItem].endpoint}`, obj).then((res) => {
      console.log(res.data);
      setPlainText(res.data.plaintext);
    });
    console.log("cipherText: "+cipherText);
    console.log("plaintext: "+plainText);
  }

  // read file from upload
  const handleUploadFile = (e: any) => {
    console.log("upload file");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      // @ts-ignore
      setCipherText(reader.result);
      console.log("textFile: "+cipherText);
      console.log("textFile: "+reader.result);
    };
  }

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([plainText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "plaintext.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  return (
      <>
        <div className="bg-black flex flex-col justify-center items-center h-[100vh] gap-4">
          <div className="fixed top-0">
            <Navbar/>
          </div>
          <div className="text-4xl font-extrabold text-blue-600 mt-24">Dekripsi</div>
          <div className="flex flex-row gap-8 w-screen justify-center">
            <div>
              <div className="text-white mb-2 font-medium">Ciphertext</div>
              <textarea
                  name="ciphertext"
                  cols={60}
                  rows={12}
                  className="p-3 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                  onKeyUp={(e) => setCipherText(e.currentTarget.value)}
              ></textarea>
            </div>
            <div>
              <div className="text-white mb-2 font-medium">Plaintext</div>
              <textarea
                  name="plaintext"
                  cols={60}
                  rows={12}
                  className="p-3 overflow-y-auto font-medium text-[12px] rounded-lg bg-gray-700 text-white outline-none focus:ring-blue-600 ring-2 ring-opacity-50"
                  value={plainText}
              ></textarea>
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
              {/*<label className="block items-center">*/}
              {/*  <input type="checkbox" value={""} onChange={handleCheckbox}/>*/}
              {/*  <span className="ml-2 text-white">Kelompokkan 5 huruf</span>*/}
              {/*</label>*/}
            </div>

          </div>
          <div className="flex flex-col justify-center items-center">
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
            <ButtonText text={"Decrypt"} onClick={decrypt}></ButtonText>
          </div>

          <div className="pb-14">
            <ButtonText text={"Download Plaintext"} onClick={downloadFile}></ButtonText>
          </div>
        </div>
      </>
  );
}
