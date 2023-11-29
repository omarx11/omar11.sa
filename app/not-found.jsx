import ActiveLink from "@/app/components/content/ActiveLink";

export default function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <div title="404" className="page404 ml-2 py-4 text-7xl">
        404
      </div>
      <p>
        Could not find requested resource{" "}
        <ActiveLink href="/" title="go back" />
      </p>
    </>
  );
}
