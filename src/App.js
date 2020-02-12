import React, {useState, useEffect} from 'react';
import Users from "./components/users";
import {listUsers} from "./api";
import keyBy from 'lodash/keyBy';

export default function App() {
    const [users, setUsers] = useState({});
    const fetchUsers = async () => {
        const res = await listUsers();
        console.log(res.data);
        setUsers(keyBy(res.data, 'id'));
    };
    const cb = () => {
        fetchUsers().then().catch();
    };
    useEffect(cb, [true]);
    return (<div>
        <Users fetchUsers={fetchUsers} users={users}/>
    </div>);
}