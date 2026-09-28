import { SecurityAuditResult } from '../types';

type ReputationRecord = Omit<SecurityAuditResult, 'timestamp'>;

export const reputationDatabase: Record<string, ReputationRecord> = {
  'virustotal.com': {
    domain: 'virustotal.com',
    classification: 'Benign',
    sections: [
      { category: 'Overall Safety', score: 96, title: 'Trusted security analysis service', bullets: ['Widely used for malware and URL analysis', 'HTTPS enabled', 'Security-focused service'], iconName: 'ShieldCheck' },
      { category: 'IP Reputation', score: 90, title: 'Established infrastructure', bullets: ['Large-scale production service', 'No local blacklist flag', 'Manual verification still recommended for incidents'], iconName: 'Server' },
      { category: 'Blacklist Status', score: 95, title: 'No local block record', bullets: ['Not present in local deny list', 'Used as a threat-intelligence reference', 'Check live sources for current incidents'], iconName: 'Database' },
      { category: 'DNS Reputation', score: 94, title: 'Established domain', bullets: ['Known long-lived domain', 'Stable public service', 'No local DNS warning'], iconName: 'Globe' },
      { category: 'SSL Security', score: 95, title: 'HTTPS expected', bullets: ['Encrypted web access', 'Certificate details are not live-checked in this version', 'Browser validation still applies'], iconName: 'Lock' },
      { category: 'Compliance', score: 85, title: 'Use according to organization policy', bullets: ['External service', 'Do not upload sensitive samples without approval', 'Follow data-classification policy'], iconName: 'ListChecks' },
      { category: 'Privacy Level', score: 78, title: 'External data-processing service', bullets: ['Uploads may leave the organization', 'Review terms before submitting sensitive files', 'Hashes/URLs are safer than confidential content'], iconName: 'Eye' }
    ],
    overall: { score: 93, recommendation: 'Allow', reasoning: 'Known security analysis platform. This frontend-only version uses a local reputation record and does not perform a live lookup.', level: 'LOW' },
    contexts: [
      { context: 'End User Browsing', decision: 'Allow', reason: 'Known security service; normal browsing is generally appropriate.' },
      { context: 'Enterprise Network', decision: 'Allow', reason: 'Useful for security operations, subject to organizational policy.' },
      { context: 'Email / URL Click', decision: 'Allow', reason: 'Known service, but continue normal phishing verification.' },
      { context: 'Malware Research / Lab', decision: 'Allow', reason: 'Commonly used for threat research.' }
    ],
    infrastructure: { registrar: 'Local record', location: 'Internet service', vendor: 'VirusTotal' },
    sources: [
      { title: 'VirusTotal', uri: 'https://www.virustotal.com/' },
      { title: 'Local reputation database', uri: '#' }
    ]
  },
  'malware.filterdns.net': {
    domain: 'malware.filterdns.net',
    classification: 'Controlled Malicious',
    sections: [
      { category: 'Overall Safety', score: 10, title: 'Malware test / controlled malicious content', bullets: ['Intentionally associated with malicious test content', 'Unsafe for normal users', 'Use only in an isolated test context'], iconName: 'AlertTriangle' },
      { category: 'IP Reputation', score: 35, title: 'Behavior overrides hosting reputation', bullets: ['Hosting provider trust does not reduce behavioral risk', 'Local classification is behavior-based', 'Live IP reputation is not queried'], iconName: 'Server' },
      { category: 'Blacklist Status', score: 5, title: 'Treat as blocked outside labs', bullets: ['Local policy record marks this domain unsafe', 'Research purpose does not make it safe for users', 'Block in user-facing contexts'], iconName: 'Database' },
      { category: 'DNS Reputation', score: 25, title: 'Controlled test domain', bullets: ['Domain purpose is security testing', 'DNS data is not live-checked', 'Behavioral classification takes precedence'], iconName: 'Globe' },
      { category: 'SSL Security', score: 50, title: 'TLS does not imply safety', bullets: ['A valid certificate is not a trust decision', 'Malicious sites can use HTTPS', 'No live certificate inspection in this build'], iconName: 'Lock' },
      { category: 'Compliance', score: 20, title: 'Restricted use', bullets: ['Keep out of normal browsing paths', 'Use only with approved security testing', 'Document exceptions for lab use'], iconName: 'ListChecks' },
      { category: 'Privacy Level', score: 25, title: 'Do not submit sensitive data', bullets: ['Use only for controlled testing', 'Avoid credentials and production data', 'Isolate from user workflows'], iconName: 'Eye' }
    ],
    overall: { score: 12, recommendation: 'Block', reasoning: 'Controlled malicious/test content should be blocked for normal users and allowed only in an approved malware-research lab.', level: 'HIGH' },
    contexts: [
      { context: 'End User Browsing', decision: 'Block', reason: 'Intentionally malicious/test content is inappropriate for end users.' },
      { context: 'Enterprise Network', decision: 'Block', reason: 'Block by default outside a dedicated research exception.' },
      { context: 'Email / URL Click', decision: 'Block', reason: 'Do not permit user click-through to controlled malicious content.' },
      { context: 'Malware Research / Lab', decision: 'Allow', reason: 'Allow only in an isolated and approved research environment.' }
    ],
    infrastructure: { registrar: 'Local record', location: 'Internet service', vendor: 'FilterDNS test domain' },
    sources: [
      { title: 'Local reputation database', uri: '#' }
    ]
  },
  'google.com': {
    domain: 'google.com',
    classification: 'Benign',
    sections: [
      { category: 'Overall Safety', score: 96, title: 'Known major internet service', bullets: ['Known global service', 'No local deny-list entry', 'Normal security controls still apply'], iconName: 'ShieldCheck' },
      { category: 'IP Reputation', score: 92, title: 'Large distributed infrastructure', bullets: ['Global production network', 'No local reputation issue recorded', 'No live IP lookup in this build'], iconName: 'Server' },
      { category: 'Blacklist Status', score: 96, title: 'No local block record', bullets: ['Not present in local deny list', 'No local malicious classification', 'Live blacklist lookup not performed'], iconName: 'Database' },
      { category: 'DNS Reputation', score: 97, title: 'Established domain', bullets: ['Long-lived public domain', 'Stable service identity', 'No local DNS warning'], iconName: 'Globe' },
      { category: 'SSL Security', score: 97, title: 'HTTPS expected', bullets: ['Encrypted web access', 'Modern browsers validate certificates', 'No live TLS test in this build'], iconName: 'Lock' },
      { category: 'Compliance', score: 80, title: 'Apply organizational policy', bullets: ['External cloud service', 'Data handling depends on the service used', 'Use approved accounts and controls'], iconName: 'ListChecks' },
      { category: 'Privacy Level', score: 72, title: 'External service', bullets: ['Review data handling for sensitive use', 'Avoid unapproved data uploads', 'Follow privacy policy'], iconName: 'Eye' }
    ],
    overall: { score: 95, recommendation: 'Allow', reasoning: 'Known major internet service. Result is based on the local static reputation database, not a live threat-intelligence query.', level: 'LOW' },
    contexts: [
      { context: 'End User Browsing', decision: 'Allow', reason: 'Known service; apply normal browsing controls.' },
      { context: 'Enterprise Network', decision: 'Allow', reason: 'Generally appropriate subject to organizational policy.' },
      { context: 'Email / URL Click', decision: 'Allow', reason: 'Known domain, but verify the full URL and redirect chain.' },
      { context: 'Malware Research / Lab', decision: 'Allow', reason: 'No local restriction.' }
    ],
    infrastructure: { registrar: 'Local record', location: 'Global', vendor: 'Google' },
    sources: [{ title: 'Local reputation database', uri: '#' }]
  }
};

