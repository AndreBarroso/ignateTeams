import { useNavigation } from '@react-navigation/native';
import { BackButton, BackIcon, Container, Logo } from './styles';

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
}

export  function Header({showBackButton}: Props) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {
        showBackButton && 
        <BackButton  onPress={handleGoBack} activeOpacity={0.2} >
            <BackIcon/>
        </BackButton>
        }
        <Logo source={logoImg}/>
    </Container>
  );
}