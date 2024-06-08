import React from "react";
import axios from "axios";
import withRouter from '../withRouter';
import {Navigate} from "react-router-dom";

class EditMusicForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props:', this.props.params.id);
        let musicId = this.props.params.id;

        let videoName = '';
        let videoNameIsValid = this.validateVideoName(videoName);

        let album = '';
        let albumIsValid = this.validateAlbum(album);

        let year = 0;
        let yearIsValid = this.validateYear(year);

        let styleId = 0;
        let styleIdIsValid = this.validateStyleId(styleId);

        let singerId = 0;
        let singerIdIsValid = this.validateSingerId(singerId);


        this.state = {
            submitted:false,
            musicId: musicId,
            videoName: videoName,
            album: album,
            year: year,
            videoURL: null,
            styleId: styleId,
            singerId: singerId,

            videoNameValid: videoNameIsValid,
            albumValid: albumIsValid,
            yearValid: yearIsValid,
            videoURLValid: false,
            styleIdValid: styleIdIsValid,
            singerIdValid: singerIdIsValid,
            styleOptions: [],
            singerOptions: [],
        };

        this.onVideoNameChange = this.onVideoNameChange.bind(this);
        this.onAlbumChange = this.onAlbumChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onVideoURLChange = this.onVideoURLChange.bind(this);

        this.onStyleIdChange = this.onStyleIdChange.bind(this);
        this.onSingerIdChange = this.onSingerIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    validateVideoName(videoName) {
        return videoName.length > 0;
    }

    validateAlbum(album) {
        return album.length > 0;
    }

    validateYear(year) {
        return year.length > 0;
    }

    validateVideoURL(videoURL) {
        return videoURL !== null;
    }

    validateStyleId(styleId) {
        return styleId !== 'none';
    }

    validateSingerId(singerId) {
        return singerId !== 'none';
    }


    onVideoNameChange(e) {
        let val = e.target.value;
        let valid = this.validateVideoName(val);
        this.setState({videoName: val, videoNameValid: valid, showVideoNameError: true});
    }

    onAlbumChange(e) {
        let val = e.target.value;
        let valid = this.validateAlbum(val);
        this.setState({album: val, albumValid: valid, showAlbumError: true});
    }

    onYearChange(e) {
        let val = e.target.value;
        let valid = this.validateYear(val);
        this.setState({year: val, yearValid: valid, showYearError: true});
    }

    onVideoURLChange(e) {
        let val = e.target.files[0];
        console.log(val);
        let valid = this.validateVideoURL(val);//
        this.setState({videoURL: val, videoURLValid: valid, showVideoURLError: true});//
    }

    onStyleIdChange(e) {
        let val = e.target.value;
        console.log(val);
        let valid = this.validateStyleId(val);
        this.setState({styleId: val, styleIdValid: valid, showStyleIdError: true});
    }

    onSingerIdChange(e) {
        let val = e.target.value;
        let valid = this.validateSingerId(val);
        this.setState({singerId: val, singerIdValid: valid, showSingerIdError: true});
    }

    getMusic() {
        axios({
            url: "https://localhost:7179/api/musics/" + this.state.musicId,
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            this.setState({
                musicId: response.data.id,
                videoName: response.data.video_Name,
                videoNameValid: true,
                album: response.data.album,
                albumValid: true,
                year: response.data.year,
                yearValid: true,
                videoURL: response.data.videoURL,

                styleId: response.data.musicStyleId,
                styleIdValid: true,
                singerId: response.data.singerId,
                singerIdValid: true,
            });
        }).catch(function (error) {
            alert(error);
        });
    }


    componentDidMount() {
        axios({
            url: "https://localhost:7179/api/musicStyles/",
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            this.setState({styleOptions: response.data,});
        }).catch(function (error) {
            alert(error);
        });
        axios({
            url: "https://localhost:7179/api/singers/",
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            this.setState({singerOptions: response.data,});
        }).catch(function (error) {
            alert(error);
        });
        this.getMusic();
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.videoNameValid === true && this.state.albumValid === true &&
            this.state.yearValid === true && this.state.videoURLValid === true &&
            this.state.styleIdValid === true && this.state.singerIdValid === true
        ) {
            let formData = new FormData();
            formData.append('Video_URLN', this.state.videoURL);
            formData.append('jsonData', JSON.stringify({
                id: this.state.musicId,
                Video_Name: this.state.videoName,
                album: this.state.album,
                year: this.state.year,
                musicStyleId: this.state.styleId,
                singerId: this.state.singerId,
            }));

            axios({
                url: "https://localhost:7179/api/musics",
                method: "PUT",
                headers: {"Content-Type": false},
                data: formData,
            }).catch(function (error) {
                alert(error);
            });

            setInterval(() => this.setState({submitted: true}), 1000);
        }
    }

    render() {
        let errorVideoNameMessage = this.state.videoNameValid ? "" : "Некорректное название";
        let errorAlbumMessage = this.state.albumValid ? "" : "Некорректное название альбома";
        let errorYearMessage = this.state.yearValid ? "" : "Некорректнай год выпуска";
        let errorVideoURLMessage = this.state.videoURLValid ? "" : "Поле файла должно быть установлено";
        let errorStyleIdMessage = this.state.styleId ? "" : "Некорректный стиль";
        let errorSingerIdMessage = this.state.singerId ? "" : "Некорректный исполнитель";


        return (
            <div className="dv1v" style={{'height': '650px'}}>
                <br/><br/><br/>
                <h1 id="h1AdEdMusic" className="h1_n">Редактирование песни</h1>

                <div className="div_l1 div_l2n1">
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className="div_l2 div_l2n" style={{'height': 'max-content'}}>
                            <div className="div_l3">
                                <div className="div_l4">
                                    <label className="label_l1">Название:</label>
                                    <input onChange={this.onVideoNameChange} className="input1 " type="text"
                                           value={this.state.videoName}/>
                                </div>
                                {this.state.showVideoNameError && (
                                    <span className="span_error">{errorVideoNameMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Альбом:</label>
                                    <input onChange={this.onAlbumChange} value={this.state.album} className="input1 "
                                           type="text"/>
                                </div>
                                {this.state.showAlbumError && (<span className="span_error">{errorAlbumMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Год выпуска:</label>
                                    <input onChange={this.onYearChange} value={this.state.year} className="input1 "
                                           type="text"/>
                                </div>
                                {this.state.showYearError && (<span className="span_error">{errorYearMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Видео:</label>
                                    <input onChange={this.onVideoURLChange} className="input_file div_com div_i"
                                           style={{'float': "left"}} type="file"/>
                                </div>
                                {this.state.showVideoURLError && (
                                    <span className="span_error">{errorVideoURLMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Стиль музыки:</label>
                                    <select value={this.state.styleId} onChange={this.onStyleIdChange}
                                            className="input1 input_range">
                                        <option value='none'>Выберите стиль</option>
                                        {this.state.styleOptions.map((option) => (
                                            <option value={option.id}>{option.styleName}</option>
                                        ))}
                                    </select>
                                </div>
                                {this.state.showStyleIdError && (
                                    <span className="span_error">{errorStyleIdMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Исполнитель:</label>
                                    <select value={this.state.singerId} onChange={this.onSingerIdChange}
                                            className="input1 input_range">
                                        <option value='none'>Выберите исполнителя</option>
                                        {this.state.singerOptions.map((option) => (
                                            <option value={option.id}>{option.singerName}</option>
                                        ))}
                                    </select>
                                </div>
                                {this.state.showSingerIdError && (
                                    <span className="span_error">{errorSingerIdMessage}</span>)}
                            </div>

                            <div className="div_subm">
                                <input className="input_subm" type="submit" value="Изменить"/>
                            </div>

                        </div>
                    </form>
                </div>
                {this.state.submitted && <Navigate to="/musics" />}
            </div>
        );
    }
}

export default withRouter(EditMusicForm);