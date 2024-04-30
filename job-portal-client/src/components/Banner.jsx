import PropTypes from "prop-types";
import { FiMapPin, FiSearch } from "react-icons/fi";
const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="max-w-screen-sxl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font--bold text-primary mb-3">
        Find your <span className="text-blue">new job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </p>
      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div className="flex md:rounded-5-md rounded shadow-sm ring-1 ring-inset ring-grey-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="what position are you looking for?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-grey-400 focus:right-0 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              value={query}
            />
          </div>
          <div className="flex md:rounded-5-none rounded shadow-sm ring-1 ring-inset ring-grey-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Location?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-grey-400 focus:right-0 sm:text-sm sm:leading-6"
            //   value={""}
            />
          </div>
          <button
            type="submit"
            className="bg-blue text-white py-2 px-8 md:rounded-8-none rounded"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

Banner.propTypes = {
  query: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Banner;
