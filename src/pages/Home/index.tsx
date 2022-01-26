import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native'

//components
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

//services
import api, { key } from '../../services/api';
import { getListMovies } from '../../utils/movie'

import {
    Container,
    SearchContainer,
    SearchButton,
    Input,
    Title,
    BannerButton,
    Banner,
    SliderMovie,
} from './styles';

interface HomeProps {
    title: string;
    data: [{}];
}

const Home: React.FC<HomeProps> = () => {

    const [nowMovies, setNowMovies] = useState([1]);
    const [popularMovies, setPopularMovies] = useState([1]);
    const [topMovies, setTopMovies] = useState([1]);

    useEffect(() => {
        let isActive = true;

        async function getMovies() {

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),

                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])

            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(5, popularData.data.results);
            const topList = getListMovies(10, topData.data.results);

            console.log('nowData', nowData.data.results)

            setNowMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);
        }

        getMovies();
    }, [])

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

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>Em cartaz</Title>

                    <BannerButton
                        activeOpacity={0.9} onPress={() => alert('Teste')}
                    >
                        <Banner
                            resizeMethod="resize"
                            source={{ uri: 'https://images.unsplash.com/photo-1602461601079-fb03b7b35e61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }}
                        />
                    </BannerButton>

                    <SliderMovie
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={nowMovies}
                        renderItem={({ item }: any) => <SliderItem data={item} />}
                        keyExtractor={(item: any) => String(item.id)}
                    />

                    <Title>Populares</Title>

                    <SliderMovie
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={popularMovies}
                        renderItem={({ item }: any) => <SliderItem data={item} />}
                        keyExtractor={(item: any) => String(item.id)}
                    />

                    <Title>Mais votados</Title>

                    <SliderMovie
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={topMovies}
                        renderItem={({ item }: any) => <SliderItem data={item} />}
                        keyExtractor={(item: any) => String(item.id)}
                    />

                </ScrollView>
            </Container>
        </>
    );
}

export default Home;