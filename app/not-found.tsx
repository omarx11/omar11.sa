import ActiveLink from "@/app/components/ActiveLink";

export default function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <div
        title="404"
        className="page404 ml-2 py-4 text-7xl"
        aria-label="404 error"
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
