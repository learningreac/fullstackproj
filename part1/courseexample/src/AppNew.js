import { useState } from "react"
import {
    Link, Switch, Route, useParams, useHistory, Redirect, useRouteMatch
} from "react-router-dom"
import { Table, Form, Button } from 'react-bootstrap'

const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
    </div>
)

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <Table striped>
            <tbody>
                {notes.map(note =>
                    <tr key={note.id}>
                        <td>
                            <Link to={`/notes/${note.id}`}>
                                {note.content}
                            </Link>
                        </td>
                        <td>
                            {note.user}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
)

const Note = ({ note }) => {
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Users = () => (
    <div>
        <h2>Users</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    const history = useHistory()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin(event.target.username.value)
        history.push('/')
    }

    console.log('login page')
    return (
        <div>
            <h2>login</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                    />
                    <Button variant="primary" type="submit">
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only Javascript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])


    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }

    const match = useRouteMatch('/notes/:id')
    const note = match
        ? notes.find(note => note.id === Number(match.params.id))
        : null

    return (
        <div className='container'>
            <div>
                <Link style={padding} to='/'>home</Link>
                <Link style={padding} to='/notes'>notes</Link>
                <Link style={padding} to='/users'>users</Link>
                {user
                    ? <em>{user} logged in</em>
                    : <Link style={padding} to='/login'>login</Link>
                }
            </div>

            <Switch>
                <Route path='/notes/:id'>
                    <Note note={note} />
                </Route>
                <Route path='/notes'>
                    <Notes notes={notes} />
                </Route>
                <Route path='/users'>
                    {user ? <Users /> : <Redirect to='/login' />}
                </Route>
                <Route path='/login'>
                    <Login onLogin={login} />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>

            <div>
                <i>Note app</i>
            </div>
        </div>
    )
}

export default App