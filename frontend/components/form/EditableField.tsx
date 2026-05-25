export default function EditableField({
  label,
  value,
  onChange,
}: any) {
  return (
    <div>

      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          p-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

    </div>
  );
}