import Link from "next/link";
import Typography from "./Typography";

export default function Header() {
  return (
    <div className="bg-neutral-900 py-2 px-8 border-b-[1px] border-neutral-800">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <Typography variant="text">All users</Typography>
            </Link>
          </li>
          <li>
            <Link href="/saved-users">
              <Typography variant="text">Saved users</Typography>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
