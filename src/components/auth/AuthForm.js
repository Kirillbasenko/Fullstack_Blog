import { useRouter } from 'next/router'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"
import { useRef } from 'react';

import { registration, login } from '../../http/userApi';
import { setIsAuth, setUser, setUserId } from "../../store/slices/userSlice";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';

import styles from "../../styles/auth.module.scss"

const AuthForm = ({position}) => {
   const dispatch = useDispatch();
   const error = useRef("")
   const router = useRouter()
   console.log(position);

   const click = async () => {
      console.log(3);
      try{
         let data
         if(!position){
            data = await login(formik.values.email, formik.values.password)
            console.log(1);
         }else{
            data = await registration(
               formik.values.email, 
               formik.values.password, 
               formik.values.name.length !== 0 ? formik.values.name : formik.values.email.substring(0, formik.values.email.indexOf("@")))
         }
         console.log(2);
         localStorage.setItem("user", JSON.stringify(data._id))
         localStorage.setItem("token", JSON.stringify(data.token))
         dispatch(setIsAuth(data.token))
         dispatch(setUser(data))
         router.push("/")
      }catch(e){
         error.current.style.display = "block"
      }
   }

   const formik = useFormik({
      initialValues:{
         email: "",
         password: "",
         name: ""
      },
      validationSchema: Yup.object({
         email: Yup.string()
                  .email("Неправильна адреса")
                  .required("Обов'язкове поле"),
         password: Yup.string()
                  .required("Обов'язкове поле"),
      }),
      onSubmit: click
   })

   return(
      <Box sx={{position: "absolute", width: "50%", top: 0, right: 0,transition: "transform 1s", transform: position ? "translateX(-100%)" : "translateX(0)"}}>
         <form onSubmit={formik.handleSubmit}>
            <CardMedia
               className={styles.background}
               component="img"
               image="/logo-no-background.jpg"
               alt="green iguana"/>
            <Box className={styles.content}>
               <Typography className={styles.title} sx={{marginBottom: "30px"}} variant='h4'>{position ? "Register" :  "Login"}</Typography>
               {position ? 
                  <TextField 
                     className={styles.input} 
                     sx={{marginBottom: "20px"}}
                     error={formik.errors.name && formik.touched.name}
                     value={formik.values.name} 
                     name="name"
                     helperText={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange} 
                     label="Name" 
                     variant="filled" /> : null}
               <TextField 
                  className={styles.input} 
                  sx={{marginBottom: "20px"}}
                  error={formik.errors.email && formik.touched.email}
                  value={formik.values.email} 
                  name="email"
                  helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} 
                  label="Email" 
                  variant="filled" />
               <TextField 
                  className={styles.input} 
                  sx={{marginBottom: "20px"}}
                  error={formik.errors.password && formik.touched.password}
                  label="Password" 
                  onChange={formik.handleChange} 
                  value={formik.values.password} 
                  name="password" 
                  type="password"
                  helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                  onBlur={formik.handleBlur}
                  variant="filled" />
               
               <Button type='submit' className={styles.button} variant="contained"> {position ? "sing up" : "sing in"}</Button>
               <div 
                  style={{display: "none", color: "red"}} 
                  ref={error} 
                  className="not-user">
                  {position ? "Користувач із таким Email вже зареєстрований" : "Користувач не знайдений"}
               </div>
            </Box>
         </form>
      </Box>
   )
}

export default AuthForm