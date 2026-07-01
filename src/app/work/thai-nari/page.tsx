import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { project, projectLinks } from "@/content/portfolio";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

export default function ThaiNariPage() {
  const liveHref =
    projectLinks.thaiNari === "REPLACE_WITH_THAI_NARI_LIVE_URL"
      ? "#"
      : projectLinks.thaiNari;

  return (
    <>
      <Header />
      <main className="case-page">
        <section className="case-hero section-grid">
          <p className="section-label">Concept Project / 2026</p>
          <h1 className="masked-title case-title">
            <span><i>{project.title}</i></span>
          </h1>
          <p>{project.intro}</p>
          <div className="case-meta">
            <MetaItem label="Role" value={project.role} />
            <MetaItem label="Year" value={project.year} />
            <MetaItem label="Type" value={project.type} />
            <a href={liveHref} aria-disabled={liveHref === "#"}>
              Live website ↗
            </a>
          </div>
        </section>

        <section className="case-media section-grid" aria-label="Thai Nari website previews">
          <div className="case-desktop preview-media">
            <div className="preview-screen">
              <div className="thai-cover">
                <span>Thai Nari</span>
                <i>Refined SPA homepage</i>
              </div>
              <div className="thai-side">
                <span>Rituals</span>
                <span>Treatments</span>
                <span>Booking</span>
              </div>
            </div>
          </div>
          <div className="case-phone">
            <span>Mobile interface</span>
            <div />
          </div>
        </section>

        <section className="case-details section-grid">
          <article>
            <span>Visual system</span>
            <p>Warm materials, quiet contrast and soft spacing create a calm digital atmosphere without making navigation slow or decorative.</p>
          </article>
          <article>
            <span>Typography</span>
            <p>Large editorial headlines are paired with restrained service metadata so the wellness offer stays easy to scan.</p>
          </article>
          <article>
            <span>Interactions</span>
            <p>Masked reveals, light media movement and direct booking paths support exploration while keeping the interface practical.</p>
          </article>
        </section>

        <section className="case-solution section-grid">
          <div>
            <span>Challenge</span>
            <p>Translate a quiet physical spa experience into a website that still makes services, atmosphere and booking clear.</p>
          </div>
          <div>
            <span>Solution</span>
            <p>A visual system built around calm pacing, structured service entry points and mobile-first navigation.</p>
          </div>
        </section>

        <section className="case-cta section-grid">
          <h2>Thai Nari</h2>
          <a className="button primary" href={liveHref} aria-disabled={liveHref === "#"}>
            Visit live project
          </a>
          <p>Next project placeholder / available when the next case is ready.</p>
        </section>

        <section className="contact section-grid">
          <div>
            <h2>Let&apos;s make something worth remembering.</h2>
            <p>Have a project or business that needs a stronger digital presence?</p>
          </div>
          <ContactLinks />
        </section>
      </main>
      <Footer />
    </>
  );
}
