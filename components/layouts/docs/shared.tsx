import { SidebarItem } from '@/components/layout/sidebar/sidebar-item';
import type { PageTree } from 'fumadocs-core/server';
import {
  getSidebarTabs,
  type GetSidebarTabsOptions,
} from 'fumadocs-ui/utils/get-sidebar-tabs';
import type { ReactNode } from 'react';
import type { Option } from '../../layout/root-toggle';
import {
  type SidebarComponents,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  type SidebarProps,
} from '../../layout/sidebar';
import type { LinkItemType } from '../links';

export interface SidebarOptions extends SidebarProps {
  components?: Partial<SidebarComponents>;

  /**
   * Root Toggle options
   */
  tabs?: Option[] | GetSidebarTabsOptions | false;

  banner?: ReactNode;
  footer?: ReactNode;
}

export function SidebarLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === 'menu')
    return (
      <SidebarFolder {...props}>
        {item.url ? (
          <SidebarFolderLink href={item.url}>
            {item.icon}
            {item.text}
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            {item.icon}
            {item.text}
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>
          {item.items.map((child, i) => (
            <SidebarLinkItem key={i} item={child} />
          ))}
        </SidebarFolderContent>
      </SidebarFolder>
    );

  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  return (
    <SidebarItem
      href={item.url}
      icon={item.icon}
      external={item.external}
      {...props}
    >
      {item.text}
    </SidebarItem>
  );
}

export function getSidebarTabsFromOptions(
  options: SidebarOptions['tabs'],
  tree: PageTree.Root
) {
  if (Array.isArray(options)) {
    return options;
  } else if (typeof options === 'object') {
    return getSidebarTabs(tree, options);
  } else if (options !== false) {
    return getSidebarTabs(tree);
  }
}
