type PagePlaceholderProps = Readonly<{
  title: string;
  description?: string;
}>;

export function PagePlaceholder({
  title,
  description = "Development Placeholder",
}: PagePlaceholderProps) {
  return (
    <section className="px-6 py-10">
      <p>Emerald Legacy Systems</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
