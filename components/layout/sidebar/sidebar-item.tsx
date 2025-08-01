'use client';

import { isActive } from '@/lib/is-active';
import { cn, getTitleFromHref } from '@/lib/utils';
import Link, { LinkProps } from 'fumadocs-core/link';
import { CheckCircleIcon, ExternalLink, FileIcon, HeartIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { isValidElement, ReactNode } from 'react';
import { useCompleted } from './completed-context';
import { useFavorites } from './favorites-context';
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
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const { isCompleted, toggleCompleted, isLoaded: isCompletedLoaded } = useCompleted();

  // Extract text content from children for more accurate processing
  const childrenText = getTextFromChildren(props.children);
  const title = childrenText || getTitleFromHref(props.href) || '';
  const isItemFavorite = isFavorite(title);
  const isItemCompleted = isCompleted(title);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(title);
  };

  const handleCheckClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompleted(title);
  };

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(itemVariants({ active }), props.className)}
      prefetch={prefetch}
    >
      {icon ?? (props.external ? <ExternalLink /> : <FileIcon />)}
      <span className="flex-1">{props.children}</span>
      {props.href && isLoaded && isItemFavorite && (
        <button
          onClick={handleHeartClick}
          className="flex-shrink-0 hover:bg-fd-accent/50 ml-auto p-1 rounded transition-colors"
          aria-label="Remove from favorites"
        >
          <HeartIcon
            fill="red"
            className="w-4 h-4 text-red-500 transition-all animate-pulse duration-200"
          />
        </button>
      )}
      {props.href && isCompletedLoaded && isItemCompleted && (
        <button
          onClick={handleCheckClick}
          className="flex-shrink-0 hover:bg-fd-accent/50 ml-auto p-1 rounded transition-colors"
          aria-label="Mark as completed"
        >
          <CheckCircleIcon
            className="w-4 h-4 text-green-500 transition-all animate-pulse duration-200"
          />
        </button>
      )}
    </Link>
  );
}
