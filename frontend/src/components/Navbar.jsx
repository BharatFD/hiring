import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ backgroundColor: '#fff', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
                <li>
                    <Link to={'/'} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>FAQ List</Link>
                </li>
                <li>
                    <Link to={'/add'} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Add FAQ</Link>
                </li>
            </ul>
        </nav>
    );
}