import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import type { LucideIcon } from "lucide-react";

type SubService = {
  id: string;
  title: string;
  price: string;
  route: string;
  icon: LucideIcon;
};

type ServicePillarProps = {
  title: string;
  subtitle: string;
  badge?: string;
  icon: LucideIcon;
  services: SubService[];
  sectionLabel: string;
  background?: "white" | "blueprint";
};

export default function ServicePillar({
  title,
  subtitle,
  badge,
  icon: PillarIcon,
  services,
  sectionLabel,
  background = "blueprint",
}: ServicePillarProps) {
  const [, setLocation] = useLocation();

  return (
    <section className={`${background === "blueprint" ? "bg-blueprint" : "bg-white"} section-padding`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f97316] mb-3">
            {sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            {title}
          </h2>
          {badge && (
            <span className="inline-block bg-gray-100 text-[#0f172a] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3">
              {badge}
            </span>
          )}
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
            {services.map((svc) => {
              const SvcIcon = svc.icon;
              return (
                <button
                  key={svc.id}
                  onClick={() => setLocation(svc.route)}
                  className="w-full flex items-center gap-4 p-5 text-left group hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
                >
                  <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <SvcIcon className="w-5 h-5 text-[#0f172a]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[#0f172a] group-hover:text-[#f97316] block leading-tight transition-colors">
                      {svc.title}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5 block">{svc.price}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#f97316] flex-shrink-0 transition-colors" strokeWidth={1.5} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
