//src/components/LoadingSpinner.tsx
"use client";

export default function LoadingSpinner() {
  return (
    <tr>
      <td colSpan={7} className="py-8 text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      </td>
    </tr>
  );
}
