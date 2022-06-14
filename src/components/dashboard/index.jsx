import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { AuthContext } from '../state/authContext';
import './index.css'
import { Dropdown, Selection } from 'react-dropdown-now';
import { Button, Modal } from 'react-bootstrap';

function UpdateUserModal(props) {
    const [selectedRole, setSelectedRole] = useState('');
    const [options, setOptions] = useState();
    const [role, setRole] = useState();
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    const user = props.currentuser;
    const users = props.users;

    const constructor = () => {
        if (constructorHasRun && (role === user.role)) return;
        if (user && user.role === 'Agent') {
            setRole(user.role)
            let o = filter('Team Leader');
            setOptions(o.map(function (a) { return a.name + ' ' + a.surname; }))
        }
        if (user && user.role === 'Team Leader') {
            setRole(user.role)
            let o = filter('Manager');
            setOptions(o.map(function (a) { return a.name + ' ' + a.surname; }))
        }
    };


    const filter = (role) => {
        let _users = users.filter(function (e) {
            return e.role === role;
        });
        setConstructorHasRun(true);
        return _users;
    }

    constructor();

    const save = () => {
        setConstructorHasRun(false);
        const objIndex = users.findIndex((obj => obj.id == user.id));
        users[objIndex].teamLeader = selectedRole;
        user.teamLeader = users[objIndex].teamLeader;

        if (role === 'Team Leader') {
            users[objIndex].manager = selectedRole;
            user.manager = users[objIndex].manager;
        }

        //Update
        const managers = filter('Manager');
        managers.map((manager, idx) => {
            if (manager.name + ' ' + manager.surname === users[objIndex].teamLeader) {
                manager.teams.push(users[objIndex].name + ' ' + users[objIndex].surname);
            }
        })


        setSelectedRole('')
        setOptions([])
        props.onHide();
    }

    const close = () => {
        setConstructorHasRun(false);
        setSelectedRole('')
        setOptions([])
        props.onHide();
    }

    const clear = () => {
        setConstructorHasRun(false);
        setOptions([])
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {
                        user ? (
                            <p>{user.name} {user.surname}</p>
                        ) : (<p></p>)
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    user && user.role === 'Agent' ? (
                        <div>
                            <h5>Team Leader</h5>
                            <p>{user.teamLeader} (Team Leader)</p>
                        </div>
                    ) : (user && <div>
                        <h5>Manager</h5>
                        <p>{user.manager} (Manager)</p>
                    </div>
                    )
                }
                <hr />
                {
                    user && user.role === 'Agent' ? (
                        <div>
                            <h5>Change Team</h5>
                        </div>
                    ) : (user && <div>
                        <h5>Change Manager</h5>
                    </div>
                    )
                }
                <Dropdown
                    placeholder="Select User"
                    options={options}
                    value={selectedRole}
                    onChange={(value) => {
                        setSelectedRole(value.value)
                        setConstructorHasRun(false);
                        setOptions([])
                    }}
                    onSelect={(value) => {
                        setSelectedRole(value.value)
                        setConstructorHasRun(true);
                        setOptions([])
                    }} // always fires once a selection happens even if there is no change
                    onClose={(closedBySelection) => {
                        clear()
                    }}
                    onOpen={() => { }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Close</Button>
                <Button onClick={save}>Save</Button>

            </Modal.Footer>
        </Modal>
    );
}

function Dashboard(props) {
    // const [user, setUser] = useContext(AuthContext);
    const [user, setUser] = useState();
    const [teams, setTeams] = useState();

    const [selectedRole, setSelectedRole] = useState('Agent');
    const [users, setUsers] = useState([
        { name: 'Fefe', surname: 'Mosenogi', email: 'fefe@gmail.com', role: 'Agent', id: '1', teamLeader: 'Akha Magaqana', manager: '' },
        { name: 'Phawu', surname: 'Jack', email: 'phawu@gmail.com', role: 'Agent', id: '2', teamLeader: 'Akha Magaqana', manager: '' },
        { name: 'Xolisa', surname: 'Magaqana', email: 'xolisa@gmail.com', role: 'Agent', id: '11', teamLeader: 'Andiswa Magaqana', manager: '' },
        { name: 'Lwazi', surname: 'Magaqana', email: 'lwazi@gmail.com', role: 'Agent', id: '12', teamLeader: 'Andiswa Magaqana', manager: '' },
        { name: 'Buhle', surname: 'Janda', email: 'buhle@gmail.com', role: 'Agent', id: '13', teamLeader: 'Akha Magaqana', manager: '' },

        { name: 'Akha', surname: 'Magaqana', email: 'akha@gmail.com', role: 'Team Leader', id: '3', teamLeader: '', manager: 'Sibsiso Janda' },
        { name: 'Nosira', surname: 'Magaqana', email: 'akha@gmail.com', role: 'Team Leader', id: '4', teamLeader: '', manager: 'Sello Selowa' },
        { name: 'Ncedo', surname: 'Magaqana', email: 'akha@gmail.com', role: 'Team Leader', id: '5', teamLeader: '', manager: 'Sibusiso Janda' },
        { name: 'Andiswa', surname: 'Magaqana', email: 'akha@gmail.com', role: 'Team Leader', id: '6', teamLeader: '', manager: 'Litha Magaqana' },

        { name: 'Sibusiso', surname: 'Janda', email: 'janda.s@gmail.com', role: 'Manager', id: '7', teamLeader: '', manager: '', teams:['Akha Magaqana', 'Ncedo Magaqana'] },
        { name: 'Sello', surname: 'Selowa', email: 'selowa.s@gmail.com', role: 'Manager', id: '8', teamLeader: '', manager: '', teams: ['Nosira Magaqana'] },
        { name: 'Sanelisiwe', surname: 'Jack', email: 'jack.s@gmail.com', role: 'Manager', id: '9', teamLeader: '', manager: '', teams: [] },
        { name: 'Litha', surname: 'Magaqana', email: 'litha.s@gmail.com', role: 'Manager', id: '10', teamLeader: '', manager: '', teams: ['Andiswa Magaqana'] }
    ]);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const logo = require('../../images/agent.png');
    const options = [
        { label: 'Agents', value: 'Agent' },
        { label: 'Team Leaders', value: 'Team Leader' },
        { label: 'Managers', value: 'Manager' },
        { label: 'All', value: 'All' }
    ];
    const [modalShow, setModalShow] = useState(false);


    const filterUsers = (role) => {
        if (role === 'All') {
            setFilteredUsers(users);
        } else {
            let _users = users.filter(function (e) {
                return e.role === role;;
            });
            setFilteredUsers(_users);
        }
    }

    const filterTeams = (manager) => {
        if (selectedRole === 'All' || selectedRole === 'Manager') {
            let _users = users.filter(function (e) {
                if (e.manager === manager) return e.manager;
            });
            setTeams(_users);
        }
        return teams;
    }

    useEffect(() => {
        setSelectedRole('Agent');
        filterUsers(selectedRole);
    }, [setFilteredUsers]);

    // filterTeams();

    return <div>
        <div className='container'>
            <div className="container p-1">
                <div className='row'>
                    <div className='col-md-10'>
                        <h3 className='header-title'>Filter Users by role</h3>
                    </div>
                    <div className='col-md-2 drop-down-custom'>
                        <Dropdown
                            placeholder="Select an option"
                            // className='drop-down-custom'
                            options={options}
                            value={selectedRole}
                            onChange={(value) => filterUsers(value.value)}
                            onSelect={(value) => setSelectedRole(value.value)} // always fires once a selection happens even if there is no change
                            onClose={(closedBySelection) => { }}
                            onOpen={() => { }}
                        />
                    </div>
                </div>
                <hr />

                {/* Edit modal */}

                <UpdateUserModal
                    currentuser={user}
                    users={users}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-5 g-2">
                    {filteredUsers.map((user, i) => (
                        <div className="col-md-2" key={i}>
                            <div className="card h-100 shadow-sm">
                                <div className="text-center">
                                    <div className="img-hover-zoom img-hover-zoom--colorize">
                                        <img className="shadow" src={logo}
                                            alt="Another Image zoom-on-hover effect" />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="clearfix mb-3">
                                    </div>
                                    <div className="my-2 text-center">
                                        <h6>{user.name} {user.surname}</h6>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="text-uppercase text-center role">{user.role}</h2>
                                    </div>
                                    <hr />
                                    <div className="box text-center">
                                        <div>
                                            {user.role === 'Agent' ? (
                                                <div>
                                                    <p className="list-inline-item text-center"><b>Team Leader</b></p>
                                                    <br />
                                                    <p className="list-inline-item"><a href='#'>{user.teamLeader}</a></p>
                                                </div>
                                            ) : (
                                                <div>
                                                    {user.role === 'Team Leader' ? (
                                                        <div>
                                                            <p className="list-inline-item text-center"><b>Manager</b></p>
                                                            <br />
                                                            <p className="list-inline-item"><a href='#'>{user.manager}</a></p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <p className="list-inline-item text-center"><b>Teams</b></p>
                                                            <ol style={{textAlign: 'left'}}>
                                                            {
                                                                user && user.teams && user.teams.length > 0 ? (
                                                                    user.teams.map((team, ix) => {
                                                                        return <li key={ix}>{team}</li>
                                                                    })
                                                                ): (<p>No teams assigned to this user.</p>)
                                                            }
                                                            </ol>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {user.role === 'Agent' || user.role === 'Team Leader' ?
                                    (
                                        <Button className='edit-btn' variant="secondary" onClick={() => {
                                            setUser(user)
                                            setModalShow(true)
                                        }}><i className="bi bi-pencil-square"></i></Button>
                                    ) : (<p></p>)
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <br/>
    </div>;
}

export default Dashboard;