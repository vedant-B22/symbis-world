// Human friendly date formatter
export function formatHumanDate(dateStr: string, timeStr?: string): string {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'today') return timeStr ? `Today • ${timeStr}` : 'Today';
  if (dateStr.toLowerCase() === 'yesterday') return timeStr ? `Yesterday • ${timeStr}` : 'Yesterday';
  if (dateStr.toLowerCase().startsWith('tomorrow')) return timeStr ? `Tomorrow • ${timeStr}` : 'Tomorrow';

  try {
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) {
      return timeStr ? `${dateStr} • ${timeStr}` : dateStr;
    }

    const now = new Date();
    // Reset hours to compare calendar days
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const diffDays = Math.round((eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return timeStr ? `Today • ${timeStr}` : 'Today';
    if (diffDays === 1) return timeStr ? `Tomorrow • ${timeStr}` : 'Tomorrow';
    if (diffDays === -1) return timeStr ? `Yesterday • ${timeStr}` : 'Yesterday';
    if (diffDays > 1 && diffDays <= 6) return timeStr ? `In ${diffDays} days • ${timeStr}` : `In ${diffDays} days`;

    // Standard formatted e.g. "Sat, 24 Oct"
    const formatted = target.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    return timeStr ? `${formatted} • ${timeStr}` : formatted;
  } catch {
    return timeStr ? `${dateStr} • ${timeStr}` : dateStr;
  }
}

// Pluralize helper
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `1 ${singular}`;
  return `${count.toLocaleString()} ${plural || singular + 's'}`;
}
