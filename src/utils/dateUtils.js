/**
 * Utilitários leves de formatação de data em português
 */

export function formatDistanceToNow(dateInput) {
  if (!dateInput) return 'Agora';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 60) {
    return 'Agora mesmo';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Há ${diffInHours}h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Ontem';
  }
  if (diffInDays < 30) {
    return `Há ${diffInDays} dias`;
  }

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
