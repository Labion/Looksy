import { redirect } from "next/navigation";

type ExhibitionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExhibitionPage({ params }: ExhibitionPageProps) {
  const { id } = await params;
  redirect(`/sessions/${id}`);
}
