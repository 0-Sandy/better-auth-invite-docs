export function getSection(path: string | undefined) {
  if (!path) return "get-started";
  const [dir] = path.split("/", 1);
  if (!dir) return "get-started";
  return (
    {
      core: "core",
      examples: "examples",
      reference: "reference",
    }[dir] ?? "get-started"
  );
}
