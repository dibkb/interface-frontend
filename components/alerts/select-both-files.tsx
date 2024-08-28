"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface InterfaceSelectBothFiles {
  openAlert: boolean;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
}
export const SelectBothFiles = ({
  openAlert,
  setOpenAlert,
}: InterfaceSelectBothFiles) => {
  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please choose both files to upload
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              Select both the `Payment Report` and the `Merchant Tax Report`{" "}
            </p>
            <p>The files should be .csv or .xlsx</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setOpenAlert(false)}>
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
