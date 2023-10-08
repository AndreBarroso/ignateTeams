import 'styled-components';
import theme from '../theme'; 

declare module 'styled-components' {
  type ThemeType = typeof theme; //pegando a tipagem do theme previamente tipado

  export interface DefaultTheme extends ThemeType { } // extendendo o tema padrão do styled components com a tipagem do theme
}