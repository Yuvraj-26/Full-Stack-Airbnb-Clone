'use client';

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

// interface
interface ErrorStateProps {
  error: Error
}

// error state - can use console.error or can also use analytics to send errors
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // return error message to user
  return ( 
    <EmptyState
      title="Uh Oh"
      subtitle="Something went wrong!"
    />
   );
}
 
export default ErrorState;
