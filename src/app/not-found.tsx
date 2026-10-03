import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-4 text-cyan-400">Page Not Found</h2>
      <p className="text-gray-400 mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
