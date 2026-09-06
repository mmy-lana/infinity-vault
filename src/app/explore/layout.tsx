import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MMYLANA // 無限城 — Explore Mode',
  description: 'First-person spatial traversal of the Mugen Castle vault.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden bg-[#140805] select-none text-[#DF865C]">
      {children}
    </div>
  );
}