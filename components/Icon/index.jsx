"user client";
export  default function Icon({ name, size = 24, color = "currentColor", className = "" }) {
    return (
        <div>
            <span 
                className={`material-symbols-rounded ${className}`} 
                style={{ fontSize: size, color: color}}
            >
                {name}
            </span>
        </div>
    );
}
