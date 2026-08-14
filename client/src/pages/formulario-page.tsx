import Navigation from "@/components/navigation";

interface FormPageProps {
  src: string;
  title: string;
}

export default function FormPage({ src, title }: FormPageProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navigation />
      <div className="flex-1 min-h-0 overflow-hidden">
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0"
          allow="geolocation; microphone; camera"
          allowFullScreen
        />
      </div>
    </div>
  );
}
