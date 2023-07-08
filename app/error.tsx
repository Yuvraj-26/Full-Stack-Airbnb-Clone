'use client';

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

// write interface
interface ErrorStateProps {
  error: Error
}

// error message incase error occurs
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error); // console.error or can use analytics to send
  }, [error]);

  return ( 
    <EmptyState
      title="Uh Oh"
      subtitle="Something went wrong!"
    />
   );
}
 
export default ErrorState;
