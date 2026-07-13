interface VitalCardProps {
    label: string;
    value: string | number;
    unit: string;
}

export default function VitalCard({ label, value, unit }: VitalCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-gray-900">
                {value} <span className="text-xs font-normal text-gray-400">{unit}</span>
            </p>
        </div>
    );
}