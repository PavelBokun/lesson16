import React, { useEffect, useLayoutEffect } from "react";
import "./App.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useAppDispatch, useAppSelector } from "./store";
import { RequestStatusType } from "./app-reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Menu } from "@mui/icons-material";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/login";
import { logoutTC, meTC } from "../components/login/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

function App() {
    
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized);
  const isLoggedIn=useAppSelector((state)=>state.auth.isLoggedIn)
  const dispatch= useAppDispatch()
//   useEffect(()=>{
//     dispatch(meTC())
//   },[])
const logOutHandler=()=>{
    dispatch(logoutTC())
}
useLayoutEffect(()=>{
    dispatch(meTC())
},[])

if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
    </div>
 }
 
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          { (isLoggedIn)&&<Button color="inherit" onClick={logOutHandler}>LogOut</Button>}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={'404'} element={<h1 style={{textAlign:'center'}} >Error 404: Page not Found</h1>} />
          <Route path={"/"} element={<Navigate to= {'404'} />} />

        </Routes>
      </Container>
    </div>
  );
}

export default App;
