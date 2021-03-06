import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import api, { key } from '../../services/api';
import Stars from 'react-native-stars';
import Genres from '../../components/Genres';
import { ScrollView, Modal } from 'react-native';
import ModalLink from '../../components/ModalLink';

import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage';

import {
    Container,
    Header,
    HeaderButton,
    Banner,
    ButtonLink,
    Title,
    ContentArea,
    Rate,
    ListGenres,
    Description,
}
    from './styles';

interface DetailProps {
    data: any;
    link: string;
    title: string;
}

const Detail: React.FC<DetailProps> = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState<any>({});
    const [openLink, setOpenLink] = useState<boolean>(false);
    const [favoritedMovie, setFavoritedMovie] = useState<boolean>(false);

    useEffect(() => {
        let isActive = true;

        async function getMovie() {

            const response = await api.get(`/movie/${route.params?.id}`, {
                params: {
                    api_key: key,
                    language: 'pt-BR',
                }
            })
                .catch((err) => {
                    console.log(err)
                })

            if (isActive) {
                setMovie(response.data);

                const isFavorite = await hasMovie(response.data)
                setFavoritedMovie(isFavorite)
            }
        }

        if (isActive) {
            getMovie();
        }

        return () => {
            isActive = false;
        }
    }, [])

    async function handleFavoriteMovie(movie) {

        if (favoritedMovie) {
            await deleteMovie(movie.id);
            setFavoritedMovie(false);
            alert('Filme removido da lista')
        } else {

            await saveMovie('@primereact', movie)
            setFavoritedMovie(true);
            alert('filme salvo na lista')
        }
    }

    return (
        <Container>
            <Header>
                <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' size={28} color="#fff" />
                </HeaderButton>
                <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
                    <Ionicons name={favoritedMovie ? 'bookmark' : 'bookmark-outline'} size={28} color="#fff" />
                </HeaderButton>
            </Header>

            <Banner
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
            />

            <ButtonLink onPress={() => setOpenLink(true)}>
                <Feather name='link' size={24} color="#fff" />
            </ButtonLink>

            <Title numberOfLines={2}>{movie?.title}</Title>

            <ContentArea>
                <Stars
                    default={movie?.vote_average}
                    count={10}
                    half={true}
                    starsize={20}
                    fullStar={<Ionicons name='md-star' size={20} color="#e7a74e" />}
                    emptyStar={<Ionicons name='md-star-outline' size={20} color="#e7a74e" />}
                    halfStar={<Ionicons name='md-star-half' size={20} color="#e7a74e" />}
                    disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>

            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item: any) => String(item.id)}
                renderItem={({ item }: any) => <Genres data={item} />}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Title>Descri????o</Title>
                <Description>
                    {movie?.overview}
                </Description>
            </ScrollView>

            <Modal
                animationType='slide'
                transparent={true}
                visible={openLink}
            >
                <ModalLink
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
        </Container>
    );
}

export default Detail;