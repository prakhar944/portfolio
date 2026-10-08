import { Reveal } from "./Reveal";

export function PageHeading({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <header className="page-heading container">
      <Reveal>
        <p className="eyebrow">
          <span className="red-square" />
          {label}
        </p>
        <h1>
          {title}
          <br />
          <span className="serif">{accent}</span>
        </h1>
        <p className="page-description">{description}</p>
      </Reveal>
    </header>
  );
}
