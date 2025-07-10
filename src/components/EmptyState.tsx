"use client";

interface Props {
  message?: string;
}

export default function EmptyState({ message = "No results found for the specified filter" }: Props) {
  return (
    <tr>
      <td colSpan={28} className="py-48 text-center">
        <div className="inline-block">
          <div className="h-8 w-8 mx-auto"></div>
          <p className="text-gray-500 mt-2">{message}</p>
        </div>
      </td>
    </tr>
  );
}
