//src/components/EmptyState.tsx
interface Props {
  message?: string;
}

export default function EmptyState({ message = "No results found for the specified filter" }: Props) {
  return (
    <tr>
      <td colSpan={7}>
        <div className="flex justify-center items-center h-48 text-gray-500 text-sm">
          {message}
        </div>
      </td>
    </tr>
  );
}
