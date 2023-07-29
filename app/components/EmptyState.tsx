'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

// create interface for emptystate
// all variables optional
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

// if a user selects a catagory, date, and/or number of guests
// and theres is no exact matches in the database
// present emptystate as required
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            // clear filters
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;