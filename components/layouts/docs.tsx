import { cn } from '@/lib/utils';
import { HideIfEmpty } from 'fumadocs-core/hide-if-empty';
import Link from 'fumadocs-core/link';
import type { PageTree } from 'fumadocs-core/server';
import { NavProvider } from 'fumadocs-ui/contexts/layout';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { ChevronDown, Languages, Sidebar as SidebarIcon } from 'lucide-react';
import { Fragment, type HTMLAttributes, useMemo } from 'react';
import { LanguageToggle } from '../layout/language-toggle';
import { type Option, RootToggle } from '../layout/root-toggle';
import { LargeSearchToggle, SearchToggle } from '../layout/search-toggle';
import {
    Sidebar,
    SidebarCollapseTrigger,
    SidebarFooter,
    SidebarHeader,
    SidebarPageTree,
    SidebarViewport,
} from '../layout/sidebar';
import { ThemeToggle } from '../layout/theme-toggle';
import { buttonVariants } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    getSidebarTabsFromOptions,
    SidebarLinkItem,
    type SidebarOptions,
} from './docs/shared';
import { BaseLinkItem, type LinkItemType } from './links';
import {
    LayoutBody,
    LayoutTabs,
    Navbar,
    NavbarSidebarTrigger,
} from './notebook-client';
import { type BaseLayoutProps, getLinks } from './shared';

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  tabMode?: 'sidebar' | 'navbar';

  nav?: BaseLayoutProps['nav'] & {
    mode?: 'top' | 'auto';
  };

  sidebar?: Partial<SidebarOptions>;

  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsLayout(props: DocsLayoutProps) {
  const {
    tabMode = 'sidebar',
    nav: { transparentMode, ...nav } = {},
    sidebar: {
      tabs: tabOptions,
      banner: sidebarBanner,
      footer: sidebarFooter,
      components: sidebarComponents,
      ...sidebar
    } = {},
    i18n = false,
    disableThemeSwitch = false,
    themeSwitch = { enabled: !disableThemeSwitch },
  } = props;

  const navMode = nav.mode ?? 'auto';
  const links = getLinks(props.links ?? [], props.githubUrl);
  const tabs = useMemo(
    () => getSidebarTabsFromOptions(tabOptions, props.tree) ?? [],
    [tabOptions, props.tree]
  );

  // Dimension variables
  const variables = cn(
    '[--fd-nav-height:56px] md:[--fd-sidebar-width:386px] md:[--fd-nav-height:64px] xl:[--fd-toc-width:286px]',
    tabs.length > 0 && tabMode === 'navbar' && 'lg:[--fd-nav-height:104px]'
  );

  const sidebarHeader = (
    <div className="max-md:hidden flex justify-between">
      <Link
        href={nav.url ?? '/'}
        className="inline-flex items-center gap-2.5 font-medium"
      >
        {nav.title}
      </Link>
      {(sidebar.collapsible ?? true) && (
        <SidebarCollapseTrigger
          className={cn(
            buttonVariants({
              color: 'ghost',
              size: 'icon-sm',
              className: 'mt-px mb-auto text-fd-muted-foreground',
            })
          )}
        >
          <SidebarIcon />
        </SidebarCollapseTrigger>
      )}
    </div>
  );

  return (
    <TreeContextProvider tree={props.tree}>
      <NavProvider transparentMode={transparentMode}>
        <LayoutBody
          {...props.containerProps}
          className={cn(variables, props.containerProps?.className)}
        >
          <Sidebar
            {...sidebar}
            className={cn(
              navMode === 'top'
                ? 'border-e-0 md:bg-transparent'
                : 'md:[--fd-nav-height:0px]',
              sidebar.className
            )}
          >
            <HideIfEmpty>
              <SidebarHeader className="data-[empty=true]:hidden">
                {navMode === 'auto' && sidebarHeader}
                {nav.children}
                {sidebarBanner}
                {tabMode === 'sidebar' && tabs.length > 0 ? (
                  <RootToggle className="mb-2" options={tabs} />
                ) : null}
                {tabMode === 'navbar' && tabs.length > 0 && (
                  <RootToggle options={tabs} className="lg:hidden" />
                )}
              </SidebarHeader>
            </HideIfEmpty>
            <SidebarViewport>
              {links
                .filter((item) => item.type !== 'icon')
                .map((item, i) => (
                  <SidebarLinkItem
                    key={i}
                    item={item}
                    className={cn(
                      'lg:hidden',
                      i === links.length - 1 && 'mb-4'
                    )}
                  />
                ))}

              <SidebarPageTree components={sidebarComponents} />
            </SidebarViewport>
            <HideIfEmpty>
              <SidebarFooter className="data-[empty=true]:hidden flex flex-col">
                <div className="flex flex-row justify-end items-center">
                  <div className="empty:hidden lg:hidden flex flex-1 items-center">
                    {links
                      .filter((item) => item.type === 'icon')
                      .map((item, i) => (
                        <BaseLinkItem
                          key={i}
                          item={item}
                          className={cn(
                            buttonVariants({
                              size: 'icon-sm',
                              color: 'ghost',
                              className: 'text-fd-muted-foreground',
                            })
                          )}
                          aria-label={item.label}
                        >
                          {item.icon}
                        </BaseLinkItem>
                      ))}
                  </div>
                  {i18n ? (
                    <LanguageToggle className="md:hidden me-auto">
                      <Languages className="size-4.5 text-fd-muted-foreground" />
                    </LanguageToggle>
                  ) : null}
                  {themeSwitch.enabled !== false &&
                    (themeSwitch.component ?? (
                      <ThemeToggle
                        className="md:hidden"
                        mode={themeSwitch?.mode ?? 'light-dark-system'}
                      />
                    ))}
                  {sidebarFooter}
                </div>
              </SidebarFooter>
            </HideIfEmpty>
          </Sidebar>
          <DocsNavbar
            {...props}
            links={links}
            tabs={tabMode == 'navbar' ? tabs : []}
          />
          {props.children}
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  );
}

