export default function SearchInput({
  id = "search",
  value,
  onChange,
  placeholder = "Search…",
}: {
  id?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="w-full max-w-sm">
      <label className="sr-only" htmlFor={id}>
        Search tasks
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400"
      />
    </div>
  );
}
