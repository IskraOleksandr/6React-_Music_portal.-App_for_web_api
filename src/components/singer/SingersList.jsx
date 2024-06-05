import React from "react";
import MusicsList from "../music/MusicsList";

class SingersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            items: [],
        };
    }
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://localhost:7179/api/singers", true); // замените адрес
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
                            <td className='td1'>{item.singerName}</td>
                            <td className='td1'>
                                <a className='editdelMusicStyle a_bt2' id={item.id}>Редактировать</a>
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
export default SingersList;