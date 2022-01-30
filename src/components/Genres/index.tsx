import React from 'react';

import {
    Container,
    Name,
}
    from './styles';

interface GenresProps {
    data: any;
}

const Genres: React.FC<GenresProps> = ({ data }) => {
    return (
        <Container>
            <Name>
                {data.name}
            </Name>
        </Container>
    );
}

export default Genres;