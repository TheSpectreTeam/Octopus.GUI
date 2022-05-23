import React from "react";
import { Flex, Icon, IconButton, Link, Stack, Tooltip } from "@chakra-ui/react";

import { NavLink, useLocation } from "react-router-dom";
import { Route, Routes, ROUTES } from "../../routes";

const NavMenu: React.FC = () => {
    return (
        <Stack
            as={Flex}
            height={"calc(100vh - 192px)"}
            width="full"
            direction={{ base: "row", md: "column" }}
            justifyContent={{ base: "space-around", md: "center" }}
            spacing="1em"
            role="group"
        >
            <NavItems NavComponent={NavItem} items={ROUTES} />
        </Stack>
    );
};

type NavItemProps = {
    item: Route;
    index: number;
};

export const NavItem: React.FC<NavItemProps> = ({ item, index }) => {
    
    const location = useLocation();
    const isActive = location.pathname === item.pathname;

    return (
        <Tooltip
            placement={"auto-end"}
            openDelay={300}
            label={item.title}
            key={index}
        >
            <Link key={index} as={NavLink} to={item.pathname} role="link">
                <IconButton
                    aria-label="Navigation"
                    variant="ghost"
                    _hover={{
                        background: "none",
                        transform: "translateY(-2px)",
                    }}
                    _focus={{ background: "none" }}
                    _active={{ background: "none" }}
                    icon={
                        <Icon
                            as={item.icon}
                            w={isActive ? "40px" : "24px"}
                            h={isActive ? "40px" : "24px"}
                            style={{ transition: "0.5s" }}
                            color={isActive ? "blue.400" : "grey.400"}
                        />
                    }
                ></IconButton>
            </Link>
        </Tooltip>
    );
};

export type NavItemsProps = {
    items: Routes;
    NavComponent: React.FC<NavItemProps>;
};

export const NavItems: React.FC<NavItemsProps> = ({
    items,
    NavComponent = NavItem,
}) => {
    return (
        <>
            {Object.values(items).map((item: Route, index: number) => {
                return <NavComponent key={index} item={item} index={index} />;
            })}
        </>
    );
};

export default NavMenu;
