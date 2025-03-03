import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface SemiCircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  fullProgressColor?: string;
  backgroundColor?: string;
}

const SemiCircularProgress: React.FC<SemiCircularProgressProps> = ({
  value,
  max,
  size = 240,
  strokeWidth = 12,
  fullProgressColor = "#0BA83E",
  progressColor = "#2977F4",
  backgroundColor = "#D9EBFF",
}) => {
  const router = useRouter();

  const radius = (size - strokeWidth) / 2;
  const circumference = Math.round(2 * Math.PI * radius);
  const threeQuarterCumference = Math.round(1.5 * Math.PI * radius);
  const progress = Math.min(value / max, 1);
  const progressWidth = Math.floor(progress * threeQuarterCumference);
  const gapOffset = circumference - progressWidth;
  const colorProgress =
    progress == 1
      ? fullProgressColor
      : progress == 0
      ? backgroundColor
      : progressColor;

  useEffect(() => {
    if (progress == 1) {
      router.push("/payment-successful");
    }
  }, [progress]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeDasharray={threeQuarterCumference}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colorProgress}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressWidth} ${gapOffset}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
          style={{
            transition: `stroke-dasharray 1s linear`,
          }}
        />
      </svg>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-2xl font-bold">${value.toFixed(2)}</p>
        <p className="text-[16px] text-neutrals_3 text-sm">${max.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SemiCircularProgress;
