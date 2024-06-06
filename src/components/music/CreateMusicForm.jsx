import React from "react";
import axios from "axios";

class CreateUserForm extends React.Component {
    constructor(props) {
        super(props);
        let videoName = '';
        let videoNameIsValid = this.validateVideoName(videoName);

        let album = '';
        let albumIsValid = this.validateAlbum(album);

        let year = '';
        let yearIsValid = this.validateYear(year);

        // let videoURL = '';
        // let videoURLIsValid = this.validateVideoURL(videoURL);

        let styleId = '';
        let styleIdIsValid = this.validateStyleId(styleId);

        let singerId = '';
        let singerIdIsValid = this.validateSingerId(singerId);


        this.state = {
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
        };

        this.onVideoNameChange = this.onVideoNameChange.bind(this);
        this.onAlbumChange = this.onAlbumChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onVideoURLChange = this.onVideoURLChange.bind(this);

        this.onStyleIdChange = this.onStyleIdChange.bind(this);
        this.onSingerIdConfirmChange = this.onSingerIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    validateVideoName(videoName) {
        return videoName.length > 2;
    }

    validateAlbum(album) {
        return album.length > 2;
    }

    validateYear(year) {
        return year.length > 2;
    }

    validateVideoURL(videoURL) {
        return videoURL.length > 0 ;
    }

    validateStyleId(styleId) {
        return styleId.length > 4;
    }

    validateSingerId(singerId) {
        return singerId.length > 4;
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
        let valid = this.validateVideoURL(val);
        this.setState({videoURL: val, videoURLValid: valid, showVideoURLError: true});
    }

    onStyleIdChange(e) {
        let val = e.target.value;
        let valid = this.validateStyleId(val);
        this.setState({styleId: val, styleIdValid: valid, showStyleIdError: true});
    }

    onSingerIdChange(e) {
        let val = e.target.value;
        let valid = this.validateSingerId(val);
        this.setState({singerId: val, singerIdValid: valid, showSingerIdError: true});
    }


    handleSubmit(e) {
        e.preventDefault();
        if (
            this.state.videoNameValid === true &&
            this.state.albumValid === true &&
            this.state.yearValid === true &&
            this.state.videoURLValid === true &&
            this.state.styleIdValid === true &&
            this.state.singerIdValid === true
        ) {
            let formData = new FormData();
            formData.append('Video_URLN', this.state.videoURL);
            formData.append('jsonData',{
                video_Name: this.state.videoName,
                album: this.state.album,
                year: this.state.year,
                musicStyleId: this.state.styleId,
                singerId: this.state.singerId,
            });

           axios({
                url: "https://localhost:7179/api/musics",
                method: "POST",
                headers: {"Content-Type": "multipart/form-data"},
                data: {
                    video_Name: this.state.videoName,
                    album: this.state.album,
                    year: this.state.year,
                    Video_URLN: this.state.videoURL,
                    musicStyleId: this.state.styleId,
                    singerId: this.state.singerId,
                }
            }).then(function (response) {

            }).catch(function (error) {
                alert(error);
            });
        }
    }

    render() {
        let errorVideoNameMessage = this.state.videoNameValid ? "" : "Некорректное имя";
        let errorAlbumMessage = this.state.albumValid ? "" : "Некорректная фамилия";
        let errorYearMessage = this.state.yearValid ? "" : "Некорректная длина Логина";
        let errorVideoURLMessage = this.state.videoURLValid ? "" : "Не коректный email";
        let errorStyleIdMessage = this.state.styleId ? "" : "Некорректная длина пароля";
        let errorSingerIdMessage = this.state.singerId ? "" : "Пароли не совпадают";

        return (
            <div className="dv1v" style={{'height': '650px'}}>
                <h1 id="h1AdEdMusic" className="h1_n"> </h1>

                <div className="div_l1 div_l2n1">
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className="div_l2 div_l2n" style="height: max-content">
                            <div className="div_l3">
                                <div className="div_l4">
                                    <label htmlFor="Video_Name" className="label_l1">Название:</label>
                                    <input onChange={this.onVideoNameChange} className="input1 " type="text" value={this.state.videoName} />
                                </div>
                                {this.state.showVideoNameError && (<span className="span_error">{errorVideoNameMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="Album" className="label_l1">Альбом:</label>
                                    <input onChange={this.onAlbumChange} value={this.state.album} className="input1 " type="text" />
                                </div>
                                {this.state.showAlbumError && (<span className="span_error">{errorAlbumMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="Year" className="label_l1">Год выпуска:</label>
                                    <input onChange={this.onYearChange} value={this.state.year} className="input1 " type="text" />
                                </div>
                                {this.state.showYearError && (<span className="span_error">{errorYearMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="Video_URL" className="label_l1">Видео:</label>
                                    <input onChange={this.onVideoURLChange} value={this.state.videoURL} className="input_file div_com div_i" style={{'float': 'left'}} type="file" />
                                </div>
                                {this.state.showVideoURLError && (<span className="span_error">{errorVideoURLMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="MusicStyleId" className="label_l1">Стиль музыки:</label>
                                    <select value={this.state.styleId} onChange={this.onStyleIdChange} className="input1 input_range">

                                    </select>
                                </div>
                                {this.state.showStyleIdError && (<span className="span_error">{errorStyleIdMessage}</span>)}
                            </div>

                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label htmlFor="SingerId" className="label_l1">Исполнитель:</label>
                                    <select value={this.state.singerId} onChange={this.onSingerIdChange} className="input1 input_range">

                                    </select>
                                </div>
                                {this.state.showSingerIdError && (<span className="span_error">{errorSingerIdMessage}</span>)}
                            </div>

                            <div className="div_subm">
                                <input className="input_subm" type="submit" value="Добавить" />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateUserForm;