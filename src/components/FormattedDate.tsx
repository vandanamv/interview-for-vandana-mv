//src/components/FormattedDate.tsx
"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
  dateString: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ dateString }) => {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    if (dateString) {
      const date = new Date(dateString);
      const datePart = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const timePart = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setFormatted(`${datePart} at ${timePart}`);
    }
  }, [dateString]);

  return <span>{formatted || "Loading..."}</span>;
};

export default FormattedDate;
