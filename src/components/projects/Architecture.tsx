import { ArrowDown, Database, Monitor, Server, Cloud } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function Architecture() {
  return (
    <Reveal className="architecture">
      <div className="eyebrow mb-8">MYTUBE / SYSTEM OVERVIEW</div>
      <div className="architecture-node">
        <Monitor size={20} />
        <div>
          <strong>React frontend</strong>
          <span>Responsive interface · protected routes</span>
        </div>
      </div>
      <div className="architecture-connector">
        <ArrowDown size={16} />
        <span>REST API / HTTP-only cookies</span>
      </div>
      <div className="architecture-node crimson-node">
        <Server size={20} />
        <div>
          <strong>Node.js + Express</strong>
          <span>Authentication · application logic</span>
        </div>
      </div>
      <div className="architecture-connector">
        <ArrowDown size={16} />
        <span>Data persistence & media workflows</span>
      </div>
      <div className="architecture-branches">
        <div className="architecture-node">
          <Database size={20} />
          <div>
            <strong>MongoDB</strong>
            <span>Mongoose · aggregations</span>
          </div>
        </div>
        <div className="architecture-node">
          <Cloud size={20} />
          <div>
            <strong>Cloudinary</strong>
            <span>Videos · thumbnails</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
