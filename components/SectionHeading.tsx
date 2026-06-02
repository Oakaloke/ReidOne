interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : "text-left"} max-w-2xl ${className}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <div className={`rule mt-5 ${isCenter ? "mx-auto" : ""}`} />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
