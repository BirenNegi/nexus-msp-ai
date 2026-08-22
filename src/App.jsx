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

  /* Interactive topbar dropdowns */
  .nx-pill.active, .nx-iconbtn.active{border-color:var(--ai-line); background:var(--ai-soft); color:#BFD5FF;}
  .nx-dd-wrap{position:relative;}
  .nx-dd{
    position:absolute; top:calc(100% + 8px); background:var(--bg-1); border:1px solid var(--line);
    border-radius:10px; box-shadow:0 14px 34px rgba(0,0,0,.45); z-index:50; overflow:hidden;
  }
  .nx-dd.left{left:0;} .nx-dd.right{right:0;}
  .nx-dd-header{padding:9px 12px; font-size:10.5px; text-transform:uppercase; letter-spacing:.5px; color:var(--tx-2); border-bottom:1px solid var(--line-soft);}
  .nx-dd-item{
    display:flex; align-items:center; justify-content:space-between; gap:10px; padding:9px 12px; font-size:12.4px;
    cursor:pointer; color:var(--tx-1); white-space:nowrap;
  }
  .nx-dd-item:hover{background:var(--bg-2); color:var(--tx-0);}
  .nx-dd-item.selected{color:#BFD5FF; background:var(--ai-soft);}
  .nx-dd-scroll{max-height:280px; overflow-y:auto;}
  .search-dd{width:100%; max-width:420px;}
  .search-group-label{padding:8px 12px 3px; font-size:10px; text-transform:uppercase; letter-spacing:.5px; color:var(--tx-2);}
  .search-result{display:flex; flex-direction:column; gap:1px; padding:8px 12px; cursor:pointer;}
  .search-result:hover{background:var(--bg-2);}
  .search-result .r-title{font-size:12.5px; font-weight:600; color:var(--tx-0);}
  .search-result .r-sub{font-size:11px; color:var(--tx-2);}
  .notif-item{display:flex; gap:9px; padding:10px 12px; border-bottom:1px solid var(--line-soft); cursor:pointer; align-items:flex-start;}
  .notif-item:hover{background:var(--bg-2);}
  .notif-item:last-child{border-bottom:none;}
  .notif-dot{width:7px; height:7px; border-radius:50%; margin-top:5px; flex-shrink:0;}
  .user-dd-item{display:flex; align-items:center; gap:9px; padding:9px 14px; font-size:12.5px; color:var(--tx-1); cursor:pointer;}
  .user-dd-item:hover{background:var(--bg-2); color:var(--tx-0);}
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

const PATCH_FINDINGS = [
  { id: "cve-31207", cve: "CVE-2026-31207", severity: "Critical", cvss: 9.1, exploited: true,
    customer: "bluepeak", affected: 5, exposure: "Internet-facing", businessImportance: "High",
    compatible: true, recommendation: "Deploy immediately", investigation: "inv-1044" },
  { id: "cve-28810", cve: "CVE-2026-28810", severity: "High", cvss: 8.4, exploited: false,
    customer: "acme", affected: 3, exposure: "Internal only", businessImportance: "Medium",
    compatible: true, recommendation: "Schedule during maintenance window", investigation: null },
  { id: "cve-25502", cve: "CVE-2026-25502", severity: "High", cvss: 7.8, exploited: false,
    customer: "greenfield", affected: 2, exposure: "Internet-facing", businessImportance: "High",
    compatible: true, recommendation: "Schedule during maintenance window", investigation: null },
  { id: "cve-19934", cve: "CVE-2026-19934", severity: "Medium", cvss: 6.5, exploited: false,
    customer: "apex", affected: 8, exposure: "Internal only", businessImportance: "Low",
    compatible: true, recommendation: "Schedule during maintenance window", investigation: null },
  { id: "cve-17720", cve: "CVE-2026-17720", severity: "Critical", cvss: 9.4, exploited: true,
    customer: "northstar", affected: 1, exposure: "Internet-facing", businessImportance: "High",
    compatible: false, recommendation: "Verify compatibility before deploying", investigation: null },
];

const BACKUP_JOBS = [
  { id: "bkp-01", device: "acme-sql01", customer: "acme", repo: "Azure Blob — ACME-REPO-01", lastRun: "Today 02:14", status: "Failed",
    errorCode: "0x8007007A", rpo: "24h (breached)", sizeGb: 412, durationMin: 38, restoreTest: "Pending" },
  { id: "bkp-02", device: "bp-posdb", customer: "bluepeak", repo: "Cove — BP-REPO-01", lastRun: "Yesterday 23:40", status: "Failed",
    errorCode: "AUTH_TOKEN_EXPIRED", rpo: "24h (breached)", sizeGb: 88, durationMin: 12, restoreTest: "Pending" },
  { id: "bkp-03", device: "BLUEPEAK-FS02", customer: "bluepeak", repo: "Cove — BP-REPO-01", lastRun: "Yesterday 23:44", status: "Failed",
    errorCode: "AUTH_TOKEN_EXPIRED", rpo: "24h (breached)", sizeGb: 210, durationMin: 24, restoreTest: "Pending" },
  { id: "bkp-04", device: "BLUEPEAK-APP01", customer: "bluepeak", repo: "Cove — BP-REPO-01", lastRun: "2 days ago", status: "Failed",
    errorCode: "AUTH_TOKEN_EXPIRED", rpo: "24h (breached)", sizeGb: 64, durationMin: 9, restoreTest: "Pending" },
  { id: "bkp-05", device: "acme-dc01", customer: "acme", repo: "Azure Blob — ACME-REPO-01", lastRun: "Today 01:10", status: "Success",
    errorCode: "—", rpo: "24h (met)", sizeGb: 51, durationMin: 6, restoreTest: "Passed 96%" },
  { id: "bkp-06", device: "gf-emr01", customer: "greenfield", repo: "Veeam — GF-REPO-01", lastRun: "Today 00:45", status: "Success",
    errorCode: "—", rpo: "12h (met)", sizeGb: 190, durationMin: 21, restoreTest: "Passed 98%" },
  { id: "bkp-07", device: "ns-fs01", customer: "northstar", repo: "Datto — NS-REPO-01", lastRun: "Today 01:55", status: "Success",
    errorCode: "—", rpo: "24h (met)", sizeGb: 77, durationMin: 8, restoreTest: "Passed 94%" },
  { id: "bkp-08", device: "apex-vm03", customer: "apex", repo: "Acronis — APEX-REPO-01", lastRun: "Today 02:30", status: "Success",
    errorCode: "—", rpo: "24h (met)", sizeGb: 33, durationMin: 4, restoreTest: "Not tested" },
];

const SECURITY_FINDINGS = [
  { id: "sf-1", title: "Impossible travel sign-in — privileged account", source: "Entra ID Protection", severity: "crit",
    customer: "acme", asset: "john.reyes@acmemfg.com", firstSeen: "3h ago", confidence: 91, investigation: "inv-1042" },
  { id: "sf-2", title: "New OAuth app granted mailbox read access", source: "Microsoft Graph", severity: "att",
    customer: "acme", asset: "Tenant-wide", firstSeen: "6h ago", confidence: 84, investigation: null },
  { id: "sf-3", title: "Local administrator group drift detected", source: "Defender for Endpoint", severity: "att",
    customer: "bluepeak", asset: "BLUEPEAK-POSDB", firstSeen: "1d ago", confidence: 88, investigation: null },
  { id: "sf-4", title: "Unmanaged device connected to corporate Wi-Fi", source: "Firewall", severity: "warn",
    customer: "greenfield", asset: "Unknown-MAC-4F2C", firstSeen: "2d ago", confidence: 76, investigation: null },
  { id: "sf-5", title: "BitLocker disabled after firmware update", source: "Defender for Endpoint", severity: "warn",
    customer: "apex", asset: "APEX-LT-092", firstSeen: "4h ago", confidence: 95, investigation: null },
];

const IDENTITY_USERS = [
  { name: "John Reyes", email: "john.reyes@acmemfg.com", customer: "acme", role: "Global Administrator", lastSignIn: "87 days ago", mfa: "Registered, unused", risk: "Critical" },
  { name: "Priya Shah", email: "priya.shah@acmemfg.com", customer: "acme", role: "User Administrator", lastSignIn: "2h ago", mfa: "Enforced", risk: "Low" },
  { name: "Marcus Webb", email: "mwebb@bluepeakretail.com", customer: "bluepeak", role: "Global Administrator", lastSignIn: "1h ago", mfa: "Enforced", risk: "Low" },
  { name: "svc-backup-agent", email: "svc-backup@bluepeakretail.com", customer: "bluepeak", role: "Exchange Administrator", lastSignIn: "45 days ago", mfa: "Not enrolled", risk: "Medium" },
  { name: "Dr. Alicia Patel", email: "apatel@greenfieldhc.org", customer: "greenfield", role: "User", lastSignIn: "10m ago", mfa: "Enforced", risk: "Low" },
  { name: "guest_vendor_842", email: "vendor842@guest.northstarlegal.com", customer: "northstar", role: "Guest — SharePoint contributor", lastSignIn: "61 days ago", mfa: "Not enrolled", risk: "Medium" },
  { name: "Tom Alvarez", email: "talvarez@apexlogistics.com", customer: "apex", role: "Global Administrator", lastSignIn: "3h ago", mfa: "Enforced", risk: "Low" },
];

const NETWORK_SITES = [
  { site: "Austin DC", customer: "bluepeak", latencyBaseline: 22, latencyCurrent: 170, packetLoss: 2.3, bandwidthUtil: 61, status: "warn" },
  { site: "Detroit HQ", customer: "acme", latencyBaseline: 14, latencyCurrent: 16, packetLoss: 0.1, bandwidthUtil: 44, status: "good" },
  { site: "Chicago Office", customer: "northstar", latencyBaseline: 18, latencyCurrent: 19, packetLoss: 0.0, bandwidthUtil: 31, status: "good" },
  { site: "Columbus Clinic", customer: "greenfield", latencyBaseline: 20, latencyCurrent: 22, packetLoss: 0.2, bandwidthUtil: 52, status: "good" },
  { site: "Memphis Hub", customer: "apex", latencyBaseline: 16, latencyCurrent: 15, packetLoss: 0.0, bandwidthUtil: 38, status: "good" },
];

const CLOUD_RESOURCES = [
  { name: "acme-erp-vm02", customer: "acme", provider: "Azure", type: "VM", region: "East US", cpuAvg: 4, costMonth: 312, publicExposure: false, backup: "ok", flag: "Idle — under 5% CPU for 30 days" },
  { name: "bluepeak-storage01", customer: "bluepeak", provider: "Azure", type: "Storage Account", region: "South Central US", cpuAvg: null, costMonth: 88, publicExposure: true, backup: "ok", flag: "Public blob access enabled" },
  { name: "greenfield-sql-prod", customer: "greenfield", provider: "Azure", type: "SQL Database", region: "East US 2", cpuAvg: 34, costMonth: 640, publicExposure: false, backup: "ok", flag: null },
  { name: "apex-app-cluster", customer: "apex", provider: "AWS", type: "EC2 Auto Scaling", region: "us-east-1", cpuAvg: 41, costMonth: 1120, publicExposure: false, backup: "ok", flag: null },
  { name: "northstar-backup-vault", customer: "northstar", provider: "Azure", type: "Recovery Vault", region: "North Central US", cpuAvg: null, costMonth: 54, publicExposure: false, backup: "ok", flag: null },
];

const AUTOMATIONS = [
  { name: "Restart service", category: "Monitoring", risk: "Safe", approval: "Auto-approve", success: 98, runs: 214 },
  { name: "Clear temp files / disk cleanup", category: "Monitoring", risk: "Safe", approval: "Auto-approve", success: 99, runs: 176 },
  { name: "Collect diagnostics", category: "Monitoring", risk: "Safe", approval: "Auto-approve", success: 100, runs: 340 },
  { name: "User onboarding", category: "Identity", risk: "Medium", approval: "Requires approval", success: 96, runs: 41 },
  { name: "User offboarding", category: "Identity", risk: "Medium", approval: "Requires approval", success: 97, runs: 33 },
  { name: "Revoke session / isolate device", category: "Security", risk: "Medium", approval: "Requires approval", success: 100, runs: 12 },
  { name: "Retry backup job", category: "Backup", risk: "Safe", approval: "Auto-approve", success: 91, runs: 58 },
  { name: "Run restore test", category: "Backup", risk: "Safe", approval: "Auto-approve", success: 94, runs: 22 },
  { name: "Deploy patch", category: "Patch", risk: "Medium", approval: "Requires approval", success: 95, runs: 89 },
  { name: "Schedule reboot", category: "Patch", risk: "Medium", approval: "Requires approval", success: 99, runs: 74 },
  { name: "Create / escalate ticket", category: "Ticketing", risk: "Safe", approval: "Auto-approve", success: 100, runs: 402 },
  { name: "Delete user / production data", category: "Identity", risk: "High", approval: "Never autonomous", success: null, runs: 0 },
];

const AGENTS = [
  { name: "Monitoring Agent", desc: "Detects and investigates infrastructure anomalies across CPU, disk, services, and event logs.",
    tools: ["get_device_metrics", "get_event_logs", "get_services"], risk: "Low", status: "Active", lastActivity: "2 min ago", actionsToday: 14 },
  { name: "Security Agent", desc: "Correlates Defender, firewall, and identity signals into unified investigations.",
    tools: ["get_security_alerts", "get_signins", "isolate_device"], risk: "Medium", status: "Active", lastActivity: "8 min ago", actionsToday: 6 },
  { name: "Identity Auditor", desc: "Continuously audits users, roles, MFA coverage, and privileged account activity.",
    tools: ["get_user", "get_signins", "get_directory_roles"], risk: "Low", status: "Active", lastActivity: "31 min ago", actionsToday: 3 },
  { name: "Backup Agent", desc: "Monitors backup job health, RPO compliance, and runs recovery verification.",
    tools: ["get_backup_status", "run_diagnostic", "retry_backup"], risk: "Low", status: "Active", lastActivity: "12 min ago", actionsToday: 9 },
  { name: "Patch Agent", desc: "Prioritizes CVEs by exploitability and exposure, and manages deployment windows.",
    tools: ["get_patch_status", "get_vulnerabilities", "schedule_patch"], risk: "Medium", status: "Active", lastActivity: "1h ago", actionsToday: 4 },
  { name: "Ticket Agent", desc: "Triages incoming tickets, drafts responses, and assigns technicians.",
    tools: ["get_ticket_history", "create_ticket", "search_knowledge"], risk: "Low", status: "Active", lastActivity: "1 min ago", actionsToday: 37 },
  { name: "Documentation Agent", desc: "Generates and updates runbooks, tickets notes, and change documentation.",
    tools: ["search_knowledge", "create_ticket"], risk: "Low", status: "Idle", lastActivity: "3h ago", actionsToday: 5 },
  { name: "Executive Agent", desc: "Compiles monthly IT health reports and prioritized recommendations per customer.",
    tools: ["get_device", "get_ticket_history", "get_security_alerts"], risk: "Low", status: "Idle", lastActivity: "Yesterday", actionsToday: 0 },
];

const KNOWLEDGE_ARTICLES = [
  { id: "KB-102", title: "Resolving VSS backup timeout errors (0x8007007A)", source: "SOP", customer: "Global", updated: "3 months ago" },
  { id: "KB-118", title: "ACME network diagram & VLAN reference", source: "Customer Documentation", customer: "acme", updated: "1 month ago" },
  { id: "TCK-3201", title: "Backup repository auth token renewal procedure", source: "Past Ticket", customer: "bluepeak", updated: "2 weeks ago" },
  { id: "KB-094", title: "Dormant privileged account remediation runbook", source: "SOP", customer: "Global", updated: "5 months ago" },
  { id: "AI-DOC-041", title: "ACME-SQL01 disk pressure — AI-generated incident summary", source: "AI-generated", customer: "acme", updated: "Today" },
  { id: "KB-077", title: "FortiGate WAN failover configuration guide", source: "Vendor Documentation", customer: "Global", updated: "6 months ago" },
  { id: "KB-133", title: "Microsoft Graph Conditional Access baseline policy", source: "SOP", customer: "Global", updated: "2 months ago" },
];

const COMPLIANCE_CONTROLS = [
  { control: "Multi-factor authentication enforced", status: "Passed", evidence: "94% of privileged accounts enforced", frameworks: ["CIS","ISO 27001","SOC 2","NIST"] },
  { control: "Data encryption at rest", status: "Passed", evidence: "All Azure Storage accounts confirmed encrypted", frameworks: ["ISO 27001","SOC 2","HIPAA","GDPR"] },
  { control: "Backup & recovery tested", status: "Partial", evidence: "3 of 24 customers missing verified restore test", frameworks: ["SOC 2","NIST","HIPAA"] },
  { control: "Least-privilege admin access", status: "Failed", evidence: "1 dormant Global Administrator identified", frameworks: ["CIS","ISO 27001","SOC 2"] },
  { control: "Centralized audit logging", status: "Passed", evidence: "Sentinel ingestion active across all tenants", frameworks: ["SOC 2","NIST","ISO 27001"] },
  { control: "Endpoint protection deployed", status: "Passed", evidence: "Defender coverage at 96% of managed endpoints", frameworks: ["CIS","NIST"] },
  { control: "Data subject access request process", status: "Partial", evidence: "Documented, not yet tested end-to-end", frameworks: ["GDPR"] },
];

const INTEGRATIONS = [
  { name: "N-central", category: "RMM", status: "Connected", health: "Healthy", lastSync: "1 min ago" },
  { name: "SuperOps", category: "PSA", status: "Connected", health: "Healthy", lastSync: "3 min ago" },
  { name: "Microsoft Graph / Entra ID", category: "Microsoft", status: "Connected", health: "Healthy", lastSync: "2 min ago" },
  { name: "Microsoft Defender", category: "Microsoft", status: "Connected", health: "Healthy", lastSync: "4 min ago" },
  { name: "Azure", category: "Microsoft", status: "Connected", health: "Healthy", lastSync: "5 min ago" },
  { name: "Veeam", category: "Backup", status: "Connected", health: "Healthy", lastSync: "12 min ago" },
  { name: "Cove", category: "Backup", status: "Connected", health: "Degraded", lastSync: "6h ago" },
  { name: "CrowdStrike", category: "Security", status: "Disconnected", health: "—", lastSync: "—" },
  { name: "Sophos", category: "Security", status: "Connected", health: "Healthy", lastSync: "9 min ago" },
  { name: "Fortinet", category: "Network", status: "Connected", health: "Healthy", lastSync: "2 min ago" },
  { name: "ConnectWise PSA", category: "PSA", status: "Disconnected", health: "—", lastSync: "—" },
  { name: "Datto", category: "Backup", status: "Connected", health: "Healthy", lastSync: "18 min ago" },
];

const NOTIFICATIONS = [
  { id: "n1", tone: "crit", text: "ACME-SQL01 disk pressure escalated to Critical", time: "2 min ago", investigation: "inv-1041" },
  { id: "n2", tone: "warn", text: "3 backup jobs failing at BluePeak Retail", time: "18 min ago", investigation: "inv-1043" },
  { id: "n3", tone: "att", text: "CVE-2026-31207 published — 5 servers exposed", time: "1h ago", investigation: "inv-1044" },
  { id: "n4", tone: "warn", text: "WAN latency anomaly at BluePeak Austin DC", time: "3h ago", investigation: "inv-1045" },
  { id: "n5", tone: "good", text: "Patch deployment completed for Northstar Legal", time: "5h ago", investigation: null },
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
    { id: "patch", label: "Patch Management", icon: ShieldCheck, phase: 1, badge: () => PATCH_FINDINGS.filter(p=>p.severity==="Critical").length },
    { id: "backup", label: "Backup & DR", icon: HardDrive, phase: 1, badge: () => BACKUP_JOBS.filter(b=>b.status==="Failed").length },
    { id: "security", label: "Security", icon: ShieldAlert, phase: 1, badge: () => SECURITY_FINDINGS.filter(f=>f.severity==="crit").length },
    { id: "identity", label: "Identity", icon: Fingerprint, phase: 1, badge: () => IDENTITY_USERS.filter(u=>u.risk==="Critical").length },
  ]},
  { label: "Infrastructure", items: [
    { id: "network", label: "Network", icon: Network, phase: 1, badge: () => NETWORK_SITES.filter(s=>s.status==="warn").length },
    { id: "cloud", label: "Cloud", icon: Cloud, phase: 1 },
    { id: "automation", label: "Automation", icon: Cog, phase: 1 },
    { id: "agents", label: "AI Agents", icon: Users2, phase: 1 },
  ]},
  { label: "Govern", items: [
    { id: "knowledge", label: "Knowledge", icon: BookOpen, phase: 1 },
    { id: "compliance", label: "Compliance", icon: ClipboardCheck, phase: 1, badge: () => COMPLIANCE_CONTROLS.filter(c=>c.status==="Failed").length },
    { id: "reports", label: "Reports", icon: FileBarChart, phase: 1 },
    { id: "integrations", label: "Integrations", icon: Plug, phase: 1, badge: () => INTEGRATIONS.filter(i=>i.status==="Disconnected").length },
    { id: "settings", label: "Settings", icon: Settings, phase: 1 },
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
function useClickOutside(ref, onOutside) {
  useEffect(()=>{
    function handler(e){ if (ref.current && !ref.current.contains(e.target)) onOutside(); }
    document.addEventListener("mousedown", handler);
    return ()=>document.removeEventListener("mousedown", handler);
  }, [ref, onOutside]);
}

function TopBar({
  approvalCount, onOpenApprovals, aiQuery, setAiQuery, onRunAiQuery,
  customerFilter, setCustomerFilter, timeRange, setTimeRange,
  goCustomer, goDevice, goInvestigation, tickets, notify,
}) {
  const [openDD, setOpenDD] = useState(null); // 'customer' | 'time' | 'search' | 'notif' | 'user' | null
  const [searchTerm, setSearchTerm] = useState("");
  const [readNotifs, setReadNotifs] = useState({});
  const wrapRef = useRef(null);
  useClickOutside(wrapRef, ()=>setOpenDD(null));

  const timeOptions = ["Last 24h", "Last 7 days", "Last 30 days"];
  const unreadCount = NOTIFICATIONS.filter(n=>!readNotifs[n.id]).length;

  const term = searchTerm.trim().toLowerCase();
  const results = term.length===0 ? null : {
    customers: CUSTOMERS.filter(c=>c.name.toLowerCase().includes(term)).slice(0,4),
    devices: DEVICES.filter(d=>d.name.toLowerCase().includes(term) || d.site.toLowerCase().includes(term)).slice(0,4),
    tickets: tickets.filter(t=>t.subject.toLowerCase().includes(term) || t.id.toLowerCase().includes(term)).slice(0,4),
    investigations: INVESTIGATIONS.filter(i=>i.title.toLowerCase().includes(term)).slice(0,4),
  };
  const hasResults = results && (results.customers.length || results.devices.length || results.tickets.length || results.investigations.length);

  function pick(fn, id) { fn(id); setOpenDD(null); setSearchTerm(""); }

  return (
    <div className="nx-topbar" ref={wrapRef}>
      <div className="nx-dd-wrap search-dd">
        <div className="nx-search" onClick={()=>setOpenDD("search")}>
          <Search size={14}/>
          <input
            placeholder="Search customers, devices, tickets…"
            value={searchTerm}
            onChange={e=>{ setSearchTerm(e.target.value); setOpenDD("search"); }}
            onFocus={()=>setOpenDD("search")}
          />
        </div>
        {openDD==="search" && term.length>0 && (
          <div className="nx-dd left" style={{width:380}}>
            <div className="nx-dd-scroll">
              {!hasResults && <div style={{padding:"14px 12px", fontSize:12, color:"var(--tx-2)"}}>No matches for "{searchTerm}"</div>}
              {results.customers.length>0 && <div className="search-group-label">Customers</div>}
              {results.customers.map(c=>(
                <div className="search-result" key={c.id} onClick={()=>pick(goCustomer, c.id)}>
                  <span className="r-title">{c.name}</span><span className="r-sub">{c.industry} · Health {c.health}</span>
                </div>
              ))}
              {results.devices.length>0 && <div className="search-group-label">Devices</div>}
              {results.devices.map(d=>(
                <div className="search-result" key={d.id} onClick={()=>pick(goDevice, d.id)}>
                  <span className="r-title nx-mono">{d.name}</span><span className="r-sub">{custName(d.customer)} · {d.site}</span>
                </div>
              ))}
              {results.tickets.length>0 && <div className="search-group-label">Tickets</div>}
              {results.tickets.map(t=>(
                <div className="search-result" key={t.id} onClick={()=> t.investigation ? pick(goInvestigation, t.investigation) : setOpenDD(null)}>
                  <span className="r-title">{t.id} — {t.subject}</span><span className="r-sub">{custName(t.customer)} · {t.status}</span>
                </div>
              ))}
              {results.investigations.length>0 && <div className="search-group-label">AI Investigations</div>}
              {results.investigations.map(i=>(
                <div className="search-result" key={i.id} onClick={()=>pick(goInvestigation, i.id)}>
                  <span className="r-title">{i.title}</span><span className="r-sub">{custName(i.customer)} · {i.confidence}% confidence</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
        <div className="nx-dd-wrap">
          <div className={`nx-pill ${customerFilter!=="all"?"active":""}`} onClick={()=>setOpenDD(openDD==="customer"?null:"customer")}>
            <Building2 size={13}/>{customerFilter==="all" ? "All Customers" : custName(customerFilter)}<ChevronDown size={12}/>
          </div>
          {openDD==="customer" && (
            <div className="nx-dd right" style={{width:230}}>
              <div className="nx-dd-scroll">
                <div className={`nx-dd-item ${customerFilter==="all"?"selected":""}`} onClick={()=>{ setCustomerFilter("all"); setOpenDD(null); }}>
                  All Customers {customerFilter==="all" && <CheckCircle2 size={13}/>}
                </div>
                {CUSTOMERS.map(c=>(
                  <div key={c.id} className={`nx-dd-item ${customerFilter===c.id?"selected":""}`} onClick={()=>{ setCustomerFilter(c.id); setOpenDD(null); }}>
                    {c.name} {customerFilter===c.id && <CheckCircle2 size={13}/>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="nx-dd-wrap">
          <div className="nx-pill" onClick={()=>setOpenDD(openDD==="time"?null:"time")}>
            <Clock size={13}/>{timeRange}<ChevronDown size={12}/>
          </div>
          {openDD==="time" && (
            <div className="nx-dd right" style={{width:150}}>
              {timeOptions.map(t=>(
                <div key={t} className={`nx-dd-item ${timeRange===t?"selected":""}`} onClick={()=>{ setTimeRange(t); setOpenDD(null); }}>
                  {t} {timeRange===t && <CheckCircle2 size={13}/>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nx-dd-wrap">
          <div className="nx-iconbtn" onClick={onOpenApprovals} title="Approval queue">
            <ClipboardCheck size={15}/>
            {approvalCount>0 && <span className="nx-dot">{approvalCount}</span>}
          </div>
        </div>

        <div className="nx-dd-wrap">
          <div className="nx-iconbtn" onClick={()=>setOpenDD(openDD==="notif"?null:"notif")}>
            <Bell size={15}/>
            {unreadCount>0 && <span className="nx-dot">{unreadCount}</span>}
          </div>
          {openDD==="notif" && (
            <div className="nx-dd right" style={{width:320}}>
              <div className="nx-dd-header">Notifications</div>
              <div className="nx-dd-scroll">
                {NOTIFICATIONS.map(n=>(
                  <div className="notif-item" key={n.id} style={{opacity: readNotifs[n.id] ? 0.5 : 1}}
                    onClick={()=>{ setReadNotifs(r=>({ ...r, [n.id]: true })); if(n.investigation) pick(goInvestigation, n.investigation); else setOpenDD(null); }}>
                    <span className={`notif-dot dot-status ${n.tone}`}/>
                    <div>
                      <div style={{fontSize:12.2}}>{n.text}</div>
                      <div className="nx-sub" style={{marginTop:2}}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="nx-dd-wrap">
          <div className="nx-avatar" style={{cursor:"pointer"}} onClick={()=>setOpenDD(openDD==="user"?null:"user")}>AR</div>
          {openDD==="user" && (
            <div className="nx-dd right" style={{width:190}}>
              <div className="nx-dd-header">Alex Rowan · Technician</div>
              <div className="user-dd-item" onClick={()=>{ notify("Profile settings are read-only in this prototype.", "warn"); setOpenDD(null); }}><Users2 size={13}/>Profile</div>
              <div className="user-dd-item" onClick={()=>{ setOpenDD(null); }}><Settings size={13}/>Preferences</div>
              <div className="user-dd-item" onClick={()=>{ notify("Signed out (prototype — no auth backend).", "warn"); setOpenDD(null); }}><X size={13}/>Sign out</div>
            </div>
          )}
        </div>
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
function Overview({ goInvestigation, setView, customerFilter }) {
  const scoped = customerFilter==="all" ? INVESTIGATIONS : INVESTIGATIONS.filter(i=>i.customer===customerFilter);
  const critical = scoped.filter(i=>i.status==="open" && (i.severity==="crit"||i.severity==="att"));
  const biggestRisk = scoped.find(i=>i.severity==="crit") || scoped[0];
  const cust = customerFilter==="all" ? null : CUSTOMERS.find(c=>c.id===customerFilter);
  const categoryToView = { Infra: "monitoring", Security: "security", Backup: "backup", Patch: "patch", Identity: "identity", Network: "network" };
  const healthBreakdown = cust
    ? [["Infra", 90],["Security", cust.security],["Backup", cust.backup],["Patch", cust.patch],["Identity", Math.max(cust.security-6,50)],["Network", 92]]
    : [["Infra",94],["Security",87],["Backup",98],["Patch",92],["Identity",84],["Network",95]];
  return (
    <div className="nx-page">
      <div className="nx-pagehead">
        <div>
          <div className="nx-h1">{cust ? `${cust.name} Overview` : "Good morning, Alex"}</div>
          <div className="nx-sub">{cust ? `Filtered to ${cust.name} · ${cust.industry}` : "Mock Integration Mode — 6 adapters connected · data refreshed 1 min ago"}</div>
        </div>
        <button className="btn primary" onClick={()=>setView("aicc")}><Sparkles size={13}/>Review AI Priorities</button>
      </div>

      <div className="nx-grid g-5">
        <KPI label="Managed Customers" value={cust ? "1" : "24"} icon={Building2}/>
        <KPI label="Devices" value={cust ? cust.devices : "2,486"} icon={Monitor}/>
        <KPI label="Critical Issues" value={critical.length} icon={AlertTriangle} tone={critical.length>0?"crit":"good"}/>
        <KPI label="Security Risk" value={cust ? `${100-cust.security} Risk pts` : "18 High"} icon={ShieldAlert} tone="warn"/>
        <KPI label="Open Tickets" value={cust ? cust.openTickets : "126"} icon={TicketIcon} tone="warn"/>
      </div>

      <div className="nx-grid g-3" style={{marginTop:12}}>
        <div className="nx-card">
          <div className="ring-wrap">
            <ScoreRing value={cust ? cust.health : 91} size={100}/>
            <div>
              <div style={{fontWeight:700, fontSize:14}}>{cust ? `${cust.name} Health` : "MSP Environment Health"}</div>
              <div className="nx-sub" style={{marginTop:2}}>{cust ? "Click a category to drill in" : "Aggregated across 24 customers — click a category to drill in"}</div>
              <div style={{display:"flex", gap:14, marginTop:10, flexWrap:"wrap"}}>
                {healthBreakdown.map(([l,v])=>(
                  <div key={l} style={{fontSize:11, cursor:"pointer"}} onClick={()=>setView(categoryToView[l])}>
                    <span style={{color:"var(--tx-2)"}}>{l} </span><b style={{color: v>=90?"#4CDA9E":v>=75?"#F0CB6C":"#FF8992"}}>{Math.round(v)}</b>
                  </div>
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
        {biggestRisk ? (
          <div className="nx-card hover" style={{borderColor:"var(--crit)", cursor:"pointer"}} onClick={()=>goInvestigation(biggestRisk.id)}>
            <div className="kpi-label"><AlertTriangle size={13} color="#FF8992"/>Biggest Risk</div>
            <div style={{fontWeight:700, fontSize:14, marginTop:2}}>{custName(biggestRisk.customer)}</div>
            <div className="nx-sub" style={{marginTop:2}}>{biggestRisk.title}</div>
            <button className="btn sm" style={{marginTop:10}} onClick={(e)=>{e.stopPropagation(); goInvestigation(biggestRisk.id);}}>Open investigation<ArrowRight size={12}/></button>
          </div>
        ) : (
          <div className="nx-card" style={{borderColor:"var(--good)"}}>
            <div className="kpi-label"><CheckCircle2 size={13} color="var(--good)"/>Biggest Risk</div>
            <div style={{fontWeight:700, fontSize:14, marginTop:2}}>None</div>
            <div className="nx-sub" style={{marginTop:2}}>No open investigations for this scope.</div>
          </div>
        )}
      </div>

      <div className="nx-card ai-panel" style={{marginTop:14}}>
        <div className="conf-badge"><Bot size={14}/>AI SUMMARY</div>
        <div style={{marginTop:8, fontSize:13, lineHeight:1.6, color:"var(--tx-0)"}}>
          {cust
            ? `${cust.name} is trending ${cust.health>=85?"stable":"at risk"} with a health score of ${cust.health}. ${critical.length>0 ? `${critical.length} open investigation${critical.length>1?"s":""} require attention.` : "No active investigations — all monitored systems within expected thresholds."}`
            : <>Infrastructure health is stable overall. Security risk increased 6% in the last 24 hours due to three identity findings.
              Two production servers require critical patches. Four backup jobs require attention — three at BluePeak Retail share a
              common repository authentication failure.</>}
        </div>
      </div>

      <div className="section-title">Needs Your Attention <span className="count">{critical.length}</span></div>
      {critical.length===0 && <div className="nx-card nx-sub">Nothing needs attention in this scope right now.</div>}
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
function AICommandCenter({ goInvestigation, aiResult, customerFilter }) {
  const list = customerFilter==="all" ? INVESTIGATIONS : INVESTIGATIONS.filter(i=>i.customer===customerFilter);
  return (
    <div className="nx-page">
      <div className="nx-pagehead">
        <div><div className="nx-h1">AI Operations Center</div><div className="nx-sub">{customerFilter==="all" ? "Correlated investigations across all customers, ranked by confidence and business impact" : `Filtered to ${custName(customerFilter)}`}</div></div>
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

      {list.length===0 && <div className="nx-card nx-sub">No active investigations for this customer.</div>}
      <div className="nx-grid g-2">
        {list.map(inv=>(
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
function Devices({ goDevice, customerFilter }) {
  const [filter, setFilter] = useState("all");
  const filtered = DEVICES.filter(d=>{
    if (customerFilter!=="all" && d.customer!==customerFilter) return false;
    if(filter==="all") return true;
    if(filter==="critical") return d.status==="critical";
    if(filter==="patch") return d.patch!=="up to date";
    if(filter==="backup") return d.backup==="failed";
    return true;
  });
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Devices</div><div className="nx-sub">{customerFilter==="all" ? "2,486 devices under management · showing prototype dataset" : `Filtered to ${custName(customerFilter)}`}</div></div></div>
      <div style={{display:"flex", gap:8, marginBottom:14}}>
        {[["all","All"],["critical","Critical"],["patch","Patch overdue"],["backup","Backup issue"]].map(([k,l])=>(
          <div key={k} className="nx-pill" style={{background: filter===k?"var(--ai-soft)":"var(--bg-2)", borderColor: filter===k?"var(--ai-line)":"var(--line)", color: filter===k?"#BFD5FF":"var(--tx-1)"}} onClick={()=>setFilter(k)}>{l}</div>
        ))}
      </div>
      {filtered.length===0 && <div className="nx-card nx-sub">No devices match this filter.</div>}
      <DeviceTable devices={filtered} onOpen={goDevice}/>
    </div>
  );
}

function DeviceDetail({ device, setView, goInvestigation, notify }) {
  const [tab, setTab] = useState("monitoring");
  const [serviceState, setServiceState] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // {name, action}
  if (!device) return null;
  const relatedInv = INVESTIGATIONS.find(i=>i.device===device.id);
  const baseServices = [
    { name: "MSSQLSERVER", status: "Running" }, { name: "SQLSERVERAGENT", status: "Running" },
    { name: "W3SVC", status: "Running" }, { name: "Spooler", status: "Stopped" },
    { name: "WinDefend", status: "Running" }, { name: "VeeamBackupSvc", status: device.backup==="failed"?"Error":"Running" },
  ];
  const services = serviceState || baseServices;
  const events = [
    { time: "02:14:08", level: "Error", src: "VSS", msg: "Backup job failed — volume shadow copy timeout (0x8007007A)" },
    { time: "01:58:41", level: "Warning", src: "MSSQLSERVER", msg: "Transaction log for database 'ACME_ERP' is 92% full" },
    { time: "01:40:12", level: "Warning", src: "Disk", msg: "Free space on C:\\ below 10% threshold" },
    { time: "00:12:03", level: "Info", src: "System", msg: "Scheduled maintenance script completed" },
  ];
  function applyAction(name, action) {
    setPendingAction({ name, action });
    setTimeout(()=>{
      setServiceState(prev=>{
        const base = prev || baseServices;
        return base.map(s=> s.name===name ? { ...s, status: action==="Restart" ? "Running" : "Stopped" } : s);
      });
      setPendingAction(null);
      notify(`${name} ${action==="Restart" ? "restarted successfully" : "stopped"} on ${device.name}.`, "good");
    }, 900);
  }
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
              {services.map(s=>{
                const busy = pendingAction && pendingAction.name===s.name;
                return (
                  <tr key={s.name}>
                    <td className="nx-mono">{s.name}</td>
                    <td>{s.status==="Running" ? <Chip tone="good">Running</Chip> : s.status==="Error" ? <Chip tone="crit">Error</Chip> : <Chip tone="neutral">Stopped</Chip>}</td>
                    <td style={{display:"flex", gap:6}}>
                      <button className="btn sm" disabled={busy} onClick={()=>applyAction(s.name,"Restart")}>
                        {busy && pendingAction.action==="Restart" ? <Loader2 size={11} className="spin"/> : <RotateCw size={11}/>}Restart
                      </button>
                      <button className="btn sm ghost" disabled={busy} onClick={()=>applyAction(s.name,"Stop")}>
                        {busy && pendingAction.action==="Stop" ? <Loader2 size={11} className="spin"/> : <PauseCircle size={11}/>}Stop
                      </button>
                    </td>
                  </tr>
                );
              })}
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

/* ---------------------------------- GENERIC WORKFLOW STEPPER ---------------------------------- */
function StageStepper({ stages, activeIndex }) {
  return (
    <div className="pipeline">
      {stages.map((s,i)=>{
        const state = i < activeIndex ? "done" : i===activeIndex ? "active" : "";
        return (
          <div className="pipe-step" key={s}>
            <div className={`pipe-line ${i<=activeIndex ? "done":""}`} />
            <div className={`pipe-node ${state}`}>
              {state==="done" ? <CheckCircle2 size={14}/> : i===activeIndex ? <Loader2 size={14} className="spin"/> : <Circle size={8}/>}
            </div>
            <div className={`pipe-label ${state==="active"?"active":""}`}>{s}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- PATCH MANAGEMENT ---------------------------------- */
function PatchManagement({ goInvestigation }) {
  const [deploying, setDeploying] = useState({}); // findingId -> stageIndex
  const stages = ["Plan","Approval","Deploy","Reboot","Health Check","Verify"];
  const critical = PATCH_FINDINGS.filter(p=>p.severity==="Critical").length;
  const totalAffected = PATCH_FINDINGS.reduce((s,p)=>s+p.affected,0);
  const compliance = 88;

  function runDeploy(finding) {
    setDeploying(d=>({ ...d, [finding.id]: 0 }));
    stages.forEach((_,i)=>{
      setTimeout(()=> setDeploying(d=> d[finding.id]===undefined ? d : { ...d, [finding.id]: i }), 500 + i*550);
    });
  }

  return (
    <div className="nx-page">
      <div className="nx-pagehead">
        <div><div className="nx-h1">Patch Management Center</div><div className="nx-sub">AI prioritizes patches by exploitability, exposure, and backup readiness — not just CVSS score</div></div>
      </div>
      <div className="nx-grid g-4">
        <KPI label="Overall Compliance" value={`${compliance}%`} icon={ShieldCheck} tone={compliance>=90?"good":"warn"}/>
        <KPI label="Critical Patches" value={critical} icon={AlertTriangle} tone="crit"/>
        <KPI label="Affected Devices" value={totalAffected} icon={Monitor}/>
        <KPI label="Reboot Required" value="6" icon={RotateCw} tone="warn"/>
      </div>

      <div className="section-title">AI Patch Prioritization <span className="count">{PATCH_FINDINGS.length}</span></div>
      <div style={{display:"flex", flexDirection:"column", gap:12}}>
        {PATCH_FINDINGS.map(p=>{
          const stageIndex = deploying[p.id];
          const done = stageIndex >= stages.length-1;
          return (
            <div className="nx-card" key={p.id}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10}}>
                <div style={{display:"flex", gap:10, alignItems:"center"}}>
                  <Chip tone={p.severity==="Critical"?"crit":p.severity==="High"?"att":"warn"}>{p.severity}</Chip>
                  <span className="nx-mono" style={{fontWeight:700, fontSize:13}}>{p.cve}</span>
                  {p.exploited && <Chip tone="crit" icon={ShieldAlert}>Actively exploited</Chip>}
                </div>
                <span className="nx-sub nx-mono">CVSS {p.cvss}</span>
              </div>
              <div style={{display:"flex", gap:22, flexWrap:"wrap", marginTop:12, fontSize:12}}>
                <span><span className="nx-sub">Customer </span><b>{custName(p.customer)}</b></span>
                <span><span className="nx-sub">Affected </span><b>{p.affected} devices</b></span>
                <span><span className="nx-sub">Exposure </span><b>{p.exposure}</b></span>
                <span><span className="nx-sub">Importance </span><b>{p.businessImportance}</b></span>
                <span><span className="nx-sub">Compatibility </span><b>{p.compatible ? "Verified" : "Unverified"}</b></span>
              </div>
              <div style={{marginTop:10, padding:"9px 12px", background:"var(--bg-2)", borderRadius:8, fontSize:12.4, display:"flex", alignItems:"center", gap:7}}>
                <Sparkles size={13} color="#8FB7FF"/><b>AI recommendation:</b> {p.recommendation}
              </div>
              {stageIndex !== undefined && (
                <div style={{marginTop:14}}>
                  <StageStepper stages={stages} activeIndex={stageIndex}/>
                  {done && <div className="chip good" style={{marginTop:8, width:"fit-content"}}><CheckCircle2 size={11}/>Patch deployed and health-verified on {p.affected} device(s)</div>}
                </div>
              )}
              <div style={{display:"flex", gap:8, marginTop:12}}>
                {stageIndex===undefined && <button className="btn primary sm" onClick={()=>runDeploy(p)}><PlayCircle size={12}/>{p.recommendation.startsWith("Deploy") ? "Deploy Now" : "Schedule & Deploy"}</button>}
                {p.investigation && <button className="btn sm ghost" onClick={()=>goInvestigation(p.investigation)}><Bot size={12}/>View AI Investigation</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------- BACKUP & DR ---------------------------------- */
function BackupDR({ goInvestigation }) {
  const [restoreTests, setRestoreTests] = useState({}); // jobId -> stageIndex
  const stages = ["Backup selected","Restore started","VM boot test","App health check","Database test","Recovery verified"];
  const failed = BACKUP_JOBS.filter(b=>b.status==="Failed");
  const success = BACKUP_JOBS.filter(b=>b.status==="Success");
  const relatedInv = INVESTIGATIONS.find(i=>i.category==="Backup");

  function runRestoreTest(job) {
    setRestoreTests(t=>({ ...t, [job.id]: 0 }));
    stages.forEach((_,i)=>{
      setTimeout(()=> setRestoreTests(t=> t[job.id]===undefined ? t : { ...t, [job.id]: i }), 450 + i*500);
    });
  }

  return (
    <div className="nx-page">
      <div className="nx-pagehead">
        <div><div className="nx-h1">Backup & DR Center</div><div className="nx-sub">Protected devices, backup health, and simulated recovery verification</div></div>
      </div>
      <div className="nx-grid g-4">
        <KPI label="Protected Devices" value={BACKUP_JOBS.length} icon={HardDrive}/>
        <KPI label="Successful Backups" value={success.length} icon={CheckCircle2} tone="good"/>
        <KPI label="Failed Backups" value={failed.length} icon={AlertTriangle} tone="crit"/>
        <KPI label="Avg Recovery Confidence" value="96%" icon={ShieldCheck} tone="good"/>
      </div>

      {failed.length>0 && (
        <div className="nx-card ai-panel" style={{marginTop:4}}>
          <div className="conf-badge"><Bot size={13}/>AI BACKUP ANALYSIS</div>
          <div style={{marginTop:8, fontSize:12.8, lineHeight:1.6}}>
            {failed.length} jobs are failing with the same <code className="nx-mono">AUTH_TOKEN_EXPIRED</code> / VSS timeout pattern.
            The three BluePeak Retail failures share one repository and one expired token timestamp — a single reconnect
            likely resolves all three at once, rather than three independent faults.
          </div>
          {relatedInv && <button className="btn sm" style={{marginTop:10}} onClick={()=>goInvestigation(relatedInv.id)}><Bot size={12}/>Open linked investigation</button>}
        </div>
      )}

      <div className="section-title">Backup Jobs <span className="count">{BACKUP_JOBS.length}</span></div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Device</th><th>Customer</th><th>Repository</th><th>Last Run</th><th>Status</th><th>Error</th><th>RPO</th><th>Restore Test</th><th></th></tr></thead>
          <tbody>
            {BACKUP_JOBS.map(b=>(
              <tr key={b.id}>
                <td className="nx-mono" style={{fontSize:12}}>{deviceName(b.device) || b.device}</td>
                <td>{custName(b.customer)}</td>
                <td className="nx-sub">{b.repo}</td>
                <td className="nx-sub">{b.lastRun}</td>
                <td>{b.status==="Success" ? <Chip tone="good">Success</Chip> : <Chip tone="crit">Failed</Chip>}</td>
                <td className="nx-mono" style={{fontSize:11, color:"var(--tx-2)"}}>{b.errorCode}</td>
                <td className={b.rpo.includes("breached") ? "" : "nx-sub"} style={b.rpo.includes("breached") ? {color:"#FF8992"} : {}}>{b.rpo}</td>
                <td className="nx-sub">{b.restoreTest}</td>
                <td><button className="btn sm ghost" onClick={()=>runRestoreTest(b)} disabled={restoreTests[b.id]!==undefined}><PlayCircle size={11}/>Test Restore</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Object.entries(restoreTests).map(([jobId, stageIndex])=>{
        const job = BACKUP_JOBS.find(b=>b.id===jobId);
        if (!job) return null;
        const done = stageIndex >= stages.length-1;
        return (
          <div className="nx-card" key={jobId} style={{marginTop:12}}>
            <div className="kpi-label"><History size={13}/>Test Restore — {deviceName(job.device) || job.device}</div>
            <StageStepper stages={stages} activeIndex={stageIndex}/>
            {done && (
              <div style={{display:"flex", alignItems:"center", gap:10, marginTop:10}}>
                <Chip tone="good" icon={CheckCircle2}>Recovery Confidence: 96%</Chip>
                <span className="nx-sub">All application and database checks passed on the restored instance.</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- SECURITY ---------------------------------- */
function SecurityCenter({ goInvestigation }) {
  const critCount = SECURITY_FINDINGS.filter(f=>f.severity==="crit").length;
  const avgScore = Math.round(CUSTOMERS.reduce((s,c)=>s+c.security,0)/CUSTOMERS.length);
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Security Operations Center</div><div className="nx-sub">Correlated identity, endpoint, and network security signals across all customers</div></div></div>
      <div className="nx-grid g-4">
        <KPI label="Avg Security Score" value={avgScore} icon={ShieldAlert} tone={avgScore>=85?"good":"warn"}/>
        <KPI label="Critical Findings" value={critCount} icon={AlertTriangle} tone="crit"/>
        <KPI label="Risky Users" value={IDENTITY_USERS.filter(u=>u.risk!=="Low").length} icon={Fingerprint} tone="warn"/>
        <KPI label="Unmanaged Devices" value="3" icon={Monitor} tone="warn"/>
      </div>
      <div className="section-title">Security Findings <span className="count">{SECURITY_FINDINGS.length}</span></div>
      <div style={{display:"flex", flexDirection:"column", gap:10}}>
        {SECURITY_FINDINGS.map(f=>(
          <div className="nx-card" key={f.id} style={f.investigation ? {cursor:"pointer"} : {}} onClick={()=> f.investigation && goInvestigation(f.investigation)}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8}}>
              <div style={{display:"flex", gap:8, alignItems:"center"}}>
                <Chip tone={sevColor(f.severity)}>{f.severity==="crit"?"Critical":f.severity==="att"?"Attention":"Warning"}</Chip>
                <span style={{fontWeight:700, fontSize:13}}>{f.title}</span>
              </div>
              <span className="nx-sub nx-mono">{f.confidence}% confidence</span>
            </div>
            <div style={{display:"flex", gap:20, marginTop:10, fontSize:12, flexWrap:"wrap"}}>
              <span><span className="nx-sub">Source </span><b>{f.source}</b></span>
              <span><span className="nx-sub">Customer </span><b>{custName(f.customer)}</b></span>
              <span><span className="nx-sub">Asset </span><b className="nx-mono">{f.asset}</b></span>
              <span><span className="nx-sub">First seen </span><b>{f.firstSeen}</b></span>
            </div>
            {f.investigation && <div style={{marginTop:8, color:"var(--ai)", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:4}}><Bot size={12}/>View correlated AI investigation<ArrowRight size={11}/></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- IDENTITY ---------------------------------- */
function IdentitySecurity({ goInvestigation }) {
  const mfaCoverage = Math.round(100*IDENTITY_USERS.filter(u=>u.mfa==="Enforced").length/IDENTITY_USERS.length);
  const risky = IDENTITY_USERS.filter(u=>u.risk!=="Low");
  const idInv = INVESTIGATIONS.find(i=>i.category==="Identity");
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Identity Security</div><div className="nx-sub">Users, roles, MFA coverage, and privileged-account audit across Microsoft Entra ID</div></div></div>
      <div className="nx-grid g-4">
        <KPI label="Users Monitored" value={IDENTITY_USERS.length} icon={Users2}/>
        <KPI label="MFA Coverage" value={`${mfaCoverage}%`} icon={Lock} tone={mfaCoverage>=90?"good":"warn"}/>
        <KPI label="Privileged Accounts" value={IDENTITY_USERS.filter(u=>u.role.includes("Administrator")).length} icon={Fingerprint}/>
        <KPI label="Risky Accounts" value={risky.length} icon={ShieldAlert} tone="crit"/>
      </div>
      {idInv && (
        <div className="nx-card ai-panel hover" onClick={()=>goInvestigation(idInv.id)} style={{marginBottom:16, cursor:"pointer"}}>
          <div className="conf-badge"><Bot size={13}/>AI FINDING — {idInv.confidence}% confidence</div>
          <div style={{fontWeight:700, fontSize:13.5, marginTop:6}}>{idInv.title}</div>
          <div style={{fontSize:12.4, color:"var(--tx-1)", marginTop:6}}>{idInv.summary}</div>
        </div>
      )}
      <div className="section-title">Users <span className="count">{IDENTITY_USERS.length}</span></div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>User</th><th>Customer</th><th>Role</th><th>Last Sign-in</th><th>MFA</th><th>Risk</th></tr></thead>
          <tbody>
            {IDENTITY_USERS.map(u=>(
              <tr key={u.email}>
                <td><div style={{fontWeight:600}}>{u.name}</div><div className="nx-sub nx-mono" style={{fontSize:11}}>{u.email}</div></td>
                <td>{custName(u.customer)}</td>
                <td>{u.role}</td>
                <td className="nx-sub">{u.lastSignIn}</td>
                <td>{u.mfa==="Enforced" ? <Chip tone="good">Enforced</Chip> : u.mfa==="Not enrolled" ? <Chip tone="warn">Not enrolled</Chip> : <Chip tone="att">Unused</Chip>}</td>
                <td><Chip tone={u.risk==="Critical"?"crit":u.risk==="Medium"?"warn":"good"}>{u.risk}</Chip></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- NETWORK ---------------------------------- */
function NetworkOps({ goInvestigation }) {
  const netInv = INVESTIGATIONS.find(i=>i.category==="Network");
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Network Operations Center</div><div className="nx-sub">WAN latency, packet loss, and bandwidth across all managed sites</div></div></div>
      <div className="nx-grid g-4">
        <KPI label="Sites Monitored" value={NETWORK_SITES.length} icon={MapPin}/>
        <KPI label="Sites With Anomalies" value={NETWORK_SITES.filter(s=>s.status==="warn").length} icon={AlertTriangle} tone="warn"/>
        <KPI label="Avg Bandwidth Utilization" value={`${Math.round(NETWORK_SITES.reduce((s,x)=>s+x.bandwidthUtil,0)/NETWORK_SITES.length)}%`} icon={Wifi}/>
        <KPI label="Firewalls Connected" value={DEVICES.filter(d=>d.type==="Firewall").length} icon={ShieldCheck}/>
      </div>
      <div className="section-title">Sites <span className="count">{NETWORK_SITES.length}</span></div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Site</th><th>Customer</th><th>Latency (baseline → current)</th><th>Packet Loss</th><th>Bandwidth</th><th>Status</th></tr></thead>
          <tbody>
            {NETWORK_SITES.map(s=>(
              <tr key={s.site} className={s.status==="warn" && netInv ? "clickable" : ""} onClick={()=> s.status==="warn" && netInv && goInvestigation(netInv.id)}>
                <td style={{fontWeight:600}}>{s.site}</td>
                <td>{custName(s.customer)}</td>
                <td className="nx-mono">{s.latencyBaseline}ms → <span style={{color: s.latencyCurrent>s.latencyBaseline*1.5?"#FF8992":"var(--tx-0)"}}>{s.latencyCurrent}ms</span></td>
                <td className="nx-mono">{s.packetLoss}%</td>
                <td style={{width:120}}><Bar pct={s.bandwidthUtil} tone={s.bandwidthUtil>80?"warn":"ai"}/></td>
                <td>{s.status==="warn" ? <Chip tone="warn">Anomaly</Chip> : <Chip tone="good">Healthy</Chip>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- CLOUD ---------------------------------- */
function CloudOps() {
  const flagged = CLOUD_RESOURCES.filter(r=>r.flag);
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Cloud Operations</div><div className="nx-sub">Azure, AWS, and GCP resources — AI flags idle, exposed, or anomalous configurations</div></div></div>
      <div className="nx-grid g-4">
        <KPI label="Resources Tracked" value={CLOUD_RESOURCES.length} icon={Cloud}/>
        <KPI label="Monthly Cloud Spend" value={`$${CLOUD_RESOURCES.reduce((s,r)=>s+r.costMonth,0).toLocaleString()}`} icon={FileBarChart}/>
        <KPI label="Flagged Resources" value={flagged.length} icon={AlertTriangle} tone="warn"/>
        <KPI label="Publicly Exposed" value={CLOUD_RESOURCES.filter(r=>r.publicExposure).length} icon={ShieldAlert} tone="crit"/>
      </div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Resource</th><th>Customer</th><th>Provider</th><th>Type</th><th>Region</th><th>CPU Avg</th><th>Cost/mo</th><th>AI Flag</th></tr></thead>
          <tbody>
            {CLOUD_RESOURCES.map(r=>(
              <tr key={r.name}>
                <td className="nx-mono" style={{fontSize:12}}>{r.name}</td>
                <td>{custName(r.customer)}</td>
                <td>{r.provider}</td>
                <td>{r.type}</td>
                <td className="nx-sub">{r.region}</td>
                <td>{r.cpuAvg!==null ? `${r.cpuAvg}%` : "—"}</td>
                <td className="nx-mono">${r.costMonth}</td>
                <td>{r.flag ? <Chip tone="warn" icon={Sparkles}>{r.flag}</Chip> : <Chip tone="good">None</Chip>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- AUTOMATION ---------------------------------- */
function AutomationCenter() {
  const byRisk = { Safe: AUTOMATIONS.filter(a=>a.risk==="Safe").length, Medium: AUTOMATIONS.filter(a=>a.risk==="Medium").length, High: AUTOMATIONS.filter(a=>a.risk==="High").length };
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Automation Marketplace</div><div className="nx-sub">Every automation NEXUS can run, its risk tier, and policy requirement</div></div></div>
      <div className="nx-grid g-4">
        <KPI label="Total Automations" value={AUTOMATIONS.length} icon={Cog}/>
        <KPI label="Safe (Auto-approve)" value={byRisk.Safe} icon={CheckCircle2} tone="good"/>
        <KPI label="Medium (Approval req.)" value={byRisk.Medium} icon={ClipboardCheck} tone="warn"/>
        <KPI label="High (Never autonomous)" value={byRisk.High} icon={ShieldAlert} tone="crit"/>
      </div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Automation</th><th>Category</th><th>Risk</th><th>Policy</th><th>Success Rate</th><th>Executions (30d)</th></tr></thead>
          <tbody>
            {AUTOMATIONS.map(a=>(
              <tr key={a.name}>
                <td style={{fontWeight:600}}>{a.name}</td>
                <td className="nx-sub">{a.category}</td>
                <td><Chip tone={a.risk==="Safe"?"good":a.risk==="Medium"?"warn":"crit"}>{a.risk}</Chip></td>
                <td className="nx-sub">{a.approval}</td>
                <td>{a.success!==null ? `${a.success}%` : "—"}</td>
                <td className="nx-mono">{a.runs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- AI AGENTS ---------------------------------- */
function AIAgentsPage() {
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">AI Agents</div><div className="nx-sub">Purpose-built agents, each scoped to least-privilege tools and a defined risk level</div></div></div>
      <div className="nx-grid g-2">
        {AGENTS.map(a=>(
          <div className="nx-card" key={a.name}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
              <div style={{fontWeight:700, fontSize:13.5, display:"flex", alignItems:"center", gap:7}}><Users2 size={14}/>{a.name}</div>
              {a.status==="Active" ? <Chip tone="good">Active</Chip> : <Chip tone="neutral">Idle</Chip>}
            </div>
            <div style={{fontSize:12.3, color:"var(--tx-1)", marginTop:8, lineHeight:1.5}}>{a.desc}</div>
            <div style={{display:"flex", gap:6, flexWrap:"wrap", marginTop:10}}>
              {a.tools.map(t=><span key={t} className="chip neutral nx-mono">{t}()</span>)}
            </div>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:12, paddingTop:10, borderTop:"1px solid var(--line-soft)", fontSize:11.5}}>
              <span className="nx-sub">Risk: <b style={{color:"var(--tx-0)"}}>{a.risk}</b></span>
              <span className="nx-sub">{a.actionsToday} actions today</span>
              <span className="nx-sub">{a.lastActivity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- KNOWLEDGE ---------------------------------- */
function KnowledgeCenter() {
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Knowledge Center</div><div className="nx-sub">RAG-indexed SOPs, past tickets, and vendor docs — AI answers always cite sources</div></div></div>
      <div className="nx-card ai-panel" style={{marginBottom:16}}>
        <div className="conf-badge"><Terminal size={13}/>EXAMPLE — "Why does ACME-SQL01 keep failing backups?"</div>
        <div style={{marginTop:8, fontSize:12.8, lineHeight:1.6}}>
          Transaction log growth has preceded backup failure on this server twice before, both resolved by clearing the log after a verified full backup. Current disk pressure matches that pattern.
        </div>
        <div style={{marginTop:10, display:"flex", gap:8, flexWrap:"wrap"}}>
          {["KB-102","TCK-3201","AI-DOC-041"].map(s=><span key={s} className="chip ai nx-mono">{s}</span>)}
        </div>
      </div>
      <div className="section-title">Articles <span className="count">{KNOWLEDGE_ARTICLES.length}</span></div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>ID</th><th>Title</th><th>Source</th><th>Customer</th><th>Updated</th></tr></thead>
          <tbody>
            {KNOWLEDGE_ARTICLES.map(k=>(
              <tr key={k.id}>
                <td className="nx-mono">{k.id}</td>
                <td style={{fontWeight:600}}>{k.title}</td>
                <td><Chip tone={k.source==="AI-generated"?"ai":"neutral"}>{k.source}</Chip></td>
                <td>{k.customer==="Global" ? "Global" : custName(k.customer)}</td>
                <td className="nx-sub">{k.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- COMPLIANCE ---------------------------------- */
function ComplianceCenter() {
  const frameworks = ["CIS","ISO 27001","SOC 2","NIST","GDPR","HIPAA"];
  const [fw, setFw] = useState("CIS");
  const controls = COMPLIANCE_CONTROLS.filter(c=>c.frameworks.includes(fw));
  const passed = controls.filter(c=>c.status==="Passed").length;
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Compliance</div><div className="nx-sub">Technical control status only — not a certification or legal compliance claim</div></div></div>
      <div style={{display:"flex", gap:8, marginBottom:16, flexWrap:"wrap"}}>
        {frameworks.map(f=>(
          <div key={f} className="nx-pill" style={{background: fw===f?"var(--ai-soft)":"var(--bg-2)", borderColor: fw===f?"var(--ai-line)":"var(--line)", color: fw===f?"#BFD5FF":"var(--tx-1)"}} onClick={()=>setFw(f)}>{f}</div>
        ))}
      </div>
      <div className="nx-grid g-3" style={{marginBottom:16}}>
        <KPI label="Controls Passed" value={`${passed}/${controls.length}`} icon={CheckCircle2} tone="good"/>
        <KPI label="Partial" value={controls.filter(c=>c.status==="Partial").length} icon={Clock} tone="warn"/>
        <KPI label="Failed" value={controls.filter(c=>c.status==="Failed").length} icon={AlertTriangle} tone="crit"/>
      </div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Control</th><th>Status</th><th>Evidence</th></tr></thead>
          <tbody>
            {controls.map(c=>(
              <tr key={c.control}>
                <td style={{fontWeight:600}}>{c.control}</td>
                <td>{c.status==="Passed" ? <Chip tone="good">Passed</Chip> : c.status==="Partial" ? <Chip tone="warn">Partial</Chip> : <Chip tone="crit">Failed</Chip>}</td>
                <td className="nx-sub">{c.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- REPORTS ---------------------------------- */
function ReportsPage() {
  const [selected, setSelected] = useState(CUSTOMERS[0].id);
  const c = CUSTOMERS.find(x=>x.id===selected);
  const invs = INVESTIGATIONS.filter(i=>i.customer===c.id);
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Executive Reports</div><div className="nx-sub">Client-facing monthly IT health reports</div></div></div>
      <div style={{display:"flex", gap:8, marginBottom:16, flexWrap:"wrap"}}>
        {CUSTOMERS.map(cust=>(
          <div key={cust.id} className="nx-pill" style={{background: selected===cust.id?"var(--ai-soft)":"var(--bg-2)", borderColor: selected===cust.id?"var(--ai-line)":"var(--line)", color: selected===cust.id?"#BFD5FF":"var(--tx-1)"}} onClick={()=>setSelected(cust.id)}>{cust.name}</div>
        ))}
      </div>
      <div className="nx-card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
          <div>
            <div className="nx-sub">Monthly IT Health Report</div>
            <div style={{fontWeight:700, fontSize:17, marginTop:2}}>{c.name}</div>
          </div>
          <ScoreRing value={c.health} size={80}/>
        </div>
        <div className="nx-grid g-3" style={{marginTop:16}}>
          <MiniStat label="Security" value={c.security}/>
          <MiniStat label="Backup" value={c.backup}/>
          <MiniStat label="Patch" value={c.patch}/>
        </div>
        <div className="section-title" style={{marginTop:20}}>AI Findings</div>
        {invs.length===0 && <div className="nx-sub">No findings this period.</div>}
        <ol style={{margin:0, paddingLeft:18, display:"flex", flexDirection:"column", gap:6}}>
          {invs.map(i=><li key={i.id} style={{fontSize:12.6}}>{i.title} <span className="nx-sub">— {i.businessImpact} impact</span></li>)}
        </ol>
        <div className="section-title">Recommended Priorities</div>
        <div style={{display:"flex", flexDirection:"column", gap:6}}>
          {invs.map(i=>(
            <div key={i.id} style={{display:"flex", justifyContent:"space-between", fontSize:12.4, padding:"7px 10px", background:"var(--bg-2)", borderRadius:7}}>
              <span>{i.actionLabel}</span>
              <Chip tone={i.severity==="crit"?"crit":i.severity==="att"?"att":"warn"}>{i.severity==="crit"?"Critical":i.severity==="att"?"High":"Medium"}</Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- INTEGRATIONS ---------------------------------- */
function IntegrationsCenter({ notify }) {
  const [state, setState] = useState(INTEGRATIONS);
  const [busy, setBusy] = useState(null);
  const categories = [...new Set(state.map(i=>i.category))];
  function handleClick(item) {
    setBusy(item.name);
    setTimeout(()=>{
      if (item.status==="Connected") {
        notify(`${item.name}: connection test passed. API healthy.`, "good");
      } else {
        setState(list=>list.map(x=> x.name===item.name ? { ...x, status:"Connected", health:"Healthy", lastSync:"Just now" } : x));
        notify(`${item.name} reconnected successfully.`, "good");
      }
      setBusy(null);
    }, 1100);
  }
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Integration Center</div><div className="nx-sub">Mock Integration Mode — adapters shown below simulate live connections for this prototype</div></div></div>
      {categories.map(cat=>(
        <div key={cat}>
          <div className="section-title">{cat}</div>
          <div className="nx-grid g-3">
            {state.filter(i=>i.category===cat).map(i=>(
              <div className="nx-card tight" key={i.name}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    {i.status==="Connected" ? <span className="connline"/> : <span className="dot-status crit"/>}
                    <span style={{fontWeight:600, fontSize:12.6}}>{i.name}</span>
                  </div>
                  {i.status==="Connected" ? <Chip tone="good">Connected</Chip> : <Chip tone="crit">Disconnected</Chip>}
                </div>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:11.3}}>
                  <span className="nx-sub">API health: {i.health}</span>
                  <span className="nx-sub">Last sync: {i.lastSync}</span>
                </div>
                <button className="btn sm ghost" style={{marginTop:10, width:"100%", justifyContent:"center"}} disabled={busy===i.name} onClick={()=>handleClick(i)}>
                  {busy===i.name ? <Loader2 size={12} className="spin"/> : null}
                  {i.status==="Connected" ? "Test Connection" : "Reconnect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- SETTINGS ---------------------------------- */
function SettingsPage() {
  const policyGroups = {
    "Auto-approve": AUTOMATIONS.filter(a=>a.approval==="Auto-approve"),
    "Requires approval": AUTOMATIONS.filter(a=>a.approval==="Requires approval"),
    "Never autonomous": AUTOMATIONS.filter(a=>a.approval==="Never autonomous"),
  };
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Settings</div><div className="nx-sub">MSP profile, technician access, and AI policy configuration</div></div></div>

      <div className="section-title">MSP Profile</div>
      <div className="nx-card nx-grid g-3">
        <div><div className="nx-sub">Organization</div><div style={{fontWeight:600, marginTop:2}}>BS IT Consultancy</div></div>
        <div><div className="nx-sub">Primary region</div><div style={{fontWeight:600, marginTop:2}}>APAC / Remote-first</div></div>
        <div><div className="nx-sub">Technicians</div><div style={{fontWeight:600, marginTop:2}}>4 active seats</div></div>
      </div>

      <div className="section-title">AI Policy Engine <span className="count">Global default</span></div>
      <div className="nx-grid g-3">
        {Object.entries(policyGroups).map(([label, items])=>(
          <div className="nx-card" key={label}>
            <div className="kpi-label">
              {label==="Auto-approve" ? <CheckCircle2 size={13} color="var(--good)"/> : label==="Requires approval" ? <ClipboardCheck size={13} color="var(--warn)"/> : <ShieldAlert size={13} color="var(--crit)"/>}
              {label} <span className="count">{items.length}</span>
            </div>
            {items.map(a=><div key={a.name} style={{fontSize:12, padding:"6px 0", borderBottom:"1px solid var(--line-soft)"}}>{a.name}</div>)}
          </div>
        ))}
      </div>
      <div className="nx-sub" style={{marginTop:8}}>Policy can be overridden per customer from each customer's detail page.</div>

      <div className="section-title">Notifications</div>
      <div className="nx-card" style={{display:"flex", flexDirection:"column", gap:10}}>
        {["Critical incidents", "Awaiting approval", "SLA at risk", "Weekly executive summary"].map(n=>(
          <NotifToggle key={n} label={n}/>
        ))}
      </div>
    </div>
  );
}

function NotifToggle({ label }) {
  const [on, setOn] = useState(true);
  return (
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <span style={{fontSize:12.6}}>{label}</span>
      <span style={{cursor:"pointer"}} onClick={()=>setOn(o=>!o)}>
        {on ? <Chip tone="good" icon={CheckCircle2}>Enabled</Chip> : <Chip tone="neutral" icon={Circle}>Disabled</Chip>}
      </span>
    </div>
  );
}

/* ---------------------------------- INCIDENTS ---------------------------------- */
function Incidents({ goInvestigation, customerFilter }) {
  const list = customerFilter==="all" ? INVESTIGATIONS : INVESTIGATIONS.filter(i=>i.customer===customerFilter);
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Incidents</div><div className="nx-sub">{customerFilter==="all" ? "AI-correlated incidents ranked by severity — click to open the full investigation" : `Filtered to ${custName(customerFilter)}`}</div></div></div>
      <div className="nx-card" style={{padding:0}}>
        <table className="nx-table">
          <thead><tr><th>Severity</th><th>Incident</th><th>Customer</th><th>Confidence</th><th>Impact</th><th>Status</th></tr></thead>
          <tbody>
            {list.map(i=>(
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
function TicketsPage({ tickets, goInvestigation, customerFilter }) {
  const list = customerFilter==="all" ? tickets : tickets.filter(t=>t.customer===customerFilter);
  return (
    <div className="nx-page">
      <div className="nx-pagehead"><div><div className="nx-h1">Tickets</div><div className="nx-sub">{customerFilter==="all" ? "126 open tickets · AI triage active on all incoming tickets" : `Filtered to ${custName(customerFilter)}`}</div></div>
        <button className="btn primary"><TicketIcon size={13}/>New Ticket</button>
      </div>
      {list.length===0 && <div className="nx-card nx-sub">No tickets for this customer.</div>}
      <TicketTable tickets={list} onOpenInv={goInvestigation}/>
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
  const [customerFilter, setCustomerFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("Last 24h");
  const timers = useRef([]);
  const notifyTimer = useRef(null);

  useEffect(()=>()=>timers.current.forEach(clearTimeout), []);

  function notify(text, tone="good") {
    setToast({ text, tone });
    if (notifyTimer.current) clearTimeout(notifyTimer.current);
    notifyTimer.current = setTimeout(()=>setToast(null), 3600);
  }

  function setView(v){ setViewRaw(v); }
  function goInvestigation(id){ setSelectedInvId(id); setViewRaw("investigation-detail"); }
  function goCustomer(id){ setSelectedCustomerId(id); setCustomerFilter(id); setViewRaw("customer-detail"); }
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
  if (view==="overview") body = <Overview goInvestigation={goInvestigation} setView={setView} customerFilter={customerFilter}/>;
  else if (view==="aicc") body = <AICommandCenter goInvestigation={goInvestigation} aiResult={aiResult} customerFilter={customerFilter}/>;
  else if (view==="investigation-detail") body = <InvestigationDetail inv={selectedInv} setView={setView} gateway={gateways[selectedInvId]} startGateway={startGateway} ticketFor={ticketFor}/>;
  else if (view==="customers") body = <Customers goCustomer={goCustomer}/>;
  else if (view==="customer-detail") body = <CustomerDetail customer={selectedCustomer} setView={setView} goInvestigation={goInvestigation} goDevice={goDevice}/>;
  else if (view==="devices") body = <Devices goDevice={goDevice} customerFilter={customerFilter}/>;
  else if (view==="device-detail") body = <DeviceDetail device={selectedDevice} setView={setView} goInvestigation={goInvestigation} notify={notify}/>;
  else if (view==="monitoring") body = <MonitoringPage/>;
  else if (view==="patch") body = <PatchManagement goInvestigation={goInvestigation}/>;
  else if (view==="backup") body = <BackupDR goInvestigation={goInvestigation}/>;
  else if (view==="incidents") body = <Incidents goInvestigation={goInvestigation} customerFilter={customerFilter}/>;
  else if (view==="tickets") body = <TicketsPage tickets={tickets} goInvestigation={goInvestigation} customerFilter={customerFilter}/>;
  else if (view==="security") body = <SecurityCenter goInvestigation={goInvestigation}/>;
  else if (view==="identity") body = <IdentitySecurity goInvestigation={goInvestigation}/>;
  else if (view==="network") body = <NetworkOps goInvestigation={goInvestigation}/>;
  else if (view==="cloud") body = <CloudOps/>;
  else if (view==="automation") body = <AutomationCenter/>;
  else if (view==="agents") body = <AIAgentsPage/>;
  else if (view==="knowledge") body = <KnowledgeCenter/>;
  else if (view==="compliance") body = <ComplianceCenter/>;
  else if (view==="reports") body = <ReportsPage/>;
  else if (view==="integrations") body = <IntegrationsCenter notify={notify}/>;
  else if (view==="settings") body = <SettingsPage/>;
  else if (view==="audit") body = <AuditLogView log={auditLog}/>;
  else body = <PhasePlaceholder item={navItem || {label:"Module", icon:Cog, phase:3}}/>;

  return (
    <div className="nx-root">
      <style>{css}</style>
      <style>{`.spin{animation:nxspin 1s linear infinite;} @keyframes nxspin{to{transform:rotate(360deg);}}`}</style>
      <Sidebar view={view==="investigation-detail"?"aicc":view==="customer-detail"?"customers":view==="device-detail"?"devices":view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div className="nx-main">
        <TopBar
          approvalCount={approvalBadgeCount}
          onOpenApprovals={()=>setApprovalsOpen(true)}
          aiQuery={aiQuery} setAiQuery={setAiQuery} onRunAiQuery={runAiQuery}
          customerFilter={customerFilter} setCustomerFilter={setCustomerFilter}
          timeRange={timeRange} setTimeRange={setTimeRange}
          goCustomer={goCustomer} goDevice={goDevice} goInvestigation={goInvestigation}
          tickets={tickets} notify={notify}
        />
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
