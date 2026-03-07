import type { PropsWithChildren } from "react";

export default function ExtensionShell({
  children
}: PropsWithChildren): JSX.Element {
  return (
    <main className="extension-shell">
      <section className="extension-frame">
        <header className="extension-header">
          <div>
            <p className="eyebrow">Chrome Extension</p>
            <h1 className="shell-title">Extension Shell</h1>
          </div>
          <p className="shell-copy">
            Popup container rendering the existing full stack frontend.
          </p>
        </header>
        <div className="extension-body">{children}</div>
      </section>
    </main>
  );
}
