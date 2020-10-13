import Login from '../pages/public/Login'
import Home from '../pages/public/Home'
import Submit from '../pages/public/Submit'
import Submissions from '../pages/private/submissions'
import SelectSubsList from '../pages/private/submissions/Selection'
import { RouteProps } from 'react-router-dom'
import NotFound from '../pages/NotFound'

class SubmissionsRoutes { 
    selectList = "/submissions"
    pending    = `${this.selectList}/pending`
    accepted   = `${this.selectList}/accepted`
    rejected   = `${this.selectList}/rejected`
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

type _RouteProps = RouteProps & {private?: boolean}

export const routeProps: _RouteProps[] = [
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
    },
    {
        path: Routes.private.submissions.selectList,
        component: SelectSubsList,
        exact: true,
        private: true
    },
    {
        path: [
            Routes.private.submissions.pending,
            Routes.private.submissions.accepted,
            Routes.private.submissions.rejected,
        ],
        component: Submissions,
        exact: true,
        private: true
    },
    {
        component: NotFound //404
    }
]