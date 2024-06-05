class MusicsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { musics: this.props.data.musics };
    }


    render() {
            return (
                <div id="dv_mess"> 
                    <br /><br />

                    <ul>
                        {this.state.musics.map(function (club) {
                            <h3>club.video_Name</h3>
                            /*return <Club name={club} />;*/
                        })}
                    </ul>
                </div>
            );
    }
}
