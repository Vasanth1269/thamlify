import { FaSearch, FaMicrophone, FaPlus } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-black border-b border-white/10">
      <h1 className="text-white font-bold text-lg">YouTube</h1>

      <div className="flex items-center gap-2 w-1/2">
        <input
          className="w-full bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none"
          placeholder="Search"
        />
        <button className="p-3 rounded-full bg-zinc-800">
          <FaSearch />
        </button>
        <button className="p-3 rounded-full bg-zinc-800">
          <FaMicrophone />
        </button>
      </div>

      <button className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full">
        <FaPlus /> Create
      </button>
    </header>
  );
}
