import { useEffect, useState, useRef } from "react";

interface useScrollBasedPinOptions {
    pinThreshold: number;
    downScrollTolerance: number;
    upScrollTolerance: number;
}

/**
 * Returns whether or not a component should be pinned depending on the scroll position
 */
function useScrollBasedPin(initialState: boolean, options?: Partial<useScrollBasedPinOptions>) {
    const [isPinned, setIsPinned] = useState(initialState);
    const scrollRecord = useRef(0);

    const { pinThreshold = 0, downScrollTolerance = 2, upScrollTolerance = 5 } = options || {};

    useEffect(() => {
        const getDocumentHeight = () => {
            const { body } = document;

            return Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight);
        };

        const isOutOfBounds = (scrollY: number) => {
            const viewportHeight = window.innerHeight;
            const documentHeight = getDocumentHeight();

            const pastTop = scrollY < 0;
            const pastBottom = scrollY + viewportHeight > documentHeight;

            return pastTop || pastBottom;
        };

        const getPinState = (scrollY: number) => {
            const scrollDirection = scrollY >= scrollRecord.current ? "down" : "up"
            const distanceScrolled = Math.abs(scrollY - scrollRecord.current)
            const scrollPosPastThreshold = scrollY > pinThreshold

            if (
                scrollDirection === "down" &&
                scrollPosPastThreshold &&
                distanceScrolled > downScrollTolerance
            ) {
                return "unpin"
            } else if (
                scrollDirection === "up" &&
                distanceScrolled > upScrollTolerance ||
                !scrollPosPastThreshold
            ) {
                return 'pin'
            } else {
                return 'constant'
            }
        };

        const listener = () => {
            var scrollY = window.pageYOffset;

            if (!isOutOfBounds(scrollY)) {
                const action = getPinState(scrollY);

                if (action === 'pin' && !isPinned) setIsPinned(true)
                if (action === 'unpin' && isPinned) setIsPinned(false)
            }
            scrollRecord.current = scrollY <= 0 ? 0 : scrollY; // For Mobile or negative scrolling
        };

        document.addEventListener("scroll", listener);

        return () => {
            document.removeEventListener("scroll", listener);
        };
    }, [isPinned]);

    return isPinned;
}

export { useScrollBasedPin };
