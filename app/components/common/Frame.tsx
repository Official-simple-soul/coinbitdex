import type { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
}

function Frame({ children }: FrameProps) {
  return (
    <div className="px-3 py-2.5 bg-white shadow-md border rounded-xl space-y-3">
      {children}
    </div>
  );
}

export default Frame;
