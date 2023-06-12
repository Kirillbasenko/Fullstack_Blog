import Header from "./header/Header"
import Container from '@mui/material/Container';

import { useRouter } from 'next/router'

const Layout = ({children}) => {
   const router = useRouter()


   console.log(router.asPath);

   return(
      <Container>
         {router.asPath !== "/AuthPage" && router.asPath !== "/" ? <Header/> : null}
         {children}
      </Container>
   )
}

export default Layout