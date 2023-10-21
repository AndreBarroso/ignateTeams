import { NavigationContainer } from '@react-navigation/native' //usando o core de navegação
import { AppRoutes } from './app.routes'
import { View } from 'react-native'
import { useTheme } from 'styled-components'

export function Routes() {
    const { COLORS } = useTheme() 

    //Adicionando view para não aparecer tela branca entre as trasições de tela
    return (
        <View style={{flex: 1, backgroundColor: COLORS.GRAY_600}}>
            <NavigationContainer> 
                <AppRoutes/>
            </NavigationContainer>
        </View>
    )
}