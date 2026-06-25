import Link from "next/link";
import React, { ReactNode, forwardRef } from "react";

interface ElementTypeProps {
  href?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const isExternalLink = (url: string) => /^https?:\/\//.test(url);
// mailto:, tel:, sms: etc. must render as plain anchors, not Next.js <Link>
const isSpecialProtocol = (url: string) => /^(mailto:|tel:|sms:)/.test(url);

const ElementType = forwardRef<HTMLElement, ElementTypeProps>(
  ({ href, children, className, style, ...props }, ref) => {
    if (href) {
      const isExternal = isExternalLink(href);
      const isSpecial = isSpecialProtocol(href);
      if (isExternal || isSpecial) {
        return (
          <a
            href={href}
            {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={className}
            style={style}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={className}
          style={style}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={className}
        style={style}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

ElementType.displayName = "ElementType";
export { ElementType };
