import { 
  BookOpen, 
  Video, 
  Mic, 
  Tags,
  Layers,
  Hash
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Artikel", value: "12", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Video", value: "5", icon: Video, color: "text-red-600", bg: "bg-red-50" },
    { label: "Total Podcast", value: "8", icon: Mic, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Kategori", value: "6", icon: Tags, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Sub Kategori", value: "6", icon: Layers, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Tags", value: "6", icon: Hash, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto md:px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Selamat datang kembali, Admin. Berikut ringkasan konten Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
