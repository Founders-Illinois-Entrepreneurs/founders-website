import { site } from "@/content/site";

/** "Get your startup featured in the newsletter" call to action. Uses site.newsletter.featureFormUrl. */
export default function FeatureStartup() {
  const href = site.newsletter.featureFormUrl;
  return (
    <div className="feature-cta">
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        <span className="tag">For founders</span>
        <h2 className="display display--sm">Building a startup?</h2>
        <p className="card__body" style={{ margin: 0 }}>
          Get it featured in {site.newsletter.name}.
        </p>
      </div>
      {href ? (
        <a className="btn btn--orange" href={href} target="_blank" rel="noopener noreferrer">
          Get featured <span className="arrow" aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="btn btn--orange" aria-disabled="true" title="Sign-up form coming soon">
          Get featured <span className="todo">[TODO: form link]</span>
        </span>
      )}
    </div>
  );
}
