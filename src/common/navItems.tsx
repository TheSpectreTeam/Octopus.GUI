import { ComponentWithAs, IconProps } from "@chakra-ui/react";
import {
    ConfigIcon,
    InfoIcon,
    StatsIcon,
    HelpIcon,
    DonutIcon,
} from "../assets";

export type NavigationItem = {
    label: string;
    icon: ComponentWithAs<"svg", IconProps>;
    path: string;
};

export const NAV_ITEMS: NavigationItem[] = [
    {
        label: "Statistics",
        icon: StatsIcon,
        path: "/statistics",
    },
    {
        label: "Info",
        icon: InfoIcon,
        path: "/info",
    },
    {
        label: "Settings",
        icon: ConfigIcon,
        path: "/settings",
    },
    {
        label: "Help",
        icon: HelpIcon,
        path: "/help",
    },
    {
        label: "Administration",
        icon: DonutIcon,
        path: "/admin",
    },
];
