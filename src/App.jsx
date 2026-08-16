import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid, Bot, Building2, Monitor, Activity, AlertTriangle, Ticket as TicketIcon,
  ShieldCheck, HardDrive, Fingerprint, Network, Cloud, Cog, Users2, BookOpen,
  FileBarChart, Plug, Settings, ChevronDown, ChevronRight, Search, Bell, CheckCircle2,
  Circle, Clock, ArrowRight, X, Terminal, Sparkles, Server, Cpu, MemoryStick, Gauge,
  ShieldAlert, Database, Wifi, Lock, FileText, PlayCircle, PauseCircle, RotateCw,
  ChevronsRight, Eye, ClipboardCheck, History, Layers, TrendingDown, TrendingUp,
  MapPin, Loader2
} from "lucide-react";

/* =========================================================================
   NEXUS MSP AI — AI-Powered IT Operations & Security Platform
   Single-file interactive prototype. Mock Integration Mode.
   ========================================================================= */

const css = `
  :root{
    --bg-0:#0A0E13;
    --bg-1:#10161D;
    --bg-2:#141C25;
    --bg-3:#182130;
    --line:#232E3B;
    --line-soft:#1A2430;
    --tx-0:#E7ECF3;
    --tx-1:#AEB9C7;
    --tx-2:#6E7A8A;
    --ai:#4C8DFF;
    --ai-soft:rgba(76,141,255,0.12);
    --ai-line:rgba(76,141,255,0.35);
    --good:#33C58B;
    --good-soft:rgba(51,197,139,0.12);
    --warn:#E3B23C;
    --warn-soft:rgba(227,178,60,0.12);
    --att:#E08B3E;
    --att-soft:rgba(224,139,62,0.12);
    --crit:#E5555F;
    --crit-soft:rgba(229,85,95,0.12);
    --mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
    --sans: -apple-system, "Segoe UI", Inter, "Helvetica Neue", Arial, sans-serif;
  }
  .nx-root{
    background:var(--bg-0); color:var(--tx-0); font-family:var(--sans);
    height:100%; width:100%; display:flex; overflow:hidden; font-size:13.5px;
    -webkit-font-smoothing:antialiased;
  }
  .nx-root *{box-sizing:border-box;}
  .nx-mono{font-family:var(--mono);}
  .nx-scroll{overflow-y:auto;}
  .nx-scroll::-webkit-scrollbar{width:8px; height:8px;}
  .nx-scroll::-webkit-scrollbar-thumb{background:var(--line); border-radius:8px;}
  .nx-scroll::-webkit-scrollbar-track{background:transparent;}

  /* ---------- Sidebar ---------- */
  .nx-sidebar{
    width:230px; min-width:230px; background:var(--bg-1); border-right:1px solid var(--line);
    display:flex; flex-direction:column; transition:width .18s ease, min-width .18s ease;
  }
  .nx-sidebar.collapsed{width:64px; min-width:64px;}
  .nx-brand{
    display:flex; align-items:center; gap:9px; padding:16px 16px 14px 16px;
    border-bottom:1px solid var(--line);
  }
  .nx-brand-mark{
    width:26px; height:26px; border-radius:7px; background:linear-gradient(155deg,#4C8DFF,#2450C9);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    box-shadow:0 0 0 1px rgba(76,141,255,.3), 0 4px 14px rgba(76,141,255,.25);
  }
  .nx-brand-text{line-height:1.15; overflow:hidden; white-space:nowrap;}
  .nx-brand-name{font-weight:700; font-size:13.5px; letter-spacing:.4px;}
  .nx-brand-sub{font-size:9.5px; color:var(--tx-2); letter-spacing:.5px; text-transform:uppercase;}
  .nx-nav{flex:1; overflow-y:auto; padding:8px; display:flex; flex-direction:column; gap:1px;}
  .nx-nav-group-label{font-size:9.5px; color:var(--tx-2); text-transform:uppercase; letter-spacing:.7px; padding:12px 10px 4px;}
  .nx-navitem{
    display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:7px;
    color:var(--tx-1); cursor:pointer; font-size:12.6px; font-weight:500; white-space:nowrap;
    border:1px solid transparent; position:relative;
  }
  .nx-navitem:hover{background:var(--bg-2); color:var(--tx-0);}
  .nx-navitem.active{background:var(--ai-soft); color:#BFD5FF; border-color:var(--ai-line);}
  .nx-navitem svg{flex-shrink:0;}
  .nx-navitem .lbl{overflow:hidden; text-overflow:ellipsis; flex:1;}
  .nx-badge{
    font-size:10px; font-weight:700; background:var(--crit-soft); color:#FF8992;
    border-radius:20px; padding:1px 6px; min-width:16px; text-align:center; flex-shrink:0;
  }
  .nx-badge.blue{background:var(--ai-soft); color:#8FB7FF;}
  .nx-collapse-btn{
    margin:8px; padding:8px; border-radius:7px; border:1px solid var(--line); background:var(--bg-2);
    color:var(--tx-2); cursor:pointer; display:flex; align-items:center; justify-content:center;
  }

  /* ---------- Topbar ---------- */
  .nx-topbar{
    height:54px; border-bottom:1px solid var(--line); background:var(--bg-1);
    display:flex; align-items:center; gap:10px; padding:0 16px; flex-shrink:0;
  }
  .nx-search{
    display:flex; align-items:center; gap:8px; background:var(--bg-2); border:1px solid var(--line);
    border-radius:8px; padding:7px 10px; color:var(--tx-2); flex:1; max-width:340px;
  }
  .nx-search input{background:none; border:none; outline:none; color:var(--tx-0); font-size:12.5px; width:100%;}
  .nx-cmdbar{
    display:flex; align-items:center; gap:8px; background:var(--ai-soft); border:1px solid var(--ai-line);
    border-radius:8px; padding:7px 12px; flex:2; max-width:560px; cursor:text;
  }
  .nx-cmdbar input{background:none; border:none; outline:none; color:#DCE7FF; font-size:12.5px; width:100%;}
  .nx-cmdbar input::placeholder{color:#7FA3E8;}
  .nx-topbar-right{display:flex; align-items:center; gap:8px; margin-left:auto;}
  .nx-pill{
    display:flex; align-items:center; gap:6px; background:var(--bg-2); border:1px solid var(--line);
    padding:6px 10px; border-radius:7px; font-size:12px; color:var(--tx-1); cursor:pointer;
  }
  .nx-iconbtn{
    position:relative; width:32px; height:32px; border-radius:7px; border:1px solid var(--line);
    background:var(--bg-2); color:var(--tx-1); display:flex; align-items:center; justify-content:center; cursor:pointer;
  }
  .nx-dot{position:absolute; top:-3px; right:-3px; width:14px; height:14px; border-radius:50%; background:var(--crit);
    font-size:8.5px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; border:2px solid var(--bg-1);}
  .nx-avatar{width:28px; height:28px; border-radius:7px; background:linear-gradient(155deg,#4C8DFF,#8151E0);
    display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11px; color:#fff;}

  /* ---------- Main / pages ---------- */
  .nx-main{flex:1; display:flex; flex-direction:column; min-width:0;}
  .nx-page{flex:1; overflow-y:auto; padding:22px 26px 60px;}
  .nx-pagehead{display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:18px; gap:16px;}
  .nx-h1{font-size:19px; font-weight:700; letter-spacing:-.2px;}
  .nx-sub{color:var(--tx-2); font-size:12.5px; margin-top:3px;}
  .nx-breadcrumb{display:flex; align-items:center; gap:6px; font-size:11.5px; color:var(--tx-2); margin-bottom:10px;}
  .nx-breadcrumb .bc-link{cursor:pointer; color:var(--tx-1);}
  .nx-breadcrumb .bc-link:hover{color:var(--ai);}

  /* ---------- Grid / cards ---------- */
  .nx-grid{display:grid; gap:12px;}
  .g-4{grid-template-columns:repeat(4,1fr);}
  .g-5{grid-template-columns:repeat(5,1fr);}
  .g-3{grid-template-columns:repeat(3,1fr);}
  .g-2{grid-template-columns:repeat(2,1fr);}
  .nx-card{
    background:var(--bg-1); border:1px solid var(--line); border-radius:11px; padding:16px;
  }
  .nx-card.tight{padding:12px 14px;}
  .nx-card.hover{cursor:pointer; transition:border-color .12s ease, transform .12s ease;}
  .nx-card.hover:hover{border-color:#33455C; transform:translateY(-1px);}
  .kpi-label{font-size:10.5px; color:var(--tx-2); text-transform:uppercase; letter-spacing:.5px; display:flex; align-items:center; gap:6px; margin-bottom:8px;}
  .kpi-value{font-size:23px; font-weight:700; letter-spacing:-.4px;}
  .kpi-delta{font-size:11px; margin-top:5px; display:flex; align-items:center; gap:4px;}
  .up-bad{color:#FF8992;} .up-good{color:#4CDA9E;} .flat{color:var(--tx-2);}

  .section-title{font-size:13px; font-weight:700; margin:26px 0 10px; display:flex; align-items:center; gap:8px;}
  .section-title .count{font-size:10.5px; font-weight:700; color:var(--tx-2); background:var(--bg-2); border:1px solid var(--line); border-radius:20px; padding:1px 8px;}

  /* Badges / chips */
  .chip{display:inline-flex; align-items:center; gap:5px; font-size:10.5px; font-weight:700; padding:2.5px 8px; border-radius:20px; letter-spacing:.2px;}
  .chip.crit{background:var(--crit-soft); color:#FF8992;}
  .chip.att{background:var(--att-soft); color:#F0A868;}
  .chip.warn{background:var(--warn-soft); color:#F0CB6C;}
  .chip.good{background:var(--good-soft); color:#4CDA9E;}
  .chip.ai{background:var(--ai-soft); color:#8FB7FF;}
  .chip.neutral{background:var(--bg-3); color:var(--tx-1);}
  .dot-status{width:7px; height:7px; border-radius:50%; display:inline-block;}
  .dot-status.crit{background:var(--crit);} .dot-status.att{background:var(--att);}
  .dot-status.warn{background:var(--warn);} .dot-status.good{background:var(--good);}
  .dot-status.ai{background:var(--ai);}

  .barwrap{height:5px; border-radius:6px; background:var(--bg-3); overflow:hidden; width:100%;}
  .barfill{height:100%; border-radius:6px;}

  /* Health ring */
  .ring-wrap{display:flex; align-items:center; gap:20px;}
  .ring-num{font-size:34px; font-weight:800; letter-spacing:-1px;}

  /* Tables */
  .nx-table{width:100%; border-collapse:collapse; font-size:12.3px;}
  .nx-table th{
    text-align:left; font-size:10.3px; text-transform:uppercase; letter-spacing:.4px; color:var(--tx-2);
    padding:9px 12px; border-bottom:1px solid var(--line); font-weight:600; white-space:nowrap;
  }
  .nx-table td{padding:10px 12px; border-bottom:1px solid var(--line-soft); vertical-align:middle;}
  .nx-table tr.clickable{cursor:pointer;}
  .nx-table tr.clickable:hover td{background:var(--bg-2);}

  /* Buttons */
  .btn{display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; padding:7px 13px;
    border-radius:7px; cursor:pointer; border:1px solid var(--line); background:var(--bg-2); color:var(--tx-0); white-space:nowrap;}
  .btn:hover{border-color:#3A4B60;}
  .btn.primary{background:var(--ai); border-color:var(--ai); color:#fff;}
  .btn.primary:hover{background:#3E7BEF;}
  .btn.ghost{background:transparent;}
  .btn.danger-line{color:#FF8992; border-color:#4A2A2E;}
  .btn.sm{padding:5px 10px; font-size:11.3px;}
  .btn:disabled{opacity:.45; cursor:not-allowed;}

  /* Tabs */
  .nx-tabs{display:flex; gap:2px; border-bottom:1px solid var(--line); margin-bottom:16px; overflow-x:auto;}
  .nx-tab{padding:9px 13px; font-size:12.3px; font-weight:600; color:var(--tx-2); cursor:pointer; border-bottom:2px solid transparent; white-space:nowrap;}
  .nx-tab.active{color:var(--tx-0); border-color:var(--ai);}
  .nx-tab:hover{color:var(--tx-0);}

  /* AI Investigation styling */
  .ai-panel{border:1px solid var(--ai-line); background:linear-gradient(180deg, rgba(76,141,255,.06), rgba(76,141,255,0)); border-radius:11px; padding:16px;}
  .conf-badge{display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700; color:#8FB7FF;}
  .evidence-item{display:flex; align-items:flex-start; gap:8px; padding:7px 0; border-bottom:1px solid var(--line-soft); font-size:12.2px;}
  .evidence-item:last-child{border-bottom:none;}
  .prob-row{display:flex; align-items:center; gap:10px; margin-bottom:8px;}
  .prob-row .lbl{width:170px; font-size:12px; color:var(--tx-1); flex-shrink:0;}
  .prob-row .pct{width:38px; text-align:right; font-size:12px; font-weight:700; font-family:var(--mono);}

  /* Pipeline stepper (signature element) */
  .pipeline{display:flex; align-items:center; width:100%; margin:4px 0 2px;}
  .pipe-step{display:flex; flex-direction:column; align-items:center; gap:6px; flex:1; position:relative;}
  .pipe-node{width:30px; height:30px; border-radius:50%; border:2px solid var(--line); background:var(--bg-2);
    display:flex; align-items:center; justify-content:center; z-index:2; transition:all .25s ease;}
  .pipe-node.done{border-color:var(--good); background:var(--good-soft); color:#4CDA9E;}
  .pipe-node.active{border-color:var(--ai); background:var(--ai-soft); color:#8FB7FF; box-shadow:0 0 0 4px rgba(76,141,255,.14);}
  .pipe-node.blocked{border-color:var(--crit); background:var(--crit-soft); color:#FF8992;}
  .pipe-label{font-size:9.6px; color:var(--tx-2); text-align:center; letter-spacing:.2px; max-width:78px;}
  .pipe-label.active{color:#BFD5FF; font-weight:700;}
  .pipe-line{position:absolute; top:15px; left:calc(-50% + 15px); width:calc(100% - 30px); height:2px; background:var(--line); z-index:1;}
  .pipe-line.done{background:var(--good);}
  .pipe-step:first-child .pipe-line{display:none;}

  /* Audit log */
  .audit-row{display:flex; gap:12px; padding:9px 0; border-bottom:1px solid var(--line-soft); font-size:12px;}
  .audit-time{color:var(--tx-2); font-family:var(--mono); font-size:11px; width:64px; flex-shrink:0; padding-top:1px;}
  .audit-dot{width:8px; height:8px; border-radius:50%; background:var(--ai); margin-top:5px; flex-shrink:0;}

  /* Approval drawer */
  .nx-drawer-backdrop{position:fixed; inset:0; background:rgba(3,6,10,.55); z-index:40; display:flex; justify-content:flex-end;}
  .nx-drawer{width:420px; max-width:92vw; height:100%; background:var(--bg-1); border-left:1px solid var(--line); display:flex; flex-direction:column;}
  .nx-drawer-head{padding:16px 18px; border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between;}
  .nx-drawer-body{flex:1; overflow-y:auto; padding:16px 18px;}

  /* Toast */
  .nx-toast{position:fixed; bottom:20px; right:20px; background:var(--bg-2); border:1px solid var(--good); border-radius:9px;
    padding:11px 15px; display:flex; align-items:center; gap:9px; z-index:60; box-shadow:0 10px 30px rgba(0,0,0,.4); font-size:12.5px; max-width:340px;}

  .empty-phase{display:flex; flex-direction:column; align-items:center; justify-content:center; padding:80px 20px; color:var(--tx-2); text-align:center;}
  .phase-tag{font-size:10.5px; background:var(--bg-2); border:1px solid var(--line); padding:3px 10px; border-radius:20px; margin-top:10px;}

  .diff-flow{display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-size:11.5px;}
  .diff-flow .node{background:var(--bg-2); border:1px solid var(--line); border-radius:20px; padding:4px 10px;}
  .diff-flow.ai .node{border-color:var(--ai-line); background:var(--ai-soft); color:#BFD5FF;}
  .diff-flow svg{color:var(--tx-2); flex-shrink:0;}

  .mini-spark{display:flex; align-items:flex-end; gap:2px; height:26px;}
  .mini-spark .bar{width:4px; border-radius:2px; background:var(--ai-line);}

  .integration-row{display:flex; align-items:center; justify-content:between; gap:10px; padding:11px 0; border-bottom:1px solid var(--line-soft);}
  .connline{width:7px; height:7px; border-radius:50%; background:var(--good); box-shadow:0 0 0 3px var(--good-soft);}
`;

