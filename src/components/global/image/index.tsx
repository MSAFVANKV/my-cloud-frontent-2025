

// export default ImageComponent;
import { isValidUrl } from "@/hooks/useImgValidate";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useState } from "react";

type Props = {
  src: string;
  style?: React.CSSProperties;
  error?: string;
  alt?: string;
  className?: string;
  classNameImg?:string;
  onClick?: () => void;
  width?: number;
  height?: number;
  loading?: boolean;
  fallbackSrc?: string; // Optional fallback image
};

const ImageComponent = ({
  src,
  alt,
  className,

  fallbackSrc,
  error,
  onClick,
  style,
  classNameImg
}: Props) => {
  // const [imgSrc, setImgSrc] = useState(src);
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc || "/fallback.jpg");
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        <img
          src={isValidUrl(imgSrc) ? imgSrc : "/"}
          
          onClick={() => {
           onClick?.();
          }}
          alt={`${alt}`}
          style={style}
          className={cn(`w-full h-full object-contain`,classNameImg)}
          onError={() => {
            if (fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setHasError(true);
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-sm">
          {error || (
            <Icon
              icon={"ph:image-broken-fill"}
              fontSize={20}
              onClick={() => {
                onClick?.();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
