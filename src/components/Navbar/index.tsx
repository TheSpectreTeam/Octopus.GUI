import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

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
    <Box>
      <Flex
        height={20}
        flexDir="row"
        minWidth={"min-content"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex />
        <Box>
          <Heading role="heading">Octopus</Heading>
        </Box>
        <Box width={"400px"} mx="2em" alignItems={"center"}>
          <Flex alignContent="center" justifyContent={"center"}>
            {isAuth ? (
              <Button
                onClick={handleLogout}
                variant={"solid"}
                colorScheme="blue"
              >
                Logout
              </Button>
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
    </Box>
  );
};

export default Navbar;
