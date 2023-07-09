'use client';

import { Toaster } from "react-hot-toast";

// toaster is a foreign libary 
// adjust to next.js 13
// create a provider with client parent to use in layout
const ToasterProvider = () => {
  return ( 
    <Toaster />
   );
}
 
export default ToasterProvider;
