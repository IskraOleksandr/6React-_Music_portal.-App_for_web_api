import React from "react";
import {Link} from "react-router-dom";
import UsersList from './UsersList';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
            return ( 
                <div id="users_div" >
                    <div className="dv1 wh my_widt">
                        <h1 className="h1_n">Список пользователей</h1>
                        <div className="div_l1 div_l2n1 ">
                            <div className="div_l2 div_l2n wh">
                                <br />
                                <Link className="a_bt1 " to="/CreateUserForm">Добавить пользователя</Link>

                                <div id="div_users_table" className="div_l3n wh">
                                    <div className="div_l4 wh">
                                    <UsersList />
                                    </div>
                                </div>
                                <br /> <br />
                            </div>
                        </div>
                    </div>
                </div>
            ); 
    }
}
export default Users;