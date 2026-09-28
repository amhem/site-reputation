import { SecurityAuditResult } from '../types';
import { reputationDatabase, buildUnknownResult } from '../data/reputation';

function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split(':')[0];
}

export async function performSecurityAudit(targetUrl: string): Promise<SecurityAuditResult> {
  const domain = normalizeDomain(targetUrl);
  const record = reputationDatabase[domain];

  if (!record) {
    return buildUnknownResult(domain);
  }

  return {
    ...record,
    timestamp: new Date().toISOString()
  };
}
