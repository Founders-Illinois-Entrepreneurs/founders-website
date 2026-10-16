export default function PageHead({
  tag,
  title,
  children,
}: {
  tag: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="wrap page-head">
      <span className="tag">{tag}</span>
      <h1 className="display display--xl">{title}</h1>
      {children && <div className="lede">{children}</div>}
    </header>
  );
}
