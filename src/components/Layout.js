import Header from "./header/Header"
import Container from '@mui/material/Container';

import { useRouter } from 'next/router'

const Layout = ({children}) => {
   const router = useRouter()

   return(
      <Container fixed>
         {router.asPath !== "/AuthPage" ? <Header/> : null}
         {children}
      </Container>
   )
}

export default Layout