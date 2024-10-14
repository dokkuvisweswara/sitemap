'use client'

import { useState } from 'react';
import xmlbuilder from 'xmlbuilder';

export default function JsonToXml({params}: any) {
    const [xmlContent, setXmlContent] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileUpload = async (event: any) => {
        const file = event.target.files[0];
        let fileName = file?.name?.split('.')?.[0];
        fileName && setFileName(fileName);
        console.log(file, 'upload');
        if (file) {
            const text = await file.text();
            const jsonData = JSON.parse(text);
            const xml = jsonToXml(jsonData);
            setXmlContent(xml);
        }
    };

    const jsonToXml = (data: any) => {
        let root = xmlbuilder.create('urlset', { encoding: 'UTF-8' })
                             .att('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
                             .att('xmlns:xsi', 'https://www.w3.org/2001/XMLSchema-instance')
                             .att('xsi:schemaLocation', 'https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

        data.forEach((item: any) => {
            let url = root.ele('url');
            addElements(url, item);
        });

        return root.end({ pretty: true });
    };

    const addElements = (parent: any, obj: any) => {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                let child = parent.ele(key);
                addElements(child, obj[key]);
            } else {
                parent.ele(key, {}, obj[key]);
            }
        });
    };

    const handleDownload = () => {
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName ? fileName : 'sitemap'}.xml`;
        link.click();
    };

    return (
        <div className='flex flex-col gap-4 py-2'>
            <h1>Upload JSON and Convert to Sitemap</h1>
            <input type="file" accept=".json" onChange={handleFileUpload} />
            {xmlContent && (
                <div className='w-full'>
                    <div className="flex items-center justify-between bg-green-200 border-l-8 border-green-700 p-3 w-full">
                    <h2>JSON TO XML CONVERTED CONTENT</h2>                    
                    <button onClick={handleDownload} className='px-4 py-2 border-solid bg-green-500 rounded flex justify-between gap-4'>
                        <span>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z" fill="#000000"/>
                            </svg>
                        </span>
                        <span>Download Sitemap</span>
                    </button>
                    </div>
                    <br />
                    <textarea value={xmlContent} readOnly rows={20} cols={80} className='w-full'></textarea>
                    <br />
                </div>
            )}
        </div>
    );
};
