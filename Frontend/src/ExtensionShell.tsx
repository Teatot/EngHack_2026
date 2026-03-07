import type { PropsWithChildren } from "react";

export default function ExtensionShell({
  children
}: PropsWithChildren) {
  return (
    <main className="extension-shell-container">
      <div className="extension-shell-body">
        {children}
      </div>
    </main>
  );
}
