export default function ActiveLink({
  children,
  href,
  activeClass,
  nonActiveClass = "",
  ...props
}) {
  const router = useRouter();

  return (
    <Link href={href} {...props}>
      {cloneElement(children, {
        className:
          router.pathname === href
            ? children.props.className
              ? `${children.props.className} ${activeClass}`
              : activeClass
            : children.props.className
            ? `${children.props.className} ${nonActiveClass}`
            : nonActiveClass,
      })}
    </Link>
  );
}
