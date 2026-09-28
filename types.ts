
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MetricSection {
  category: string;
  score: number;
  title: string;
  bullets: string[];
  iconName: string;
}

export interface ContextualDecision {
  context: string;
  decision: 'Allow' | 'Block';
  reason: string;
}

export interface SecurityAuditResult {
  domain: string;
  timestamp: string;
  classification: 'Benign' | 'Dual-Use' | 'Controlled Malicious' | 'Malicious' | 'Unverified';
  sections: MetricSection[];
  overall: {
    score: number;
    recommendation: 'Allow' | 'Monitor' | 'Restrict' | 'Block';
    reasoning: string;
    level: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  contexts: ContextualDecision[];
  infrastructure: {
    registrar: string;
    location: string;
    vendor: string;
  };
  sources: GroundingSource[];
}

export enum AuditStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
