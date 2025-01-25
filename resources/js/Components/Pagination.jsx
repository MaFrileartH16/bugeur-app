import { Group, Pagination as PaginationMantine } from '@mantine/core';
import {
  IconChevronLeft as IconChevronLeftTabler,
  IconChevronRight as IconChevronRightTabler,
  IconChevronsLeft as IconChevronsLeftTabler,
  IconChevronsRight as IconChevronsRightTabler,
  IconDots as IconDotsTabler,
} from '@tabler/icons-react';

export const Pagination = (props) => {
  console.log(props);
  const IconChevronsLeft = () => <IconChevronsLeftTabler size={24} />;
  const IconChevronLeft = () => <IconChevronLeftTabler size={24} />;
  const IconChevronRight = () => <IconChevronRightTabler size={24} />;
  const IconChevronsRight = () => <IconChevronsRightTabler size={24} />;
  const IconDots = () => <IconDotsTabler size={24} />;

  return (
    <PaginationMantine.Root
      {...props}
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      <Group
        gap={8}
        style={{ display: 'inline-flex', flexWrap: 'nowrap' }}
        h={52}
      >
        <PaginationMantine.First icon={IconChevronsLeft} />
        <PaginationMantine.Previous icon={IconChevronLeft} />
        <PaginationMantine.Items dotsIcon={IconDots} />
        <PaginationMantine.Next icon={IconChevronRight} />
        <PaginationMantine.Last icon={IconChevronsRight} />
      </Group>
    </PaginationMantine.Root>
  );
};
