import React from 'react';
import { Ionicons } from '@expo/vector-icons'

import {
    Container,
    Banner,
    Title,
    RateContainer,
    Rate,

} from './styles';

interface SearchItemProps {
    data: any;
    navigatePage: any;
}

const SearchItem: React.FC<SearchItemProps> = ({ data, navigatePage }) => {

    function detailMovie() {
        if (data?.release_data === '') {
            alert('Filme ainda sem data');
            return;
        }
        navigatePage(data);
    }

    return (
        <Container activeOpacity={0.7} onPress={detailMovie}>
            <Banner
                resizeMethod='resize'
                source={data.poster_path ? { uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}` } : require('../../assets/not-find.jpg')}
            />

            <Title>{data?.title}</Title>

            <RateContainer>
                <Ionicons name='md-star' size={12} color='#e7a74e' />
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    );
}

export default SearchItem;