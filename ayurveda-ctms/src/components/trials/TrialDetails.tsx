"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Circle,
  Download,
  TriangleAlert,
  BadgeCheck,
  CalendarDays,
  Users,
  FlaskConical,
  MapPin,
  Stethoscope,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Leaf,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type MilestoneStatus = "completed" | "in-progress" | "pending";

interface Milestone {
  id: string;
  label: string;
  description: string;
  date: string;
  status: MilestoneStatus;
}

interface TrialMeta {
  id: string;
  title: string;
  shortTitle: string;
  ctriNo: string;
  ctriStatus: "Approved" | "Pending" | "Suspended";
  phase: string;
  status: "Active" | "Delayed" | "Completed";
  sponsor: string;
  principalInvestigator: string;
  site: string;
  intervention: string;
  targetEnrollment: number;
  currentEnrollment: number;
  startDate: string;
  estimatedCompletion: string;
  milestones: Milestone[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TRIAL: TrialMeta = {
  id: "TRL-2026-001",
  title: "Efficacy of Ashwagandha (Withania somnifera) in Stress Management",
  shortTitle: "Ashwagandha Stress Study",
  ctriNo: "CTRI/2026/01/012345",
  ctriStatus: "Approved",
  phase: "Phase II",
  status: "Active",
  sponsor: "CCRAS — Central Council for Research in Ayurvedic Sciences",
  principalInvestigator: "Dr. A. Sharma, MD (Ay), PhD",
  site: "AIIMS Ayurveda Department, New Delhi",
  intervention: "Ashwagandha Root Extract 600mg · Once Daily",
  targetEnrollment: 200,
  currentEnrollment: 150,
  startDate: "Jan 15, 2026",
  estimatedCompletion: "Dec 31, 2026",
  milestones: [
    {
      id: "M1",
      label: "Ethics Committee Approval",
      description:
        "IEC/IRB approval obtained from AIIMS Ethics Committee for human participant research.",
      date: "Nov 10, 2025",
      status: "completed",
    },
    {
      id: "M2",
      label: "CTRI Registration",
      description:
        "Trial registered with Clinical Trials Registry – India (CTRI/2026/01/012345).",
      date: "Jan 5, 2026",
      status: "completed",
    },
    {
      id: "M3",
      label: "Site Activation & First Patient In",
      description:
        "Site activated, first patient enrolled and baseline assessment completed.",
      date: "Jan 20, 2026",
      status: "completed",
    },
    {
      id: "M4",
      label: "Mid-Trial Safety Review",
      description:
        "DSMB (Data Safety Monitoring Board) interim safety review at 50% enrollment.",
      date: "May 12, 2026",
      status: "completed",
    },
    {
      id: "M5",
      label: "Next Monitoring Visit",
      description:
        "Scheduled on-site monitoring visit by sponsor CRA to verify data quality.",
      date: "Nov 15, 2026",
      status: "in-progress",
    },
    {
      id: "M6",
      label: "Final Data Lock & CSR",
      description:
        "Database lock, final statistical analysis, and Clinical Study Report submission.",
      date: "Jan 30, 2027",
      status: "pending",
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CTRI_STATUS_STYLES = {
  Approved: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: BadgeCheck,
  },
  Pending: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-400",
    icon: Clock,
  },
  Suspended: {
    bg: "bg-rose-50 border-rose-200",
    text: "text-rose-700",
    dot: "bg-rose-500",
    icon: TriangleAlert,
  },
};

const TRIAL_STATUS_STYLES = {
  Active: "bg-teal-50 text-teal-700 border-teal-200",
  Delayed: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
};

const MILESTONE_CONFIG: Record<
  MilestoneStatus,
  {
    icon: React.ElementType;
    iconStyle: string;
    lineStyle: string;
    labelStyle: string;
    badgeStyle: string;
    badgeLabel: string;
    connectorColor: string;
  }
> = {
  completed: {
    icon: CheckCircle2,
    iconStyle: "bg-teal-500 text-white shadow-md shadow-teal-200/60",
    lineStyle: "bg-teal-200",
    labelStyle: "text-slate-800",
    badgeStyle: "bg-teal-50 text-teal-700 border-teal-200",
    badgeLabel: "Completed",
    connectorColor: "bg-teal-200",
  },
  "in-progress": {
    icon: Clock,
    iconStyle:
      "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-200/60 ring-4 ring-amber-100",
    lineStyle: "bg-slate-200",
    labelStyle: "text-slate-800 font-semibold",
    badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
    badgeLabel: "In Progress",
    connectorColor: "bg-slate-200",
  },
  pending: {
    icon: Circle,
    iconStyle: "bg-white text-slate-300 border-2 border-slate-200",
    lineStyle: "bg-slate-100",
    labelStyle: "text-slate-400",
    badgeStyle: "bg-slate-50 text-slate-400 border-slate-200",
    badgeLabel: "Pending",
    connectorColor: "bg-slate-100",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Pill badge for trial status / phase */
function Pill({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${className}`}
    >
      {label}
    </span>
  );
}

/** CTRI registration badge */
function CtriBadge({ status }: { status: "Approved" | "Pending" | "Suspended" }) {
  const s = CTRI_STATUS_STYLES[status];
  const Icon = s.icon;
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${s.bg} ${s.text}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
      CTRI {status}
    </div>
  );
}

/** Meta detail row */
function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="text-xs font-medium text-slate-700 mt-0.5 leading-snug">{value}</p>
      </div>
    </div>
  );
}

// ─── Section 1: Enrollment Progress ──────────────────────────────────────────

function EnrollmentStatus({
  current,
  target,
}: {
  current: number;
  target: number;
}) {
  const pct = Math.round((current / target) * 100);
  const remaining = target - current;

  const color =
    pct >= 85 ? "from-teal-500 to-cyan-500" : pct >= 50 ? "from-amber-400 to-orange-400" : "from-rose-500 to-red-500";
  const label =
    pct >= 85 ? "On Track" : pct >= 50 ? "Lagging" : "Critical";
  const labelStyle =
    pct >= 85
      ? "text-teal-600 bg-teal-50 border-teal-200"
      : pct >= 50
      ? "text-amber-600 bg-amber-50 border-amber-200"
      : "text-rose-600 bg-rose-50 border-rose-200";

  // per-quarter breakdown (mock)
  const quarters = [
    { q: "Q1 '26", enrolled: 42 },
    { q: "Q2 '26", enrolled: 68 },
    { q: "Q3 '26", enrolled: 40 },
    { q: "Q4 '26", enrolled: 0 },
  ];
  const maxBar = Math.max(...quarters.map((q) => q.enrolled), 1);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      {/* Section title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm">
            <Users className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Enrollment Status</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Patient recruitment progress</p>
          </div>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${labelStyle}`}
        >
          {label}
        </span>
      </div>

      {/* Big fraction */}
      <div className="flex items-end gap-3">
        <div>
          <span className="text-5xl font-black text-slate-800 tracking-tight tabular-nums">
            {current}
          </span>
          <span className="text-xl font-bold text-slate-300 mx-1">/</span>
          <span className="text-xl font-bold text-slate-400">{target}</span>
        </div>
        <div className="pb-1.5 space-y-0.5">
          <p className="text-xs font-semibold text-slate-600">patients enrolled</p>
          <p className="text-[11px] text-slate-400">{remaining} remaining to target</p>
        </div>
        <div className="ml-auto pb-1">
          <span className="text-4xl font-black text-teal-500 tabular-nums">{pct}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 ease-out relative`}
            style={{ width: `${pct}%` }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            </span>
          </div>
        </div>
        {/* Ticks */}
        <div className="flex justify-between mt-1.5">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span key={tick} className="text-[10px] text-slate-300 font-mono">
              {tick}%
            </span>
          ))}
        </div>
      </div>

      {/* Per-quarter mini bar chart */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Quarterly Enrollment Breakdown
        </p>
        <div className="flex items-end gap-3 h-14">
          {quarters.map(({ q, enrolled }) => {
            const barH = enrolled === 0 ? 4 : Math.round((enrolled / maxBar) * 48);
            return (
              <div key={q} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-slate-500 tabular-nums">
                  {enrolled > 0 ? enrolled : "—"}
                </span>
                <div className="w-full rounded-t-md overflow-hidden bg-slate-100" style={{ height: 48 }}>
                  <div
                    className={`w-full rounded-t-md bg-gradient-to-t ${enrolled === 0 ? "from-slate-200 to-slate-100" : color} transition-all duration-500`}
                    style={{ height: barH, marginTop: 48 - barH }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">{q}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Milestones Timeline ──────────────────────────────────────────

function MilestonesTimeline({ milestones }: { milestones: Milestone[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
          <CalendarDays className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">Milestones Timeline</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {milestones.filter((m) => m.status === "completed").length} of{" "}
            {milestones.length} milestones completed
          </p>
        </div>
      </div>

      <div className="relative">
        {milestones.map((milestone, index) => {
          const cfg = MILESTONE_CONFIG[milestone.status];
          const Icon = cfg.icon;
          const isLast = index === milestones.length - 1;
          const isExpanded = expanded === milestone.id;

          return (
            <div key={milestone.id} className="relative flex gap-4">
              {/* Left: icon + connector line */}
              <div className="flex flex-col items-center flex-shrink-0 w-9">
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : milestone.id)
                  }
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-150 hover:scale-110 z-10 ${cfg.iconStyle}`}
                  aria-label={`Toggle ${milestone.label}`}
                >
                  <Icon
                    className="w-4 h-4"
                    strokeWidth={
                      milestone.status === "pending" ? 1.5 : 2.5
                    }
                  />
                </button>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 min-h-[24px] ${cfg.connectorColor} transition-colors duration-300`}
                  />
                )}
              </div>

              {/* Right: content */}
              <div
                className={`flex-1 pb-${isLast ? "0" : "5"} min-w-0 ${isLast ? "" : "pb-5"}`}
              >
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : milestone.id)
                  }
                  className="w-full text-left group"
                >
                  <div className="flex items-start gap-2 flex-wrap">
                    <span className={`text-sm leading-snug ${cfg.labelStyle}`}>
                      {milestone.label}
                    </span>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badgeStyle}`}
                    >
                      {cfg.badgeLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <CalendarDays className="w-3 h-3 text-slate-300 flex-shrink-0" />
                    <span className="text-[11px] text-slate-400">
                      {milestone.date}
                    </span>
                    {milestone.status === "in-progress" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Active
                      </span>
                    )}
                    <span
                      className={`ml-auto text-slate-300 group-hover:text-slate-400 transition-colors`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>
                </button>

                {/* Expandable description */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 leading-relaxed border border-slate-100 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    {milestone.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Section 3: Quick Actions ─────────────────────────────────────────────────

function QuickActions() {
  const [exportLoading, setExportLoading] = useState(false);
  const [aeOpen, setAeOpen] = useState(false);
  const [aeForm, setAeForm] = useState({ patient: "", severity: "Mild", description: "" });
  const [aeSubmitted, setAeSubmitted] = useState(false);

  function handleExport() {
    setExportLoading(true);
    setTimeout(() => setExportLoading(false), 2200);
  }

  function handleAeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAeSubmitted(true);
    setTimeout(() => {
      setAeSubmitted(false);
      setAeOpen(false);
      setAeForm({ patient: "", severity: "Mild", description: "" });
    }, 2000);
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm">
          <FileText className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">Quick Actions</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Trial management shortcuts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Export SDTM Button */}
        <button
          id="export-sdtm-btn"
          onClick={handleExport}
          disabled={exportLoading}
          className={`
            group relative flex items-center gap-3 px-4 py-4 rounded-xl border text-left
            transition-all duration-200 overflow-hidden
            ${
              exportLoading
                ? "bg-teal-50 border-teal-200 cursor-wait"
                : "bg-white border-slate-200 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md hover:shadow-teal-100"
            }
          `}
        >
          {/* Animated shimmer overlay when loading */}
          {exportLoading && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100/60 to-transparent animate-[shimmer_1.2s_infinite]" />
          )}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              exportLoading
                ? "bg-teal-500"
                : "bg-teal-50 border border-teal-100 group-hover:bg-teal-500"
            }`}
          >
            <Download
              className={`w-4.5 h-4.5 transition-colors duration-200 ${
                exportLoading
                  ? "text-white animate-bounce"
                  : "text-teal-600 group-hover:text-white"
              }`}
              size={18}
            />
          </div>
          <div className="min-w-0 z-10">
            <p
              className={`text-sm font-semibold transition-colors ${
                exportLoading ? "text-teal-700" : "text-slate-800"
              }`}
            >
              {exportLoading ? "Preparing Export…" : "Export Submission Dataset"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              CDISC SDTM v1.8 · ZIP archive
            </p>
          </div>
        </button>

        {/* Log AE Button */}
        <button
          id="log-ae-btn"
          onClick={() => setAeOpen(true)}
          className="group flex items-center gap-3 px-4 py-4 rounded-xl border border-slate-200 bg-white text-left hover:border-rose-300 hover:bg-rose-50 hover:shadow-md hover:shadow-rose-100 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 transition-colors duration-200">
            <TriangleAlert
              className="w-4.5 h-4.5 text-rose-500 group-hover:text-white transition-colors duration-200"
              size={18}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Log Adverse Event</p>
            <p className="text-[11px] text-slate-400 mt-0.5">NPvCC · CIOMS Form I</p>
          </div>
        </button>
      </div>

      {/* Secondary quick links */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[
          { label: "View CTRI Listing", icon: ExternalLink },
          { label: "Download Protocol", icon: FileText },
          { label: "Site Contacts", icon: Stethoscope },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-150"
          >
            <Icon className="w-3 h-3" strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Log AE Modal ── */}
      {aeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setAeOpen(false)}
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md">
                <TriangleAlert className="w-4.5 h-4.5 text-white" size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Log Adverse Event</h4>
                <p className="text-[10px] text-slate-500">
                  NPvCC · CIOMS Form I · {TRIAL.id}
                </p>
              </div>
              <button
                onClick={() => setAeOpen(false)}
                className="ml-auto p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {aeSubmitted ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 px-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-bold text-slate-800">AE Logged Successfully</p>
                <p className="text-xs text-slate-400 text-center">
                  Event has been recorded in the NPvCC pharmacovigilance system and flagged for medical review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAeSubmit} className="p-5 space-y-4">
                {/* Patient ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PT-1042"
                    value={aeForm.patient}
                    onChange={(e) => setAeForm({ ...aeForm, patient: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition"
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Severity <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {["Mild", "Moderate", "Severe"].map((s) => {
                      const active = aeForm.severity === s;
                      const colors = {
                        Mild: "border-sky-300 bg-sky-50 text-sky-700 ring-sky-200",
                        Moderate: "border-amber-300 bg-amber-50 text-amber-700 ring-amber-200",
                        Severe: "border-rose-300 bg-rose-50 text-rose-700 ring-rose-200",
                      }[s];
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setAeForm({ ...aeForm, severity: s })}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                            active
                              ? `${colors} ring-2`
                              : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Event Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the adverse event in clinical terms…"
                    value={aeForm.description}
                    onChange={(e) => setAeForm({ ...aeForm, description: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setAeOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-semibold shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-200 hover:brightness-105 transition-all duration-200"
                  >
                    Submit AE Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Trial Header ─────────────────────────────────────────────────────────────

function TrialHeader({ trial }: { trial: TrialMeta }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500" />

      <div className="px-6 py-5">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <CtriBadge status={trial.ctriStatus} />
          <Pill label={trial.phase} className={TRIAL_STATUS_STYLES[trial.status]} />
          <Pill label={trial.status} className={TRIAL_STATUS_STYLES[trial.status]} />
          <span className="text-[11px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg ml-auto">
            {trial.ctriNo}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md flex-shrink-0 mt-0.5">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-snug">
              {trial.title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{trial.id}</p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-100">
          <MetaRow icon={Stethoscope} label="Principal Investigator" value={trial.principalInvestigator} />
          <MetaRow icon={MapPin} label="Site" value={trial.site} />
          <MetaRow icon={FlaskConical} label="Intervention" value={trial.intervention} />
          <MetaRow icon={CalendarDays} label="Est. Completion" value={trial.estimatedCompletion} />
        </div>
      </div>
    </div>
  );
}

// ─── TrialDetails (Default Export) ───────────────────────────────────────────

export default function TrialDetails() {
  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <TrialHeader trial={TRIAL} />

      {/* Three sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Enrollment Progress — takes 2 cols on large */}
        <div className="lg:col-span-2">
          <EnrollmentStatus
            current={TRIAL.currentEnrollment}
            target={TRIAL.targetEnrollment}
          />
        </div>

        {/* Quick Actions — 1 col */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Milestones — full width */}
      <MilestonesTimeline milestones={TRIAL.milestones} />
    </div>
  );
}
