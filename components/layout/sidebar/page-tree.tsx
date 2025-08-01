import { SidebarItem } from '@/components/layout/sidebar/sidebar-item';
import { SidebarSeparator } from '@/components/layout/sidebar/sidebar-separator';
import { isActive } from '@/lib/is-active';
import { cn } from '@/lib/utils';
import type { PageTree } from 'fumadocs-core/server';
import { useTreeContext, useTreePath } from 'fumadocs-ui/contexts/tree';
import { FolderIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Fragment, useMemo, type ReactNode } from 'react';
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
} from './components';
import { useInternalContext } from './contexts';
import type { SidebarComponents } from './types';

/**
 * Render sidebar items from page tree
 */
export function SidebarPageTree(props: {
  components?: Partial<SidebarComponents>;
}) {
  const { root } = useTreeContext();

  return useMemo(() => {
    const { Separator, Item, Folder } = props.components ?? {};

    function renderSidebarList(
      items: PageTree.Node[],
      level: number
    ): ReactNode[] {
      return items.map((item, i) => {
        if (item.type === 'separator') {
          if (Separator) return <Separator key={i} item={item} />;
          return (
            <SidebarSeparator key={i} className={cn(i !== 0 && 'mt-6')}>
              {item.icon ?? <FolderIcon />}
              {item.name}
            </SidebarSeparator>
          );
        }

        if (item.type === 'folder') {
          const children = renderSidebarList(item.children, level + 1);

          if (Folder)
            return (
              <Folder key={i} item={item} level={level}>
                {children}
              </Folder>
            );
          return (
            <PageTreeFolder key={i} item={item}>
              {children}
            </PageTreeFolder>
          );
        }

        if (Item) return <Item key={item.url} item={item} />;
        return (
          <SidebarItem
            key={item.url}
            href={item.url}
            external={item.external}
            icon={item.icon}
          >
            {item.name}
          </SidebarItem>
        );
      });
    }

    return (
      <Fragment key={root.$id}>{renderSidebarList(root.children, 1)}</Fragment>
    );
  }, [props.components, root]);
}

function PageTreeFolder({
  item,
  ...props
}: {
  item: PageTree.Folder;
  children: ReactNode;
}) {
  const { defaultOpenLevel, level } = useInternalContext();
  const path = useTreePath();
  const pathname = usePathname();

  // Check if any child items are active
  const hasActiveChild = useMemo(() => {
    function checkChildren(nodes: PageTree.Node[]): boolean {
      return nodes.some(node => {
        if (node.type === 'folder') {
          return checkChildren(node.children);
        }
        if (node.type === 'page') {
          return node.url && isActive(node.url, pathname, false);
        }
        return false;
      });
    }
    return checkChildren(item.children);
  }, [item.children, pathname]);

  // Compute if folder should be open
  const shouldBeOpen = useMemo(() => {
    return (item.defaultOpen ?? defaultOpenLevel >= level) || 
           path.includes(item) || 
           hasActiveChild;
  }, [item.defaultOpen, defaultOpenLevel, level, path, item, hasActiveChild]);

  return (
    <SidebarFolder
      defaultOpen={shouldBeOpen}
      open={shouldBeOpen}
    >
      {item.index ? (
        <SidebarFolderLink
          href={item.index.url}
          external={item.index.external}
          {...props}
        >
          {item.icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger {...props}>
          {item.icon}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent>{props.children}</SidebarFolderContent>
    </SidebarFolder>
  );
}
