import { useRouter } from "next/router";

export default function NavLink({ href, children, className, onClick }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    return router.push(href);
  };

  return (
    <a
      className={`${className} hover:underline `}
      href={href}
      onClick={onClick || handleClick}
    >
      {children}
    </a>
  );
}
