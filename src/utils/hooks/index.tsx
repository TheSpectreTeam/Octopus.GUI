import React from "react";

type useKeyEvent = {
    keyCode: string;
    pressedKey?: "ctrlKey" | "shiftKey" | "altKey";
    fn: Function;
};

export const useKeyEvent = ({ keyCode, pressedKey, fn }: useKeyEvent) => {
    const handleUserKeyPress = React.useCallback(
        (event: KeyboardEvent) => {
            const { code } = event;
            const isPressed = pressedKey ? event[pressedKey] : null;
            if (isPressed && code === keyCode) {
                event.preventDefault();
                if (typeof fn === "function") fn();
            }
        },
        [fn]
    );
    React.useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return [handleUserKeyPress];
};