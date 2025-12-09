import Link from "next/link";
import { ScheduleItem } from "@/types/schedule";

export default function ScheduleItemRow({
  item,
}: {
  item: ScheduleItem;
}) {
  return (
    <li className="flex items-center px-3 py-2 rounded-lg border bg-gray-50">
      <span className="w-[60px] font-semibold text-blue-600">
        {item.time}
      </span>

      {item.url ? (
        <Link
          href={item.url}
          target="_blank"
          className="text-sm text-blue-600 underline"
        >
          {item.storeName}
        </Link>
      ) : (
        <span className="text-sm">{item.storeName}</span>
      )}
    </li>
  );
}
