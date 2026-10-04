"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  FileText,
  User,
  Activity,
  ShieldAlert,
  Info,
} from "lucide-react";

interface FormData {
  patientId: string;
  eventDate: string;
  severity: string;
  meddraCode: string;
  description: string;
  requiresIecNotification: boolean;
}

interface FormErrors {
  patientId?: string;
  eventDate?: string;
  severity?: string;
  meddraCode?: string;
  description?: string;
}

export default function AdverseEventForm() {
  const [formData, setFormData] = useState<FormData>({
    patientId: "",
    eventDate: "",
    severity: "",
    meddraCode: "",
    description: "",
    requiresIecNotification: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.patientId.trim()) newErrors.patientId = "Patient ID is required.";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required.";
    if (!formData.severity) newErrors.severity = "Severity is required.";
    if (!formData.meddraCode) newErrors.meddraCode = "MedDRA coding is required.";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Mock API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        // Reset form after a delay or provide a button to log another
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            patientId: "",
            eventDate: "",
            severity: "",
            meddraCode: "",
            description: "",
            requiresIecNotification: false,
          });
        }, 3000);
      }, 1500);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Adverse Event Logged</h3>
        <p className="text-slate-500 text-sm max-w-sm">
          The adverse event has been successfully recorded in the NPvCC Pharmacovigilance module.
          {formData.requiresIecNotification && (
            <span className="block mt-2 font-medium text-amber-600">
              Immediate IEC notification workflow has been triggered.
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md flex-shrink-0">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Log Adverse Event (AE)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pharmacovigilance Module · Complete all mandatory fields
          </p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient ID */}
          <div className="space-y-1.5">
            <label htmlFor="patientId" className="block text-sm font-semibold text-slate-700">
              Patient ID <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                  errors.patientId
                    ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400 bg-rose-50/50"
                    : "border-slate-200 focus:ring-teal-200 focus:border-teal-400 bg-slate-50 hover:bg-slate-100/50"
                }`}
                placeholder="e.g. PT-1042"
              />
            </div>
            {errors.patientId && (
              <p className="text-xs font-medium text-rose-500 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" /> {errors.patientId}
              </p>
            )}
          </div>

          {/* Event Date */}
          <div className="space-y-1.5">
            <label htmlFor="eventDate" className="block text-sm font-semibold text-slate-700">
              Event Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                  errors.eventDate
                    ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400 bg-rose-50/50"
                    : "border-slate-200 focus:ring-teal-200 focus:border-teal-400 bg-slate-50 hover:bg-slate-100/50"
                }`}
              />
            </div>
            {errors.eventDate && (
              <p className="text-xs font-medium text-rose-500 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" /> {errors.eventDate}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Severity */}
          <div className="space-y-1.5">
            <label htmlFor="severity" className="block text-sm font-semibold text-slate-700">
              Severity <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Activity className="h-4 w-4 text-slate-400" />
              </div>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-xl border transition-colors appearance-none focus:outline-none focus:ring-2 ${
                  errors.severity
                    ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400 bg-rose-50/50"
                    : "border-slate-200 focus:ring-teal-200 focus:border-teal-400 bg-slate-50 hover:bg-slate-100/50"
                } ${!formData.severity ? "text-slate-500" : "text-slate-900"}`}
              >
                <option value="" disabled>Select severity level...</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Life-threatening">Life-threatening</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.severity && (
              <p className="text-xs font-medium text-rose-500 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" /> {errors.severity}
              </p>
            )}
          </div>

          {/* MedDRA Coding */}
          <div className="space-y-1.5">
            <label htmlFor="meddraCode" className="block text-sm font-semibold text-slate-700">
              MedDRA Coding <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-slate-400" />
              </div>
              <select
                id="meddraCode"
                name="meddraCode"
                value={formData.meddraCode}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-xl border transition-colors appearance-none focus:outline-none focus:ring-2 ${
                  errors.meddraCode
                    ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400 bg-rose-50/50"
                    : "border-slate-200 focus:ring-teal-200 focus:border-teal-400 bg-slate-50 hover:bg-slate-100/50"
                } ${!formData.meddraCode ? "text-slate-500" : "text-slate-900"}`}
              >
                <option value="" disabled>Select term...</option>
                <option value="Nausea - 10028813">Nausea - 10028813</option>
                <option value="Headache - 10019211">Headache - 10019211</option>
                <option value="Dizziness - 10013573">Dizziness - 10013573</option>
                <option value="Diarrhoea - 10012735">Diarrhoea - 10012735</option>
                <option value="Fatigue - 10016256">Fatigue - 10016256</option>
                <option value="Hypotension - 10021097">Hypotension - 10021097</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.meddraCode && (
              <p className="text-xs font-medium text-rose-500 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" /> {errors.meddraCode}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
            Event Description <span className="text-rose-500">*</span>
          </label>
          <p className="text-[11px] text-slate-500 mb-2">
            Provide a detailed clinical description of the event, including onset, duration, and any interventions.
          </p>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className={`block w-full p-3 sm:text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 resize-none ${
              errors.description
                ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400 bg-rose-50/50"
                : "border-slate-200 focus:ring-teal-200 focus:border-teal-400 bg-slate-50 hover:bg-slate-100/50"
            }`}
            placeholder="Detailed clinical narrative..."
          />
          {errors.description && (
            <p className="text-xs font-medium text-rose-500 flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3" /> {errors.description}
            </p>
          )}
        </div>

        {/* IEC Notification Checkbox */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="requiresIecNotification"
              name="requiresIecNotification"
              type="checkbox"
              checked={formData.requiresIecNotification}
              onChange={handleInputChange}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded cursor-pointer transition-colors"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="requiresIecNotification" className="text-sm font-bold text-slate-800 cursor-pointer select-none">
              Requires Immediate Institutional Ethics Committee (IEC) Notification
            </label>
            <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
              Check this box for Serious Adverse Events (SAEs) or unexpected events that significantly affect trial integrity or patient safety.
            </p>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all ${
              isSubmitting
                ? "bg-teal-400 cursor-wait shadow-none"
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-200 hover:-translate-y-0.5"
            }`}
          >
            <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
              Submit Event Report
            </span>
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
