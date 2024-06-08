import {NavLink} from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? " active" : "");
function Nav() {
    return (
        <nav className='my_nav'>
            <NavLink to="/musics" className={setActive}>
                Музыкальный портал
            </NavLink>
            <NavLink to="/CreateMusicForm" className={setActive}>
                Добавить клип
            </NavLink>
            <NavLink to="/styles" className={setActive}>
                Стили
            </NavLink>
            <NavLink to="/users" className={setActive}>
                Все участники
            </NavLink>
            <NavLink to="/singers" className={setActive}>
                Исполнители
            </NavLink>
        </nav>
    );
}
export default Nav;