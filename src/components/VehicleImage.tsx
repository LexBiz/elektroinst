"use client";

type VehicleImageProps = {
  altText: string;
  placeholder: string;
};

export function VehicleImage({ altText, placeholder }: VehicleImageProps) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/auto.jpg"
        alt={altText}
        className="vehicle-img"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (sibling) sibling.style.display = "flex";
        }}
      />
      <div className="vehicle-placeholder" style={{ display: "none" }}>
        📸 {placeholder}
      </div>
    </>
  );
}
