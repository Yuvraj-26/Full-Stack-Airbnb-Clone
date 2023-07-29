'use client';

import { IconType } from "react-icons";

// create interface
interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

// define categoryinput box
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick
}) => {
  return ( 
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;