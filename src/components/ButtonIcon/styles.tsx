import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";

import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconStyleProps = 'PRIMARY' | 'SECONDARY'

export type Props = {
    type: ButtonIconStyleProps
}

export const Container = styled(TouchableOpacity)`
    

    max-height: 56px;
    min-height: 56px;

    justify-content: center;
    align-items: start;
    margin-left: 12px;
    margin-right: 12px;
`

export const Icon = styled(MaterialIcons).attrs<Props>(({theme, type}) => ({
    
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``
