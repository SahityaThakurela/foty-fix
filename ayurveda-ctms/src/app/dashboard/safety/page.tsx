import AdverseEventForm from "@/components/safety/AdverseEventForm";

export const metadata = {
  title: "Safety (NPvCC) — AyurCTMS",
  description: "Pharmacovigilance and Safety Reporting for Clinical Trials.",
};

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Safety & Pharmacovigilance</h2>
        <p className="text-sm text-slate-500 mt-1">
          National Pharmacovigilance Centre for Ayurveda, Siddha, Unani & Homoeopathy (NPvCC) reporting.
        </p>
      </div>

      <AdverseEventForm />
    </div>
  );
}