/* ---------------------------------- MOCK DATA ---------------------------------- */

const CUSTOMERS = [
  { id: "acme", name: "ACME Manufacturing", industry: "Manufacturing", sites: 3, users: 214, devices: 38, servers: 9,
    health: 78, security: 71, backup: 82, patch: 88, openTickets: 6, criticalIncidents: 1, aiRecs: 4 },
  { id: "northstar", name: "Northstar Legal", industry: "Legal Services", sites: 2, users: 96, devices: 21, servers: 4,
    health: 91, security: 90, backup: 97, patch: 94, openTickets: 3, criticalIncidents: 0, aiRecs: 1 },
  { id: "bluepeak", name: "BluePeak Retail", industry: "Retail", sites: 6, users: 340, devices: 54, servers: 11,
    health: 84, security: 79, backup: 88, patch: 90, openTickets: 9, criticalIncidents: 1, aiRecs: 3 },
  { id: "greenfield", name: "Greenfield Healthcare", industry: "Healthcare", sites: 4, users: 188, devices: 47, servers: 13,
    health: 89, security: 85, backup: 93, patch: 91, openTickets: 4, criticalIncidents: 0, aiRecs: 2 },
  { id: "apex", name: "Apex Logistics", industry: "Logistics", sites: 5, users: 162, devices: 40, servers: 8,
    health: 95, security: 92, backup: 98, patch: 96, openTickets: 2, criticalIncidents: 0, aiRecs: 0 },
];

const DEVICES = [
  { id: "acme-sql01", name: "ACME-SQL01", customer: "acme", site: "Detroit HQ", os: "Windows Server 2022", type: "Server",
    status: "critical", cpu: 91, ram: 87, disk: 96, lastCheckin: "2 min ago", patch: "1 missing", security: "ok", backup: "failed",
    risk: "Critical", aiRec: "Investigate disk pressure & retry backup" },
  { id: "acme-dc01", name: "ACME-DC01", customer: "acme", site: "Detroit HQ", os: "Windows Server 2019", type: "Domain Controller",
    status: "healthy", cpu: 22, ram: 41, disk: 54, lastCheckin: "1 min ago", patch: "up to date", security: "ok", backup: "ok",
    risk: "Low", aiRec: "None" },
  { id: "acme-ws14", name: "ACME-WS14", customer: "acme", site: "Detroit HQ", os: "Windows 11", type: "Workstation",
    status: "warning", cpu: 12, ram: 55, disk: 78, lastCheckin: "14 min ago", patch: "2 missing", security: "ok", backup: "n/a",
    risk: "Medium", aiRec: "Schedule patch window" },
  { id: "bp-posdb", name: "BLUEPEAK-POSDB", customer: "bluepeak", site: "Austin DC", os: "Windows Server 2022", type: "Server",
    status: "attention", cpu: 64, ram: 71, disk: 58, lastCheckin: "3 min ago", patch: "1 missing", security: "warning", backup: "ok",
    risk: "Medium", aiRec: "Review local admin group drift" },
  { id: "bp-fw01", name: "BLUEPEAK-EDGE-FW01", customer: "bluepeak", site: "Austin DC", os: "FortiGate 7.2", type: "Firewall",
    status: "attention", cpu: 38, ram: 44, disk: 20, lastCheckin: "1 min ago", patch: "n/a", security: "warning", backup: "n/a",
    risk: "Medium", aiRec: "WAN latency anomaly detected" },
  { id: "gf-emr01", name: "GREENFIELD-EMR01", customer: "greenfield", site: "Columbus Clinic", os: "Windows Server 2019", type: "Server",
    status: "healthy", cpu: 34, ram: 48, disk: 61, lastCheckin: "1 min ago", patch: "up to date", security: "ok", backup: "ok",
    risk: "Low", aiRec: "None" },
  { id: "ns-fs01", name: "NORTHSTAR-FS01", customer: "northstar", site: "Chicago Office", os: "Windows Server 2022", type: "File Server",
    status: "healthy", cpu: 18, ram: 39, disk: 44, lastCheckin: "1 min ago", patch: "up to date", security: "ok", backup: "ok",
    risk: "Low", aiRec: "None" },
  { id: "apex-vm03", name: "APEX-VM03", customer: "apex", site: "Memphis Hub", os: "Ubuntu 22.04", type: "Virtual Machine",
    status: "healthy", cpu: 27, ram: 33, disk: 40, lastCheckin: "1 min ago", patch: "up to date", security: "ok", backup: "ok",
    risk: "Low", aiRec: "None" },
];

