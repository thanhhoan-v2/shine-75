'use client';

import { isActive } from '@/lib/is-active';
import { cn, getTitleFromHref, isFavorite } from '@/lib/utils';
import Link, { LinkProps } from 'fumadocs-core/link';
import { ExternalLink, FileIcon, HeartIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { isValidElement, ReactNode } from 'react';
import { itemVariants, useInternalContext } from './index';

// Helper function to extract text content from React children
function getTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('');
  }
  if (isValidElement(children)) {
    return getTextFromChildren((children as any).props.children);
  }
  return '';
}

export function SidebarItem({
  icon,
  ...props
}: LinkProps & {
  icon?: ReactNode;
}) {
  const pathname = usePathname();
  const active =
    props.href !== undefined && isActive(props.href, pathname, false);
  const { prefetch } = useInternalContext();

  // Extract text content from children for more accurate processing
  const childrenText = getTextFromChildren(props.children);

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(itemVariants({ active }), props.className)}
      prefetch={prefetch}
    >
      {icon ?? (props.external ? <ExternalLink /> : <FileIcon />)}
      <span className="flex-1">{props.children}</span>
      {props.href &&
        isFavorite(childrenText || getTitleFromHref(props.href) || '') && (
          <HeartIcon
            fill="red"
            className="flex-shrink-0 ml-auto w-4 h-4 animate-pulse"
          />
        )}
    </Link>
  );
}
