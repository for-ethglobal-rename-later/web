import Editor from '@/components/app/Editor';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Editor id={id} />;
}
