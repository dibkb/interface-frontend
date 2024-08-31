'use client';
import { GenericError } from '@/components/alerts/generic-error';
import { SelectBothFiles } from '@/components/alerts/select-both-files';
import { FileUpload } from '@/components/FileUpload';
import { FileUploadIcon } from '@/components/svg/FileUploadIcon';
import { Button } from '@/components/ui/button';
import { SERVER_URL } from '@/config';
import { useStore } from '@/store';
import { FormDataType } from '@/types/form-data';
import { ResponseData } from '@/types/process-data';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { setMergedDf, setClassificationSummary, setToleranceSummary, setTransactionSummary } =
    useStore();
  const [paymentReport, setPaymentReport] = useState<File | null>(null);
  const [merchantReport, setMerchantReport] = useState<File | null>(null);
  const [openAlert, setOpenAlert] = useState<openAlert>({
    type: null,
  });
  const uploadButtonHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    if (!paymentReport || !merchantReport) {
      setOpenAlert({ type: 'fileError' });
      return;
    }
    const formData = new FormData();
    formData.append(FormDataType.mtr_file, merchantReport);
    formData.append(FormDataType.payment_file, paymentReport);

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // populate the zustand store
        const typedData = data as ResponseData;
        setMergedDf(typedData.merged_df);
        setClassificationSummary(typedData.classification_summary);
        setToleranceSummary(typedData.tolerance_summary);
        setTransactionSummary(typedData.transaction_summary);
        router.push('/dashboard');
      } else {
        setOpenAlert({ type: 'serverError', message: data?.detail });
      }
    } catch (e) {
      const error = e as Error;
      // TODO: unexpected error, log
    } finally {
    }
  };
  return (
    <>
      <main className="min-h-screen container mx-auto py-8 flex items-center justify-between">
        <section className="w-full flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-4 h-full flex-1">
            {/* paymentReport */}
            <FileUpload file={paymentReport} setFile={setPaymentReport} label="Payment Report" />
            {/* merchantReport */}
            <FileUpload
              file={merchantReport}
              setFile={setMerchantReport}
              label="Merchant Tax Report"
            />
          </div>
          <Button className="flex items-center gap-4 mx-auto" onClick={uploadButtonHandler}>
            <FileUploadIcon className="size-4" />
            Upload
          </Button>
        </section>
      </main>
      {/* render modals */}
      <SelectBothFiles
        openAlert={openAlert.type === 'fileError'}
        onClose={() => setOpenAlert((prev) => ({ ...prev, type: null }))}
      />
      <GenericError
        message={openAlert.message}
        openAlert={openAlert.type === 'serverError'}
        onClose={() => setOpenAlert((prev) => ({ ...prev, type: null }))}
      />
    </>
  );
}

interface openAlert {
  type: 'serverError' | 'fileError' | null;
  message?: string;
}
