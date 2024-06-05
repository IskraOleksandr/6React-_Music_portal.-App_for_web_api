import React from "react";

class MusicsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            items: [],
        };
    }
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://localhost:7179/api/musics", true); // замените адрес
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
            return <h3 className='dv1v' > Песен нет </h3>; // рисуем прелоадер
        }
        else {
            return (
                <div>
                    {
                        items.map(item => (
                            <><br /><br /><div class='div_m1'>
                                <div class='div_mess div_m2'>
                                    <h1 class='h1_m'>{item.video_Name}({item.year})</h1>
                                    <video controls loop class='video'>
                                        <source src={item.video_URL} type='video/webm' />
                                    </video>
                                </div>
                                <div class='div_m3'>
                                    <h2>{item.video_Name}({item.year})</h2>
                                    <p>Исполнитель: {item.singer.singerName}</p>
                                    <p>Альбом: {item.album}</p>
                                    <p>Стиль: {item.musicStyle.styleName}</p>
                                    <p>Дата публикации: {item.videoDate}</p>
                                    <a class='editdelMusic a_bt' id={item.id}>Редактировать</a>
                                    <a class='editdelMusic a_bt' id={item.id}>Удалить</a>
                                </div>
                            </div><br /><br /><br /></>
                        ))
                    }
                </div>
            );
        }
    }
}
export default MusicsList;