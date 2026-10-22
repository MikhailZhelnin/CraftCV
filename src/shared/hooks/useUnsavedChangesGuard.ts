import { useCallback, useEffect, useRef } from "react";
import { useBlocker } from "react-router";

export function useUnsavedChangesGuard(hasUnsavedChanges: boolean) {
    const allowNavigationRef = useRef(false);

    const blocker = useBlocker(
        useCallback(
            ({ currentLocation, nextLocation }) => {
                if (!hasUnsavedChanges || allowNavigationRef.current) {
                    return false;
                };

                return (
                    currentLocation.pathname !== nextLocation.pathname || currentLocation.search !== nextLocation.search
                );
            },
            [hasUnsavedChanges]
        )
    );

    useEffect(() => {
        if (!hasUnsavedChanges) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    const allowNextNavigation = () => {
        allowNavigationRef.current = true;
    };

    const resumeBlocking = () => {
        allowNavigationRef.current = false;
    };

    const stay = () => {
        if (blocker.state === "blocked") {
            blocker.reset();
        };
    };

    const leave = () => {
        if (blocker.state === "blocked") {
            blocker.proceed();
        };
    };

    return {
        isBlocked: blocker.state === "blocked",
        stay,
        leave,
        allowNextNavigation,
        resumeBlocking,
    };
};