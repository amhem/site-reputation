
import React, { useState } from 'react';
import { 
  Shield, Lock, Globe, AlertTriangle, ExternalLink, ChevronRight, 
  Activity, Info, RefreshCcw, Server, ShieldCheck, Database, 
  Key, CheckCircle2, ListChecks, Search, MapPin, Eye, FlaskConical, Briefcase, Mail, User
} from 'lucide-react';
import { performSecurityAudit } from './services/geminiService';
import { SecurityAuditResult, AuditStatus, MetricSection, ContextualDecision } from './types';
import { RiskBadge } from './components/RiskBadge';

const IconMap: Record<string, any> = {
  Shield, Globe, Database, Key, Lock, CheckCircle2, Eye, Server, ShieldCheck, Activity,
  'End User Browsing': User,
  'Enterprise Network': Briefcase,
  'Email / URL Click': Mail,
  'Malware Research / Lab': FlaskConical
};

const getScoreColor = (score: number) => {
  if (score <= 45) return "bg-red-500";
  if (score <= 75) return "bg-yellow-500";
  return "bg-emerald-500";
};

const MetricRow: React.FC<{ section: MetricSection }> = ({ section }) => {
  const Icon = IconMap[section.iconName] || Shield;
  const scoreColor = getScoreColor(section.score);

  return (
    <div className="flex flex-col lg:flex-row items-stretch border-b border-slate-800/40 last:border-none group">
      <div className="lg:w-[70%] p-4 lg:p-6 bg-slate-900/10 group-hover:bg-indigo-600/5 transition-colors">
        <div className="flex items-center space-x-5 mb-3">
          <div className="p-3 bg-slate-800 rounded-xl">
            <Icon className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-0.5">{section.category}</h4>
            <h3 className="text-2xl font-black text-white tracking-tight">{section.title}</h3>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {section.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-base text-slate-300 font-medium leading-snug">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:w-[30%] p-4 lg:p-6 border-l border-slate-800/40 flex flex-col justify-center bg-slate-900/20">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
          <div className="text-right">
            <span className={`text-3xl font-black ${scoreColor.replace('bg-', 'text-')}`}>{section.score}</span>
            <span className="text-slate-600 text-base font-bold ml-1">/ 100</span>
          </div>
        </div>
        <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
          <div 
            className={`h-full ${scoreColor} transition-all duration-1000 ease-out`} 
            style={{ width: `${section.score}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const ContextCard: React.FC<{ decision: ContextualDecision }> = ({ decision }) => {
  const Icon = IconMap[decision.context] || Activity;
  const isBlock = decision.decision === 'Block';

  return (
    <div className={`p-5 rounded-2xl border transition-all ${isBlock ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${isBlock ? 'text-red-400' : 'text-emerald-400'}`} />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">{decision.context}</h4>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${isBlock ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
          {decision.decision}
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed font-medium">
        {decision.reason}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<AuditStatus>(AuditStatus.IDLE);
  const [result, setResult] = useState<SecurityAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setStatus(AuditStatus.LOADING);
    setError(null);
    try {
      let target = url.replace(/https?:\/\//, '').split('/')[0].trim();
      if (!target.includes('.')) target += '.com';
      const data = await performSecurityAudit(target);
      setResult(data);
      setStatus(AuditStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Audit process failed.");
      setStatus(AuditStatus.ERROR);
    }
  };

  const resetAudit = () => {
    setStatus(AuditStatus.IDLE);
    setUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-200 font-sans selection:bg-indigo-500/30">
      <nav className="border-b border-slate-800/60 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={resetAudit}>
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase">SITE <span className="text-indigo-400 italic font-light">REPUTATION</span></span>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
              <a href="https://www.virustotal.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Threat database</a>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <a href="https://www.priv.gc.ca" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Global compliance</a>
            </div>
            
            {(status === AuditStatus.SUCCESS || status === AuditStatus.ERROR) && (
              <button 
                onClick={resetAudit}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-50 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg group"
              >
                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>New Audit</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(status === AuditStatus.IDLE || status === AuditStatus.ERROR) && (
          <div className="text-center py-24 animate-in fade-in duration-1000">
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed opacity-80">
              Check platform reputation, security, health
            </p>
            <form onSubmit={handleAudit} className="max-w-2xl mx-auto">
              <div className="relative flex items-stretch bg-slate-900/60 rounded-2xl border border-slate-700/40 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="flex items-center flex-1">
                  <div className="pl-6"><Globe className="w-6 h-6 text-indigo-500" /></div>
                  <input
                    type="text"
                    placeholder="Enter domain (e.g. bb.ca, malware.filterdns.net)..."
                    className="w-full bg-transparent border-none py-6 px-4 text-white placeholder-slate-600 focus:ring-0 text-xl outline-none font-bold"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <button
                  disabled={status === AuditStatus.LOADING}
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 transition-all flex items-center justify-center space-x-3 active:scale-95"
                >
                  <span>AUDIT</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
            {status === AuditStatus.ERROR && (
              <div className="mt-8 bg-red-500/5 border border-red-500/20 rounded-2xl p-6 max-w-lg mx-auto flex items-start space-x-4 text-left shadow-2xl">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-red-400 font-black text-sm mb-1 uppercase tracking-widest">Audit Failed</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{error}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {status === AuditStatus.LOADING && (
          <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
              <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-indigo-500 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white tracking-tighter uppercase">Analyzing Behavioral Vectors</p>
              <p className="text-slate-500 font-bold text-xs tracking-widest uppercase opacity-60">Querying Intelligence...</p>
            </div>
          </div>
        )}

        {status === AuditStatus.SUCCESS && result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl text-white text-3xl font-black">
                    {result.domain.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-3">{result.domain}</h2>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Classification:</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                        result.classification === 'Malicious' || result.classification === 'Controlled Malicious' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        result.classification === 'Dual-Use' || result.classification === 'Unverified' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {result.classification}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <RiskBadge level={result.overall.level === 'LOW' ? 'Low' : result.overall.level === 'MEDIUM' ? 'Medium' : 'Critical'} />
                  <div className={`px-6 py-3 rounded-2xl border font-black text-xl tracking-tighter ${result.overall.recommendation === 'Block' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                    {result.overall.recommendation.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950/40 rounded-2xl border border-slate-800/60 mb-8">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" /> Behavioral Threat Justification
                </p>
                <p className="text-xl font-bold text-indigo-300 italic leading-relaxed">
                  "{result.overall.reasoning}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.contexts.map((ctx, idx) => (
                  <ContextCard key={idx} decision={ctx} />
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
              <div className="bg-slate-800/20 p-4 px-8 border-b border-slate-800/60 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <ListChecks className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Behavioral Audit Matrix</span>
                </div>
              </div>
              <div className="divide-y divide-slate-800/40">
                {result.sections.map((section, idx) => (
                  <MetricRow key={idx} section={section} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <ExternalLink className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Signals Intelligence</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.sources.length > 0 ? result.sources.slice(0, 4).map((source, idx) => (
                    <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-950/40 hover:bg-indigo-600/10 border border-slate-800/40 rounded-xl flex items-center justify-between group transition-all">
                      <span className="text-sm font-bold text-slate-300 truncate pr-4">{source.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-all" />
                    </a>
                  )) : (
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest p-4 text-center w-full">Verified Behavior Intelligence</p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Server className="w-5 h-5 text-indigo-400" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Registrar</p>
                      <p className="text-sm font-bold text-white">{result.infrastructure.registrar}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-white">{result.infrastructure.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Database className="w-5 h-5 text-indigo-400" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vendor</p>
                      <p className="text-sm font-bold text-white">{result.infrastructure.vendor}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={resetAudit} 
                  className="mt-8 w-full py-4 bg-white text-slate-950 rounded-xl font-black text-base hover:bg-indigo-50 transition-all flex items-center justify-center space-x-3 active:scale-95 group"
                >
                  <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 text-indigo-600" />
                  <span>NEW SCAN</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
