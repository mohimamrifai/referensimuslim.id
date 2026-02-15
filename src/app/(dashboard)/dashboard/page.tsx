import { 
  BookOpen, 
  Video, 
  Mic, 
  Tags,
  Eye,
  TrendingUp
} from "lucide-react";
import { getDashboardStats } from "@/lib/dashboard-stats";
import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";

export default async function DashboardPage() {
  const dashboardStats = await getDashboardStats();

  const stats = [
    { 
      label: "Total Views", 
      value: dashboardStats.totalViews.toLocaleString('id-ID'), 
      icon: Eye, 
      color: "text-green-600", 
      bg: "bg-green-50" 
    },
    { 
      label: "Total Artikel", 
      value: dashboardStats.totalArticles.toString(), 
      icon: BookOpen, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Total Video", 
      value: dashboardStats.totalVideos.toString(), 
      icon: Video, 
      color: "text-red-600", 
      bg: "bg-red-50" 
    },
    { 
      label: "Total Podcast", 
      value: dashboardStats.totalPodcasts.toString(), 
      icon: Mic, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
    { 
      label: "Kategori Aktif", 
      value: dashboardStats.categoryDistribution.length.toString(), 
      icon: Tags, 
      color: "text-orange-600", 
      bg: "bg-orange-50" 
    },
    { 
      label: "Total Konten", 
      value: dashboardStats.totalContent.toString(), 
      icon: TrendingUp, 
      color: "text-cyan-600", 
      bg: "bg-cyan-50" 
    },
  ];


  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Selamat datang kembali, Admin. Berikut ringkasan performa konten Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 truncate" title={stat.value}>{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium truncate">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <DashboardCharts stats={dashboardStats} />

      {/* Top Content Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Konten Terpopuler</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Top 5</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium">Judul Konten</th>
                <th className="px-6 py-3 font-medium">Tipe</th>
                <th className="px-6 py-3 font-medium">Kategori</th>
                <th className="px-6 py-3 font-medium text-right">Total Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardStats.topContent.map((item) => (
                <tr key={item.slug} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-30 sm:max-w-md">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${item.type === 'artikel' ? 'bg-blue-100 text-blue-800' : ''}
                      ${item.type === 'video' ? 'bg-red-100 text-red-800' : ''}
                      ${item.type === 'podcast' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    {item.viewsDisplay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
