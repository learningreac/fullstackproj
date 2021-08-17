import { useState } from "react"
import {
    BrowserRouter as Router,
    Link, Switch, Route, useParams
} from "react-router-dom"

const Home = () => (
    <div> <h2>TKTL notes app</h2> </div>
)

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>
                        {note.content}
                    </Link>
                </li>)}
        </ul>
    </div>
)

const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(note => note.id===Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Users = () => (
    <div> <h2>Users</h2> </div>
)


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

    const padding = {
        padding: 5
    }

    return (
        <Router>
            <div>
                <Link style={padding} to='/'>home</Link>
                <Link style={padding} to='/notes'>notes</Link>
                <Link style={padding} to='/users'>users</Link>
            </div>

            <Switch>
                <Route path='/notes/:id'>
                    <Note notes={notes} />
                </Route>
                <Route path='/notes'>
                    <Notes notes={notes} />
                </Route>
                <Route path='/users'>
                    <Users />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>

            <div>
                <i>Note app</i>
            </div>
        </Router>
    )
}

export default App