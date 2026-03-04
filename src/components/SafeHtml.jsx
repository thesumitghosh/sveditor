export default function SafeHtml({ html }) {
  return (
    <div
      className="safe-html"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
