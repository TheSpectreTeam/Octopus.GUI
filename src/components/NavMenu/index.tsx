import { Flex, Icon, IconButton, Link, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { navItems, NavItem } from "../../common/navItems";

const NavMenu: React.FC = () => {
    return (
        <Stack
            as={Flex}
            height={"calc(100vh - 192px)"}
            width="full"
            direction={{ base: "row", md: "column" }}
            justifyContent={{ base: "space-around", md: "center" }}
            spacing="1em"
        >
            <NavItems NavComponent={NavItem} items={navItems} />
        </Stack>
    );
};

type NavItemProps = {
    item: NavItem;
    isActive: boolean;
    setActive: (index: number) => void;
    index: number;
};

const NavItem: React.FC<NavItemProps> = ({
    item,
    index,
    isActive,
    setActive,
}) => {
    return (
        <Tooltip
            placement={"auto-end"}
            openDelay={300}
            label={item.label}
            key={index}
        >
            <Link
                as={IconButton}
                key={index}
                size={"lg"}
                onClick={() => setActive(index)}
                aria-label="Search database"
                variant={"ghost"}
                icon={
                    <Icon
                        as={item.icon}
                        w={isActive ? "40px" : "24px"}
                        h={isActive ? "40px" : "24px"}
                        style={{ transition: "0.5s" }}
                        color={isActive ? "blue.400" : "grey.400"}
                    />
                }
            />
        </Tooltip>
    );
};

export type NavItemsProps = {
    items: NavItem[];
    NavComponent: React.FC<NavItemProps>;
};

const NavItems: React.FC<NavItemsProps> = ({
    items,
    NavComponent = NavItem,
}) => {
    const [active, setActive] = React.useState<number>(0);
    return (
        <>
            {items.map((item: any, index: number) => {
                const isActive = active === index;
                return (
                    <NavComponent
                        key={index}
                        item={item}
                        index={index}
                        isActive={isActive}
                        setActive={setActive}
                    />
                );
            })}
        </>
    );
};

export default NavMenu;
