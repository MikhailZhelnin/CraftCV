import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
    { to: "/", label: "Resumes", end: true },
    { to: "/profiles", label: "Profiles", end: false },
];

const AppHeader = () => {
    const location = useLocation();
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const activeIndex = NAV_LINKS.findIndex(({ to, end }) => end ? location.pathname === to : location.pathname.startsWith(to));

    useLayoutEffect(() => {
        const nav = navRef.current;
        const activeLink = linkRefs.current[activeIndex];

        if (!nav || !activeLink) return;

        const updateIndicator = () => {
            const navRect = nav.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
        };

        updateIndicator();

        const observer = new ResizeObserver(updateIndicator);
        observer.observe(nav);

        return () => observer.disconnect();
    }, [activeIndex]);

    return (
        <header className="z-20 shrink-0 border-b bg-background p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <NavLink
                        to="/"
                        aria-label="CraftCV home"
                        className="mr-21.25 shrink-0 text-3xl font-black tracking-[-0.07em] text-foreground"
                    >
                        cvenza.
                    </NavLink>

                    <nav
                        ref={navRef}
                        className="relative flex h-full items-center gap-6"
                        aria-label="Main navigation"
                    >
                        {NAV_LINKS.map(({ to, label, end }, index) => (
                            <NavLink
                                key={to}
                                ref={(element) => {
                                    linkRefs.current[index] = element;
                                }}
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `flex h-full items-center text-[11px] font-semibold uppercase tracking-wide transition-colors ${isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-6.5 h-0.5 bg-primary transition-[transform,width] duration-300 ease-out"
                            style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;