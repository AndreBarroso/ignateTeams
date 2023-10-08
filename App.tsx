import {ThemeProvider} from 'styled-components'
import {ActivityIndicator} from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto" // npm install expo-font @expo-google-fonts/roboto
import { Groups } from '@screens/groups';
import theme from '@theme/index'
export default function App() {

  const [ fontsLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold }) // variavel que vai para true quando as fontes são carregadas

  return (
    <ThemeProvider theme={theme}>
     { fontsLoaded  ? <Groups /> : <ActivityIndicator/>}
    </ThemeProvider>
  );
}
