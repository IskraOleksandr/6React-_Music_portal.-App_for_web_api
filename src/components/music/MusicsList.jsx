import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class MusicsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [],};
    }
    componentDidMount() {
        axios({
            url: 'https://localhost:7179/api/musics',
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
            return <h3 className='dv1v'> Песен нет </h3>;
        } else {
            return (
                <div>
                    {
                        this.state.items.map(item => (
                            <><br/><br/>
                                <div className='div_m1'>
                                    <div className='div_mess div_m2'>
                                        <h1 className='h1_m'>{item.video_Name}({item.year})</h1>
                                        <video controls loop className='video'>
                                            <source src={item.video_URL} type='video/webm'/>
                                        </video>
                                    </div>
                                    <div className='div_m3'>
                                        <h2>{item.video_Name}({item.year})</h2>
                                        <p>Исполнитель: {item.singer.singerName}</p>
                                        <p>Альбом: {item.album}</p>
                                        <p>Стиль: {item.musicStyle.styleName}</p>
                                        <p>Дата публикации: {item.videoDate}</p>
                                        <Link className="a_bt"
                                              to={{pathname: "/EditMusicForm/" + item.id}}>Редактировать</Link>
                                        <Link className="a_bt"
                                              to={{pathname: "/DeleteMusicForm/" + item.id}}>Удалить</Link>
                                    </div>
                                </div>
                                <br/><br/><br/></>
                        ))
                    }
                </div>
            );
        }
    }
}

export default MusicsList;