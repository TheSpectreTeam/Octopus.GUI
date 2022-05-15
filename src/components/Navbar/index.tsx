import React from "react";
import {
    Avatar,
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { ThemeSwitcher } from "../../theme/ThemeSwitcher";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
    const [auth, setAuth] = React.useState(false);

    const isAuth = auth;

    const handleLogin = () => {
        setAuth(true);
    };

    const handleLogout = () => {
        setAuth(false);
    };

    return (
        <chakra.header>
            <Flex
                height={20}
                flexDir="row"
                minWidth={"min-content"}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderBottom={{ base: "1px solid", md: "none" }}
                borderColor={{
                    base: useColorModeValue("gray.200", "gray.700"),
                }}
            >
                <Flex w={"30%"}>
                    <ThemeSwitcher />
                </Flex>
                <Spacer />
                <Box>
                    <Stack align={"center"}>
                        <Heading as="h5" size={"lg"} role="heading">
                            Octopus
                        </Heading>
                    </Stack>
                </Box>
                <Spacer />
                <Box w={"30%"} mx="2em" alignItems={"center"}>
                    <Flex alignContent="center" justifyContent={"end"}>
                        {isAuth ? (
                            <HStack>
                                <Menu data-testid="profile-menu">
                                    <MenuButton
                                        as={Button}
                                        rounded={"full"}
                                        variant={"link"}
                                        backgroundSize={"md"}
                                        cursor={"pointer"}
                                        minW={"min-content"}
                                    >
                                        <Avatar size={"md"} />
                                    </MenuButton>
                                    <MenuList>
                                        <Text
                                            data-testid="user-name-label"
                                            align={"center"}
                                            role="textbox"
                                            py={3}
                                        >
                                            Administrator
                                        </Text>
                                        <MenuItem
                                            data-testid="logout-btn"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                        ) : (
                            <Button
                                onClick={handleLogin}
                                variant={"solid"}
                                colorScheme="blue"
                            >
                                Login
                            </Button>
                        )}
                    </Flex>
                </Box>
            </Flex>
        </chakra.header>
    );
};

export default Navbar;
