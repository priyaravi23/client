import React, {useState} from 'react';
import {createUser, deleteUser, updateUser} from "../api";
import '../App.scss';

export default function Users(props) {

    const [user, setUser] = useState({});
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
            if (edit) {
                const res = await updateUser(user);
                console.log(res.data);
                props.fetchUsers().then().catch();
            } else {
                const res = await createUser(user);
                console.log(res.data);
                props.fetchUsers().then().catch();
            }
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
            const id = e.currentTarget.dataset.id;
            const editUser = await updateUser(id);
            const res = await props.fetchUsers();
            setEdit(true);
            setUser({
                ...user[id]
            });
        } catch (ex) {
            alert('Could not edit the user!');
        }
    };

    const renderedUsers = Object.values(props.users).map(user => <div className="row">
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

    return (<div>
        <div className="table">
            <div className="table-body">
                <div>
                    <div className="column">
                        Name:
                        <input onKeyDown={saveUser} onChange={handleUserChange} value={user.name} type="text" data-prop="name"/>
                    </div>
                    <div className="column">
                        Address:
                        <input onKeyDown={saveUser} onChange={handleUserChange} value={user.address} type="text" data-prop="address"/>
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
