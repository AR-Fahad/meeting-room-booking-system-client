import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { RiSoundModuleFill } from "react-icons/ri";
import PriButton from "../buttons/PriButton";
import SecButton from "../buttons/SecButton";
import { Button } from "../ui/button";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

type TFilter = { searchTerm: string; max: string; min: string; sort: string };

const FilterForm = ({
  methods,
  setQueries,
  queries,
}: {
  methods: UseFormReturn<FieldValues>;
  setQueries: Dispatch<SetStateAction<TFilter>>;
  queries: TFilter;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  const formRef = useRef<HTMLFormElement>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      formRef.current &&
      !formRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowFilters(false); // Close filters when clicked outside of form and button
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setQueries({ ...queries, ...data });
    setShowFilters(false);
  };

  useEffect(() => {
    // Add event listener to detect outside clicks when filters are shown
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when component unmounts or when showFilters changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  return (
    <div className="md:flex-1">
      {/* Filter Button - Visible on small devices */}
      <div>
        <Button
          className={`h-8 md:h-9 hover:text-priColor ${
            showFilters && "text-priColor"
          }`}
          variant="ghost"
          onClick={toggleFilters}
          ref={buttonRef}
        >
          Filter <RiSoundModuleFill className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Filter Form - Visible based on toggle state on small devices, always visible on larger screens */}
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`p-4 mt-3 w-[300px] md:w-80 bg-white border absolute z-30 shadow rounded-lg overflow-hidden transform transition-all duration-200 ease-in-out ${
          showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Sort Select */}
        <div className="mb-4">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700"
          >
            Price Sort By
          </label>
          <select
            id="sort"
            defaultValue=""
            {...methods.register("sort")}
            className="mt-1 block w-full px-3 py-1 md:py-2 border-gray-300 rounded-md shadow-sm focus:ring-priColor focus:border-priColor border-[1.5px] focus:outline-none text-sm md:text-base"
          >
            <option disabled value="">
              Select Sort Option
            </option>
            <option value="pricePerSlot">Ascending</option>
            <option value="-pricePerSlot">Descending</option>
          </select>
        </div>

        {/* Min/Max Volume */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="minVolume"
              className="block text-sm font-medium text-gray-700"
            >
              Min Price
            </label>
            <input
              id="minVolume"
              type="number"
              min={1}
              {...methods.register("min")}
              className="mt-1 block w-full px-3 py-1 md:py-2  border-gray-300 rounded-md shadow-sm focus:ring-priColor focus:border-priColor border-[1.5px] focus:outline-none text-sm md:text-base"
              placeholder="Min"
            />
          </div>
          <div>
            <label
              htmlFor="maxVolume"
              className="block text-sm font-medium text-gray-700"
            >
              Max Price
            </label>
            <input
              id="maxVolume"
              type="number"
              min={1}
              {...methods.register("max")}
              className="mt-1 block w-full px-3 py-1 md:py-2  border-gray-300 rounded-md shadow-sm focus:ring-priColor focus:border-priColor border-[1.5px] focus:outline-none text-sm md:text-base"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-2 items-center">
          <PriButton>Apply Filter</PriButton>
          <SecButton onClick={() => methods.reset()}>Reset</SecButton>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
