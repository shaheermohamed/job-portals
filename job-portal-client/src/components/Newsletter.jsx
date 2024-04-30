import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
const Newsletter = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          qwe qwe qwe qwe qew qwe qwe qwe q we qwe qwe
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="sample@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value="Subscribe"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
      <div className="mt-24">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          qwe qwe qwe qwe qew qwe qwe qwe q we qwe qwe
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value="Upload your resume"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;