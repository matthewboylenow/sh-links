import { getLinks, tracked, type Link } from "../lib/links";

// Re-render at least hourly so anything past its end date drops off on its own,
// even if nobody redeploys.
export const revalidate = 3600;

function Arrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M5 13L13 5M7 5h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Row({ link, big }: { link: Link; big?: boolean }) {
  return (
    <li>
      <a className={big ? "row row--big" : "row"} href={tracked(link.url, link.id)}>
        <span className="row__text">
          {link.label && <span className="row__label">{link.label}</span>}
          <span className="row__title">{link.title}</span>
          {link.note && <span className="row__note">{link.note}</span>}
        </span>
        <Arrow />
      </a>
    </li>
  );
}

export default function Page() {
  const { featured, posts, sections } = getLinks();

  return (
    <main className="page">
      <header className="hero">
        <img className="hero__photo" src="/church-dusk.jpg" alt="Saint Helen church at dusk" />
        <div className="hero__inner">
          <h1 className="hero__logo">
            <img src="/logo-white.png" alt="Saint Helen" width={930} height={143} />
          </h1>
          <p className="hero__place">Westfield, New Jersey</p>
        </div>
      </header>

      <p className="motto">Worshipping God, Serving Others, Making Disciples</p>

      {featured.length > 0 && (
        <section className="block">
          <h2 className="block__head">Coming up</h2>
          <ul className="list">
            {featured.map((l) => (
              <Row key={l.id} link={l} big />
            ))}
          </ul>
        </section>
      )}

      {posts.length > 0 && (
        <section className="block">
          <h2 className="block__head">From our posts</h2>
          <p className="block__sub">Saw something on Instagram? Tap the matching photo.</p>
          <ul className="grid">
            {posts.map((p) => (
              <li key={p.id}>
                <a href={tracked(p.url, p.id)} className="tile" aria-label={p.title}>
                  <img src={p.image} alt={p.alt ?? p.title} loading="lazy" width={480} height={600} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.map((s) => (
        <section className="block" key={s.id}>
          <h2 className="block__head">{s.title}</h2>
          <ul className="list">
            {s.links.map((l) => (
              <Row key={l.id} link={l} />
            ))}
          </ul>
        </section>
      ))}

      <footer className="foot">
        <img className="foot__mark" src="/mark-white.png" alt="" width={143} height={143} />
        <p>
          Saint Helen
          <br />
          1600 Rahway Avenue, Westfield, NJ 07090
          <br />
          <a href="tel:+19082321214">908-232-1214</a>
        </p>
      </footer>
    </main>
  );
}
