import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//components
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

//services
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie'

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
    const [bannerMovie, setBannerMovie] = useState<any>({});
    const [input, setInput] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);

    const navigation = useNavigation();

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

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

            if (isActive) {
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(5, popularData.data.results);
                const topList = getListMovies(10, topData.data.results);

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);
                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);

                setLoading(false);
            }
        }

        getMovies();

        return () => {
            isActive = false;
            ac.abort();
        }
    }, [])

    function navigateDetailsPage(item: any) {
        navigation.navigate('Detail' as never, { id: item.id } as never)
    }

    function handleSearchMovie() {

        if (input === '') return;
        navigation.navigate('Search' as never, { name: input } as never)
        setInput('');
    }

    return (
        <>
            {!loading ? (
                <Container>
                    <Header title="React Prime" />
                    <SearchContainer>
                        <Input
                            placeholder="Ex Vingadores"
                            placeholderTextColor="#ddd"
                            value={input}
                            onChangeText={(text) => setInput(text)}
                        />
                        <SearchButton onPress={handleSearchMovie}>
                            <Feather name="search" size={30} color="#fff" />
                        </SearchButton>
                    </SearchContainer>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Title>Em cartaz</Title>

                        <BannerButton
                            activeOpacity={0.9} onPress={() => navigateDetailsPage(bannerMovie)}
                        >
                            <Banner
                                resizeMethod="auto"
                                source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                            />
                        </BannerButton>

                        <SliderMovie
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={nowMovies}
                            renderItem={({ item }: any) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
                            keyExtractor={(item: any) => String(item.id)}
                        />

                        <Title>Populares</Title>

                        <SliderMovie
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={popularMovies}
                            renderItem={({ item }: any) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
                            keyExtractor={(item: any) => String(item.id)}
                        />

                        <Title>Mais votados</Title>

                        <SliderMovie
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={topMovies}
                            renderItem={({ item }: any) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
                            keyExtractor={(item: any) => String(item.id)}
                        />

                    </ScrollView>
                </Container>
            ) : (
                <Container style={{ justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#fff" />
                </Container>
            )}
        </>
    );
}

export default Home;