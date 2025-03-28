// components/admin/Sections/Transactions/TransactionsTable.tsx
import { Table, Badge, Text } from '@mantine/core';
import type { RecordData } from '~/providers/types';

interface TransactionsTableProps {
  transactions: RecordData[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const rows = transactions.map((tx) => (
    <tr key={tx?.id}>
      <td>
        <Text size="sm">{tx?.userEmail}</Text>
      </td>
      <td>
        <Badge
          color={
            tx.type === 'deposit'
              ? 'green'
              : tx.type === 'withdraw'
              ? 'yellow'
              : 'blue'
          }
        >
          {tx.type}
        </Badge>
      </td>
      <td>${tx?.amount?.toFixed(2)}</td>
      <td>{new Date(tx?.createdAt).toLocaleString()}</td>
      <td>{tx?.status}</td>
      <td>{tx?.transactionId || 'N/A'}</td>
    </tr>
  ));

  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>User</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
          <th>Reference</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
