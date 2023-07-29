import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

// create interface
interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}

// write hook here
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // if no current user, return login modal on open
    // if not signed in, and user attempts to favourite a property/listing
    // login modal will open for sign in
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      // unfavourite action
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        // favourite action
        request = () => axios.post(`/api/favorites/${listingId}`);
      }
      
      // display success to user if action successful
      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
