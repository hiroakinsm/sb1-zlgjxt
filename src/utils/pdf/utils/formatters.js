export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ja-JP');
}

export function formatNumber(num) {
  if (typeof num !== 'number') return '';
  return num.toLocaleString('ja-JP');
}

export function formatPercentage(value) {
  if (typeof value !== 'number') return '';
  return `${value.toFixed(1)}%`;
}

export function formatSeverity(severity) {
  const severityMap = {
    high: '高',
    medium: '中',
    low: '低'
  };
  return severityMap[severity] || severity;
}