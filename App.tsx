import {ThemeProvider} from 'styled-components'

import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto" // npm install expo-font @expo-google-fonts/roboto
import { Groups } from '@screens/groups';
import theme from '@theme/index'
import { Loading } from '@components/Loading/indext';
import { StatusBar } from 'react-native';

export default function App() {

  const [ fontsLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold }) // variavel que vai para true quando as fontes são carregadas

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
     { fontsLoaded  ? <Groups /> : <Loading/>}
    </ThemeProvider>
  );
}
