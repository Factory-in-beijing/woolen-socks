import { BUSINESS_TIME_ZONE, formatDateTime, formatMoney, messages, tetri } from "@drivenet/i18n";

// Rendered per request so the server time below proves the deployment is live.
export const dynamic = "force-dynamic";

const SAMPLE_AMOUNT = tetri(12550);

export default function LandingPage() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          {messages.brand}
        </a>
        <nav className="nav" aria-label={messages.nav.menu}>
          {/* STU-02 sign-in is not built yet; the link target is reserved. */}
          <a href="/sign-in" className="button button--primary">
            {messages.nav.signIn}
          </a>
        </nav>
      </header>

      <main className="main">
        <section className="card" aria-labelledby="status">
          <h1 id="status" className="status">
            {messages.landing.status}
          </h1>
          <dl className="facts" aria-label={messages.system.buildInfo}>
            <dt>{messages.system.serverTime}</dt>
            <dd>{formatDateTime(new Date())}</dd>
            <dt>{messages.system.timeZone}</dt>
            <dd>{BUSINESS_TIME_ZONE}</dd>
            <dt>{messages.system.sampleAmount}</dt>
            <dd>{formatMoney(SAMPLE_AMOUNT)}</dd>
            <dt>Commit</dt>
            <dd>{commit}</dd>
          </dl>
        </section>
      </main>
    </>
  );
}
