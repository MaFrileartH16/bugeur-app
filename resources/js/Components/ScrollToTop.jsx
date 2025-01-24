import { ActionIcon, Affix, Tooltip, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconChevronUp } from '@tabler/icons-react';

export const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix
      position={{ bottom: 16, right: 16 }}
      style={{
        zIndex: 2,
      }}
    >
      <Transition transition="fade" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Tooltip label="Scroll to top">
            <ActionIcon
              onClick={() => scrollTo({ y: 0 })}
              variant="filled"
              style={transitionStyles}
            >
              <IconChevronUp />
            </ActionIcon>
          </Tooltip>
        )}
      </Transition>
    </Affix>
  );
};
