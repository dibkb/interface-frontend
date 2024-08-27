"use client";
import { FileUpload } from "@/components/FileUpload";
import { useState } from "react";

export default function Home() {
  const [paymentReport, setPaymentReport] = useState<File | null>(null);
  const [merchantReport, setMerchantReport] = useState<File | null>(null);

  return (
    <main className="min-h-screen container mx-auto py-8 flex items-center justify-between">
      <section className="w-full flex flex-col gap-5">
        <form className="flex gap-4 h-full flex-1">
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
        </form>
        <button type="submit" className="border w-min">
          Upload
        </button>
      </section>
    </main>
  );
}
