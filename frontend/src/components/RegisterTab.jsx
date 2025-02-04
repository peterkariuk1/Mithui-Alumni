import '../styles/Pages.css';
import {Link} from 'react-router-dom';

export function RegisterTab (){
    return(
        <div className="get-started">
            <p>Join the Journey</p>
            <Link  to='/register' style={{textDecoration:'none'}}>
            <button>
                Register
            </button>
            </Link>
        </div>
    )
}