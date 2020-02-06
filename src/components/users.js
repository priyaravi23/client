import React, {useState} from 'react';
import uuid from 'uuid';

import {createUser, deleteUser, updateUser} from "../api";
import '../App.scss';

export default function Users(props) {

    const [user, setUser] = useState({
        id: uuid.v4(),
        name: '',
        address: ''
    });
    const [edit, setEdit] = useState(false);

    const handleUserChange = e => {
        const propName = e.target.dataset.prop;
        setUser({
            ...user,
            [propName]: e.target.value
        });
    };

    const saveUser = async e => {
        if (e.key === 'Enter') {
            let res = edit ? await updateUser({
                    ...user
                }) : await createUser({
                    ...user
                });
            console.log(res.data);
            props.fetchUsers().then().catch();
            setTimeout(() => {
                setUser({
                    id: uuid.v4(),
                    name: '',
                    value: ''
                });
            }, 100)
        }

    };

    const handleDeleteUser = async e => {
        try {
            const id = e.currentTarget.dataset.id;
            const user = await deleteUser(id);
            const res = await props.fetchUsers();
        } catch (ex) {
            alert('Could not delete the user!');
        }
    };

    const handleEditUser = async e => {
        try {
            const {id} = e.currentTarget.dataset;
            console.log(id);
            setEdit(true);
            setUser({
                ...props.users[id]
            });
        } catch (ex) {
            alert('Could not edit the user!');
        }
    };

    const renderedUsers = Object.values(props.users).map(user => <div key={user.id} className="row">
        <div className="column">
            {user.name}
        </div>
        <div className="column">
            {user.address}
        </div>
        <button className="icon"
                data-id={user.id}
                onClick={handleEditUser}>
            <i className="fa fa-edit"/>
        </button>

        <button className="icon"
                data-id={user.id}
                onClick={handleDeleteUser}>
            <i className="fas fa-user-minus"/>
        </button>
    </div>);

    console.log(user, props.users);
    return (<div>
        <div className="table">
            <div className="table-body">
                <div>
                    <div className="column">
                        Name:
                        <input
                            onKeyDown={saveUser}
                            onChange={handleUserChange}
                            value={user.name}
                            type="text" data-prop="name"/>
                    </div>
                    <div className="column">
                        Address:
                        <input
                            onKeyDown={saveUser}
                            onChange={handleUserChange}
                            value={user.address}
                            type="text" data-prop="address"/>
                    </div>
                </div>
            </div>
        </div>

        <div className="table">
            <div className="table-body">
                {renderedUsers}
            </div>
        </div>
    </div>);
}
