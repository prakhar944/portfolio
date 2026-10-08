import { ButtonLink } from "../components/ui/Links";
import { PageHeading } from "../components/ui/PageHeading";
import { usePageMeta } from "../hooks/usePageMeta";
export default function NotFound() {
  usePageMeta(
    "Page not found",
    "This page does not exist. Return to Prakhar Shrivastava’s portfolio.",
  );
  return (
    <>
      <PageHeading
        label="404 / PAGE NOT FOUND"
        title="A small"
        accent="wrong turn."
        description="The page you are looking for doesn't exist."
      />
      <div className="container pb-24">
        <ButtonLink to="/">Back to home</ButtonLink>
      </div>
    </>
  );
}
