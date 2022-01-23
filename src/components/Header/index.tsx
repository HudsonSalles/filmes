import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    MenuButton,
    Title
} from './styles';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const navigation: any = useNavigation();

    return (
        <Container>
            <MenuButton onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={36} color="#fff" />
            </MenuButton>
            <Title>
                {title}
            </Title>
        </Container>
    );
}

export default Header;