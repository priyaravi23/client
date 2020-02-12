import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {createUser, deleteUser, updateUser} from "../api";
import '../App.scss';

export default function Users(props) {

    const [user, setUser] = useState({
        id: uuidv4(),
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
                    id: uuidv4(),
                    name: '',
                    address: ''
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

    const handleSaveUserOnClick = async () => {
      let res = edit ? await updateUser({
          ...user
      }) : await createUser({
            ...user
        });
      console.log(res.data);
      props.fetchUsers().then().catch();

      setUser({
          id: uuidv4(),
          name: '',
          address: ''
      })
    };

    const renderedUsers = Object.values(props.users).map(user => <div key={user.id} className="row">
        <div className="column">
            {user.name}
        </div>
        <div className="column">
            {user.address}
        </div>

        <div className="column">
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
        </div>
    </div>);

    console.log(user, props.users);
    return (<div>
        <form className='form'>
            <fieldset>
                <div className='field'>
                    <label>Name: </label>
                    <input
                        onKeyDown={saveUser}
                        onChange={handleUserChange}
                        value={user.name}
                        type="text" data-prop="name"/>
                </div>

                <div className='field'>
                    <label>Address: </label>
                    <input
                        onKeyDown={saveUser}
                        onChange={handleUserChange}
                        value={user.address}
                        type="text" data-prop="address"/>
                </div>
            </fieldset>

            <button onClick={handleSaveUserOnClick}>
                Submit
            </button>
        </form>

        <div className='table'>
            <div className="table-header">
                <div className="row">
                    <div className="column">Name</div>
                    <div className="column">Address</div>
                    <div className="column">Options</div>
                </div>
            </div>

            <div className="table-body">
                {renderedUsers}
            </div>
        </div>
    </div>);
}
