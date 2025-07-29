import { cn } from '@/lib/utils';
import { I18nLabel } from 'fumadocs-ui/contexts/i18n';
import { Text } from 'lucide-react';
import { type ComponentProps } from 'react';
import { TOCItems, TOCScrollArea } from '../../layout/toc';
import ClerkTOCItems from '../../layout/toc-clerk';
import {
  type BreadcrumbProps,
  type FooterProps,
  PageBreadcrumb,
  PageFooter,
  PageLastUpdate,
  PageRoot,
  PageTOC,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverTrigger,
  type RootProps,
} from './page-client';

/**
 * Apply `prose` on div
 */
export function PageProse(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('prose', props.className)}>
      {props.children}
    </div>
  );
}

export function PageTOCTitle(props: ComponentProps<'h2'>) {
  return (
    <h3
      {...props}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground',
        props.className,
      )}
    >
      <Text className="bg-accent size-4" />
      <I18nLabel label="toc" />
    </h3>
  );
}

export function PageTOCItems({
  variant = 'normal',
  ...props
}: ComponentProps<'div'> & { variant?: 'clerk' | 'normal' }) {
  return (
    <TOCScrollArea {...props}>
      {variant === 'clerk' ? <ClerkTOCItems /> : <TOCItems />}
    </TOCScrollArea>
  );
}

export function PageTOCPopoverItems({
  variant = 'normal',
  ...props
}: ComponentProps<'div'> & { variant?: 'clerk' | 'normal' }) {
  return (
    <TOCScrollArea {...props}>
      {variant === 'clerk' ? <ClerkTOCItems /> : <TOCItems />}
    </TOCScrollArea>
  );
}

export function PageArticle(props: ComponentProps<'article'>) {
  return (
    <article
      {...props}
      className={cn(
        'flex min-w-0 w-full flex-col gap-4 px-4 pt-8 md:px-6 md:mx-auto xl:pt-12 xl:px-12',
        props.className,
      )}
    >
      {props.children}
    </article>
  );
}

export {
  PageBreadcrumb,
  PageFooter,
  PageLastUpdate, PageRoot, PageTOC,
  PageTOCPopover, PageTOCPopoverContent, PageTOCPopoverTrigger, type BreadcrumbProps, type FooterProps, type RootProps
};

