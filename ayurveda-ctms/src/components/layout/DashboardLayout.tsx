"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FlaskConical,
  ShieldAlert,
  ScrollText,
  Settings,
  ChevronDown,
  LogOut,
  UserCircle,
  Bell,
  Menu,
  X,
  Leaf,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "Investigator" | "Ethics Committee" | "Admin";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Active Trials", href: "/dashboard/trials", icon: FlaskConical, badge: 4 },
  { label: "Safety (NPvCC)", href: "/dashboard/safety", icon: ShieldAlert, badge: 3 },
  { label: "Audit Logs", href: "/dashboard/audit", icon: ScrollText },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const ROLES: Role[] = ["Investigator", "Ethics Committee", "Admin"];

const ROLE_COLORS: Record<Role, string> = {
  Investigator: "bg-sky-100 text-sky-700 border-sky-200",
  "Ethics Committee": "bg-violet-100 text-violet-700 border-violet-200",
  Admin: "bg-rose-100 text-rose-700 border-rose-200",
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  isOpen,
  onClose,
  currentRole,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentRole: Role;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 flex flex-col
          bg-white border-r border-slate-200 shadow-xl
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:shadow-none lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-800 tracking-tight">AyurCTMS</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              Clinical Trial Mgmt
            </p>
          </div>
          <button
            className="ml-auto p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_COLORS[currentRole]}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {currentRole}
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5"
          role="navigation"
        >
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Navigation
          </p>
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 relative
                  ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                  size={18}
                />
                <span className="flex-1 truncate">{label}</span>
                {badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-100">
          <button
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
            aria-label="Sign out"
          >
            <LogOut className="w-[18px] h-[18px]" strokeWidth={2} />
            <span>Sign Out</span>
          </button>
          <p className="text-center text-[10px] text-slate-300 mt-3 tracking-wide">
            v1.0.0-beta · CTRI Compliant
          </p>
        </div>
      </aside>
    </>
  );
}

// ─── Role Switcher Dropdown ───────────────────────────────────────────────────

function RoleSwitcher({
  currentRole,
  onRoleChange,
}: {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        id="role-switcher-btn"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 hover:shadow-sm ${ROLE_COLORS[currentRole]}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
        <span className="hidden sm:inline">{currentRole}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden z-50"
          role="listbox"
          aria-label="Select role"
        >
          <div className="px-3 pt-2.5 pb-1.5 border-b border-slate-100">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Switch Role
            </p>
          </div>
          {ROLES.map((role) => (
            <button
              key={role}
              role="option"
              aria-selected={role === currentRole}
              onClick={() => {
                onRoleChange(role);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm transition-colors duration-100 ${
                role === currentRole
                  ? "bg-slate-50 font-semibold text-slate-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  role === "Investigator"
                    ? "bg-sky-400"
                    : role === "Ethics Committee"
                    ? "bg-violet-400"
                    : "bg-rose-400"
                }`}
              />
              {role}
              {role === currentRole && (
                <span className="ml-auto text-[10px] text-slate-400 font-medium">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────

function ProfileDropdown({ currentRole }: { currentRole: Role }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "My Profile", icon: UserCircle },
    { label: "Notifications", icon: Bell },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        id="profile-menu-btn"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 shadow-sm"
        aria-label="User menu"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">Dr</span>
        </div>
        <div className="hidden sm:block text-left leading-tight">
          <p className="text-xs font-semibold text-slate-800">Dr. A. Sharma</p>
          <p className="text-[10px] text-slate-400">{currentRole}</p>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden z-50">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-cyan-50">
            <p className="text-sm font-semibold text-slate-800">Dr. A. Sharma</p>
            <p className="text-xs text-slate-500 mt-0.5">dr.a.sharma@aiims.edu.in</p>
            <div
              className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${ROLE_COLORS[currentRole]}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
              {currentRole}
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {menuItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-100"
              >
                <Icon className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>

          {/* Sign out */}
          <div className="border-t border-slate-100 py-1.5">
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-100">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────

function Header({
  currentRole,
  onRoleChange,
  onMenuToggle,
}: {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  onMenuToggle: () => void;
}) {
  const pathname = usePathname();
  const currentPage = NAV_ITEMS.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 px-4 sm:px-6 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Mobile menu toggle */}
      <button
        id="sidebar-toggle-btn"
        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:hidden"
        onClick={onMenuToggle}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>AyurCTMS</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-semibold truncate">
            {currentPage?.label ?? "Dashboard"}
          </span>
        </div>
        <h1 className="text-base font-bold text-slate-800 leading-tight truncate">
          {currentPage?.label ?? "Dashboard"}
        </h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <button
          id="notifications-btn"
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Role Switcher */}
        <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />

        {/* Profile */}
        <ProfileDropdown currentRole={currentRole} />
      </div>
    </header>
  );
}

// ─── Dashboard Layout (Default Export) ───────────────────────────────────────

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>("Investigator");

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentRole={currentRole}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />

        {/* Scrollable content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
