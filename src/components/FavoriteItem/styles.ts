import styled from "styled-components/native";

interface SizeProps {
    size: string;
}

export const Container = styled.View`
    padding: 14px;
`;

export const Title = styled.Text<SizeProps>`
    color: #fff;
    font-size: ${props => props.size}px;
    font-weight: 700;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
`;

export const Rate = styled.Text`
    color: #fff;
    font-size: 12px;
    padding-left: 4px;
`;

export const ActionContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const DetailButton = styled.TouchableOpacity`
    width: 85%;
    height: 38px;
    background-color: #a72f49;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
`;

export const DeleteButton = styled.TouchableOpacity`
    width: 15%;
    height: 30px;
    justify-content: center;
    align-items: center;
`;