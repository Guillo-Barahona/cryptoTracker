import {Link, NavLink} from "react-router-dom"


const NavBar = () => {

    return (

        <div className="Header fixed-top">
                <div className="container px-0">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg w-100">
                            <div className="container-fluid">
                                <ul className="nav d-flex w-100 justify-content-between px-4">
                                    <li className="nav-item"><Link className="nav-link" aria-current="page" to={"/"}>Home</Link></li>
                                    <li className="nav-item"><NavLink className="nav-link" aria-current="page" to={"/blog"}>Blog</NavLink></li>
                                </ul> 
                            </div>
                        </nav>
                </div>
            </div>
        </div>

)
}

export default NavBar;