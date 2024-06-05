import React from "react";
import MusicsList from "../music/MusicsList";
import {Link} from "react-router-dom";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            items: [],
        };
    }
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://localhost:7179/api/users", true); // замените адрес
        xhr.send();
        this.setState({ isLoading: true });

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false;
            }
            if (xhr.status !== 200) {
                console.log(xhr.status + ": " + xhr.statusText);
            } else {
                console.log('tt=' + JSON.parse(xhr.responseText));
                this.setState({
                    items: JSON.parse(xhr.responseText),
                    isLoading: false,
                });
            }
        };
    }
    render() {
        const { items, isLoading } = this.state;
        if (isLoading) {
            return <div>Загрузка...</div>;
        } else if (items.length == 0) {
            return <div>Данных нет...</div>;
        }
        else {
            return (<body>
                {items.map(item => (
                    <tr className='tr1'>
                        <td className='td1'>{item.firstName}</td>
                        <td className='td1'>{item.lastName}</td>
                        <td className='td1'>{item.login}</td>
                        <td className='td1'>{item.email}</td>
                        <td className='td1'>{item.level}</td>
                        <td className='td1'>
                            <Link className="a_bt2" to={{pathname:"/EditUserForm/"+item.id }}>Редактировать</Link>
                            <a className='editdelUser a_bt2' id={item.id}>Удалить</a>
                        </td>
                    </tr>
                ))}
            </body>
            );
        }
    }
}
export default UsersList;