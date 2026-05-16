import Link from "next/link";
import RotorArt from "@/components/RotorArt";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <div className="w-40 h-40 mx-auto opacity-40">
        <RotorArt className="w-full h-full" spin />
      </div>
      <h1 className="headline text-7xl mt-8">
        4<span className="text-blue-bright">0</span>4
      </h1>
      <p className="mt-4 text-muted">
        This page locked up and spun off the track.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Pit Lane
      </Link>
    </div>
  );
}
