import { BUSINESS_TIME_ZONE, formatDateTime, formatMoney, ka, tetri } from "@drivenet/i18n";

// Rendered per request so the server time below proves the deployment is live.
export const dynamic = "force-dynamic";

const SAMPLE_AMOUNT = tetri(12550);

export default function LandingPage() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          {ka.brand}
        </a>
        <nav className="nav" aria-label={ka.nav.menu}>
          {/* STU-02 sign-in is not built yet; the link target is reserved. */}
          <a href="/sign-in" className="button button--primary">
            {ka.nav.signIn}
          </a>
        </nav>
      </header>

      <main className="main">
        <section className="card" aria-labelledby="status">
          <h1 id="status" className="status">
            {ka.landing.status}
          </h1>
          <dl className="facts" aria-label={ka.system.buildInfo}>
            <dt>{ka.system.serverTime}</dt>
            <dd>{formatDateTime(new Date())}</dd>
            <dt>{ka.system.timeZone}</dt>
            <dd>{BUSINESS_TIME_ZONE}</dd>
            <dt>{ka.system.sampleAmount}</dt>
            <dd>{formatMoney(SAMPLE_AMOUNT)}</dd>
            <dt>Commit</dt>
            <dd>{commit}</dd>
          </dl>
        </section>
      </main>
    </>
  );
}
