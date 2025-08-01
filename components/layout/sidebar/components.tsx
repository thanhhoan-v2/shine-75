import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea, ScrollViewport } from '@/components/ui/scroll-area';
import { isActive } from '@/lib/is-active';
import { cn } from '@/lib/utils';
import type {
    CollapsibleContentProps,
    CollapsibleTriggerProps,
} from '@radix-ui/react-collapsible';
import { type ScrollAreaProps } from '@radix-ui/react-scroll-area';
import { usePathname } from 'fumadocs-core/framework';
import Link, { type LinkProps } from 'fumadocs-core/link';
import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import { ChevronDown } from 'lucide-react';
import {
    type ComponentProps,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { FolderContext, useFolderContext, useInternalContext } from './contexts';
import { itemVariants } from './variants';

export function SidebarHeader(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn('flex flex-col gap-3 px-4 pb-2 md:pt-4', props.className)}
    >
      {props.children}
    </div>
  );
}

export function SidebarFooter(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn('flex flex-col border-t px-4 py-3', props.className)}
    >
      {props.children}
    </div>
  );
}

export function SidebarViewport(props: ScrollAreaProps) {
  return (
    <ScrollArea {...props} className={cn('h-full', props.className)}>
      <ScrollViewport
        className="p-4"
        style={
          {
            '--sidebar-item-offset': 'calc(var(--spacing) * 2)',
            maskImage:
              'linear-gradient(to bottom, transparent, white 12px, white calc(100% - 12px), transparent)',
          } as object
        }
      >
        {props.children}
      </ScrollViewport>
    </ScrollArea>
  );
}

export function SidebarFolder({
  defaultOpen = false,
  open: controlledOpen,
  ...props
}: ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  // Update open state when defaultOpen changes (for navigation)
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    } else {
      setOpen(defaultOpen);
    }
  }, [defaultOpen, controlledOpen]);

  return (
    <Collapsible open={open} onOpenChange={setOpen} {...props}>
      <FolderContext.Provider
        value={useMemo(() => ({ open, setOpen }), [open])}
      >
        {props.children}
      </FolderContext.Provider>
    </Collapsible>
  );
}

export function SidebarFolderTrigger({
  className,
  ...props
}: CollapsibleTriggerProps) {
  const { open } = useFolderContext();

  return (
    <CollapsibleTrigger
      className={cn(itemVariants({ active: false }), 'w-full', className)}
      {...props}
    >
      {props.children}
      <ChevronDown
        data-icon
        className={cn('ms-auto transition-transform', !open && '-rotate-90')}
      />
    </CollapsibleTrigger>
  );
}

export function SidebarFolderLink(props: LinkProps) {
  const { open, setOpen } = useFolderContext();
  const { prefetch } = useInternalContext();

  const pathname = usePathname();
  const active =
    props.href !== undefined && isActive(props.href, pathname, false);

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(itemVariants({ active }), 'w-full', props.className)}
      onClick={(e) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.hasAttribute('data-icon')
        ) {
          setOpen(!open);
          e.preventDefault();
        } else {
          setOpen(active ? !open : true);
        }
      }}
      prefetch={prefetch}
    >
      {props.children}
      <ChevronDown
        data-icon
        className={cn('ms-auto transition-transform', !open && '-rotate-90')}
      />
    </Link>
  );
}

export function SidebarFolderContent(props: CollapsibleContentProps) {
  const ctx = useInternalContext();
  const level = ctx.level + 1;

  return (
    <CollapsibleContent
      {...props}
      className={cn(
        'relative',
        level === 2 &&
          "**:data-[active=true]:before:content-[''] **:data-[active=true]:before:bg-fd-primary **:data-[active=true]:before:absolute **:data-[active=true]:before:w-px **:data-[active=true]:before:inset-y-2.5 **:data-[active=true]:before:start-2.5",
        props.className
      )}
      style={
        {
          '--sidebar-item-offset': `calc(var(--spacing) * ${
            level > 1 ? level * 3 : 2
          })`,
          ...props.style,
        } as object
      }
    >
      {level === 2 && (
        <div className="absolute inset-y-1 bg-fd-border w-px start-2.5" />
      )}
      <FolderContext.Provider
        value={useMemo(
          () => ({
            open: false,
            setOpen: () => {},
          }),
          []
        )}
      >
        {props.children}
      </FolderContext.Provider>
    </CollapsibleContent>
  );
}

export function SidebarCollapseTrigger(props: ComponentProps<'button'>) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Collapse Sidebar"
      data-collapsed={collapsed}
      {...props}
      onClick={() => {
        setCollapsed((prev) => !prev);
      }}
    >
      {props.children}
    </button>
  );
} 