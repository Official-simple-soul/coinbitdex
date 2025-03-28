// components/admin/UI/Modals/CreditModal.tsx
import {
  Modal,
  NumberInput,
  Select,
  Group,
  Button,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

interface CreditModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: { type: string; amount: number; note: string }) => void;
}

export function CreditModal({ opened, onClose, onSubmit }: CreditModalProps) {
  const form = useForm({
    initialValues: {
      type: 'balance',
      amount: 0,
      note: '',
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Manage User Balances">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Select
          label="Balance Type"
          data={[
            { value: 'balance', label: 'Main Balance' },
            { value: 'profit', label: 'Profit Balance' },
            { value: 'copy', label: 'Copy Trading Profit' },
          ]}
          {...form.getInputProps('type')}
        />

        <NumberInput
          label="Amount"
          step={0.01}
          min={-10000}
          max={10000}
          {...form.getInputProps('amount')}
        />

        <TextInput
          label="Note"
          placeholder="Reason for this adjustment"
          {...form.getInputProps('note')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Apply Changes</Button>
        </Group>
      </form>
    </Modal>
  );
}
