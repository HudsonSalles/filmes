import React from 'react';

import { BackButton, Name } from './styles';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

interface ModalProps {
    link: string;
    title: string;
    closeModal: () => void;
}

const ModalLink: React.FC<ModalProps> = ({ link, title, closeModal }) => {
    return (
        <>
            <BackButton onPress={closeModal}>
                <Feather name='x' size={35} color="#fff" />
                <Name numberOfLiner={1}>{title}</Name>
            </BackButton>

            <WebView
                source={{ uri: link }}
            />
        </>
    );
}

export default ModalLink;