interface DetailRowProps {
  label: string;
  value: string | number | undefined;
}

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value ?? "—"}</span>
    </div>
  );
}