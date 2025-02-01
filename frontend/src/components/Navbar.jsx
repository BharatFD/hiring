
import { Link } from 'react-router-dom';


export default  function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to={'/'}>FAQ List</Link></li>
                <li><Link to={'/add'}>Add FAQ</Link></li>
            </ul>
        </nav>
    )
}