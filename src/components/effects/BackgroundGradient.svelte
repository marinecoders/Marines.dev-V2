<script>
  import { cn } from '../../lib/utils';
  import { Motion } from 'svelte-motion';

  export let className;
  export let containerClassName;
  export let animate = true;

  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };
</script>

<div class={cn('group relative p-[4px]', containerClassName)}>
  <Motion
    let:motion
    variants={animate ? variants : undefined}
    initial={animate ? 'initial' : undefined}
    animate={animate ? 'animate' : undefined}
    transition={animate
      ? {
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }
      : undefined}
    style={{
      backgroundSize: animate ? '400% 400%' : undefined,
    }}>
    <div
      use:motion
      class={cn(
        'absolute inset-0 z-[1] rounded-3xl opacity-60 blur-xl transition  duration-500 group-hover:opacity-100',
        ' bg-[radial-gradient(circle_farthest-side_at_0_100%,#991B20,transparent),radial-gradient(circle_farthest-side_at_100%_0,#07405B,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#FFC755,transparent),radial-gradient(circle_farthest-side_at_0_0,#a6192e,#101728)]'
      )} />
  </Motion>

  <Motion
    let:motion
    variants={animate ? variants : undefined}
    initial={animate ? 'initial' : undefined}
    animate={animate ? 'animate' : undefined}
    transition={animate
      ? {
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }
      : undefined}
    style={{
      backgroundSize: animate ? '400% 400%' : undefined,
    }}>
    <div
      use:motion
      class={cn(
        'absolute inset-0 z-[1] rounded-3xl',
        'bg-[radial-gradient(circle_farthest-side_at_0_100%,#991B20,transparent),radial-gradient(circle_farthest-side_at_100%_0,#07405B,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#FFC755,transparent),radial-gradient(circle_farthest-side_at_0_0,#a6192e,#101728)]'
      )} />
  </Motion>

  <div class={cn('relative z-10', className)}><slot /></div>
</div>
