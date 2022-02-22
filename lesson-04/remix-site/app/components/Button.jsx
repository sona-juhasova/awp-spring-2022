import { Link } from "remix";

export default function Button({ to, type, children }) {
  if (to) {
    return (
      <Link className="button" to={to}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className="button" type={type}>
        {children}
      </button>
    );
  }
}
