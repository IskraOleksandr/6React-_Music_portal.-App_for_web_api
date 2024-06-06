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
            return (<body>
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
            </body>
            );
        }
    }
}
export default UsersList;