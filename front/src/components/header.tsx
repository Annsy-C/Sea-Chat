import { Container, Text } from '@nextui-org/react';
import React from 'react';

const Header = () => (
    <Container>
        <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $cyan700 -20%, $blue300 50%",
        }}
        weight="bold"
      >
        Sea Chat
      </Text>
    </Container>
);

export default Header;
