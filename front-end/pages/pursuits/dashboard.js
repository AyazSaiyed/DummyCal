// pursuits/dashboard.js
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Link from "next/link";
import _apiService from '../../requests/api';
import SearchField from 'react-search-field';
import useUser from "../../data/useUser";
import Router from "next/router";

const pursuits = [
    {
        id: 1,
        clientName: 'abc',
        clientIndustry: 'abcd',
        status: 'High',
        nextMilestone: 'owner',
        dueDate: '5/30/2021',
        createdDate: '5/30/2021',
        active: 1
    },
    {
        id: 2,
        clientName: 'abcd',
        clientIndustry: 'abcd',
        status: 'Low',
        nextMilestone: 'owner',
        dueDate: '5/29/2021',
        createdDate: '5/31/2021',
        active: 1
    },
    {
        id: 3,
        clientName: 'bcd',
        clientIndustry: 'abcd',
        status: 'High',
        nextMilestone: 'owner',
        dueDate: '5/29/2021',
        createdDate: '5/31/2021',
        active: 1
    },
    {
        id: 4,
        clientName: 'bcdf',
        clientIndustry: 'abcd',
        status: 'Low',
        nextMilestone: 'owner',
        dueDate: '5/05/2021',
        createdDate: '5/18/2021',
        active: 1
    },
    {
        id: 5,
        clientName: 'ssdf',
        clientIndustry: 'abcd',
        status: 'Win',
        nextMilestone: 'owner',
        dueDate: '5/09/2021',
        createdDate: '5/12/2021',
        active: 0
    },
    {
        id: 6,
        clientName: 'xdfd',
        clientIndustry: 'abcd',
        status: 'Lost',
        nextMilestone: 'owner',
        dueDate: '5/12/2021',
        createdDate: '5/15/2021',
        active: 0
    },
    {
        id: 7,
        clientName: 'tytu',
        clientIndustry: 'abcd',
        status: 'Win',
        nextMilestone: 'owner',
        dueDate: '5/17/2021',
        createdDate: '5/19/2021',
        active: 0
    }
]

const pursuits_2 = [];

const Dashboard = () => {

    const { mutate, loggedIn } = useUser();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!loggedIn) Router.replace("/auth/login");
    }, [loggedIn]);

    const [pursuits, setPursuits] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [closedData, setClosedData] = useState([]);

    useEffect(() => {
        getPursuits();
        formatData();
    }, []);

    const getPursuits = async () => {
        try {
            const res = await _apiService.get(`client_rfxs/`);
            console.log(res.data);
            setPursuits(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const formatData = () => {
        let active_result = [];
        active_result = pursuits.filter((data) => {
            return data.active == 1;
        });
        setActiveData(active_result);

        let closed_result = [];
        closed_result = pursuits.filter((data) => {
            return data.active == 0;
        });
        setClosedData(closed_result);

        if(isActive) {
            setFilteredData(active_result);
        } else {
            setFilteredData(closed_result);
        }
    }

    const onChange = (value) => {
        let result = [];
        let searchData = [];

        if(isActive) {
            searchData = activeData;
        } else {
            searchData = closedData;
        }

        result = searchData.filter((data) => {
            return data.clientName.search(value) != -1;
        });

        setFilteredData(result);
    }

    const changeData = (value) => {
        setIsActive(value == 1);
        let searchData = [];
        if(value) {
            searchData = activeData;
        } else {
            searchData = closedData;
        }

        setFilteredData(searchData);
    }

    function statusFormatter(cell, row) {
        return ` <span class="badge badge-main">${cell}</span>`;
    }

    const handleNewPursuit = () => {
        sessionStorage.removeItem('client_rfxs');
        Router.push("/pursuits/newPursuit");
    }

    return (
        <Layout>
            <div className="container p-4 bg-main">
                <div className="form-group d-flex">
                    <div className="page-separator h5" style={{flex: 1}}>
                        <div className="toggle-wrap d-flex">
                            <div className={isActive ? 'active' : ''} onClick={(e) => changeData(1)}>Active</div>
                            <div className={isActive ? '' : 'active'} onClick={(e) => changeData(0)}>Closed</div>
                        </div>
                    </div>
                    {isActive && 
                    <div className="d-flex">
                        <button className="btn btn-secondary btn-sm" onClick={handleNewPursuit}>
                            New Pursuit
                        </button>
                    </div>
                    }

                    {!isActive && <SearchField 
                        placeholder='Search item'
                        onChange={onChange}
                    />}
                    
                </div>
                <div className="form-group p-3 bg-white mb-0">

                    {(filteredData.length > 0) ? 

                    <BootstrapTable data={filteredData} bordered={ false }>
                        <TableHeaderColumn isKey dataField='id' 
                            dataField='clientName' 
                            dataSort={ true }
                            width="200" 
                            columnClassName="font-weight-bold"
                        >Client</TableHeaderColumn>
                        <TableHeaderColumn 
                            dataField='status' 
                            dataSort={ true } 
                            width="200"
                            columnClassName="td-status"
                            dataFormat={statusFormatter}
                        >Status</TableHeaderColumn>
                        {!isActive && <TableHeaderColumn dataField="clientIndustry" dataSort={ true } width="200">Industry</TableHeaderColumn>}
                        {isActive && <TableHeaderColumn dataField='nextMilestone' dataSort={ true }>Next Milestone</TableHeaderColumn>}
                        {isActive && <TableHeaderColumn dataField='dueDate' dataSort={ true } width="200">Due</TableHeaderColumn>}
                        <TableHeaderColumn dataField='createdDate' dataSort={ true } width="200">Updated</TableHeaderColumn>
                    </BootstrapTable>
                    :
                        isActive ? 
                            <div className="h-50 text-center mh-300 pt-5">
                                <p>You don't have any active pursuits yet</p>
                                <button className="btn btn-secondary btn-sm" onClick={handleNewPursuit}>
                                    New Pursuit
                                </button>
                            </div>
                        :
                            <div className="h-50 text-center mh-300 pt-5">
                                <p>You don't have any completed pursuits yet</p>
                            </div>
                    }
                </div>
            </div>
        </Layout>
    )
};

export default Dashboard;