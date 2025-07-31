'use client';

import { isActive } from '@/lib/is-active';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'fumadocs-core/link';
import { ExternalLink, FileIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { itemVariants, useInternalContext } from './index';

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

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(itemVariants({ active }), props.className)}
      prefetch={prefetch}
    >
      {icon ?? (props.external ? <ExternalLink /> : <FileIcon />)}
      {props.children}
    </Link>
  );
}
