'use client';

// create loader using react spinners
// animated loader icon when refreshing or loading pages/interfaces
import { PuffLoader } from "react-spinners";

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