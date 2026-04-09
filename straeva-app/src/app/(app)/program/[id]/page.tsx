import { PROGRAMS_INDEX } from "@/lib/programs-data";
import ProgramDetailClient from "./ProgramDetailClient";

export async function generateStaticParams() {
  return PROGRAMS_INDEX.map((p) => ({ id: p.id }));
}

export default async function ProgramDetailPage({ params }: { params: { id: string } }) {
  return <ProgramDetailClient id={params.id} />;
}
