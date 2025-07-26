interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ className = "", size = 'medium' }: LogoProps) {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };

  return (
    <div className={`${sizeClasses[size]} w-auto ${className}`}>
      <svg viewBox="0 0 400 120" className="h-full w-auto">
        {/* Blue house on left */}
        <path
          d="M40 70 L20 50 L60 50 Z"
          fill="#3B82F6"
          stroke="#2563EB"
          strokeWidth="2"
        />
        <rect x="25" y="70" width="30" height="25" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
        <rect x="30" y="75" width="6" height="6" fill="#60A5FA"/>
        <rect x="44" y="75" width="6" height="6" fill="#60A5FA"/>
        
        {/* Green house in center-top */}
        <path
          d="M90 45 L70 25 L110 25 Z"
          fill="#22C55E"
          stroke="#16A34A"
          strokeWidth="2"
        />
        <rect x="75" y="45" width="30" height="25" fill="#22C55E" stroke="#16A34A" strokeWidth="1"/>
        <rect x="82" y="50" width="4" height="4" fill="#4ADE80"/>
        <rect x="88" y="50" width="4" height="4" fill="#4ADE80"/>
        <rect x="94" y="50" width="4" height="4" fill="#4ADE80"/>
        <rect x="82" y="55" width="4" height="4" fill="#4ADE80"/>
        <rect x="88" y="55" width="4" height="4" fill="#4ADE80"/>
        <rect x="94" y="55" width="4" height="4" fill="#4ADE80"/>
        
        {/* Blue house on right */}
        <path
          d="M150 70 L130 50 L170 50 Z"
          fill="#3B82F6"
          stroke="#2563EB"
          strokeWidth="2"
        />
        <rect x="135" y="70" width="30" height="25" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
        <rect x="140" y="75" width="6" height="6" fill="#60A5FA"/>
        <rect x="154" y="75" width="6" height="6" fill="#60A5FA"/>
        
        {/* Text */}
        <text x="190" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#22C55E">
          ARQUITECTO
        </text>
        <text x="190" y="85" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="#3B82F6">
          Chile.com
        </text>
      </svg>
    </div>
  );
}