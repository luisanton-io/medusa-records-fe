import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../routes/Routes'

export default class Home extends React.Component {
    render() {
        return <div>I am Home. <Link to ={Routes.private.submissions.selectList}>Submissions</Link></div>
    }
}