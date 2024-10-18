"use client"

import { useState } from 'react';
import Papa from 'papaparse';

const CsvUpload = () => {
  const [jsonData, setJsonData]: any = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setJsonData(results?.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName ? fileName : 'modifiedData'}.json`;
    link.click();
  };
  return (
    <div className='py-2'>
        {/* <div className='flex items-center gap-4'>
            { categorys.map((category: any, i:Number) => (
                <span key={category.id} onClick={() => {switchCategory(category)}} className={`${activeCategory == category.id ? 'bg-blue-700' : 'bg-blue-400'} inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}>{category.name}</span>
            ))
            }
        </div> */}
        <br />
      <h1 className="text-3xl font-bold mb-4">Upload JSON to Format</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <div className='flex gap-4'>
        {jsonData && (
            <div className='w-1/2 flex flex-col gap-2'>
            <div className='bg-blue-300 border-l-4 py-4 px-2 border-blue-600 flex items-center'>
                <h2 className="text-2xl font-bold h-6">Original JSON</h2>
            </div>
            <pre className="bg-gray-100 p-4 mb-4 h-[100vh] overflow-scroll text-black">{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
        )}
        {jsonData && (
            <div className='w-1/2 flex flex-col gap-2'>
            <div className='flex w-full justify-between bg-blue-300 border-l-4 items-center border-blue-600 p-2'>
                <h2 className="text-2xl font-bold h-6">Modified JSON</h2>
                <button onClick={handleDownload} className="bg-blue-500 p-2 rounded flex gap-3 items-center group hover:bg-blue-700">
                    <span>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z" fill="#000000" className='group-hover:fill-white'/>
                        </svg>
                    </span>
                    <span className='group-hover:text-white'>Download Modified JSON</span>                
                </button>
            </div>
            <pre className="bg-gray-100 p-4 mb-4 h-[100vh] overflow-scroll text-black">{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
        )}
      </div>
    </div>
  );
};

export default CsvUpload;
