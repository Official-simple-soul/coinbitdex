import type { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
}

function Frame({ children }: FrameProps) {
  return (
    <div className="px-5 py-3 bg-white shadow-md border rounded-xl space-y-3">
      {children}
    </div>
  );
}

export default Frame;
