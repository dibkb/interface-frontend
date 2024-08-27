"use client";
import { FileUpload } from "@/components/FileUpload";
import { useState } from "react";

export default function Home() {
  const [paymentReport, setPaymentReport] = useState<File | null>(null);
  const [merchantReport, setMerchantReport] = useState<File | null>(null);

  return (
    <main className="min-h-screen container mx-auto py-8 flex items-center justify-between">
      <section className="w-full h-96 flex flex-col gap-5">
        <form className="flex gap-4 h-full">
          {/* paymentReport */}
          <FileUpload setFile={setPaymentReport} />
          {/* merchantReport */}
          <FileUpload setFile={setMerchantReport} />
        </form>
        <button type="submit" className="border w-min">
          Upload
        </button>
      </section>
    </main>
  );
}
