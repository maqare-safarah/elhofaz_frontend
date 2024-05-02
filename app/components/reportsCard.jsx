import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const ReportCard = ({ title, subtitle, content, btnText, btnLink }) => {
  return (
    <div className=" rounded-2xl report-card" style={{ marginBottom: 10 }}>
      <div className="px-6 py-8">
        <div className="">
          <div>
            <h2 className="text-lg font-medium text-gray-600 lg:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="text-center mt-6">
            <p>
              <span className="text-5xl font-light tracking-tight text-black">
                {content}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8">
        <Link
          aria-describedby="tier-company"
          className=" report_btn flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
          href={`${btnLink}`}>
          <ArrowForwardIcon /> {btnText}
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;
