import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </div>
  );
}
