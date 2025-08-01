'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Presence } from '@radix-ui/react-presence';
import { useMediaQuery } from 'fumadocs-core/utils/use-media-query';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import { X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Context } from './contexts';
import type { InternalContext, SidebarProps } from './types';

export type { InternalContext, SidebarProps } from './types';

export function Sidebar({
  defaultOpenLevel = 0,
  prefetch = true,
  collapsible = true,
  ...props
}: SidebarProps) {
  const { open, setOpen, collapsed } = useSidebar();
  const context = useMemo<InternalContext>(() => {
    return {
      defaultOpenLevel,
      prefetch,
      level: 1,
    };
  }, [defaultOpenLevel, prefetch]);

  const [hover, setHover] = useState(false);
  const timerRef = useRef(0);
  const closeTimeRef = useRef(0);
  // md
  const isMobile = useMediaQuery('(width < 768px)') ?? false;

  useOnChange(collapsed, () => {
    setHover(false);
    closeTimeRef.current = Date.now() + 150;
  });

  if (isMobile) {
    const state = open ? 'open' : 'closed';

    return (
      <Context.Provider value={context}>
        <Presence present={open}>
          <div
            data-state={state}
            className="z-40 fixed inset-0 backdrop-blur-xs data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in"
            onClick={() => setOpen(false)}
          />
        </Presence>
        <Presence present={open}>
          {({ present }) => (
            <aside
              id="nd-sidebar-mobile"
              {...props}
              data-state={state}
              className={cn(
                'fixed text-[15px] flex flex-col shadow-lg border-s end-0 inset-y-0 w-[85%] max-w-[580px] z-40 bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out',
                !present && 'invisible',
                props.className
              )}
            >
              <Button
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({
                    color: 'ghost',
                    size: 'icon-sm',
                    className:
                      'mt-3 mb-1 ms-auto me-4 text-fd-muted-foreground',
                  })
                )}
              >
                <X />
              </Button>
              {props.children}
            </aside>
          )}
        </Presence>
      </Context.Provider>
    );
  }

  return (
    <aside
      id="nd-sidebar"
      {...props}
      data-collapsed={collapsed}
      className={cn(
        'fixed start-0 flex flex-col items-end top-(--fd-sidebar-top) bottom-(--fd-sidebar-margin) z-20 bg-fd-card text-sm border-e max-md:hidden *:w-(--fd-sidebar-width)',
        collapsed && [
          'rounded-xl border translate-x-(--fd-sidebar-offset) rtl:-translate-x-(--fd-sidebar-offset)',
          hover ? 'z-50 shadow-lg' : 'opacity-0 ',
        ],
        props.className
      )}
      style={
        {
          transition: ['top', 'opacity', 'translate', 'width']
            .map((v) => `${v} ease 250ms`)
            .join(', '),
          ...props.style,
          '--fd-sidebar-offset': hover
            ? 'calc(var(--spacing) * 2)'
            : 'calc(16px - 100%)',
          '--fd-sidebar-margin': collapsed ? '0.5rem' : '0px',
          '--fd-sidebar-top': `calc(var(--fd-banner-height) + var(--fd-nav-height) + var(--fd-sidebar-margin))`,
          width: collapsed
            ? 'var(--fd-sidebar-width)'
            : 'calc(var(--fd-sidebar-width) + var(--fd-layout-offset))',
        } as object
      }
      onPointerEnter={(e) => {
        if (
          !collapsible ||
          !collapsed ||
          e.pointerType === 'touch' ||
          closeTimeRef.current > Date.now()
        )
          return;
        window.clearTimeout(timerRef.current);
        setHover(true);
      }}
      onPointerLeave={(e) => {
        if (!collapsible || !collapsed || e.pointerType === 'touch') return;
        window.clearTimeout(timerRef.current);

        timerRef.current = window.setTimeout(
          () => {
            setHover(false);
            closeTimeRef.current = Date.now() + 150;
          },
          Math.min(e.clientX, document.body.clientWidth - e.clientX) > 100
            ? 0
            : 500
        );
      }}
    >
      <Context.Provider value={context}>{props.children}</Context.Provider>
    </aside>
  );
}

export {
  SidebarCollapseTrigger,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarViewport
} from './components';

export { SidebarPageTree } from './page-tree';
export type { SidebarComponents } from './types';

