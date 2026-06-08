import {
  FaHome,
  FaYoutube,
  FaHistory,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-60 flex-col bg-black text-gray-300 px-4 py-4">
      <div className="space-y-4">
        <MenuItem icon={<FaHome />} label="Home" active />
        <MenuItem icon={<FaYoutube />} label="Shorts" />
        <MenuItem icon={<FaHistory />} label="History" />
        <MenuItem icon={<FaClock />} label="Watch later" />
        <MenuItem icon={<FaThumbsUp />} label="Liked videos" />
      </div>
    </aside>
  );
}

function MenuItem({ icon, label, active = false }: any) {
  return (
    <div
      className={`flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer
      ${active ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
