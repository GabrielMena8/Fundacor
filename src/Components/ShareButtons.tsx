// Share buttons - no external deps
interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(shareUrl)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex items-center gap-2">
      <a href={tweet} target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#1F322E]/80 rounded-md text-[#FFDD08]">Twitter</a>
      <a href={fb} target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#1F322E]/80 rounded-md text-[#FFDD08]">Facebook</a>
    </div>
  );
}
