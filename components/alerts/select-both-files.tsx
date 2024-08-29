'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { InterfaceSelectBothFiles } from '@/types/alert-comp';

export const SelectBothFiles = ({
  openAlert,
  onClose,
}: InterfaceSelectBothFiles) => {
  return (
    <AlertDialog open={openAlert} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please choose both files to upload
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              Select both the `Payment Report` and the `Merchant Tax Report`{' '}
            </span>
            <span>The files should be .csv or .xlsx</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
