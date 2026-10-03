"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FlaskConical,
  Users,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Activity,
  ScrollText,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const enrollmentData = [
  { trial: "Ashwagandha", target: 120, actual: 85, shortName: "TRL-001" },
  { trial: "Brahmi Vati", target: 200, actual: 150, shortName: "TRL-002" },
  { trial: "Haridrakhanda", target: 80, actual: 25, shortName: "TRL-003" },
  { trial: "Triphala G.", target: 150, actual: 140, shortName: "TRL-004" },
];

const safetyAlerts = [
  {
    id: "SA-003",
    trialId: "TRL-2026-002",
    trialName: "Brahmi Vati Study",
    severity: "Severe",
    description: "Unexpected hypotensive episode reported during routine monitoring visit.",
    dateReported: "Oct 3, 2026",
    status: "Action Required",
    patient: "PT-1042",
  },
  {
    id: "SA-002",
    trialId: "TRL-2026-004",
    trialName: "Triphala Guggulu Trial",
    severity: "Moderate",
    description: "Increased bowel frequency and signs of mild dehydration over 48 hrs.",
    dateReported: "Oct 2, 2026",
    status: "Under Investigation",
    patient: "PT-0881",
  },
  {
    id: "SA-001",
    trialId: "TRL-2026-001",
    trialName: "Ashwagandha Stress Study",
    severity: "Mild",
    description: "Patient reported mild headache and nausea after evening dose of extract.",
    dateReported: "Oct 1, 2026",
    status: "Resolved",
    patient: "PT-0234",
  },
];

const auditLogs = [
  {
    id: "AL-1005",
    timestamp: "Oct 3, 2026 · 4:30 PM",
    user: "K. Singh",
    role: "QA Specialist",
    action: "Initiated Site Audit",
    target: "TRL-2026-001",
    previousValue: "Scheduled",
    newValue: "In Progress",
    status: "completed",
  },
  {
    id: "AL-1004",
    timestamp: "Oct 3, 2026 · 11:45 AM",
    user: "Dr. R. Desai",
    role: "Medical Monitor",
    action: "Reviewed Safety Report",
    target: "SA-002",
    previousValue: "Unreviewed",
    newValue: "No Action Required",
    status: "completed",
  },
  {
    id: "AL-1003",
    timestamp: "Oct 3, 2026 · 9:05 AM",
    user: "M. Patel",
    role: "Data Manager",
    action: "Corrected eCRF Entry",
    target: "PT-0512 / Field: Age",
    previousValue: "45",
    newValue: "54",
    status: "warning",
  },
];

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  variant?: "default" | "warning" | "danger" | "success";
}

function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  variant = "default",
}: KpiCardProps) {
  const variantStyles = {
    default: {
      card: "bg-white border-slate-200",
      iconBg: "bg-gradient-to-br from-teal-500 to-cyan-600",
      value: "text-slate-800",
      accent: "text-teal-600",
    },
    warning: {
      card: "bg-amber-50 border-amber-200",
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      value: "text-amber-800",
      accent: "text-amber-600",
    },
    danger: {
      card: "bg-rose-50 border-rose-200",
      iconBg: "bg-gradient-to-br from-rose-500 to-red-600",
      value: "text-rose-800",
      accent: "text-rose-600",
    },
    success: {
      card: "bg-emerald-50 border-emerald-200",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
      value: "text-emerald-800",
      accent: "text-emerald-600",
    },
  };

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
      ? "text-rose-500"
      : "text-slate-400";

  const s = variantStyles[variant];

  return (
    <div
      className={`relative rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${s.card}`}
    >
      {/* Subtle background gradient blob */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-current opacity-[0.04] blur-xl" />

      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 ${s.iconBg}`}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        {trendLabel && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {trendLabel}
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className={`text-3xl font-bold tracking-tight ${s.value}`}>{value}</p>
        <p className="text-sm font-semibold text-slate-600 mt-0.5">{title}</p>
        <p className="text-xs text-slate-400 mt-1 leading-snug">{subtitle}</p>
      </div>

      {variant === "warning" && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
      )}
      {variant === "danger" && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-red-500" />
      )}
    </div>
  );
}

// ─── Custom Tooltip for Chart ─────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-3 text-xs">
      <p className="font-bold text-slate-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ background: p.color }}
          />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-800">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Enrollment Bar Chart ─────────────────────────────────────────────────────

function EnrollmentChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            Enrollment: Target vs. Actual
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Across all 4 active trials</p>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100">
          Live Data
        </span>
      </div>

      <div className="flex-1 min-h-0 mt-4" style={{ minHeight: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={enrollmentData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="shortName"
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
            <Legend
              iconType="square"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 12 }}
            />
            <Bar
              dataKey="target"
              name="Target"
              fill="#e2e8f0"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="actual"
              name="Actual"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            >
              {enrollmentData.map((entry, index) => {
                const ratio = entry.actual / entry.target;
                const color =
                  ratio >= 0.85
                    ? "#14b8a6" // teal — on track
                    : ratio >= 0.5
                    ? "#f59e0b" // amber — lagging
                    : "#f43f5e"; // rose — severely behind
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
        {[
          { color: "bg-teal-500", label: "≥ 85% — On Track" },
          { color: "bg-amber-400", label: "50–84% — Lagging" },
          { color: "bg-rose-500", label: "< 50% — Critical" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-sm ${color}`} />
            <span className="text-[10px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Safety Alerts Panel ──────────────────────────────────────────────────────

const SEVERITY_STYLES = {
  Severe: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    ring: "border-l-rose-500",
    icon: XCircle,
    iconColor: "text-rose-500",
  },
  Moderate: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    ring: "border-l-amber-400",
    icon: AlertCircle,
    iconColor: "text-amber-500",
  },
  Mild: {
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    dot: "bg-sky-400",
    ring: "border-l-sky-400",
    icon: AlertTriangle,
    iconColor: "text-sky-500",
  },
};

