import React from 'react';
import { Feather } from '@expo/vector-icons';

//Components
import Header from '../../components/Header';

import {
    Container,
    SearchContainer,
    SearchButton,
    Input,
} from './styles';

interface HomeProps {
    title: string;
}

const Home: React.FC<HomeProps> = () => {
    return (
        <>
            <Container>
                <Header title="React Prime" />
                <SearchContainer>
                    <Input
                        placeholder="Ex Vingadores"
                        placeholderTextColor="#ddd"
                    />
                    <SearchButton>
                        <Feather name="search" size={30} color="#fff" />
                    </SearchButton>
                </SearchContainer>
            </Container>
        </>
    );
}

export default Home;