import React from "react";
import axios from "axios";
import withRouter from '../withRouter';
import {Navigate, useNavigate} from "react-router-dom";

class DeleteMusicForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props.params.id);
        let musicId = this.props.params.id;
        this.videoRef = React.createRef();

        this.state = {
            submitted:false,
            musicId: musicId,
            videoName: '',
            album: '',
            year: 0,
            videoURL: '',
            styleName: '',
            singerName: '',
            videoDate:0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/musics/" + this.state.musicId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            this.setState({
                musicId: response.data.id,
                videoName: response.data.video_Name,
                album: response.data.album,
                year: response.data.year,
                videoURL: response.data.video_URL,

                styleName: response.data.musicStyle.styleName,
                singerName: response.data.singer.singerName,
                videoDate:response.data.videoDate,
            });
            this.videoRef.current?.load();
            console.log('/'+this.state.videoURL);
        }).catch(function (error) {
            alert(error);
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        axios({
            url: "https://localhost:7179/api/musics/" + this.state.musicId,
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).catch(function (error) {
            alert(error);
        });
        setInterval(() => this.setState({submitted: true}),1000);
    }

    render() {
        return (
            <div>
                <br/> <br/><h4  className="h1_n">Удаление песни?</h4>
                <h5  className="h1_n">Вы действительно желаете удалить песню?</h5>
                <div className="div_m1">
                    <div class="div_mess div_m2">
                        <h1 id="vid_nam_year" className="h1_m">{this.state.videoName} ({this.state.year})</h1>
                        <video ref={this.videoRef} id="video_source" controls loop className="video">
                            <source src={this.state.videoURL} type="video/webm"/>
                        </video>
                    </div>
                    <div className="div_m3">
                        <h2 id="vid_nam_year1">{this.state.videoName}({this.state.year})</h2>
                        <p id="p_singer">Исполнитель: {this.state.singerName}</p>
                        <p id="p_alb">Альбом: {this.state.album}</p>
                        <p id="p_mus_style">Стиль:{this.state.styleName}</p>
                        <p id="p_date_pub">Дата публикации: {this.state.videoDate}</p>
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" id="mus_del_Id"/>
                            <div className="div_subm">
                                <input className="input_subm_del1" type="submit" value="Удалить"/>
                            </div>
                        </form>
                    </div>
                </div>
                <br/> <br/> <br/>
                {this.state.submitted && <Navigate to="/musics" />}
            </div>
        );
    }
}

export default withRouter(DeleteMusicForm);