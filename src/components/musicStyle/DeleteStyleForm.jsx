﻿import React from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";


const EditStyleForm = () => {
    const [styleName, setStyleName] = React.useState('');

    const params = useParams();
    console.log(params.id + 'id');
    const [styleId, setStyleId] = React.useState(params.id);

    const validateStyleName = (styleName) => {
        return styleName.length > 2;
    }
    const [styleNameValid, setStyleNameValid] = React.useState(validateStyleName(styleName));

    
    const onChange = (e) => {
        let val = e.target.value;
        let valid = validateStyleName(val);
        setStyleName(val);
        setStyleNameValid(valid);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (styleNameValid === true && styleId != 0) {
            axios({
                url: "https://localhost:7179/api/musicStyles",
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                data: {
                    id:styleId,
                    styleName: styleName
                }
            }).then(function (response) {

            }).catch(function (error) {
                alert(error);
            });
        } else {
        }
    }

    return (
        <div>
            <div className="dv1v">
                <h1 id="h1AdEdMusicStyle" className="h1_n">Edit style</h1>

                <div className="div_l1 div_l2n1">
                    <form name="addStyleForm" onSubmit={(e) => handleSubmit(e)}>
                        <div className="div_l2 div_l2n" style={{height: 'max-content'}}>
                            <br/>
                            <div className="div_l3n">
                                <div className="div_l4">
                                    <label className="label_l1">Style name</label>
                                    <input type="text" onChange={(e) => onChange(e)} value={styleName}
                                           className="input1 "/>
                                </div>
                                <span className="span_error"></span>
                            </div>

                            <div className="div_subm">
                                <input className="input_subm" type="submit" value="Добавить"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default EditStyleForm;