const INVESTIGATIONS = [
  {
    id: "inv-1041", title: "Production Server Risk Detected", customer: "acme", device: "acme-sql01",
    category: "Infrastructure", severity: "crit", confidence: 94, businessImpact: "High",
    summary: "ACME-SQL01 shows correlated disk pressure, SQL transaction log growth, rising CPU and a failed backup within the same 3-hour window.",
    evidence: [
      "CPU utilization increased 42% over the last 3 hours",
      "Disk free space dropped below 10% (96% utilized)",
      "SQL transaction log growth exceeded normal baseline by 6.1x",
      "Backup job ACME-SQL01-NIGHTLY failed at 02:14 (0x8007007A)",
      "Similar disk-pressure pattern occurred twice in the last 30 days",
      "No recent change requests logged against this server",
    ],
    reasoning: "CPU utilization increased by 42% over the last 3 hours. SQL Server accounts for most CPU consumption. Disk free space dropped below 10%. A backup job also failed during the same period. Similar incidents occurred twice in the last 30 days, both resolved by clearing the transaction log after a full backup.",
    rootCause: [
      { label: "SQL transaction log growth", pct: 72 },
      { label: "Disk pressure (general)", pct: 19 },
      { label: "Other / undetermined", pct: 9 },
    ],
    recommendedSteps: [
      "Verify last successful backup and confirm restore point",
      "Check transaction log size and growth settings",
      "Expand storage or shrink log if backup succeeds",
      "Run database health check (DBCC CHECKDB)",
      "Re-run backup job and verify completion",
    ],
    actionLabel: "Shrink transaction log after verified backup, then retry backup job",
    risk: "Medium", requiresApproval: true,
    status: "open", ticket: "TCK-3391",
  },
  {
    id: "inv-1042", title: "Identity Risk — Inactive Global Administrator", customer: "acme", device: null,
    category: "Identity", severity: "crit", confidence: 91, businessImpact: "High",
    summary: "A Global Administrator account has had no sign-in activity for 87 days, exceeding the 30-day dormant-privilege threshold.",
    evidence: [
      "User john.reyes@acmemfg.com — last sign-in 87 days ago",
      "Role: Global Administrator (permanent assignment, not PIM-eligible)",
      "No Conditional Access policy scoped to this account",
      "MFA registered but never challenged in 87 days",
      "Account not tied to any active break-glass procedure",
    ],
    reasoning: "The account carries permanent Global Administrator rights but shows no authentication activity in 87 days. Dormant privileged accounts are a leading vector for credential-based compromise and materially increase blast radius if the credential leaks.",
    rootCause: [
      { label: "Stale privileged assignment", pct: 84 },
      { label: "Legacy break-glass account", pct: 11 },
      { label: "Other", pct: 5 },
    ],
    recommendedSteps: [
      "Confirm business justification for the assignment",
      "Remove Global Administrator role or convert to PIM-eligible",
      "Enable Conditional Access requiring MFA + trusted location",
      "Document decision in identity audit trail",
    ],
    actionLabel: "Remove standing Global Administrator role",
    risk: "Medium", requiresApproval: true,
    status: "open", ticket: null,
  },
  {
    id: "inv-1043", title: "Backup Risk — 3 Critical Servers Failing", customer: "bluepeak", device: "bp-posdb",
    category: "Backup", severity: "att", confidence: 88, businessImpact: "High",
    summary: "Three servers at BluePeak Retail have not completed a successful backup in over 48 hours; repository authentication is failing.",
    evidence: [
      "BLUEPEAK-POSDB: 2 consecutive backup failures (auth error)",
      "BLUEPEAK-FS02: 3 consecutive backup failures (auth error)",
      "BLUEPEAK-APP01: last successful backup 51 hours ago",
      "Repository token expiry logged at 01:58",
      "No related maintenance window scheduled",
    ],
    reasoning: "All three failures share the same authentication error code against the same backup repository, and the token expiry timestamp aligns with the first failure. This points to a shared credential problem rather than three independent faults.",
    rootCause: [
      { label: "Backup repository token expired", pct: 89 },
      { label: "Network path change", pct: 7 },
      { label: "Other", pct: 4 },
    ],
    recommendedSteps: [
      "Reconnect backup repository and refresh authentication token",
      "Re-run failed jobs for all three servers",
      "Verify successful completion and RPO recovery",
      "Add token-expiry monitoring to prevent recurrence",
    ],
    actionLabel: "Reconnect backup repository (refresh token)",
    risk: "Low", requiresApproval: false,
    status: "open", ticket: "TCK-3402",
  },
  {
    id: "inv-1044", title: "Patch Risk — Internet-Facing Servers Exposed", customer: "bluepeak", device: null,
    category: "Patch", severity: "att", confidence: 90, businessImpact: "Medium",
    summary: "5 internet-facing servers are missing a critical security update (CVE-2026-31207) with known active exploitation.",
    evidence: [
      "CVE-2026-31207 — CVSS 9.1, actively exploited in the wild",
      "5 affected servers, all internet-facing (public IP present)",
      "Patch compatible with current app stack per test-ring history",
      "3 of 5 servers have a healthy backup within RPO",
      "Maintenance window available tonight 23:00–01:00 local",
    ],
    reasoning: "Exposure combined with active exploitation and a compatible patch history places this above routine scheduling. Two servers lack a recent verified backup and should be excluded from tonight's emergency window pending backup confirmation.",
    rootCause: [
      { label: "Missed patch cycle", pct: 100 },
    ],
    recommendedSteps: [
      "Confirm backup status for all 5 servers",
      "Deploy patch to the 3 servers with verified backups tonight",
      "Schedule remaining 2 after backup verification",
      "Run post-patch health check and confirm services",
    ],
    actionLabel: "Deploy emergency patch to 3 eligible servers tonight",
    risk: "Medium", requiresApproval: true,
    status: "open", ticket: null,
  },
  {
    id: "inv-1045", title: "Network Anomaly — WAN Latency +240%", customer: "bluepeak", device: "bp-fw01",
    category: "Network", severity: "warn", confidence: 82, businessImpact: "Medium",
    summary: "WAN latency at BluePeak Austin DC increased from 22ms to 170ms baseline over the last 6 hours, correlating with 4 open tickets.",
    evidence: [
      "WAN latency: 22ms baseline → 170ms current (+240%)",
      "Packet loss increased from 0.1% to 2.3%",
      "4 open tickets citing 'slow internet' from same site",
      "No corresponding LAN/WLAN utilization spike",
      "ISP circuit status page shows regional advisory",
    ],
    reasoning: "The anomaly is isolated to the WAN interface with no matching internal utilization increase, and 4 independent users report the same symptom. Combined with the ISP's own regional advisory, this points away from internal misconfiguration.",
    rootCause: [
      { label: "ISP-side degradation", pct: 77 },
      { label: "Firewall WAN interface fault", pct: 16 },
      { label: "Other", pct: 7 },
    ],
    recommendedSteps: [
      "Open escalation ticket with ISP including latency evidence",
      "Notify affected users of known issue",
      "Monitor for resolution and re-baseline after fix",
    ],
    actionLabel: "Create ISP escalation ticket with diagnostic evidence",
    risk: "Low", requiresApproval: false,
    status: "open", ticket: null,
  },
];

const TICKETS = [
  { id: "TCK-3391", customer: "acme", subject: "ACME-SQL01 disk pressure / backup failure", priority: "Critical", status: "In Progress", sla: "2h 14m", tech: "Alex Rowan", aiConfidence: 94, aiSummary: "Linked to AI investigation inv-1041.", investigation: "inv-1041" },
  { id: "TCK-3402", customer: "bluepeak", subject: "Backup repository authentication failing", priority: "High", status: "Awaiting Approval", sla: "5h 02m", tech: "Priya Nair", aiConfidence: 88, aiSummary: "Linked to AI investigation inv-1043.", investigation: "inv-1043" },
  { id: "TCK-3378", customer: "acme", subject: "User laptop keeps disconnecting from Wi-Fi", priority: "Medium", status: "Open", sla: "1d 3h", tech: "Unassigned", aiConfidence: 76, aiSummary: "18 disconnect events; nearby AP shows high packet loss; 7 other users affected. Likely access point issue.", investigation: null },
  { id: "TCK-3365", customer: "greenfield", subject: "New starter onboarding — Dr. Patel", priority: "Low", status: "Open", sla: "2d 0h", tech: "Jordan Lee", aiConfidence: 99, aiSummary: "Standard onboarding automation available.", investigation: null },
  { id: "TCK-3350", customer: "northstar", subject: "Printer offline — 3rd floor", priority: "Low", status: "Resolved", sla: "—", tech: "Priya Nair", aiConfidence: 97, aiSummary: "Resolved via automated print spooler restart.", investigation: null },
  { id: "TCK-3341", customer: "apex", subject: "Quarterly access review request", priority: "Medium", status: "Open", sla: "4d 6h", tech: "Alex Rowan", aiConfidence: 90, aiSummary: "Compliance-driven recurring request.", investigation: null },
];

