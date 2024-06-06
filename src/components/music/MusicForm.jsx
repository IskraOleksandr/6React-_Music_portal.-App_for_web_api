import React, {Component} from 'react';
import axios from 'axios';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedFile: null, formData: {name: '', description: ''}};
    }

    handleFileChange = (e) => {
        this.setState({selectedFile: e.target.files[0]});
    };

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState(prevState => ({formData: {...prevState.formData, [name]: value}}));
    };

    handleSubmit = async (e) => {
        e.preventDefault();


        const data = new FormData();
        data.append('file', this.state.selectedFile);
        data.append('name', this.state.formData.name);
        data.append('description', this.state.formData.description);

        try {
            await axios.post('https://example.com/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}><input type="file" onChange={this.handleFileChange}/> <input type="text"
                                                                                                            name="name"
                                                                                                            placeholder="Name"
                                                                                                            value={this.state.formData.name}
                                                                                                            onChange={this.handleInputChange}/>
                <input type="text" name="description" placeholder="Description" value={this.state.formData.description}
                       onChange={this.handleInputChange}/>
                <button type="submit">Upload</button>
            </form>);
    }
}

export default FileUpload;