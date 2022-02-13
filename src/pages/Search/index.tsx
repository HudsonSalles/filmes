import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import api, { key } from '../../services/api'

import SearchItem from '../../components/SearchItem'

import {
    Container,
    ListMovies,
} from './styles';

const Search: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isActive = true;

        async function getSearchMovie() {
            const response = await api.get('/search/movie', {
                params: {
                    query: route?.params?.name,
                    api_key: key,
                    language: 'pt-BR',
                    page: 1,
                }
            })

            if (isActive) {
                setMovie(response.data.results);
                setLoading(false);
            }
        }

        if (isActive) {
            getSearchMovie();
        }

        return () => {
            isActive = false
        }

    }, [])

    function navigateDetailsPage(item: any) {
        navigation.navigate('Detail' as never, { id: item.id } as never)
    }

    if (loading) {
        return (
            <Container></Container>
        )
    }

    return (
        <Container>
            <ListMovies
                data={movie}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <SearchItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
            />

        </Container>
    );
}

export default Search;