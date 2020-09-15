import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

export default class Submissions extends React.Component<RouteComponentProps, {}> {
    render() {
        const listName = String(this.props.history.location.pathname).split("/").pop()
        return <div>I am Submissions: { listName }</div>
    }
}