export function buildUnknownResult(domain: string): SecurityAuditResult {
  return {
    domain,
    timestamp: new Date().toISOString(),
    classification: 'Unverified',
    sections: [
      { category: 'Overall Safety', score: 50, title: 'No local reputation record', bullets: ['Domain is not present in the static database', 'No live threat-intelligence lookup was performed', 'Manual verification is required'], iconName: 'Info' },
      { category: 'IP Reputation', score: 50, title: 'Not checked', bullets: ['No live IP reputation lookup', 'Check VirusTotal or approved TI sources', 'Do not infer trust from hosting provider'], iconName: 'Server' },
      { category: 'Blacklist Status', score: 50, title: 'Not checked', bullets: ['No live blacklist query', 'Verify before closing the ticket', 'Add a local record after review if useful'], iconName: 'Database' },
      { category: 'DNS Reputation', score: 50, title: 'Not checked', bullets: ['No live DNS reputation query', 'Review domain age and DNS history manually', 'Check redirects and subdomains'], iconName: 'Globe' },
      { category: 'SSL Security', score: 50, title: 'Not checked', bullets: ['No live certificate inspection', 'HTTPS alone does not establish trust', 'Review certificate and TLS details manually'], iconName: 'Lock' },
      { category: 'Compliance', score: 50, title: 'Manual review required', bullets: ['No automated compliance lookup', 'Apply internal policy', 'Document the final analyst decision'], iconName: 'ListChecks' },
      { category: 'Privacy Level', score: 50, title: 'Unknown', bullets: ['No privacy assessment was performed', 'Avoid entering sensitive information', 'Review privacy terms if business use is planned'], iconName: 'Eye' }
    ],
    overall: { score: 50, recommendation: 'Monitor', reasoning: 'This frontend-only build has no live AI or reputation API. The domain is not in the local database, so an analyst must verify it manually.', level: 'MEDIUM' },
    contexts: [
      { context: 'End User Browsing', decision: 'Block', reason: 'Unverified domain: hold until manual review if this is a security ticket.' },
      { context: 'Enterprise Network', decision: 'Block', reason: 'No automated evidence is available; follow normal exception/review process.' },
      { context: 'Email / URL Click', decision: 'Block', reason: 'Do not encourage click-through before verification.' },
      { context: 'Malware Research / Lab', decision: 'Allow', reason: 'Analysts may investigate in an isolated lab according to policy.' }
    ],
    infrastructure: { registrar: 'Not checked', location: 'Not checked', vendor: 'Not checked' },
    sources: [
      { title: 'VirusTotal - manual check', uri: `https://www.virustotal.com/gui/domain/${encodeURIComponent(domain)}` },
      { title: 'URLhaus', uri: 'https://urlhaus.abuse.ch/' }
    ]
  };
}
