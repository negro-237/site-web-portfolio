import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type RouterContextValue = {
  pathname: string;
  navigate: (to: string) => void;
};

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
};

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

function normalizePath(path: string) {
  return path === "" ? "/" : path.replace(/\/+$/, "") || "/";
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      const nextPath = normalizePath(to);
      if (nextPath === pathname) return;

      window.history.pushState({}, "", nextPath);
      setPathname(nextPath);
      window.scrollTo({ top: 0 });
    },
    [pathname]
  );

  const value = useMemo(() => ({ pathname, navigate }), [navigate, pathname]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useLocation must be used within RouterProvider");
  return { pathname: context.pathname };
}

export function Link({ to, onClick, children, ...props }: LinkProps) {
  const context = useContext(RouterContext);

  return (
    <a
      {...props}
      href={to}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey ||
          props.target
        ) {
          return;
        }

        event.preventDefault();
        context?.navigate(to);
      }}
    >
      {children}
    </a>
  );
}
