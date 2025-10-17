import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12z" opacity="0.5" />
      <path d="M5.2 12.3C7.5 10.5 9.7 12.3 12 12.3s4.5-1.8 6.8.5" />
      <path d="M5.2 15.3C7.5 13.5 9.7 15.3 12 15.3s4.5-1.8 6.8.5" />
      <path d="M5.2 9.3C7.5 7.5 9.7 9.3 12 9.3s4.5-1.8 6.8.5" />
    </svg>
  );
}
