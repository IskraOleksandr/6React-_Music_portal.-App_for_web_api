import React from "react";
import {Link} from "react-router-dom";
import SingersList from './SingersList';

class Singers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div id="style_div">
                <div className="dv1v">
                    <h1 className="h1_n">Исполнители</h1>
                    <div className="div_l1 div_l2n1">
                        <div className="div_l2 div_l2n wh">

                            <br />
                            <Link className="a_bt1 " to="/CreateSingerForm">Добавить исполнителя</Link>

                            <div className="div_l3n wh">
                                <div id="div_styles_table" className="div_l4 wh">
                                    <table className='table1'>
                                        <thead>
                                            <tr>
                                                <th className='th1'> SingerName</th>
                                                <th className='th1'></th>
                                            </tr>
                                        </thead>
                                        <SingersList />
                                    </table>
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

export default Singers;