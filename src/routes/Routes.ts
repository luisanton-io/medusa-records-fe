import { RouteComponentProps, RouteProps } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import Submit from '../components/Submit'

class SubmissionsRoutes { 
    root = "/submissions"
    pending = this.root + "/pending"
    accepted = this.root + "/accepted"
    rejected = this.root + "/rejected"
}

export class Routes {
    static readonly public = {
        home: "/",
        login: "/login",
        submit: "/submit"
    }

    static readonly private = {
        submissions: new SubmissionsRoutes()
    }
}

export const routeProps: RouteProps[] = [
    {
        path: Routes.public.home,
        component: Home,
        exact: true
    },
    {
        path: Routes.public.login,
        component: Login,
        exact: true
    },
    {
        path: Routes.public.submit,
        component: Submit,
        exact: true
    }
]