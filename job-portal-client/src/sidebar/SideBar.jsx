/* eslint-disable react/prop-types */
import Location from "./Location";
import EmployementType from "./EmployementType";
import JobPosting from "./JobPosting";
import Salary from "./Salary";
import WorkExperience from "./WorkExperience";
const SideBar = ({ handleChange, handleClick }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Location handleChange={handleChange}/>
      <Salary handleChange={handleChange} handleClick={handleClick}/>
      <JobPosting handleChange={handleChange}/>
      <WorkExperience handleChange={handleChange}/>
      <EmployementType handleChange={handleChange}/>
    </div>
  );
};
export default SideBar;