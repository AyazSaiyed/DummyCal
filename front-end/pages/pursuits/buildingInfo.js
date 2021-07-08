// pages/pursuits/buildingInfo.js

import { useState, useEffect, forwardRef } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import Layout from "../../components/Layout";
import Stepper from "../../components/Stepper";
import Switch from "../../components/Switch";
import _apiService from '../../requests/api';
import useUser from "../../data/useUser";
import Router from "next/router";

import Datasheet from 'react-datasheet';

import BuildingLabels from '../../data/buildingLabels';
import { FlatfileButton } from '@flatfile/react';
import { getUser } from "../../requests/userApi";

import _uniqueId from 'lodash/uniqueId';


const HeaderComponent = (props) => {
    return <div className="" onClick={() => { props.handleClickPlus();}}><span className="icon-plus border">+</span></div>
}

const BuildingInfo = () => {

    const { mutate, loggedIn } = useUser();
    const [alertShow, setAlertShow] = useState(false);
    const [webhookURL, setWebhookURL] = useState('');
    const [addType, setAddType] = useState(0);
    const [customer, setCustomer] = useState({});
    const [clientRfxs, setClientRfxs] = useState({});
    const [rowsNum, setRowsNum] = useState(15);
    const [columns, setColumns] = useState(BuildingLabels);
    const [builidngInformation, setBuildingInformation] = useState([]);
    const [flag, setFlag] = useState(false);
    const [colShow, setColShow] = useState(-10);
    const [rowShow, setRowShow] = useState(-10);
    const [renameModalShow, setRenameModalShow] = useState(false);
    const [hiddenModalShow, setHiddenModalShow] = useState(false);
    const [currentColKey, setCurrentColKey] = useState('');
    const [currentColName, setCurrentColName] = useState('');
    const [showCustomRenameInput, setShowCustomRenameInput] = useState(false);
    const [customFieldName, setCustomFieldName] = useState('');
    const [gridData, setGridData] = useState([]);
    
    const th_options = [
        { key: 'hide', label: "Hide" },
        { key: 'rename', label: "Rename" },
        { key: 'delete', label: "Delete" }
    ];

    useEffect(() => {
        if(sessionStorage.getItem('client_rfxs') === null) {
            setAlertShow(true);
        } else {
            setGridData(getGridData(columns, rowsNum));
            getCustomer();
            getWebhookUrl();
        }
    }, []);

    const getCustomer = () => {
        let currentUser = getUser();
        let clientRfxs = JSON.parse(sessionStorage.getItem('client_rfxs'));
        setClientRfxs(clientRfxs);

        setCustomer({
            companyId: "ABC-123",
            companyName: "ABC Corp.",
            email: currentUser.email,
            name: currentUser.name,
            userId: (currentUser.id).toString(),
            client_rfx: clientRfxs.id
        });

    }

    const getWebhookUrl = async () => {
        try {
            const res = await _apiService.post(`webhooks/`, {type: 'BUILDING_INFO_UPLOAD_FLATFILE'});
            let url_str = `${server.HOST}` + 'webhooks/flatfile?webhook_id='+ res.data.id +'&token=' + res.data.token;
            setWebhookURL(url_str);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickPlus = () => {
        setFlag(false);
        setRowsNum(rowsNum + 1);
    }

    const handleNewCol = (col) => {
        setFlag(false);
        let arr = [];
        columns.map((item, idx) => {
            arr.push(item);
            if(idx == col) {
                arr.push({key: _uniqueId('new-'), name: 'New Column', show: true});
            }
        });
        setColumns(arr);
    }

    const handleSetColShow = (num) => {
        setFlag(false);
        setColShow(num);
    }

    const handleSetRowShow = (num) => {
        setFlag(false);
        setRowShow(num);
    }

    const handleAlertClose = () => {
        Router.push("/pursuits/newPursuit");
        setAlertShow(false);
    }

    const valueRenderer = cell => cell.value;

    const onCellsChanged = changes => {
        setFlag(true);
        let grid = generateGrid(columns, rowsNum);
        changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
        });
        setBuildingInformation(grid);
    };

    const handleNextPage = async () => {
        let send_data = [];
        if(builidngInformation.length > 0) {
            builidngInformation.map((row, rowIdx) => {
                if(rowIdx !== 0) {
                    let rowData = {
                        client_rfx: clientRfxs.id
                    };
                    let rowChanges = false;
                    row.map((cell, cellIdx) => {
                        if(cellIdx !== 0) {
                            let key = columns[cellIdx - 1].key;
                            rowData[key] = cell.value;
                            if(cell.value != '') {
                                rowChanges = true;
                            }
                        }
                    });
                    if(rowChanges) {
                        send_data.push(rowData);
                    }
                }
            })
        }
        
        if(send_data.length > 0) {
            try {
                const res = await _apiService.post(`buildings/`, send_data);
                if(res.status = 201) {
                    Router.push("/pursuits/buildingMapping");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getGridData = (cols, rows) => {
        let gData = [];
        for(let i=0; i<rows; i++) {
            let rowData = [];
            cols.map((item, idx) => {
                rowData.push('');
            });
            gData.push(rowData);
        }

        return gData;
    }

    const generateGrid = (cols, rows) => {
        let gData = gridData;
        if(flag) {
            return builidngInformation;
        }
        const CustomToggle = forwardRef(({ children, onClick }, ref) => {
            return <span className="drop-icon"
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {children}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </span>
        });

        let tbl = [];
        
        // Header Data
        let th = [];
        let th_cell_0 = { 
            id: '00-00', value: '+', 
            readOnly: true,  
            component: (
                <HeaderComponent handleClickPlus={handleClickPlus}/>
            ), 
            forceComponent: true
        };
        th.push(th_cell_0);

        cols.map((item, idx) => {
            if(item.show) {
                let th_cell = {
                    id: '00-' + (idx + 1).toString().padStart(2, '0'), 
                    readOnly: true,
                    component: (
                        <div className="position-relative text-left pl-2" onDoubleClick={(e) => setRenameModalShow(true)}>
                            {item.name}
                            <Dropdown className="position-absolute" key={idx} onMouseEnter={(e) => handleSetColShow(idx)}>
                                <Dropdown.Toggle as={CustomToggle} id={`dropdown-button-drop-${idx}`}></Dropdown.Toggle>
    
                                <Dropdown.Menu key={"menu"+idx}>
                                    {th_options.map((drop, idx) => {
                                        return <Dropdown.Item onClick={(e) => handleColAction(item.key, drop.key)}>{drop.label}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            {(colShow == idx) && 
                                <span className="icon-hover-col-plus border" onClick={(e) => handleNewCol(idx)} onMouseLeave={(e) => handleSetColShow(-10)}>+</span>
                            }
                        </div>
                    ),
                    forceComponent: true
                };

                th.push(th_cell);
            }
        });

        tbl.push(th);

        if(builidngInformation.length == 0) {

            // Dummy Data
            for(let i=0; i<rows; i++) {
                let tr = [];
                let tr_cell_0 = {
                    value: i + 1, 
                    readOnly: true, 
                    component: (
                        <div className="position-relative pl-2" onMouseEnter={(e) => handleSetRowShow(i)}>
                            {(rowShow == i) && (
                                <span className="icon-hover-row-plus border" onClick={handleClickPlus} onMouseLeave={(e) => handleSetRowShow(-10)}>+</span>
                            )}
                            {i + 1}
                        </div>
                    ),
                    forceComponent: true
                };
                tr.push(tr_cell_0);

                cols.map((item, idx) => {

                    let tr_cell = {};
                    let value = '';

                    if(item.type == 'text' || item.type == 'number' || item.type == 'date') {
                        tr_cell = { 
                            id: (i + 1).toString().padStart(2, '0') + '-' + (idx + 1).toString().padStart(2, '0'), 
                            value: value
                        };
                    }

                    if(item.type == 'select') {
                        tr_cell = { 
                            id: (i + 1).toString().padStart(2, '0') + '-' + (idx + 1).toString().padStart(2, '0'), 
                            value: gridData[i][idx],
                            component: (
                                <Form.Control 
                                    as="select"
                                    onChange={(e) => {
                                        setFlag(false);
                                        gData[i][idx] = e.target.value;
                                        setGridData(gData);
                                        console.log(gridData);
                                        console.log(gridData[i][idx]);
                                    }}
                                    value={gridData[i][idx]}
                                >
                                    <option>Select Client Industry...</option>
                                    {item.values.map((item, idx) => {
                                        return <option key={idx} value={item.value}>{item.value}</option>;
                                    })}
                                </Form.Control>
                            )
                        };
                    }

                    tr.push(tr_cell);
                });
                
                tbl.push(tr);
            }
        } else {

            for(let i=1; i<rows; i++) {
                let tr = [];
                let tr_cell_0 = {
                    readOnly: true, 
                    component: (
                        <div className="position-relative pl-2" onMouseEnter={(e) => handleSetRowShow(i)}>
                            {(rowShow == i) && (
                                <span className="icon-hover-row-plus border" onClick={handleClickPlus} onMouseLeave={(e) => handleSetRowShow(-10)}>+</span>
                            )}
                            {i}
                        </div>
                    ),
                    forceComponent: true
                };
                tr.push(tr_cell_0);
                
                cols.map((item, idx) => {
                    let value = '';
                    if(builidngInformation[i] !== undefined) {
                        let cell = builidngInformation[i][idx+1];
                        if(builidngInformation[i][idx+1] !== undefined) {
                            value = cell.value
                        }
                    }

                    let tr_cell = {};

                    if(item.type == 'text' || item.type == 'number' || item.type == 'date') {
                        tr_cell = { 
                            id: (i + 1).toString().padStart(2, '0') + '-' + (idx + 1).toString().padStart(2, '0'), 
                            value: value
                        };
                    }

                    if(item.type == 'select') {
                        tr_cell = { 
                            id: (i + 1).toString().padStart(2, '0') + '-' + (idx + 1).toString().padStart(2, '0'), 
                            value: gridData[i-1][idx],
                            component: (
                                <Form.Control 
                                    as="select"
                                    onChange={(e) => {
                                        setFlag(false);
                                        gData[i-1][idx] = e.target.value;
                                        setGridData(gData);
                                        console.log(gridData);
                                        console.log(gridData[i-1][idx]);
                                    }}
                                    value={gridData[i-1][idx]}
                                >
                                    <option>Select Client Industry...</option>
                                    {item.values.map((item, idx) => {
                                        return <option key={idx} value={item.value}>{item.value}</option>;
                                    })}
                                </Form.Control>
                            )
                        };
                    }
                    
                    tr.push(tr_cell);
                });
                tbl.push(tr);
            }
        }     

        return tbl;
    }

    const setColumnName = (val) => {
        setCurrentColName(val);
        if(val == 'custom') {
            setShowCustomRenameInput(true);
        } else {
            setShowCustomRenameInput(false);
        }
    }

    const handleRenameModalSave = () => {

        if(currentColName == 'custom') {
            let newCol = columns;
            newCol.map((item, idx) => {
                if(item.key == currentColKey) {
                    item.name = customFieldName;
                }
            });

            setColumns(newCol);
        } else {
            // get name
            let newName = '';
            BuildingLabels.map((item, idx) => {
                if(item.key == currentColName) {
                    newName = item.name;
                }
            });
            let newCol = columns;
            newCol.map((item, idx) => {
                if(item.key == currentColKey) {
                    item.name = newName;
                }
            });

            setColumns(newCol);
        }

        setRenameModalShow(false);
    }

    const handleHiddenModalSave = () => {
        setHiddenModalShow(false);
    }

    const handleSwitch = (check, key) => {
        let newCol = columns;
        newCol.map((item, idx) => {
            if(item.key == key) {
                item.show = check;
            }
        });
        setColumns(newCol);
    }

    const handleColAction = (key, action) => {
        if(action == 'hide') {
            let newCol = columns;
            newCol.map((item, idx) => {
                if(item.key == key) {
                    item.show = false;
                }
            });
            setFlag(true);
            setColumns(newCol);
            let grid = generateGrid(newCol, rowsNum);
            setBuildingInformation(grid);
        }

        if(action == 'rename') {
            setCurrentColKey(key);
            setRenameModalShow(true);
        }
    }

    // Render
    return <Layout>
        <div className="container">
            <Stepper active="2" />

            <div className="card border-0 m-auto">

                { alertShow && 
                    <Alert variant="danger" className="w-50 m-auto" onClose={handleAlertClose} dismissible>
                        <Alert.Heading>You got an error!</Alert.Heading>
                        <p>
                            Please complete creating pursuit information first.
                        </p>
                    </Alert>
                }

                { !alertShow && 

                    <div className="card-body">
                        <div className="text-center">
                            <FlatfileButton
                                className="btn-secondary btn-sm mr-3"
                                licenseKey="21dc3b7e-b450-46b4-be36-f448680ae65a"
                                customer={ (Object.keys(customer).length !== 0) ? customer : {
                                    companyId: "ABC-123",
                                    companyName: "ABC Corp.",
                                    email: "john@abc123.com",
                                    name: "John Smith",
                                    userId: "12345",
                                    client_rfx: clientRfxs.id
                                }}
                                settings={{
                                    type: "Builing",
                                    fields: [
                                        { label: "Building Type", key: "building_type" },
                                        { label: "Main Region", key: "main_region" },
                                        { label: "Sub Region", key: "sub_region" },
                                        { label: "Country", key: "country" },
                                        { label: "State", key: "state" },
                                        { label: "City", key: "city" },
                                        { label: "Client Site ID", key: "site_id" },
                                        { label: "Floor", key: "floor" },
                                        { label: "Floor Sub-Area", key: "floor_sub_area" },
                                        { label: "Client Building Area Type", key: "building_area_type" },
                                        { label: "Ownership Type", key: "ownership_type" },
                                        { label: "Lease Type", key: "lease_type" },
                                        { label: "Headcount", key: "headcount" },
                                        { label: "Gross Floor Area", key: "gross_floor_area" },
                                        { label: "Gross Floor Area Units", key: "gross_floor_area_units" },
                                        { label: "Green Area", key: "green_area" },
                                        { label: "Green Area Units", key: "green_area_units" },
                                        { label: "Service Level", key: "service_level" },
                                        { label: "Go-Live Date ", key: "go_live_date" },
                                        { label: "In Scope of Pursuit", key: "scope_pursuit" },
                                        { label: "Days of Operation", key: "days_operation" },
                                        { label: "Hours of Operation", key: "hours_operation" },
                                        { label: "How many worker shifts? ", key: "worker_shifts" }
                                    ],
                                    managed: true,
                                    webhookUrl: webhookURL
                                }}
                                onData={async (results) => {
                                    // Do something with the data here
                                    return "Done!";
                                }}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                                    <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg> <span className="ml-2">Uploading Billing Information</span>
                            </FlatfileButton>
                        </div>
                        
                        <p className="text-divider"><span>Or</span></p>

                        <div className="row p-4">
                            <div className="col-12">
                                {addType == 0 &&
                                    <div className="text-center btn-plus">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            width="16" height="16" fill="currentColor" 
                                            className="bi bi-plus-circle icon-plus" viewBox="0 0 16 16" 
                                            onClick={(e) => setAddType(1)}
                                        >
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                        <div className="mt-3">
                                            <span>Add Building</span>
                                        </div>
                                    </div>
                                }
                            </div>
                            {addType == 1 &&
                            <div className="col-12">
                                <div className="tool-bar text-right">
                                    <Button variant="primary" className="btn-text" onClick={(e) => setHiddenModalShow(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-border-width" viewBox="0 0 16 16">
                                            <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                        </svg>
                                        <small className="ml-2">hidden fields</small>
                                    </Button>
                                </div>
                                <div className="tbl-wrap">
                                    <div className="border-left border-right">
                                        <Datasheet
                                            data={generateGrid(columns, rowsNum)}
                                            valueRenderer={valueRenderer}
                                            onCellsChanged={onCellsChanged}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    <div className="col-6 text-right">
                                        <button type="button" className="btn btn-primary">Save for Later</button>
                                    </div>
                                    <div className="col-6 text-left">
                                        <button type="button" className="btn btn-main" onClick={handleNextPage}>Next</button>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                }
            </div>
        
        
            {/* Modals */}
            <Modal 
                show={renameModalShow} 
                onHide={(e) => setRenameModalShow(false)} 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Rename Column</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control as="select"
                        onChange={(e) => setColumnName(e.target.value)}
                        placeholder="Select Item..."
                        value={currentColName}
                    >
                        <option>Select Item...</option>
                        {BuildingLabels.map((item, idx) => {
                            return <option key={'rename-modal-' + idx} value={item.key}>{item.name}</option>;
                        })}
                        <option key={'rename-modal-custom'} value="custom">Custom</option>
                    </Form.Control>

                    {showCustomRenameInput && (
                        <Form.Control type="text" 
                            className="mt-3"
                            value={customFieldName}
                            placeholder="Custom Field Name" 
                            onChange={(e) => setCustomFieldName(e.target.value)}
                        />
                    )}
                    
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={(e) => setRenameModalShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleRenameModalSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={hiddenModalShow} 
                onHide={(e) => setHiddenModalShow(false)} 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hidden Fields</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {columns.map((item, idx) => {
                        return <Row>
                            <Col>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                                </svg>
                                <span className="ml-2">{item.name}</span>
                            </Col>
                            <Col className="text-right">
                                <Switch value={item.show} itemKey={item.key} handleSwitch={handleSwitch}/>
                            </Col>
                        </Row>
                    })}
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={(e) => setHiddenModalShow(false)}>
                        Hide All
                    </Button>
                    <Button variant="primary" onClick={handleHiddenModalSave}>
                        Show All
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </Layout>

}

export default BuildingInfo;