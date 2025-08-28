import { Link } from "react-router-dom";
import type { componentProps } from "../../constants/path";

type Props = componentProps['buttonProps']

export default function ButtonComponent({ content, link, className }: Props) {
  return (
    <div>
      <Link
        className={`inline-block rounded-sm border px-12 py-3 text-sm font-medium focus:ring-3 focus:outline-hidden ${className ?? "border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600"}`}
        to={link ?? "#"}
      >
        {content}
      </Link>
    </div>
  );
}
