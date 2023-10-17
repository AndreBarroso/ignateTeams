import { NavigationContainer } from '@react-navigation/native' //usando o core de navegação
import { AppRoutes } from './app.routes'

export function Routes() {
    return (
        <NavigationContainer> {/*Compartilhar pra toda aplicação, as rotas*/}
            <AppRoutes/>
        </NavigationContainer>

    )
}