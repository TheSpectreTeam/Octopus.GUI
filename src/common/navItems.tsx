import { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { ConfigIcon, InfoIcon, StatsIcon, HelpIcon } from "../assets";

export type NavigationItem = {
    label: string;
    icon: ComponentWithAs<"svg", IconProps>;
};

export const NAV_ITEMS: NavigationItem[] = [
    {
        label: "Statistics",
        icon: StatsIcon,
    },
    {
        label: "Info",
        icon: InfoIcon,
    },
    {
        label: "Settings",
        icon: ConfigIcon,
    },
    {
        label: "Help",
        icon: HelpIcon,
    },
];
