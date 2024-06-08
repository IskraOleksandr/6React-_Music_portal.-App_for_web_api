import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class StylesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [],};
    }

    componentDidMount() {
        axios({
            url: 'https://localhost:7179/api/musicStyles',
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
            return (<div>Стилей нет </div>);
        } else {
            return (<table className='table1'>
                    <thead>
                    <tr>
                        <th className='th1'> Название стиля</th>
                        <th className='th1'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.map(item => (
                            <tr className='tr1'>
                                <td className='td1'>{item.styleName}</td>
                                <td className='td1'>
                                    <Link className="a_bt2"
                                          to={{pathname: "/EditStyleForm/" + item.id}}>Редактировать</Link>
                                    <Link className="a_bt2"
                                          to={{pathname: "/DeleteStyleForm/" + item.id}}>Удалить</Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            );
        }
    }
}

export default StylesList;