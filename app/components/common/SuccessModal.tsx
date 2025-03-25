import { Modal } from '@mantine/core';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <Modal opened={open} onClose={onClose} title={'Success'} size="lg" centered>
      <h1 className="font-bold text-center text-xl">Copying Successful!</h1>
      <p className="mt-4 text-center text-sm text-yellow-700">
        AI Trade Schedule:
      </p>
      <p className="mt-4 text-center text-xs text-gray-500">
        Daily Automatic Copy Trading Washington DC, USA
      </p>
      <p className="mt-2 text-center text-xs text-gray-500">
        100% Copy Profit ✨ - 0% Risk Free 👝
      </p>
      <img src="/gif/success.gif" />
      <p className="text-gray-600 text-center">BTC / USDT 10X</p>
    </Modal>
  );
}

export default SuccessModal;
