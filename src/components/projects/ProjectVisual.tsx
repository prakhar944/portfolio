import { ArrowUpRight, Play, Search, Menu, PenLine } from "lucide-react";

// Original editorial illustrations of project functionality, not claimed screenshots.
export function ProjectVisual({ kind }: { kind: "mytube" | "blog" }) {
  return (
    <div
      className={`project-visual ${kind}`}
      aria-label={`${kind === "mytube" ? "MyTube" : "Blog"} conceptual interface illustration`}
      role="img"
    >
      <div className="preview-caption">
        <span>INTERFACE STUDY</span>
        <ArrowUpRight size={15} />
      </div>
      {kind === "mytube" ? (
        <div className="video-window">
          <div className="video-toolbar">
            <strong>
              <span className="play-logo">
                <Play size={10} fill="currentColor" />
              </span>
              MyTube
            </strong>
            <span className="mock-search">
              Search videos
              <Search size={10} />
            </span>
            <Menu size={13} />
          </div>
          <div className="video-body">
            <div className="mock-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="video-main">
              <div className="video-screen">
                <div className="video-orbit orbit-one" />
                <div className="video-orbit orbit-two" />
                <div className="video-orbit orbit-three" />
                <span className="video-play">
                  <Play size={21} fill="currentColor" />
                </span>
                <span className="screen-label">
                  A SPACE TO
                  <br />
                  WATCH & DISCOVER.
                </span>
              </div>
              <div className="mock-title" />
              <div className="mock-description" />
              <div className="video-thumbs">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="blog-window">
          <div className="blog-toolbar">
            <strong>
              the margin<span>.</span>
            </strong>
            <span>Stories & perspectives</span>
            <PenLine size={12} />
          </div>
          <div className="blog-preview-content">
            <span className="blog-kicker">A PLACE FOR YOUR WORDS</span>
            <h3>
              Ideas deserve
              <br />
              <em>a little space.</em>
            </h3>
            <div className="blog-rule" />
            <div className="blog-columns">
              <div className="blog-art">
                <div />
                <div />
                <div />
              </div>
              <div>
                <span className="blog-small-label">WRITE. REFLECT. SHARE.</span>
                <div className="mock-title" />
                <div className="mock-description" />
                <div className="mock-description" />
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>
        </div>
      )}
      <span className="visual-index">
        {kind === "mytube" ? "01 / MERN APPLICATION" : "02 / REACT APPLICATION"}
      </span>
    </div>
  );
}
