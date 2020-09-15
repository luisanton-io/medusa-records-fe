import Login from '../components/public/Login'
import Home from '../components/public/Home'
import Submit from '../components/public/Submit'
import SelectSubsList from '../components/private/SelectSubsList'
import Submissions from '../components/private/Submissions'
import { RouteProps } from 'react-router-dom'

class SubmissionsRoutes { 
    selectList = "/submissions"
    pending    = this.selectList + "/pending"
    accepted   = this.selectList + "/accepted"
    rejected   = this.selectList + "/rejected"
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
    },
    {
        path: Routes.private.submissions.selectList,
        component: SelectSubsList,
        exact: true
    },
    {
        path: [
            Routes.private.submissions.pending,
            Routes.private.submissions.accepted,
            Routes.private.submissions.rejected,
        ],
        component: Submissions,
        exact: true
    }
]