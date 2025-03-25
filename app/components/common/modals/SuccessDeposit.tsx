import { Button, Modal } from '@mantine/core';
import { NavLink } from 'react-router';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

function SuccessDeposit({ open, onClose }: SuccessModalProps) {
  return (
    <Modal opened={open} onClose={onClose} title={''} size="lg" centered>
      <h1 className="font-bold text-center text-xl">Thank You!</h1>
      <p className="mt-4 text-center text-sm text-yellow-700">
        Your Screenshot has been received
      </p>
      <p className="mt-4 text-center text-xs text-gray-500">
        Your account should reflect your deposit within 15 minutes
      </p>
      <p className="mt-2 text-center text-xs text-gray-500">
        If you are facing any challenge. Contact support
      </p>
      <img src="/gif/success.gif" />
      <div className="grid grid-cols-2 gap-4">
        <Button size="sm" fullWidth>
          Contact Support
        </Button>
        <NavLink to={'/dashboard'}>
          <Button size="sm" fullWidth>
            Go Home
          </Button>
        </NavLink>
      </div>
    </Modal>
  );
}

export default SuccessDeposit;
