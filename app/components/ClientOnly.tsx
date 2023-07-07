'use client';

import { useEffect, useState } from "react";

// Layer acts as wrapper to protect againts hydration error
interface ClientOnlyProps {
    children: React.ReactNode;
}


const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
        // Check server side rendering using state
        const [hasMounted, setHasMounted] = useState(false);
        // Once component loads, it can be mounted as server side rendering has finished
        useEffect(() => {
            setHasMounted(true);
        }, [])

        //error handling if it has not mounted
        // so, if component has not mounted return null
        if (!hasMounted) {
            return null
        }


    return (
        <>
            {children}
        </>
    );
}

export default ClientOnly;