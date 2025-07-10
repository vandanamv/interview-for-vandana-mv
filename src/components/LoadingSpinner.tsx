"use client";

export default function LoadingSpinner() {
  return (
    <tr>
      <td colSpan={7} className="py-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 mt-2 ml-2"></p>
        </div>
      </td>
    </tr>
  );
}
