import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import {
    Container,
    ListMovies,
} from './styles';

import FavoriteItem from '../../components/FavoriteItem'

import { getMoviesSave, deleteMovie } from '../../utils/storage';

function Movies() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [movies, setMovies] = useState<any>([]);

    useEffect(() => {
        let isActive = true;

        async function getFavoriteMovies() {
            const result = await getMoviesSave('@primereact');

            if (isActive) {
                setMovies(result);
            }
        }

        if (isActive) {
            getFavoriteMovies();
        }

        return () => {
            isActive = false;
        }

    }, [isFocused])

    async function handleDelete(id: number) {
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailsPage(item: any) {
        navigation.navigate('Detail', { id: item.id })
    }

    return (
        <Container>
            <Header title='Meus filmes' />

            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <FavoriteItem deleteMovie={handleDelete} navigatePage={() => navigateDetailsPage(item)} data={item} />}
            />
        </Container>
    );
}

export default Movies;