function DocsNavbar({
  links,
  tabs,
  searchToggle = {},
  themeSwitch = {},
  ...props
}: DocsLayoutProps & {
  links: LinkItemType[];
  tabs: Option[];
}) {
  const navMode = props.nav?.mode ?? 'auto';
  const sidebarCollapsible = props.sidebar?.collapsible ?? true;
  const nav = (
    <Link
      href={props.nav?.url ?? '/'}
      className={cn(
        'inline-flex items-center gap-2.5 font-semibold empty:hidden',
        navMode === 'auto' && 'md:hidden'
      )}
    >
      {props.nav?.title}
    </Link>
  );

  return (
    <Navbar mode={navMode}>
      <div
        className={cn(
          'flex border-b px-4 flex-1',
          navMode === 'auto' && 'md:px-6'
        )}
      >
        <div
          className={cn(
            'flex flex-row items-center',
            navMode === 'top' && 'flex-1 pe-4'
          )}
        >
          {sidebarCollapsible && navMode === 'auto' ? (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                }),
                'text-fd-muted-foreground -ms-1.5 me-2 data-[collapsed=false]:hidden max-md:hidden'
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          ) : null}
          {nav}
        </div>
        {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ? (
            <div
              className={cn(
                'w-full my-auto max-md:hidden',
                navMode === 'top' ? 'rounded-xl max-w-sm' : 'max-w-[240px]'
              )}
            >
              {searchToggle.components?.lg}
            </div>
          ) : (
            <LargeSearchToggle
              hideIfDisabled
              className={cn(
                'w-full my-auto max-md:hidden',
                navMode === 'top'
                  ? 'rounded-xl max-w-sm ps-2.5'
                  : 'max-w-[240px]'
              )}
            />
          ))}
        <div className="flex flex-row flex-1 justify-end items-center">
          <div className="empty:hidden max-lg:hidden flex flex-row items-center gap-6 px-4">
            {links
              .filter((item) => item.type !== 'icon')
              .map((item, i) => (
                <NavbarLinkItem
                  key={i}
                  item={item}
                  className="text-fd-muted-foreground data-[active=true]:text-fd-primary text-sm transition-colors hover:text-fd-accent-foreground"
                />
              ))}
          </div>
          {props.nav?.children}
          {searchToggle.enabled !== false &&
            (searchToggle.components?.sm ?? (
              <SearchToggle hideIfDisabled className="md:hidden p-2" />
            ))}
          <NavbarSidebarTrigger className="md:hidden -me-1.5 p-2" />
          {links
            .filter((item) => item.type === 'icon')
            .map((item, i) => (
              <BaseLinkItem
                key={i}
                item={item}
                className={cn(
                  buttonVariants({ size: 'icon-sm', color: 'ghost' }),
                  'text-fd-muted-foreground max-lg:hidden'
                )}
                aria-label={item.label}
              >
                {item.icon}
              </BaseLinkItem>
            ))}
          {props.i18n ? (
            <LanguageToggle className="max-md:hidden">
              <Languages className="size-4.5 text-fd-muted-foreground" />
            </LanguageToggle>
          ) : null}
          {themeSwitch.enabled !== false &&
            (themeSwitch.component ?? (
              <ThemeToggle
                className="max-md:hidden ms-2"
                mode={themeSwitch.mode ?? 'light-dark-system'}
              />
            ))}
          {sidebarCollapsible && navMode === 'top' ? (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  color: 'secondary',
                  size: 'icon-sm',
                }),
                'ms-2 text-fd-muted-foreground rounded-full max-md:hidden'
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          ) : null}
        </div>
      </div>
      {tabs.length > 0 && (
        <LayoutTabs
          className={cn(
            'border-b h-10 max-lg:hidden',
            navMode === 'top' ? 'px-4' : 'px-6'
          )}
          options={tabs}
        />
      )}
    </Navbar>
  );
}

function NavbarLinkItem({
  item,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === 'menu') {
    return (
      <Popover>
        <PopoverTrigger
          {...props}
          className={cn('inline-flex items-center gap-1.5', props.className)}
        >
          {item.text}
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          {item.items.map((child, i) => {
            if (child.type === 'custom')
              return <Fragment key={i}>{child.children}</Fragment>;

            return (
              <BaseLinkItem
                key={i}
                item={child}
                className="inline-flex items-center gap-2 hover:bg-fd-accent p-2 rounded-md [&_svg]:size-4 data-[active=true]:text-fd-primary text-start hover:text-fd-accent-foreground"
              >
                {child.icon}
                {child.text}
              </BaseLinkItem>
            );
          })}
        </PopoverContent>
      </Popover>
    );
  }

  if (item.type === 'custom') return item.children;

  return (
    <BaseLinkItem item={item} {...props}>
      {item.text}
    </BaseLinkItem>
  );
}

export { Navbar, NavbarSidebarTrigger };
