import { BackButton, BackIcon, Container, Logo } from './styles';

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
}

export  function Header({showBackButton}: Props) {
  return (
    <Container>
      {
        showBackButton && 
        <BackButton  onPress={() => console.log('lakala')} activeOpacity={0.2} >
            <BackIcon/>
        </BackButton>
        }
        <Logo source={logoImg}/>
    </Container>
  );
}