export const formatLastSeen = (lastSeen: string | null): string => {
  if (!lastSeen) return "Son görülme bilinmiyor";

  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // If online within the last 2 minutes
  if (diffMinutes < 2) {
    return "Çevrimiçi";
  }

  // Less than 1 hour
  if (diffMinutes < 60) {
    return `Son görülme: ${diffMinutes} dakika önce`;
  }

  // Less than 24 hours
  if (diffHours < 24) {
    return `Son görülme: ${diffHours} saat önce`;
  }

  // Less than 7 days
  if (diffDays < 7) {
    return `Son görülme: ${diffDays} gün önce`;
  }

  // More than 7 days
  return `Son görülme: ${lastSeenDate.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  })}`;
};
