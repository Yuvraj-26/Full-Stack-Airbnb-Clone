'use client';

// search bar update
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  // if location value is present in parameters
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    // otherwise return Anywhere
    return 'Anywhere';
  }, [locationValue, getByValue]);

  // duration functionality using usememo
  const durationLabel = useMemo(() => {
    // check if start and end date are available
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      // difference in days calculated
      let diff = differenceInDays(end, start);

      // check diff for 1 day
      if (diff === 0) {
        diff = 1;
      }

      // return number of days using element for days
      return `${diff} Days`;
    }

    // return any week
    return 'Any Week'
  }, [startDate, endDate]);

  // guest label for guests
  const guestLabel = useMemo(() => {

    // if guest count
    if (guestCount) {
      // return number of guests
      return `${guestCount} Guests`;
    }

    // otherwise return add guests
    return 'Add Guests';
  }, [guestCount]);

  return ( 
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div 
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;