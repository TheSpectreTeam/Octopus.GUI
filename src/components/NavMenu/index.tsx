import { Flex, Icon, IconButton, Link, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationItem } from "../../common/navItems";
import { NAV_ITEMS } from "../../common/navItems";

const NavMenu: React.FC = () => {
    return (
        <Stack
            as={Flex}
            height={"calc(100vh - 192px)"}
            width="full"
            direction={{ base: "row", md: "column" }}
            justifyContent={{ base: "space-around", md: "center" }}
            spacing="1em"
            role='group'
        >
            <NavItems NavComponent={NavItem} items={NAV_ITEMS} />
        </Stack>
    );
};

type NavItemProps = {
    item: NavigationItem;
    index: number;
};

export const NavItem: React.FC<NavItemProps> = ({
    item,
    index,
}) => {
    const location = useLocation()
    const isActive = location.pathname === item.path;
    return (
        <Tooltip
            placement={"auto-end"}
            openDelay={300}
            label={item.label}
            key={index}
        >
            <Link key={index} as={NavLink} to={item.path} role="link">
                <IconButton
                    aria-label="Navigation"
                    variant="ghost"
                    _hover={{
                        background: "none",
                        transform: "translateY(-2px) ",
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
    items: NavigationItem[];
    NavComponent: React.FC<NavItemProps>;
};

export const NavItems: React.FC<NavItemsProps> = ({
    items,
    NavComponent = NavItem,
}) => {
    
    console.log(location)
    return (
        <>
            {items.map((item: any, index: number) => {
              
                return (
                    <NavComponent
                        key={item.label}
                        item={item}
                        index={index}
                    />
                );
            })}
        </>
    );
};

export default NavMenu;
