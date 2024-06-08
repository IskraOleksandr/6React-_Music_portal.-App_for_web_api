import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [],};
    }
    componentDidMount() {
        axios({
            url: 'https://localhost:7179/api/users',
            method: 'get',
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                if (response.status == 200) {
                    this.setState({items: response.data})
                }
            });
    }
    render() {
        if (this.state.items.length == 0) {
            return <div>Данных нет...</div>;
        }
        else {
            return (<table className='table1'>
                <thead>
                <tr>
                    <th className='th2'>Имя</th>
                    <th className='th2'>Фамилия</th>
                    <th className='th2'>Логин</th>
                    <th className='th2'>Email</th>
                    <th className='th2'>Уровень доступа</th>
                    <th className="th2"></th>
                </tr>
                </thead><tbody>
                {this.state.items.map(item => (
                    <tr className='tr1'>
                        <td className='td1'>{item.firstName}</td>
                        <td className='td1'>{item.lastName}</td>
                        <td className='td1'>{item.login}</td>
                        <td className='td1'>{item.email}</td>
                        <td className='td1'>{item.level}</td>
                        <td className='td1'>
                            <Link className="a_bt2" to={{pathname:"/EditUserForm/"+item.id }}>Редактировать</Link>
                            <Link className="a_bt2" to={{pathname:"/DeleteUserForm/"+item.id }}>Удалить</Link>
                        </td>
                    </tr>
                ))}
                </tbody></table>
            );
        }
    }
}
export default UsersList;