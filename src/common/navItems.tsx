import { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { ConfigIcon, InfoIcon, StatsIcon, HelpIcon } from "../assets";

export type NavItem = {
    label: string;
    icon: ComponentWithAs<"svg", IconProps>;
};

export const navItems: NavItem[] = [
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
