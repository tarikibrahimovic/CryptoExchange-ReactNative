import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';
import { theme } from '../../theme/index';
import { Entypo } from '@expo/vector-icons';

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-top: 16px;
`;

export default function DetailsHeader({coinId}) {
  return (
    <HeaderContainer>
        <AntDesign name="arrowleft" size={24} color={theme.colors.tertiary} />
        <Entypo name="star-outlined" size={24} color={theme.colors.tertiary} />
    </HeaderContainer>
  )
}
