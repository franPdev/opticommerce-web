import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'warning' | 'danger' | 'offline';
  label?: string;
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  pulse = true,
}) => {
  const colorMap = {
    online: 'bg-success-400',
    warning: 'bg-warning-400',
    danger: 'bg-danger-400',
    offline: 'bg-text-muted',
  };

  const ringMap = {
    online: 'ring-success-400/30',
    warning: 'ring-warning-400/30',
    danger: 'ring-danger-400/30',
    offline: 'ring-text-muted/30',
  };

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        {pulse && status !== 'offline' && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorMap[status]}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ring-4 ${colorMap[status]} ${ringMap[status]}`}
        />
      </span>
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </div>
  );
};
