import React from "react";
import {Link} from "react-router-dom";
import StylesList from './StylesList';

class Styles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div id="style_div">
                <br/><br/><br/><br/>
                <div className="dv1v">
                    <h1 className="h1_n">Стили</h1>
                    <div className="div_l1 div_l2n1">
                        <div className="div_l2 div_l2n wh">

                            <br />
                            <Link className="a_bt1 " to="/CreateStyleForm">Добавить стиль</Link>

                            <div className="div_l3n wh">
                                <div id="div_styles_table" className="div_l4 wh">
                                        <StylesList />
                                    <br /> <br />
                                </div>
                            </div>  <br /> <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Styles;