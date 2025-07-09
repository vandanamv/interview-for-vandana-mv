"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { FaYoutube, FaWikipediaW } from "react-icons/fa";
import { SiNasa } from "react-icons/si";

const FormattedDate = dynamic(() => import("@/components/FormattedDate"), {
  ssr: false,
});

interface LaunchModalProps {
  launch: any;
  onClose: () => void;
}

export default function LaunchModal({ launch, onClose }: LaunchModalProps) {
  if (!launch) return null;

  const {
    name,
    details,
    links,
    rocketData,
    launchpadData,
    payloadData,
    date_utc,
    success,
    upcoming,
    flight_number,
    rocketData: { type: rocketType, name: rocketName, company, country } = {},
  } = launch;

  const status = upcoming ? "Upcoming" : success ? "Success" : "Failed";
  const statusColor =
    status === "Success"
      ? "bg-green-100 text-green-800"
      : status === "Failed"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="fixed inset-0 bg-gray-200/70 backdrop-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-[90%] max-w-md p-4 relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header Block */}
        <div className="flex items-start gap-4 mb-4">
          {links.patch?.small && (
            <Image
              src={links.patch.small}
              alt="Mission patch"
              width={72}
              height={72}
              className="rounded"
            />
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-900">{name}</h2>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}
              >
                {status}
              </span>
            </div>

            <p className="text-sm text-gray-700 font-medium">
              {rocketData?.name || "N/A"}
            </p>

            <div className="flex items-center gap-4 mt-1 text-xl text-gray-600">
              <a
                href="https://www.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiNasa className="hover:text-blue-500 transition duration-200" />
              </a>
              {links.wikipedia && (
                <a
                  href={links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWikipediaW className="hover:text-blue-500 transition duration-200" />
                </a>
              )}
              {links.webcast && (
                <a
                  href={links.webcast}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-red-600 hover:text-red-800 transition duration-200" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {details && (
          <p className="text-sm text-gray-700 mb-4">
            {details}{" "}
            {links.wikipedia && (
              <a
                href={links.wikipedia}
                target="_blank"
                className="text-blue-500 underline"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            )}
          </p>
        )}

        {/* Metadata */}
        <div className="text-sm text-gray-700 divide-y divide-gray-300">
          <div className="flex py-2">
            <span className="font-medium w-1/2">Flight Number</span>
            <span className="pl-4">{flight_number}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Mission Name</span>
            <span className="pl-4">{name}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Rocket Type</span>
            <span className="pl-4">{rocketType || "N/A"}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Rocket Name</span>
            <span className="pl-4">{rocketName || "N/A"}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Manufacturer</span>
            <span className="pl-4">{company || "N/A"}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Nationality</span>
            <span className="pl-4">{country || "N/A"}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Launch Date</span>
            <span className="pl-4">
              <FormattedDate dateString={date_utc} />
            </span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Payload Type</span>
            <span className="pl-4">{payloadData?.type || "N/A"}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Orbit</span>
            <span className="pl-4">{payloadData?.orbit || "N/A"}</span>
          </div>
          <div className="flex py-2">
            <span className="font-medium w-1/2">Launch Site</span>
            <span className="pl-4">{launchpadData?.name || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
