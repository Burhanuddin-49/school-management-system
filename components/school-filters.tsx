"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { setFilter, clearFilters } from "@/store/filtersSlice";
import type { RootState } from "@/store/store";

const schoolLevels = ["Primary", "Secondary"];
const primaryYears = ["KG1", "KG2", "KG3", "1", "2", "3", "4", "5"];
const secondaryYears = ["6", "7", "8", "9"];
const divisions = ["A", "B", "C", "D", "E"];

export function SchoolFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const years = filters.level === "Primary" ? primaryYears : secondaryYears;

  const handleFilterChange = (filterName: string, value: string) => {
    dispatch(setFilter({ [filterName]: value }));
    if (filterName === "level") {
      dispatch(setFilter({ year: "", division: "" }));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex space-x-4">
        <Select
          value={filters.level}
          onValueChange={(value) => handleFilterChange("level", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {schoolLevels.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.year}
          onValueChange={(value) => handleFilterChange("year", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.division}
          onValueChange={(value) => handleFilterChange("division", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select division" />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleClearFilters}>Clear Filters</Button>
    </div>
  );
}
