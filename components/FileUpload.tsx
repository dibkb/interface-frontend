/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent } from 'react';
import { FileUploadIcon } from './svg/FileUploadIcon';
import { cn } from '@/lib/utils';
import { XmarkIcon } from './svg/XmarkIcon';
import { convertBytes } from '@/utils/convert-to-bytes';
interface FileUploadInterface {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  label: string;
}
export const FileUpload = ({ file, setFile, label }: FileUploadInterface) => {
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        file.type === 'text/csv' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        setFile(file);
      } else {
        setFile(null);
        // TODO: alert
      }
    }
    e.target.value = '';
  };
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-96">
      <p className="text-center mb-3">{label}</p>
      <label
        className={cn(
          'border rounded-md p-4 border-dashed flex items-center justify-center  flex-1',
          !file && 'hover:bg-blue-100 cursor-pointer hover:border-blue-500'
        )}
        htmlFor={!file ? label : ''}
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <FileUploadIcon className="w-6 h-6 mb-3" />
            <div className="flex items-center gap-1 group cursor-pointer font-medium">
              <span className="text-blue-600">Choose file</span> to upload
            </div>
            <p className="text-xs text-zinc-500">.csv or .xlsx</p>
          </div>
        ) : (
          <main className="flex items-start min-w-96 max-w-full justify-between px-4 py-1 rounded-md">
            <div className="flex items-center gap-3 flex-1">
              <img
                width={30}
                src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/microsoft-excel-icon.png`}
                alt=""
              />
              <div>
                <p className="text-xs">{file.name}</p>
                <p className="text-xs text-zinc-400">
                  {convertBytes(file.size)}
                </p>
              </div>
            </div>
            <XmarkIcon
              className="cursor-pointer size-5 hover:text-red-600"
              onClick={handleRemoveFile}
            />
          </main>
        )}
        <input
          type="file"
          id={label}
          onChange={(e) => handleFileChange(e, setFile)}
          className="hidden"
          accept=".csv,.xlsx"
        />
      </label>
    </div>
  );
};