const STATUS_STYLES: Record<string, string> = {
  "Action Required":
    "bg-rose-50 text-rose-700 border border-rose-200 font-semibold",
  "Under Investigation": "bg-amber-50 text-amber-700 border border-amber-200",
  Resolved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

function SafetyAlertsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500" />
            Recent Safety Alerts
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">NPvCC Pharmacovigilance Module</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {safetyAlerts.map((alert) => {
          const sev = SEVERITY_STYLES[alert.severity as keyof typeof SEVERITY_STYLES];
          const SevIcon = sev.icon;

          return (
            <div
              key={alert.id}
              className={`rounded-xl border border-slate-100 border-l-4 ${sev.ring} bg-slate-50/50 p-3.5 hover:bg-slate-50 transition-colors duration-150 cursor-pointer group`}
            >
              <div className="flex items-start gap-3">
                <SevIcon
                  className={`w-4.5 h-4.5 flex-shrink-0 mt-0.5 ${sev.iconColor}`}
                  size={18}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sev.badge}`}
                    >
                      {alert.severity}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${STATUS_STYLES[alert.status]}`}
                    >
                      {alert.status}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-400 font-mono">
                      {alert.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 leading-snug line-clamp-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {alert.trialName}
                    </span>
                    <span className="text-slate-200">·</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {alert.patient}
                    </span>
                    <span className="text-slate-200">·</span>
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span className="text-[10px] text-slate-400">
                      {alert.dateReported}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Audit Trail Table ────────────────────────────────────────────────────────

const AUDIT_STATUS_STYLES: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
};

const AUDIT_STATUS_ICONS: Record<string, React.ElementType> = {
  completed: CheckCircle2,
  warning: AlertTriangle,
};

function AuditTrailTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-slate-500" />
            Audit Trail — ALCOA+ Log
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Attributable, Legible, Contemporaneous, Original, Accurate
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
          Full Log <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Log ID", "Timestamp", "User / Role", "Action", "Target", "Change", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLogs.map((log, i) => {
              const StatusIcon = AUDIT_STATUS_ICONS[log.status];
              return (
                <tr
                  key={log.id}
                  className={`hover:bg-slate-50/70 transition-colors duration-100 ${
                    i % 2 === 0 ? "" : "bg-slate-50/30"
                  }`}
                >
                  {/* Log ID */}
                  <td className="px-4 py-3.5 font-mono text-slate-500 whitespace-nowrap">
                    {log.id}
                  </td>

                  {/* Timestamp */}
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  {/* User */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[9px] font-bold">
                          {log.user.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">{log.user}</p>
                        <p className="text-[10px] text-slate-400">{log.role}</p>
                      </div>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">
                    {log.action}
                  </td>

                  {/* Target */}
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">
                      {log.target}
                    </span>
                  </td>

                  {/* Change: prev → new */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-mono line-through">
                        {log.previousValue}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono">
                        {log.newValue}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        AUDIT_STATUS_STYLES[log.status]
                      }`}
                    >
                      <StatusIcon className="w-3 h-3" strokeWidth={2.5} />
                      {log.status === "completed" ? "Completed" : "Flagged"}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] text-slate-400">
          Showing 3 of 47 audit events · ALCOA+ Compliant
        </p>
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
          <CheckCircle2 className="w-3 h-3" />
          Audit integrity verified
        </div>
      </div>
    </div>
  );
}


// ─── Main Dashboard (Default Export) ─────────────────────────────────────────

export default function MainDashboard() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Good evening, Dr. Sharma 👋
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Saturday, 3 October 2026 · All systems operational
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700">Live</span>
        </div>
      </div>

      {/* ── Row 1: KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Total Active Trials"
          value={4}
          subtitle="2 in Phase II · 1 in Phase III · 1 in Phase IV"
          icon={FlaskConical}
          trend="up"
          trendLabel="+1 vs last month"
          variant="default"
        />
        <KpiCard
          title="Total Enrolled Patients"
          value={400}
          subtitle="Target: 550 · 72.7% overall enrollment"
          icon={Users}
          trend="up"
          trendLabel="+18 this week"
          variant="default"
        />
        <KpiCard
          title="Overdue Milestones"
          value={2}
          subtitle="TRL-003 is 14 days behind schedule"
          icon={AlertTriangle}
          trend="down"
          trendLabel="Needs attention"
          variant="warning"
        />
        <KpiCard
          title="Pending Safety Reviews"
          value={3}
          subtitle="1 requires immediate escalation"
          icon={ShieldAlert}
          trend="neutral"
          trendLabel="1 critical"
          variant="danger"
        />
      </div>

      {/* ── Row 2: Chart + Safety Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Chart — wider */}
        <div className="lg:col-span-3">
          <EnrollmentChart />
        </div>
        {/* Safety Alerts — narrower */}
        <div className="lg:col-span-2">
          <SafetyAlertsPanel />
        </div>
      </div>

      {/* ── Row 3: Audit Trail ── */}
      <AuditTrailTable />
    </div>
  );
}
