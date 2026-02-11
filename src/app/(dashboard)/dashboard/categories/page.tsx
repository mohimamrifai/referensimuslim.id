import { prisma } from '@/lib/prisma';
import CategoryList from '@/components/admin/CategoryList';
import CreateCategoryButton from '@/components/admin/CreateCategoryButton';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  // Fetch categories with children (subcategories) and count of contents
  const categories = await prisma.category.findMany({
    where: {
      parentId: null, // Get root categories
    },
    include: {
      children: {
        include: {
          _count: {
            select: { contents: true, subContents: true },
          },
        },
        orderBy: { name: 'asc' },
      },
      _count: {
        select: { contents: true, subContents: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kategori</h1>
          <p className="text-gray-500">Kelola kategori dan subkategori konten</p>
        </div>
        <CreateCategoryButton />
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
