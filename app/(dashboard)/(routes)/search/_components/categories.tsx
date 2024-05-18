"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Finance: FcEngineering,
  Physics: FcMultipleDevices,
  "Data Science": FcSalesPerformance,
  Chemistry: FcFilmReel,
  "Computer Science": FcOldTimeCamera,
  Engineering: FcSportsMode,
  Accounting: FcEngineering,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          value={item.id}
          label={item.name}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};
