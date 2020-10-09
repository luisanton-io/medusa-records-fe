import React from 'react'
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core'
import { ReleaseData } from '../../models/Release'
import { API } from '../../routes/API'
import { ArrowDownwardSharp as ArrowDown } from '@material-ui/icons';
import uniqid from 'uniqid'
import MedusaHeader from '../../components/MedusaHeader'
import { Link } from 'react-router-dom'
import '../../styles/Home.scss'
import { Routes } from '../../routes/Routes'
import { Copyright } from './Login';

interface HomeState {
    releases: ReleaseData[]
}

export default class Home extends React.Component<{}, HomeState> {

    state: HomeState = {
        releases: []
    }

    componentDidMount = () => {
        this.getReleases()
    }

    getReleases = async () => {
        const response = await API.releases.home
        const releases = response.status === 200
            ? (await response.json())
            : []

        this.setState({ releases })
    }

    render() {
        return <>
            <Grid container id='home'>
                <AppBar position="fixed" className="bg-transparent text-white-50">
                    <Toolbar style={{background: 'rgba(18,18,18,0.8)'}}>
                        <Link to={Routes.public.submit} className='ml-auto'>
                            <Button color="inherit">
                                Submit Your Release
                            </Button>
                        </Link>
                        <Link to={Routes.public.login}>
                            <Button color="inherit">Staff Login</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                {/* I am Home. <Link to ={Routes.private.submissions.selectList}>Submissions</Link> */}
                <Grid item xs={10} className='mx-auto d-flex flex-column'>

                    <Grid item xs={12} md={5} className='d-flex flex-column justify-content-center mx-auto' style={{ minHeight: '100vh' }}>
                        <div className='bg-circle'></div>
                        <img className="w-50 img-fluid mx-auto blurring" src="/assets/medusa-original.png" alt="medusa-logo" />
                        <MedusaHeader />
                        <Typography component="h5" variant="h5" className="mt-5 ml-auto" style={{
                            fontWeight: 800,
                            fontFamily: "Circular"
                        }}>
                            <ArrowDown />See our releases.
                    </Typography>
                    </Grid>
                    <Grid container className="mb-5">
                        {
                            this.state.releases.length > 0 &&
                            this.state.releases.map(release =>
                                <Grid item xs={12} md={4} key={uniqid()}>
                                    <a href={'https://www.google.com'}>
                                        <img className='img-fluid px-1' src={release.coverURL!} alt={release.title}/>
                                    </a>
                                </Grid>
                            )
                        }
                    </Grid>
                    <Copyright />
                </Grid>
            </Grid>
        </>
    }
}