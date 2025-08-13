interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export const ProgressBar = ({ percentage, className = '' }: ProgressBarProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Completion</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% complete`}
        />
      </div>
    </div>
  );
};
