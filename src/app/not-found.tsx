import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  const n = site.notFound;
  return (
    <main id="main" className="notfound" data-nav="light">
      <div className="container-x">
        <svg className="notfound-plan" viewBox="0 0 200 120" aria-hidden="true">
          <path d="M10 10H190V110H10Z M100 10V110 M10 60H100" />
          <path d="M120 40c20 0 34 10 40 30" className="notfound-cloud" />
        </svg>
        <h1 className="type-h2">{n.title}</h1>
        <p className="type-lead section-sub">{n.body}</p>
        <Link href="/" className="btn btn-primary notfound-home">
          {n.home}
        </Link>
      </div>
    </main>
  );
}
