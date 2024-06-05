import React from "react";
import MusicsList from "../music/MusicsList";
import {Link} from "react-router-dom";

class StylesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            items: [],
        };
    }
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://localhost:7179/api/musicStyles", true); // замените адрес
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
            return <div>Загрузка...</div>; // рисуем прелоадер
        } else if (items.length == 0) {
            return (<tr>
                <td>
                    <h3 > Стилей нет </h3>
                </td>
            </tr>); // рисуем прелоадер
        }
        else {
            return (<tbody>
                {
                    items.map(item => (
                        <tr className='tr1'>
                            <td className='td1'>{item.styleName}</td>
                            <td className='td1'>
                                {/*<Link className="a_bt2" to={"/EditStyleForm/"+item.id}>Редактировать</Link>*/}
							    <Link className="a_bt2" to={{pathname:"/EditStyleForm/"+item.id }}>Редактировать</Link>

                                <a className='editdelMusicStyle a_bt2' id={item.id}>Удалить</a>
                            </td>
                        </tr>
                    ))
                }
            </tbody >
            );
        }
    }
}
export default StylesList;