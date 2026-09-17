import ActiveLink from "@/app/components/ActiveLink";

export default function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <div
        aria-label="404 error"
        className="page404 ml-2 py-4 text-7xl"
        title="404"
      >
        404
      </div>
      <p>
        Could not find the requested resource.{" "}
        <ActiveLink href="/" title="Go back" />
      </p>
    </>
  );
}
