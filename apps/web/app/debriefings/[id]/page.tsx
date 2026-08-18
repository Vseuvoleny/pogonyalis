import { Debrief } from "@/feautures/debrief/ui/Debrief";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Debrief id={id} />;
}
