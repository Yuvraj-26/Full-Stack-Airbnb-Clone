'use client';

import { PuffLoader } from "react-spinners";

// create loader using react spinners
// animated loader icon when refreshing or loading pages/interfaces
const Loader = () => {
  return ( 
    <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader
        size={100}
        color="red"
      />
    </div>
   );
}
 
export default Loader;