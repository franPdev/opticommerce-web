export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-AR').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Ahora mismo';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return formatDate(dateString);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    healthy: 'text-success-400',
    low: 'text-warning-400',
    critical: 'text-danger-400',
    overstock: 'text-violet-400',
    expiring: 'text-warning-400',
    out_of_stock: 'text-danger-400',
  };
  return colors[status] ?? 'text-text-secondary';
};

export const getStatusBgColor = (status: string): string => {
  const colors: Record<string, string> = {
    healthy: 'bg-success-500/10',
    low: 'bg-warning-500/10',
    critical: 'bg-danger-500/10',
    overstock: 'bg-violet-500/10',
    expiring: 'bg-warning-500/10',
    out_of_stock: 'bg-danger-500/10',
  };
  return colors[status] ?? 'bg-bg-elevated';
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    healthy: 'Saludable',
    low: 'Stock Bajo',
    critical: 'Crítico',
    overstock: 'Sobrestock',
    expiring: 'Por Vencer',
    out_of_stock: 'Sin Stock',
  };
  return labels[status] ?? status;
};

export const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    info: 'text-accent-400',
    low: 'text-success-400',
    medium: 'text-warning-400',
    high: 'text-danger-400',
    critical: 'text-danger-400',
  };
  return colors[severity] ?? 'text-text-secondary';
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    electronics: 'Electrónica',
    clothing: 'Ropa',
    food: 'Alimentos',
    beverages: 'Bebidas',
    home: 'Hogar',
    beauty: 'Belleza',
    sports: 'Deportes',
    toys: 'Juguetes',
  };
  return labels[category] ?? category;
};
