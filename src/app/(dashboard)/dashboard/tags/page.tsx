import { prisma } from '@/lib/prisma';
import TagList from '@/components/admin/TagList';
import CreateTagButton from '@/components/admin/CreateTagButton';

export const dynamic = 'force-dynamic';

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { contents: true },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Tag</h1>
          <p className="text-gray-500">Kelola tag untuk mengelompokkan konten</p>
        </div>
        <CreateTagButton />
      </div>

      <TagList tags={tags} />
    </div>
  );
}
