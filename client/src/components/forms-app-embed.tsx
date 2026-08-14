interface FormsAppEmbedProps {
  src: string;
  title: string;
  id?: string;
  className?: string;
}

export default function FormsAppEmbed({ src, title, id, className = "" }: FormsAppEmbedProps) {
  return (
    <div
      id={id}
      className={`forms-app-wrapper relative w-full overflow-hidden rounded-xl bg-transparent ${className}`}
      style={{ minHeight: "650px", height: "85vh" }}
    >
      <iframe
        src={src}
        title={title}
        className="absolute left-0 top-0 h-full w-full border-0"
        allow="geolocation; microphone; camera"
        allowFullScreen
      />
    </div>
  );
}