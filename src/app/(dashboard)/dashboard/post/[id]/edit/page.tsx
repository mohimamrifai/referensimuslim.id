import { prisma } from '@/lib/prisma';
import CreateArticleForm from '@/components/admin/articles/CreateArticleForm';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const article = await prisma.content.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });

  if (!article) {
    notFound();
  }

  // Transform tags from object array to string array of names
  const formattedArticle = {
    ...article,
    tags: article.tags.map((tag) => tag.name),
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
        <p className="text-gray-500 text-sm mt-1">Perbarui konten artikel.</p>
      </div>
      <CreateArticleForm initialData={formattedArticle} />
    </div>
  );
}
