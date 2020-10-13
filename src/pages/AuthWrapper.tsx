import React, { ReactNode, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { API } from "../routes/API";
import { Routes } from "../routes/Routes";

export function AuthWrapper({children}: {children: JSX.Element}) {
  const [authenticated, setAuthenticated] = useState(false)
  const history = useHistory();
  const location = useLocation()

  React.useEffect(() => {
    (async () => {
      try {
        let response = await API.checkAuth()

        setAuthenticated(response.status === 204)
        console.log(children)

        if (!authenticated) {
            if (response.status === 403) {
                response = await API.refreshToken()
                
                if (response.status === 222) {
                    setAuthenticated(true)
                }
            }
            
            if (response.status === 401) {
                if (location.pathname !== Routes.public.login) 
                history.push(Routes.public.login)
            }
        }
        
      } catch (e) {}
    })();
  }, [authenticated]);


    return <>{authenticated ? <>{children}</> : <Loader />}</>
}