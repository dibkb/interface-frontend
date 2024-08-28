"use client";
import { SelectBothFiles } from "@/components/alerts/select-both-files";
import { FileUpload } from "@/components/FileUpload";
import { FormDataType } from "@/types/form-data";
import { MouseEvent, useState } from "react";

export default function Home() {
  const [paymentReport, setPaymentReport] = useState<File | null>(null);
  const [merchantReport, setMerchantReport] = useState<File | null>(null);
  const [response, setResponse] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const uploadButtonHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    if (!paymentReport || !merchantReport) {
      setOpenAlert(true);
      return;
    }
    const formData = new FormData();
    formData.append(FormDataType.mtr_file, merchantReport);
    formData.append(FormDataType.payment_file, paymentReport);

    try {
      const response = await fetch("http://localhost:8000/process-files/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  return (
    <>
      <main className="min-h-screen container mx-auto py-8 flex items-center justify-between">
        <section className="w-full flex flex-col gap-5">
          <div className="flex gap-4 h-full flex-1">
            {/* paymentReport */}
            <FileUpload
              file={paymentReport}
              setFile={setPaymentReport}
              label="Upload Payment Report"
            />
            {/* merchantReport */}
            <FileUpload
              file={merchantReport}
              setFile={setMerchantReport}
              label="Merchant Tax Report"
            />
          </div>
          <button
            type="submit"
            className="border w-min"
            onClick={uploadButtonHandler}
          >
            Upload
          </button>
        </section>
        {JSON.stringify(response)}
      </main>
      {/* render modals */}
      <SelectBothFiles openAlert={openAlert} setOpenAlert={setOpenAlert} />
    </>
  );
}
