import { cva } from 'class-variance-authority';

export const itemVariants = cva(
  'relative flex flex-row items-center gap-2 p-2 ps-(--sidebar-item-offset) rounded-xl [&_svg]:size-4 text-fd-muted-foreground text-start [overflow-wrap:anywhere] [&_svg]:shrink-0',
  {
    variants: {
      active: {
        true: 'bg-fd-primary/10 text-fd-primary font-bold border-2 border-fd-primary',
        false:
          'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none',
      },
    },
  }
); 