const NAV_SECTIONS = [
  { label: "Operate", items: [
    { id: "overview", label: "Overview", icon: LayoutGrid, phase: 1 },
    { id: "aicc", label: "AI Command Center", icon: Bot, phase: 1, badge: () => INVESTIGATIONS.filter(i=>i.status==="open").length },
    { id: "customers", label: "Customers", icon: Building2, phase: 1 },
    { id: "devices", label: "Devices", icon: Monitor, phase: 1 },
    { id: "monitoring", label: "Monitoring", icon: Activity, phase: 1 },
    { id: "incidents", label: "Incidents", icon: AlertTriangle, phase: 1, badge: () => INVESTIGATIONS.filter(i=>i.severity==="crit"&&i.status==="open").length },
    { id: "tickets", label: "Tickets", icon: TicketIcon, phase: 1 },
  ]},
  { label: "Protect", items: [
    { id: "patch", label: "Patch Management", icon: ShieldCheck, phase: 2 },
    { id: "backup", label: "Backup & DR", icon: HardDrive, phase: 2 },
    { id: "security", label: "Security", icon: ShieldAlert, phase: 2 },
    { id: "identity", label: "Identity", icon: Fingerprint, phase: 2 },
  ]},
  { label: "Infrastructure", items: [
    { id: "network", label: "Network", icon: Network, phase: 3 },
    { id: "cloud", label: "Cloud", icon: Cloud, phase: 3 },
    { id: "automation", label: "Automation", icon: Cog, phase: 2 },
    { id: "agents", label: "AI Agents", icon: Users2, phase: 3 },
  ]},
  { label: "Govern", items: [
    { id: "knowledge", label: "Knowledge", icon: BookOpen, phase: 2 },
    { id: "compliance", label: "Compliance", icon: ClipboardCheck, phase: 3 },
    { id: "reports", label: "Reports", icon: FileBarChart, phase: 3 },
    { id: "integrations", label: "Integrations", icon: Plug, phase: 3 },
    { id: "settings", label: "Settings", icon: Settings, phase: 3 },
  ]},
];

const PIPELINE_STAGES = ["Observe","Correlate","Investigate","Recommend","Approve","Act","Verify","Document"];

function sevColor(sev){ return sev==="crit"?"crit":sev==="att"?"att":sev==="warn"?"warn":"good"; }
function custName(id){ const c = CUSTOMERS.find(c=>c.id===id); return c ? c.name : "—"; }
function deviceName(id){ const d = DEVICES.find(d=>d.id===id); return d ? d.name : null; }

/* ---------------------------------- SMALL UI PRIMITIVES ---------------------------------- */

function Chip({ tone="neutral", children, icon:Icon }) {
  return <span className={`chip ${tone}`}>{Icon && <Icon size={11}/>}{children}</span>;
}
function Bar({ pct, tone="ai" }) {
  const color = tone==="crit"?"var(--crit)":tone==="att"?"var(--att)":tone==="warn"?"var(--warn)":tone==="good"?"var(--good)":"var(--ai)";
  return <div className="barwrap"><div className="barfill" style={{ width:`${pct}%`, background:color }} /></div>;
}
function KPI({ label, value, icon:Icon, delta, deltaTone, tone }) {
  const vColor = tone==="crit" ? "#FF8992" : tone==="warn" ? "#F0CB6C" : tone==="good" ? "#4CDA9E" : "var(--tx-0)";
  return (
    <div className="nx-card">
      <div className="kpi-label"><Icon size={13}/>{label}</div>
      <div className="kpi-value" style={{ color:vColor }}>{value}</div>
      {delta && <div className={`kpi-delta ${deltaTone||"flat"}`}>{delta}</div>}
    </div>
  );
}
function ScoreRing({ value, size=92 }) {
  const r = (size-10)/2, c = 2*Math.PI*r;
  const color = value>=90?"var(--good)":value>=75?"var(--warn)":"var(--crit)";
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} stroke="var(--bg-3)" strokeWidth="7" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="7" fill="none"
        strokeDasharray={c} strokeDashoffset={c - (value/100)*c} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition:"stroke-dashoffset .6s ease" }}/>
      <text x="50%" y="52%" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--tx-0)">{value}</text>
    </svg>
  );
}
function Sparkline({ seed=1, tone="ai" }) {
  const bars = Array.from({length:16}, (_,i) => 20 + (Math.sin(i*seed*0.7)+1)*15 + (i*seed%7));
  const color = tone==="crit"?"var(--crit)":"var(--ai-line)";
  return <div className="mini-spark">{bars.map((h,i)=><div key={i} className="bar" style={{ height:`${Math.min(h,26)}px`, background:color }}/>)}</div>;
}

