import React from "react";

import { 
  Container, 
  Title 
} from './styles';

interface Props {
  
}

const MyComponent:React.FC<Props> = () => {
  return (
    <Container>
      <Title>MyComponent</Title>
    </Container>
  )
}

export default MyComponent;