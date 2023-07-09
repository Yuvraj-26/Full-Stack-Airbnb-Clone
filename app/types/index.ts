import { Listing, Reservation, User } from "@prisma/client";

// create SafeListing
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

// create SafeReservation
export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
// sanitise User to not pass unintended objects
// by modifying the types,
// create SafeUser to fix the passing issue to ensure correct type
// replace values with custom string or null
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