/* ---------------------------------- PIPELINE ---------------------------------- */
function Pipeline({ activeIndex, blockedIndex=-1 }) {
  return (
    <div className="pipeline">
      {PIPELINE_STAGES.map((s,i)=>{
        const state = i < activeIndex ? "done" : i===activeIndex ? "active" : "";
        const isBlocked = i===blockedIndex;
        return (
          <div className="pipe-step" key={s}>
            <div className={`pipe-line ${i<=activeIndex ? "done":""}`} />
            <div className={`pipe-node ${isBlocked?"blocked":state}`}>
              {state==="done" ? <CheckCircle2 size={14}/> : isBlocked ? <X size={14}/> : i===activeIndex ? <Loader2 size={14} className="spin"/> : <Circle size={8}/>}
            </div>
            <div className={`pipe-label ${state==="active"?"active":""}`}>{s}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- TOP BAR ---------------------------------- */
function TopBar({ nav, approvalCount, onOpenApprovals, aiQuery, setAiQuery, onRunAiQuery }) {
  return (
    <div className="nx-topbar">
      <div className="nx-search"><Search size={14}/><input placeholder="Search customers, devices, tickets…" /></div>
      <div className="nx-cmdbar">
        <Sparkles size={14} color="#8FB7FF"/>
        <input
          placeholder='Ask AI — "Which clients have failed backups?"'
          value={aiQuery}
          onChange={e=>setAiQuery(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter") onRunAiQuery(); }}
        />
      </div>
      <div className="nx-topbar-right">
        <div className="nx-pill"><Building2 size={13}/>All Customers<ChevronDown size={12}/></div>
        <div className="nx-pill"><Clock size={13}/>Last 24h<ChevronDown size={12}/></div>
        <div className="nx-iconbtn" onClick={onOpenApprovals} title="Approval queue">
          <ClipboardCheck size={15}/>
          {approvalCount>0 && <span className="nx-dot">{approvalCount}</span>}
        </div>
        <div className="nx-iconbtn"><Bell size={15}/><span className="nx-dot">3</span></div>
        <div className="nx-avatar">AR</div>
      </div>
    </div>
  );
}

/* ---------------------------------- SIDEBAR ---------------------------------- */
function Sidebar({ view, setView, collapsed, setCollapsed }) {
  return (
    <div className={`nx-sidebar ${collapsed?"collapsed":""}`}>
      <div className="nx-brand">
        <div className="nx-brand-mark"><Bot size={15} color="#fff"/></div>
        {!collapsed && <div className="nx-brand-text"><div className="nx-brand-name">NEXUS MSP AI</div><div className="nx-brand-sub">Operations & Security</div></div>}
      </div>
      <div className="nx-nav nx-scroll">
        {NAV_SECTIONS.map(section=>(
          <div key={section.label}>
            {!collapsed && <div className="nx-nav-group-label">{section.label}</div>}
            {section.items.map(item=>{
              const Icon = item.icon;
              const badge = item.badge ? item.badge() : null;
              return (
                <div key={item.id} className={`nx-navitem ${view===item.id?"active":""}`} onClick={()=>setView(item.id)} title={item.label}>
                  <Icon size={15}/>
                  {!collapsed && <span className="lbl">{item.label}</span>}
                  {!collapsed && badge>0 && <span className="nx-badge blue">{badge}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="nx-collapse-btn" onClick={()=>setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight size={15}/> : <><ChevronRight size={13} style={{transform:"rotate(180deg)"}}/></>}
      </div>
    </div>
  );
}

/* ---------------------------------- OVERVIEW ---------------------------------- */
function Overview({ goInvestigation, setView }) {
  const critical = INVESTIGATIONS.filter(i=>i.status==="open" && (i.severity==="crit"||i.severity==="att"));
  const biggestRisk = INVESTIGATIONS.find(i=>i.severity==="crit");
  return (
    <div className="nx-page">
      <div className="nx-pagehead">
        <div>
          <div className="nx-h1">Good morning, Alex</div>
          <div className="nx-sub">Mock Integration Mode — 6 adapters connected · data refreshed 1 min ago</div>
        </div>
        <button className="btn primary" onClick={()=>setView("aicc")}><Sparkles size={13}/>Review AI Priorities</button>
      </div>

      <div className="nx-grid g-5">
        <KPI label="Managed Customers" value="24" icon={Building2}/>
        <KPI label="Devices" value="2,486" icon={Monitor}/>
        <KPI label="Critical Issues" value="7" icon={AlertTriangle} tone="crit" delta="3 security · 2 backup · 1 infra · 1 network" />
        <KPI label="Security Risk" value="18 High" icon={ShieldAlert} tone="warn"/>
        <KPI label="SLA At Risk" value="8" icon={Clock} tone="warn"/>
      </div>

      <div className="nx-grid g-3" style={{marginTop:12}}>
        <div className="nx-card">
          <div className="ring-wrap">
            <ScoreRing value={91} size={100}/>
            <div>
              <div style={{fontWeight:700, fontSize:14}}>MSP Environment Health</div>
              <div className="nx-sub" style={{marginTop:2}}>Aggregated across 24 customers</div>
              <div style={{display:"flex", gap:14, marginTop:10, flexWrap:"wrap"}}>
                {[["Infra",94],["Security",87],["Backup",98],["Patch",92],["Identity",84],["Network",95]].map(([l,v])=>(
                  <div key={l} style={{fontSize:11}}><span style={{color:"var(--tx-2)"}}>{l} </span><b>{v}</b></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="nx-card">
          <div className="kpi-label"><Bot size={13}/>AI Activity Today</div>
          <div style={{display:"flex", gap:22, marginTop:6}}>
            <div><div className="kpi-value" style={{fontSize:22}}>12</div><div className="nx-sub">Recommendations</div></div>
            <div><div className="kpi-value" style={{fontSize:22, color:"#F0CB6C"}}>4</div><div className="nx-sub">Awaiting approval</div></div>
            <div><div className="kpi-value" style={{fontSize:22, color:"#4CDA9E"}}>37</div><div className="nx-sub">Remediated</div></div>
          </div>
        </div>
        <div className="nx-card" style={{borderColor:"var(--crit)"}}>
          <div className="kpi-label"><AlertTriangle size={13} color="#FF8992"/>Biggest Risk</div>
          <div style={{fontWeight:700, fontSize:14, marginTop:2}}>{custName(biggestRisk.customer)}</div>
          <div className="nx-sub" style={{marginTop:2}}>{biggestRisk.title}</div>
          <button className="btn sm" style={{marginTop:10}} onClick={()=>goInvestigation(biggestRisk.id)}>Open investigation<ArrowRight size={12}/></button>
        </div>
      </div>

      <div className="nx-card ai-panel" style={{marginTop:14}}>
        <div className="conf-badge"><Bot size={14}/>AI SUMMARY</div>
        <div style={{marginTop:8, fontSize:13, lineHeight:1.6, color:"var(--tx-0)"}}>
          Infrastructure health is stable overall. Security risk increased 6% in the last 24 hours due to three identity findings.
          Two production servers require critical patches. Four backup jobs require attention — three at BluePeak Retail share a
          common repository authentication failure.
        </div>
      </div>

      <div className="section-title">Needs Your Attention <span className="count">{critical.length}</span></div>
      <div className="nx-grid g-2">
        {critical.map(inv=>(
          <div key={inv.id} className="nx-card hover" onClick={()=>goInvestigation(inv.id)}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
              <Chip tone={sevColor(inv.severity)}>{inv.category}</Chip>
              <span className="conf-badge nx-mono">{inv.confidence}% confidence</span>
            </div>
            <div style={{fontWeight:700, fontSize:13.5, marginTop:9}}>{inv.title}</div>
            <div className="nx-sub" style={{marginTop:4}}>{custName(inv.customer)}{deviceName(inv.device) ? ` · ${deviceName(inv.device)}` : ""}</div>
            <div style={{fontSize:12, color:"var(--tx-1)", marginTop:8, lineHeight:1.5}}>{inv.summary}</div>
          </div>
        ))}
      </div>

      <div className="section-title">Traditional MSP vs. AI-Native MSP</div>
      <div className="nx-card">
        <div style={{fontSize:11, color:"var(--tx-2)", marginBottom:6, fontWeight:700, letterSpacing:.3}}>TRADITIONAL</div>
        <div className="diff-flow">
          {["Monitor","Alert","Technician investigates","Technician fixes","Technician documents"].map((n,i,arr)=>(
            <React.Fragment key={n}><span className="node">{n}</span>{i<arr.length-1 && <ArrowRight size={13}/>}</React.Fragment>
          ))}
        </div>
        <div style={{fontSize:11, color:"var(--tx-2)", margin:"16px 0 6px", fontWeight:700, letterSpacing:.3}}>NEXUS AI-NATIVE</div>
        <div className="diff-flow ai">
          {["Monitor","AI correlates","AI investigates","AI recommends","Policy check","Human/AI executes","AI verifies","AI documents"].map((n,i,arr)=>(
            <React.Fragment key={n}><span className="node">{n}</span>{i<arr.length-1 && <ArrowRight size={13}/>}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- AI COMMAND CENTER ---------------------------------- */
function AICommandCenter({ goInvestigation, aiResult }) {
  return (
    <div className="nx-page">
      <div className="nx-pagehead">
        <div><div className="nx-h1">AI Operations Center</div><div className="nx-sub">Correlated investigations across all customers, ranked by confidence and business impact</div></div>
      </div>

      {aiResult && (
        <div className="nx-card ai-panel" style={{marginBottom:16}}>
          <div className="conf-badge"><Terminal size={13}/>AI QUERY RESULT — "{aiResult.query}"</div>
          <div style={{marginTop:8, fontSize:12.8, lineHeight:1.6}}>{aiResult.answer}</div>
          {aiResult.rows && (
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:6}}>
              {aiResult.rows.map((r,i)=>(
                <div key={i} style={{display:"flex", justifyContent:"space-between", fontSize:12, padding:"6px 10px", background:"var(--bg-2)", borderRadius:7, cursor: r.invId?"pointer":"default"}} onClick={()=> r.invId && goInvestigation(r.invId)}>
                  <span>{r.label}</span><span style={{color:"var(--tx-2)"}}>{r.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="nx-grid g-2">
        {INVESTIGATIONS.map(inv=>(
          <div key={inv.id} className="nx-card hover" onClick={()=>goInvestigation(inv.id)}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
              <div style={{display:"flex", gap:6, alignItems:"center"}}>
                <Chip tone={sevColor(inv.severity)}>{inv.category}</Chip>
                {inv.status!=="open" && <Chip tone="good">{inv.status}</Chip>}
              </div>
              <span className="conf-badge nx-mono">{inv.confidence}%</span>
            </div>
            <div style={{fontWeight:700, fontSize:13.5, marginTop:9}}>{inv.title}</div>
            <div className="nx-sub" style={{marginTop:4}}>{custName(inv.customer)}{deviceName(inv.device) ? ` · ${deviceName(inv.device)}` : ""}</div>
            <div style={{fontSize:12, color:"var(--tx-1)", marginTop:8, lineHeight:1.5}}>{inv.summary}</div>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:12, alignItems:"center"}}>
              <span className="nx-sub" style={{display:"flex",alignItems:"center",gap:5}}><Layers size={12}/>{inv.evidence.length} evidence items</span>
              <span style={{color:"var(--ai)", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:3}}>Open investigation<ArrowRight size={12}/></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- INVESTIGATION DETAIL ---------------------------------- */
function InvestigationDetail({ inv, setView, gateway, startGateway, ticketFor }) {
  if (!inv) return null;
  const stageIndex = gateway ? gateway.stageIndex : (inv.status==="verified" ? 7 : -1);
  return (
    <div className="nx-page">
      <div className="nx-breadcrumb">
        <span className="bc-link" onClick={()=>setView("aicc")}>AI Command Center</span><ChevronRight size={11}/><span>{inv.id}</span>
      </div>
      <div className="nx-pagehead">
        <div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <Chip tone={sevColor(inv.severity)}>{inv.category}</Chip>
            {inv.status==="verified" && <Chip tone="good" icon={CheckCircle2}>Remediated & Verified</Chip>}
          </div>
          <div className="nx-h1" style={{marginTop:8}}>{inv.title}</div>
          <div className="nx-sub">{custName(inv.customer)}{deviceName(inv.device) ? ` · ${deviceName(inv.device)}` : ""} · Business impact: {inv.businessImpact}</div>
        </div>
        <div className="conf-badge" style={{fontSize:13}}><Gauge size={15}/>AI confidence {inv.confidence}%</div>
      </div>

      <div className="nx-card" style={{marginBottom:16}}>
        <div className="kpi-label" style={{marginBottom:10}}><ChevronsRight size={13}/>AI Action Gateway Pipeline</div>
        <Pipeline activeIndex={stageIndex} />
      </div>

      <div className="nx-grid g-2" style={{alignItems:"start"}}>
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          <div className="ai-panel nx-card">
            <div className="conf-badge"><Bot size={13}/>AI REASONING SUMMARY</div>
            <div style={{marginTop:8, fontSize:12.8, lineHeight:1.65}}>{inv.reasoning}</div>
          </div>

          <div className="nx-card">
            <div className="kpi-label"><Eye size={13}/>Evidence Collected</div>
            {inv.evidence.map((e,i)=>(
              <div className="evidence-item" key={i}><CheckCircle2 size={13} color="var(--tx-2)" style={{marginTop:2, flexShrink:0}}/><span>{e}</span></div>
            ))}
          </div>

          <div className="nx-card">
            <div className="kpi-label"><Database size={13}/>Root Cause Probability</div>
            {inv.rootCause.map((r,i)=>(
              <div className="prob-row" key={i}>
                <span className="lbl">{r.label}</span>
                <Bar pct={r.pct} tone={i===0?"ai":"neutral"}/>
                <span className="pct nx-mono">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          <div className="nx-card">
            <div className="kpi-label"><ClipboardCheck size={13}/>Recommended Action</div>
            <ol style={{margin:"6px 0 0", paddingLeft:18, display:"flex", flexDirection:"column", gap:6}}>
              {inv.recommendedSteps.map((s,i)=><li key={i} style={{fontSize:12.4, color:"var(--tx-1)"}}>{s}</li>)}
            </ol>
            <div style={{marginTop:12, padding:"10px 12px", background:"var(--bg-2)", borderRadius:8, fontSize:12.3}}>
              <b>Proposed action:</b> {inv.actionLabel}
            </div>
            <div style={{display:"flex", gap:8, marginTop:6, alignItems:"center"}}>
              <span className="nx-sub">Risk classification:</span>
              <Chip tone={inv.risk==="Low"?"good":inv.risk==="Medium"?"warn":"crit"}>{inv.risk}</Chip>
              <span className="nx-sub">{inv.requiresApproval ? "Approval required by policy" : "Eligible for auto-execution"}</span>
            </div>
          </div>

          <GatewayCard inv={inv} gateway={gateway} startGateway={startGateway} />

          {ticketFor && (
            <div className="nx-card">
              <div className="kpi-label"><TicketIcon size={13}/>Linked Ticket</div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6}}>
                <div>
                  <div style={{fontWeight:700, fontSize:12.8}}>{ticketFor.id} — {ticketFor.subject}</div>
                  <div className="nx-sub" style={{marginTop:2}}>Status: {ticketFor.status} · {ticketFor.tech}</div>
                </div>
                <Chip tone={ticketFor.priority==="Critical"?"crit":ticketFor.priority==="High"?"att":"neutral"}>{ticketFor.priority}</Chip>
              </div>
            </div>
          )}

          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            <button className="btn"><Search size={13}/>Investigate Further</button>
            <button className="btn"><TicketIcon size={13}/>Create Ticket</button>
            <button className="btn"><PlayCircle size={13}/>Run Safe Diagnostic</button>
            <button className="btn ghost danger-line"><X size={13}/>Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GatewayCard({ inv, gateway, startGateway }) {
  const done = gateway && gateway.stageIndex >= 7;
  return (
    <div className="nx-card" style={{borderColor: gateway ? "var(--ai-line)" : "var(--line)"}}>
      <div className="kpi-label"><ShieldCheck size={13}/>Policy Engine Decision</div>
      {!gateway && (
        <>
          <div style={{fontSize:12.3, color:"var(--tx-1)", margin:"6px 0 12px", lineHeight:1.5}}>
            {inv.requiresApproval
              ? "This action is classified Medium/High risk. Human approval is required before execution."
              : "This action is classified Low risk and is eligible for automatic execution under current policy."}
          </div>
          <button className="btn primary" onClick={()=>startGateway(inv)}>
            {inv.requiresApproval ? <><ClipboardCheck size={13}/>Request Approval</> : <><PlayCircle size={13}/>Approve & Execute</>}
          </button>
        </>
      )}
      {gateway && (
        <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:6}}>
          <GatewayLine label="AI Decision" done={gateway.stageIndex>=3} />
          <GatewayLine label="Policy Engine" done={gateway.stageIndex>=4} sub={inv.requiresApproval? "Approval required" : "Auto-approve eligible"} />
          <GatewayLine label="Risk Classification" done={gateway.stageIndex>=4} sub={inv.risk} />
          <GatewayLine label="Approval Check" done={gateway.stageIndex>=4} sub={gateway.stageIndex>=4 ? "Approved by Alex Rowan" : "Waiting…"} active={gateway.stageIndex===4}/>
          <GatewayLine label="Execution" done={gateway.stageIndex>=5} active={gateway.stageIndex===5} sub={gateway.stageIndex>=5 ? inv.actionLabel : ""}/>
          <GatewayLine label="Verification" done={gateway.stageIndex>=6} active={gateway.stageIndex===6} sub={gateway.stageIndex>=6 ? "Metrics confirm resolution" : ""}/>
          <GatewayLine label="Audit Log" done={gateway.stageIndex>=7} active={gateway.stageIndex===7} sub={gateway.stageIndex>=7 ? "Entry recorded" : ""}/>
          {done && <div className="chip good" style={{marginTop:4, width:"fit-content"}}><CheckCircle2 size={11}/>Remediation verified successfully</div>}
        </div>
      )}
    </div>
  );
}
function GatewayLine({ label, done, active, sub }) {
  return (
    <div style={{display:"flex", alignItems:"flex-start", gap:8}}>
      {done ? <CheckCircle2 size={14} color="var(--good)"/> : active ? <Loader2 size={14} color="var(--ai)" className="spin"/> : <Circle size={14} color="var(--tx-2)"/>}
      <div>
        <div style={{fontSize:12.4, fontWeight:600, color: done?"var(--tx-0)":"var(--tx-1)"}}>{label}</div>
        {sub && <div className="nx-sub" style={{fontSize:11.2}}>{sub}</div>}
      </div>
    </div>
  );
}

/* ---------------------------------- CUSTOMERS ---------------------------------- */
function Customers({ goCustomer }) {
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Customers</div><div className="nx-sub">24 managed customers · showing 5 in prototype dataset</div></div>
        <button className="btn"><Building2 size={13}/>Add Customer</button>
      </div>
      <div className="nx-grid g-3">
        {CUSTOMERS.map(c=>(
          <div key={c.id} className="nx-card hover" onClick={()=>goCustomer(c.id)}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:700, fontSize:14}}>{c.name}</div>
                <div className="nx-sub">{c.industry} · {c.sites} sites · {c.users} users</div>
              </div>
              <ScoreRing value={c.health} size={56}/>
            </div>
            <div style={{display:"flex", gap:14, marginTop:14}}>
              <MiniStat label="Security" value={c.security}/>
              <MiniStat label="Backup" value={c.backup}/>
              <MiniStat label="Patch" value={c.patch}/>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:14, paddingTop:12, borderTop:"1px solid var(--line-soft)"}}>
              <span className="nx-sub">{c.openTickets} open tickets</span>
              {c.criticalIncidents>0 ? <Chip tone="crit">{c.criticalIncidents} critical</Chip> : <Chip tone="good">Stable</Chip>}
              <span className="nx-sub" style={{display:"flex",alignItems:"center",gap:4}}><Sparkles size={11}/>{c.aiRecs} AI recs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MiniStat({ label, value }) {
  const tone = value>=90?"good":value>=75?"warn":"crit";
  return (
    <div style={{flex:1}}>
      <div style={{display:"flex", justifyContent:"space-between", fontSize:10.6, color:"var(--tx-2)", marginBottom:4}}><span>{label}</span><span className="nx-mono">{value}</span></div>
      <Bar pct={value} tone={tone}/>
    </div>
  );
}

function CustomerDetail({ customer, setView, goInvestigation, goDevice }) {
  const [tab, setTab] = useState("overview");
  if (!customer) return null;
  const devices = DEVICES.filter(d=>d.customer===customer.id);
  const tickets = TICKETS.filter(t=>t.customer===customer.id);
  const invs = INVESTIGATIONS.filter(i=>i.customer===customer.id);
  return (
    <div className="nx-page">
      <div className="nx-breadcrumb"><span className="bc-link" onClick={()=>setView("customers")}>Customers</span><ChevronRight size={11}/><span>{customer.name}</span></div>
      <div className="nx-pagehead">
        <div><div className="nx-h1">{customer.name}</div><div className="nx-sub">{customer.industry} · {customer.sites} sites · {customer.devices} devices · {customer.servers} servers</div></div>
        <ScoreRing value={customer.health} size={70}/>
      </div>
      <div className="nx-tabs">
        {["overview","devices","tickets","ai insights"].map(t=>(
          <div key={t} className={`nx-tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</div>
        ))}
      </div>
      {tab==="overview" && (
        <>
          <div className="nx-grid g-4">
            <KPI label="Security" value={customer.security} icon={ShieldAlert} tone={customer.security>=85?"good":"warn"}/>
            <KPI label="Backup" value={customer.backup} icon={HardDrive} tone={customer.backup>=90?"good":"warn"}/>
            <KPI label="Patch" value={customer.patch} icon={ShieldCheck} tone={customer.patch>=90?"good":"warn"}/>
            <KPI label="Open Tickets" value={customer.openTickets} icon={TicketIcon}/>
          </div>
          <div className="section-title">Active AI Investigations <span className="count">{invs.length}</span></div>
          {invs.length===0 && <div className="nx-card nx-sub">No active investigations for this customer.</div>}
          <div className="nx-grid g-2">
            {invs.map(inv=>(
              <div key={inv.id} className="nx-card hover" onClick={()=>goInvestigation(inv.id)}>
                <Chip tone={sevColor(inv.severity)}>{inv.category}</Chip>
                <div style={{fontWeight:700, fontSize:13, marginTop:8}}>{inv.title}</div>
                <div className="nx-sub" style={{marginTop:4}}>{inv.confidence}% confidence · {inv.businessImpact} impact</div>
              </div>
            ))}
          </div>
        </>
      )}
      {tab==="devices" && (
        <DeviceTable devices={devices} onOpen={goDevice}/>
      )}
      {tab==="tickets" && (
        <TicketTable tickets={tickets} showCustomer={false}/>
      )}
      {tab==="ai insights" && (
        <div className="nx-card ai-panel">
          <div className="conf-badge"><Bot size={13}/>AI SUMMARY</div>
          <div style={{marginTop:8, fontSize:12.8, lineHeight:1.6}}>
            {customer.name} is trending {customer.health>=85 ? "stable" : "at risk"} with a health score of {customer.health}.
            {invs.length>0 ? ` ${invs.length} open investigation${invs.length>1?"s":""} require attention, prioritized by business impact.` : " No active investigations — all monitored systems within expected thresholds."}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- DEVICES ---------------------------------- */
function DeviceTable({ devices, onOpen }) {
  return (
    <div className="nx-card" style={{padding:0}}>
      <table className="nx-table">
        <thead><tr><th>Device</th><th>Site</th><th>Type</th><th>CPU</th><th>RAM</th><th>Disk</th><th>Patch</th><th>Backup</th><th>Risk</th><th>Last Check-in</th></tr></thead>
        <tbody>
          {devices.map(d=>(
            <tr key={d.id} className="clickable" onClick={()=>onOpen(d.id)}>
              <td><div style={{display:"flex", alignItems:"center", gap:7}}><span className={`dot-status ${d.status==="critical"?"crit":d.status==="attention"?"att":d.status==="warning"?"warn":"good"}`}/><b className="nx-mono" style={{fontSize:12}}>{d.name}</b></div></td>
              <td>{d.site}</td>
              <td>{d.type}</td>
              <td><span style={{color: d.cpu>85?"#FF8992":"var(--tx-0)"}}>{d.cpu}%</span></td>
              <td><span style={{color: d.ram>85?"#FF8992":"var(--tx-0)"}}>{d.ram}%</span></td>
              <td><span style={{color: d.disk>90?"#FF8992":"var(--tx-0)"}}>{d.disk}%</span></td>
              <td>{d.patch==="up to date" ? <Chip tone="good">Up to date</Chip> : <Chip tone="warn">{d.patch}</Chip>}</td>
              <td>{d.backup==="ok" ? <Chip tone="good">OK</Chip> : d.backup==="failed" ? <Chip tone="crit">Failed</Chip> : <Chip tone="neutral">N/A</Chip>}</td>
              <td><Chip tone={d.risk==="Critical"?"crit":d.risk==="Medium"?"warn":"good"}>{d.risk}</Chip></td>
              <td className="nx-sub">{d.lastCheckin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Devices({ goDevice }) {
  const [filter, setFilter] = useState("all");
  const filtered = DEVICES.filter(d=>{
    if(filter==="all") return true;
    if(filter==="critical") return d.status==="critical";
    if(filter==="patch") return d.patch!=="up to date";
    if(filter==="backup") return d.backup==="failed";
    return true;
  });
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Devices</div><div className="nx-sub">2,486 devices under management · showing prototype dataset</div></div></div>
      <div style={{display:"flex", gap:8, marginBottom:14}}>
        {[["all","All"],["critical","Critical"],["patch","Patch overdue"],["backup","Backup issue"]].map(([k,l])=>(
          <div key={k} className="nx-pill" style={{background: filter===k?"var(--ai-soft)":"var(--bg-2)", borderColor: filter===k?"var(--ai-line)":"var(--line)", color: filter===k?"#BFD5FF":"var(--tx-1)"}} onClick={()=>setFilter(k)}>{l}</div>
        ))}
      </div>
      <DeviceTable devices={filtered} onOpen={goDevice}/>
    </div>
  );
}

function DeviceDetail({ device, setView, goInvestigation }) {
  const [tab, setTab] = useState("monitoring");
  if (!device) return null;
  const relatedInv = INVESTIGATIONS.find(i=>i.device===device.id);
  const services = [
    { name: "MSSQLSERVER", status: "Running" }, { name: "SQLSERVERAGENT", status: "Running" },
    { name: "W3SVC", status: "Running" }, { name: "Spooler", status: "Stopped" },
    { name: "WinDefend", status: "Running" }, { name: "VeeamBackupSvc", status: device.backup==="failed"?"Error":"Running" },
  ];
  const events = [
    { time: "02:14:08", level: "Error", src: "VSS", msg: "Backup job failed — volume shadow copy timeout (0x8007007A)" },
    { time: "01:58:41", level: "Warning", src: "MSSQLSERVER", msg: "Transaction log for database 'ACME_ERP' is 92% full" },
    { time: "01:40:12", level: "Warning", src: "Disk", msg: "Free space on C:\\ below 10% threshold" },
    { time: "00:12:03", level: "Info", src: "System", msg: "Scheduled maintenance script completed" },
  ];
  return (
    <div className="nx-page">
      <div className="nx-breadcrumb"><span className="bc-link" onClick={()=>setView("devices")}>Devices</span><ChevronRight size={11}/><span>{device.name}</span></div>
      <div className="nx-pagehead">
        <div>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <span className={`dot-status ${device.status==="critical"?"crit":device.status==="attention"?"att":device.status==="warning"?"warn":"good"}`}/>
            <div className="nx-h1 nx-mono">{device.name}</div>
          </div>
          <div className="nx-sub">{device.os} · {device.type} · {custName(device.customer)} · {device.site}</div>
        </div>
        {relatedInv && <button className="btn primary" onClick={()=>goInvestigation(relatedInv.id)}><Bot size={13}/>View AI Investigation</button>}
      </div>
      <div className="nx-grid g-4">
        <KPI label="CPU" value={`${device.cpu}%`} icon={Cpu} tone={device.cpu>85?"crit":"good"}/>
        <KPI label="Memory" value={`${device.ram}%`} icon={MemoryStick} tone={device.ram>85?"warn":"good"}/>
        <KPI label="Disk" value={`${device.disk}%`} icon={HardDrive} tone={device.disk>90?"crit":"good"}/>
        <KPI label="Last Check-in" value={device.lastCheckin} icon={Clock}/>
      </div>
      <div className="nx-tabs">
        {["monitoring","services","event logs"].map(t=>(
          <div key={t} className={`nx-tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</div>
        ))}
      </div>
      {tab==="monitoring" && (
        <div className="nx-grid g-2">
          {["CPU","Memory","Disk I/O","Network"].map((m,i)=>(
            <div className="nx-card" key={m}>
              <div className="kpi-label">{m}</div>
              <Sparkline seed={i+1.3} tone={device.status==="critical"?"crit":"ai"}/>
            </div>
          ))}
        </div>
      )}
      {tab==="services" && (
        <div className="nx-card" style={{padding:0}}>
          <table className="nx-table">
            <thead><tr><th>Service</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {services.map(s=>(
                <tr key={s.name}>
                  <td className="nx-mono">{s.name}</td>
                  <td>{s.status==="Running" ? <Chip tone="good">Running</Chip> : s.status==="Error" ? <Chip tone="crit">Error</Chip> : <Chip tone="neutral">Stopped</Chip>}</td>
                  <td style={{display:"flex", gap:6}}>
                    <button className="btn sm"><RotateCw size={11}/>Restart</button>
                    <button className="btn sm ghost"><PauseCircle size={11}/>Stop</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab==="event logs" && (
        <div className="nx-card">
          {events.map((e,i)=>(
            <div className="evidence-item" key={i}>
              <span className={`dot-status ${e.level==="Error"?"crit":e.level==="Warning"?"warn":"good"}`} style={{marginTop:5}}/>
              <div style={{flex:1}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <span><b>{e.src}</b> <span className="nx-sub">· {e.level}</span></span>
                  <span className="nx-sub nx-mono">{e.time}</span>
                </div>
                <div style={{color:"var(--tx-1)", marginTop:2}}>{e.msg}</div>
              </div>
            </div>
          ))}
          <button className="btn primary" style={{marginTop:10}} onClick={()=> relatedInv && goInvestigation(relatedInv.id)}><Sparkles size={13}/>Ask AI to Investigate</button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- MONITORING ---------------------------------- */
function MonitoringPage() {
  const categories = ["CPU","RAM","Disk","Disk Health","Windows Services","Event Logs","Network","SQL","Certificates","Hyper-V","Azure VMs","Application Health"];
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Monitoring</div><div className="nx-sub">Unified telemetry across RMM, cloud, and application adapters — AI correlates raw signals into incidents</div></div></div>
      <div className="nx-grid g-3">
        {categories.map((c,i)=>(
          <div key={c} className="nx-card">
            <div className="kpi-label">{c}</div>
            <Sparkline seed={i+0.6}/>
            <div className="nx-sub" style={{marginTop:6}}>{Math.floor(400+i*37)} data points / 24h</div>
          </div>
        ))}
      </div>
      <div className="section-title">Correlation Example</div>
      <div className="nx-card">
        <div style={{display:"flex", gap:20, flexWrap:"wrap"}}>
          <div style={{flex:1, minWidth:220}}>
            <div className="kpi-label">Raw Alerts</div>
            {["CPU > 90%","Disk > 90%","SQL service warning","Backup failure"].map(a=>(
              <div key={a} style={{padding:"7px 10px", background:"var(--bg-2)", borderRadius:7, fontSize:12, marginBottom:6}}>{a}</div>
            ))}
          </div>
          <div style={{display:"flex", alignItems:"center"}}><ArrowRight size={20} color="var(--ai)"/></div>
          <div style={{flex:1, minWidth:240}}>
            <div className="kpi-label">AI Unified Incident</div>
            <div className="nx-card" style={{borderColor:"var(--crit)"}}>
              <Chip tone="crit">Critical</Chip>
              <div style={{fontWeight:700, marginTop:6}}>Potential Database Performance Incident</div>
              <div className="nx-sub" style={{marginTop:4}}>Confidence 94% · Business impact High</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- INCIDENTS ---------------------------------- */
function Incidents({ goInvestigation }) {
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Incidents</div><div className="nx-sub">AI-correlated incidents ranked by severity — click to open the full investigation</div></div></div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Severity</th><th>Incident</th><th>Customer</th><th>Confidence</th><th>Impact</th><th>Status</th></tr></thead>
          <tbody>
            {INVESTIGATIONS.map(i=>(
              <tr key={i.id} className="clickable" onClick={()=>goInvestigation(i.id)}>
                <td><Chip tone={sevColor(i.severity)}>{i.severity==="crit"?"Critical":i.severity==="att"?"Attention":"Warning"}</Chip></td>
                <td style={{fontWeight:600}}>{i.title}</td>
                <td>{custName(i.customer)}</td>
                <td className="nx-mono">{i.confidence}%</td>
                <td>{i.businessImpact}</td>
                <td>{i.status==="open" ? <Chip tone="neutral">Open</Chip> : <Chip tone="good">Verified</Chip>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- TICKETS ---------------------------------- */
function TicketTable({ tickets, showCustomer=true, onOpenInv }) {
  return (
    <div className="nx-card" style={{padding:0}}>
      <table className="nx-table">
        <thead><tr><th>Ticket</th><th>Subject</th>{showCustomer && <th>Customer</th>}<th>Priority</th><th>Status</th><th>SLA</th><th>Technician</th><th>AI Confidence</th></tr></thead>
        <tbody>
          {tickets.map(t=>(
            <tr key={t.id} className={t.investigation ? "clickable" : ""} onClick={()=> t.investigation && onOpenInv && onOpenInv(t.investigation)}>
              <td className="nx-mono">{t.id}</td>
              <td>{t.subject}{t.investigation && <Sparkles size={11} color="var(--ai)" style={{marginLeft:6}}/>}</td>
              {showCustomer && <td>{custName(t.customer)}</td>}
              <td><Chip tone={t.priority==="Critical"?"crit":t.priority==="High"?"att":t.priority==="Medium"?"warn":"neutral"}>{t.priority}</Chip></td>
              <td>{t.status}</td>
              <td className="nx-mono">{t.sla}</td>
              <td>{t.tech}</td>
              <td className="nx-mono">{t.aiConfidence}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function TicketsPage({ tickets, goInvestigation }) {
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Tickets</div><div className="nx-sub">126 open tickets · AI triage active on all incoming tickets</div></div>
        <button className="btn primary"><TicketIcon size={13}/>New Ticket</button>
      </div>
      <TicketTable tickets={tickets} onOpenInv={goInvestigation}/>
    </div>
  );
}

/* ---------------------------------- AUDIT LOG DRAWER / APPROVALS ---------------------------------- */
function ApprovalsDrawer({ open, onClose, pending, onApprove, onDismiss }) {
  if (!open) return null;
  return (
    <div className="nx-drawer-backdrop" onClick={onClose}>
      <div className="nx-drawer" onClick={e=>e.stopPropagation()}>
        <div className="nx-drawer-head">
          <div style={{fontWeight:700, display:"flex", alignItems:"center", gap:7}}><ClipboardCheck size={15}/>Approval Queue</div>
          <X size={17} style={{cursor:"pointer"}} onClick={onClose}/>
        </div>
        <div className="nx-drawer-body">
          {pending.length===0 && <div className="nx-sub" style={{textAlign:"center", padding:"40px 0"}}>No actions awaiting approval.</div>}
          {pending.map(inv=>(
            <div key={inv.id} className="nx-card" style={{marginBottom:12}}>
              <Chip tone={sevColor(inv.severity)}>{inv.category}</Chip>
              <div style={{fontWeight:700, fontSize:12.8, marginTop:7}}>{inv.title}</div>
              <div className="nx-sub" style={{marginTop:3}}>{custName(inv.customer)}</div>
              <div style={{fontSize:12, color:"var(--tx-1)", marginTop:8}}>{inv.actionLabel}</div>
              <div style={{display:"flex", gap:6, marginTop:6}}>
                <Chip tone={inv.risk==="Low"?"good":"warn"}>{inv.risk} risk</Chip>
                <span className="nx-sub nx-mono">{inv.confidence}% confidence</span>
              </div>
              <div style={{display:"flex", gap:8, marginTop:10}}>
                <button className="btn primary sm" onClick={()=>onApprove(inv)}><CheckCircle2 size={12}/>Approve & Execute</button>
                <button className="btn sm ghost danger-line" onClick={()=>onDismiss(inv)}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuditLogView({ log }) {
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">AI Audit Log</div><div className="nx-sub">Complete, tamper-evident history of every AI decision, approval, action, and verification</div></div></div>
      <div className="nx-card">
        {log.length===0 && <div className="nx-sub">No AI actions recorded yet this session. Approve a recommendation from the AI Command Center to populate the audit trail.</div>}
        {log.map((entry,i)=>(
          <div className="audit-row" key={i}>
            <div className="audit-time">{entry.time}</div>
            <div className="audit-dot"/>
            <div>
              <div>{entry.text}</div>
              {entry.meta && <div className="nx-sub" style={{marginTop:2}}>{entry.meta}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- PHASE PLACEHOLDER ---------------------------------- */
function PhasePlaceholder({ item }) {
  return (
    <div className="nx-page">
      <div className="empty-phase" style={{margin:"auto"}}>
        <item.icon size={30} color="var(--tx-2)"/>
        <div style={{fontWeight:700, fontSize:15, marginTop:12, color:"var(--tx-0)"}}>{item.label}</div>
        <div style={{maxWidth:380, marginTop:6}}>This module is scoped for Phase {item.phase} of the build. Phase 1 (Overview, AI Command Center, Customers, Devices, Monitoring, Incidents, Tickets) is fully interactive in this prototype.</div>
        <div className="phase-tag">Planned — Phase {item.phase}</div>
      </div>
    </div>
  );
}

/* ---------------------------------- APP ROOT ---------------------------------- */
export default function NexusMspAi() {
  const [view, setViewRaw] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedInvId, setSelectedInvId] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [investigations, setInvestigations] = useState(INVESTIGATIONS);
  const [tickets, setTickets] = useState(TICKETS);
  const [gateways, setGateways] = useState({}); // invId -> {stageIndex}
  const [approvalsOpen, setApprovalsOpen] = useState(false);
  const [auditLog, setAuditLog] = useState([
    { time: "08:02", text: "Monitoring Agent baseline sync completed across 24 customers.", meta: "System" },
  ]);
  const [toast, setToast] = useState(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const timers = useRef([]);

  useEffect(()=>()=>timers.current.forEach(clearTimeout), []);

  function setView(v){ setViewRaw(v); }
  function goInvestigation(id){ setSelectedInvId(id); setViewRaw("investigation-detail"); }
  function goCustomer(id){ setSelectedCustomerId(id); setViewRaw("customer-detail"); }
  function goDevice(id){ setSelectedDeviceId(id); setViewRaw("device-detail"); }

  function pushAudit(text, meta) {
    const t = new Date(); const time = `${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;
    setAuditLog(l=>[{ time, text, meta }, ...l]);
  }

  function startGateway(inv) {
    pushAudit(`${inv.category} Agent flagged "${inv.title}" for review.`, custName(inv.customer));
    setGateways(g=>({ ...g, [inv.id]: { stageIndex: 3 } }));
    const seq = [
      { at: 500, stage: 4, msg: `Policy engine classified action as ${inv.risk} risk.` },
      { at: 1600, stage: inv.requiresApproval ? 4 : 5, msg: inv.requiresApproval ? "Awaiting human approval — added to approval queue." : "Auto-approved under policy; execution starting." },
    ];
    if (inv.requiresApproval) {
      seq.forEach(s=>{
        const timer = setTimeout(()=> {
          setGateways(g=>({ ...g, [inv.id]: { stageIndex: s.stage } }));
          pushAudit(s.msg, inv.title);
          if (s.stage===4 && inv.requiresApproval) setToast({ text: "Action added to approval queue.", tone: "warn" });
        }, s.at);
        timers.current.push(timer);
      });
    } else {
      runExecution(inv, 700);
    }
  }

  function approveGateway(inv) {
    pushAudit(`Technician approved remediation for "${inv.title}".`, "Alex Rowan");
    setGateways(g=>({ ...g, [inv.id]: { stageIndex: 5 } }));
    setToast(null);
    runExecution(inv, 300);
  }

  function runExecution(inv, delay) {
    const t1 = setTimeout(()=>{
      setGateways(g=>({ ...g, [inv.id]: { stageIndex: 5 } }));
      pushAudit(`Executing: ${inv.actionLabel}`, deviceName(inv.device) || custName(inv.customer));
    }, delay);
    const t2 = setTimeout(()=>{
      setGateways(g=>({ ...g, [inv.id]: { stageIndex: 6 } }));
      pushAudit("Verification checks running against live metrics.", "Verification Agent");
    }, delay+1200);
    const t3 = setTimeout(()=>{
      setGateways(g=>({ ...g, [inv.id]: { stageIndex: 7 } }));
      pushAudit(`Verification successful — issue resolved.`, inv.title);
      setInvestigations(list=>list.map(i=> i.id===inv.id ? { ...i, status:"verified" } : i));
      if (inv.ticket) {
        setTickets(list=>list.map(t=> t.id===inv.ticket ? { ...t, status:"Resolved" } : t));
        pushAudit(`Ticket ${inv.ticket} automatically updated to Resolved.`, "Ticket Agent");
      }
      setToast({ text: "Remediation verified. Documentation and audit trail updated.", tone: "good" });
      const t4 = setTimeout(()=>setToast(null), 4200);
      timers.current.push(t4);
    }, delay+2600);
    timers.current.push(t1,t2,t3);
  }

  function dismissGateway(inv) {
    setGateways(g=>{ const n={...g}; delete n[inv.id]; return n; });
    pushAudit(`Technician dismissed recommendation for "${inv.title}".`, "Alex Rowan");
  }

  function runAiQuery() {
    if (!aiQuery.trim()) return;
    const q = aiQuery.toLowerCase();
    let answer, rows;
    if (q.includes("backup")) {
      const failing = investigations.filter(i=>i.category==="Backup" && i.status==="open");
      answer = failing.length ? `${failing.length} customer${failing.length>1?"s":""} currently show failed or at-risk backup jobs.` : "No customers currently have failed backups.";
      rows = failing.map(i=>({ label: custName(i.customer), value: i.title, invId: i.id }));
    } else if (q.includes("privileg") || q.includes("admin") || q.includes("inactive")) {
      const idFindings = investigations.filter(i=>i.category==="Identity");
      answer = idFindings.length ? `Found ${idFindings.length} identity finding(s) involving privileged or inactive accounts.` : "No privileged-account findings at this time.";
      rows = idFindings.map(i=>({ label: custName(i.customer), value: i.title, invId: i.id }));
    } else if (q.includes("critical") || q.includes("issue")) {
      const crit = investigations.filter(i=>i.severity==="crit" && i.status==="open");
      answer = `${crit.length} critical issue(s) open across all customers, ranked by AI confidence.`;
      rows = crit.map(i=>({ label: custName(i.customer), value: `${i.title} · ${i.confidence}%`, invId: i.id }));
    } else if (q.includes("patch")) {
      const p = investigations.filter(i=>i.category==="Patch");
      answer = p.length ? `${p.length} patch-related risk(s) identified, including internet-facing exposure.` : "No outstanding patch risks.";
      rows = p.map(i=>({ label: custName(i.customer), value: i.title, invId: i.id }));
    } else if (q.includes("chang")) {
      answer = "In the last 24 hours: 1 backup repository token expired at BluePeak Retail, 1 emergency CVE was published affecting 5 servers, and 1 WAN latency anomaly began at BluePeak Austin DC.";
      rows = null;
    } else {
      answer = "I can answer questions about critical issues, backups, patches, identity risk, and recent changes. Try: \"Which clients have failed backups?\"";
      rows = null;
    }
    setAiResult({ query: aiQuery, answer, rows });
    setViewRaw("aicc");
    setAiQuery("");
  }

  const pending = investigations.filter(i => i.status==="open" && gateways[i.id] && gateways[i.id].stageIndex===4 && i.requiresApproval);
  const approvalBadgeCount = pending.length;

  const selectedInv = investigations.find(i=>i.id===selectedInvId);
  const selectedCustomer = CUSTOMERS.find(c=>c.id===selectedCustomerId);
  const selectedDevice = DEVICES.find(d=>d.id===selectedDeviceId);
  const ticketFor = selectedInv ? tickets.find(t=>t.id===selectedInv.ticket) : null;

  const navItem = NAV_SECTIONS.flatMap(s=>s.items).find(i=>i.id===view);

  let body;
  if (view==="overview") body = <Overview goInvestigation={goInvestigation} setView={setView}/>;
  else if (view==="aicc") body = <AICommandCenter goInvestigation={goInvestigation} aiResult={aiResult}/>;
  else if (view==="investigation-detail") body = <InvestigationDetail inv={selectedInv} setView={setView} gateway={gateways[selectedInvId]} startGateway={startGateway} ticketFor={ticketFor}/>;
  else if (view==="customers") body = <Customers goCustomer={goCustomer}/>;
  else if (view==="customer-detail") body = <CustomerDetail customer={selectedCustomer} setView={setView} goInvestigation={goInvestigation} goDevice={goDevice}/>;
  else if (view==="devices") body = <Devices goDevice={goDevice}/>;
  else if (view==="device-detail") body = <DeviceDetail device={selectedDevice} setView={setView} goInvestigation={goInvestigation}/>;
  else if (view==="monitoring") body = <MonitoringPage/>;
  else if (view==="incidents") body = <Incidents goInvestigation={goInvestigation}/>;
  else if (view==="tickets") body = <TicketsPage tickets={tickets} goInvestigation={goInvestigation}/>;
  else if (view==="audit") body = <AuditLogView log={auditLog}/>;
  else body = <PhasePlaceholder item={navItem || {label:"Module", icon:Cog, phase:3}}/>;

  return (
    <div className="nx-root">
      <style>{css}</style>
      <style>{`.spin{animation:nxspin 1s linear infinite;} @keyframes nxspin{to{transform:rotate(360deg);}}`}</style>
      <Sidebar view={view==="investigation-detail"?"aicc":view==="customer-detail"?"customers":view==="device-detail"?"devices":view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div className="nx-main">
        <TopBar nav={view} approvalCount={approvalBadgeCount} onOpenApprovals={()=>setApprovalsOpen(true)} aiQuery={aiQuery} setAiQuery={setAiQuery} onRunAiQuery={runAiQuery}/>
        {body}
      </div>
      <ApprovalsDrawer
        open={approvalsOpen}
        onClose={()=>setApprovalsOpen(false)}
        pending={pending}
        onApprove={(inv)=>{ approveGateway(inv); }}
        onDismiss={(inv)=>{ dismissGateway(inv); }}
      />
      {toast && (
        <div className="nx-toast" style={{borderColor: toast.tone==="good" ? "var(--good)" : "var(--warn)"}}>
          {toast.tone==="good" ? <CheckCircle2 size={16} color="var(--good)"/> : <ClipboardCheck size={16} color="var(--warn)"/>}
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
}
