import React, { ChangeEvent } from "react";
interface FileUploadInterface {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export const FileUpload = ({ setFile }: FileUploadInterface) => {
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        file.type === "text/csv" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFile(file);
      } else {
        setFile(null);
        // TODO: alert
      }
    }
  };
  return (
    <div className="flex-1 border rounded-md p-4 border-dashed flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <label
          htmlFor="paymentReport"
          className="flex items-center gap-1 group cursor-pointer font-medium"
        >
          <p className="text-blue-600">Choose file</p> to upload
        </label>
        <p className="text-xs text-zinc-500">.csv or .xlsx</p>
      </div>
      <div className="relative">
        <input
          type="file"
          id="paymentReport"
          onChange={(e) => handleFileChange(e, setFile)}
          className="hidden"
          accept=".csv,.xlsx"
        />
      </div>
    </div>
  );
};
