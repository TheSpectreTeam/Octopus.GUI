export const transition = {
    duration: 0.3,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const variants = {
    exit: { x: 10, opacity: 0, transition },
    enter: { x: 0, opacity: 1, transition: { delay: 0.3, ...transition } },
};