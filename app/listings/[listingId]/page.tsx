
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

// create interface
interface IParams {
  listingId?: string;
}

// listings page
const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  
  // if no listings, render empty state
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  // return listing
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
