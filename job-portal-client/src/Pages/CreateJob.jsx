import { useForm } from "react-hook-form";
const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder={"Web Developer"}
                {...register("jobTitle", { required: true, maxLength: 80 })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder={"Coderythm Technology"}
                {...register("companyName", { required: true, maxLength: 80 })}
                className="create-job-input"
              />
            </div>
          </div>

          <input type="submit" className="my-5" />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
