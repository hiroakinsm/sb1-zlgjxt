export function formatComplexity(value: number): string {
  if (value <= 10) return '低';
  if (value <= 20) return '中';
  return '高';
}

export function formatSeverity(severity: string): string {
  const severityMap: { [key: string]: string } = {
    high: '高',
    medium: '中',
    low: '低'
  };
  return severityMap[severity] || severity;
}

export function formatQualityScore(score: number): string {
  if (score >= 90) return '優';
  if (score >= 80) return '良';
  if (score >= 70) return '可';
  return '要改善';
}