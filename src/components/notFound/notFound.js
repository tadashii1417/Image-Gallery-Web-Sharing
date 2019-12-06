import React from "react";
import {Result, Button} from 'antd';
import 'antd/lib/result/style/index.css';
import 'antd/lib/button/style/index.css';

export default function (props) {
    return (<Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => props.history.push("/")}>Back Home</Button>}
    />);
}