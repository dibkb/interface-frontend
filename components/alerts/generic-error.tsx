import { InterfaceSelectBothFiles } from '@/types/alert-comp';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface InterfaceGenericError extends InterfaceSelectBothFiles {
  message?: string;
}
export const GenericError = ({ message, openAlert, onClose }: InterfaceGenericError) => {
  return (
    <AlertDialog open={openAlert} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message ?? 'An unexpected error occured'}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
