"use client";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [paymentReport, setPaymentReport] = useState<File | null>(null);
  const [merchantReport, setMerchantReport] = useState<File | null>(null);

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
        alert("Please upload only CSV or Excel files.");
      }
    }
  };

  return (
    <main className="min-h-screen container mx-auto py-8">
      <form className="space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="paymentReport" className="w-32">
            Payment Report:
          </label>
          <div className="relative">
            <input
              type="file"
              id="paymentReport"
              onChange={(e) => handleFileChange(e, setPaymentReport)}
              className="hidden"
              accept=".csv,.xlsx"
            />
            <label htmlFor="paymentReport">Choose File</label>
            {paymentReport && (
              <span className="ml-2">{paymentReport.name}</span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="merchantReport" className="w-32">
            Merchant Report:
          </label>
          <div className="relative">
            <input
              type="file"
              id="merchantReport"
              onChange={(e) => handleFileChange(e, setMerchantReport)}
              className="hidden"
              accept=".csv,.xlsx"
            />
            <label htmlFor="merchantReport">Choose File</label>
            {merchantReport && (
              <span className="ml-2">{merchantReport.name}</span>
            )}
          </div>
        </div>
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
