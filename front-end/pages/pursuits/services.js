import { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FlatfileButton } from '@flatfile/react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import _uniqueId from 'lodash/uniqueId';
import Multiselect from 'multiselect-react-dropdown';

import _apiService from '../../requests/api';
import Layout from "../../components/Layout";
import Stepper from "../../components/Stepper";
import { getUser } from "../../requests/userApi";
import { Router } from "next/router";

const Services = () => {

    const [customer, setCustomer] = useState({});
    const [webhookURL, setWebhookURL] = useState('');
    const [serviceData, setServiceData] = useState('');
    const [addType, setAddType] = useState(0);
    const [addServiceModalShow, setAddServiceModalShow] = useState(false);
    const [currentServices, setCurrentServices] = useState({});

    const [clientRfxs, setClientRfxs] = useState({});
    const [serviceValues, setServiceValues] = useState([]);

    const initServiceValues = [
        {
            id: '1',
            value: 'Management Fees'
        },
        {
            id: '2',
            value: 'Mobile Engineering'
        },
        {
            id: '3',
            value: 'Energy Management'
        },
        {
            id: '4',
            value: 'Account Management'
        },
        {
            id: '5',
            value: 'Finance'
        },
        {
            id: '6',
            value: 'Sourcing'
        }
    ]

    useEffect(() => {
        getWebhookUrl();
        getCurrentUser();
        getJLLservices();
        getServiceData();
    }, []);

    const getCurrentUser = () => {
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
    // Get webhookRUL for service uploading flatfile
    const getWebhookUrl = async () => {
        try {
            const res = await _apiService.post(`webhooks/`, {type: 'SERVICE_UPLOAD_FLATFILE'});
            let url_str = `${server.HOST}` + 'webhooks/flatfile?webhook_id='+ res.data.id +'&token=' + res.data.token;
            setWebhookURL(url_str);
        } catch (error) {
            console.log(error);
        }
    }

    // JLL services
    const getJLLservices = async () => {
        try {
            const res = await _apiService.get(`service/`);
            if(res.status) {
                setServiceValues(res.data);
            } else {
                setServiceValues(initServiceValues);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Service Data
    const getServiceData = async () => {
        try {
            const res = await _apiService.get(`client-service/`);
            if(res.status && res.data.length > 0) {
                setServiceData(res.data);
            } else {
                setServiceData(generateInitData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const generateInitData = () => {
        let initData = [];
        for(let i=0; i<10; i++) {
            let item = {
                id: i,
                city: "NY",
                inScope: true,
                service_name: "",
                client_service_number: "",
                other_service_data: "",
                client_verified: true,
                deliveryModel: null,
                assumption: null,
                client_rfx: clientRfxs.id,
                services: []
            }
            initData.push(item);
        }
        setServiceData(initData);
    }

    // Add New Row to Table
    const handleAddNewServices = () => {
        let rowData = {
            id: 'new',
            city: "NY",
            inScope: true,
            service_name: "",
            client_service_number: "",
            other_service_data: "",
            client_verified: true,
            deliveryModel: null,
            assumption: null,
            client_rfx: clientRfxs.id,
            services: []
        };
        setServiceData(serviceData.concat(rowData));
    }

    const addService = (cell, row) => {
        setCurrentServices(row);
        setAddServiceModalShow(true);
    }

    // Handle Multiple select for services
    const handleServiceValues = (selectedList, selectedItem) => {
        let newCurrentServices = currentServices;
        newCurrentServices.services = selectedList;
        setCurrentServices(newCurrentServices);
    }

    const handleAddModalSave = () => {
        saveClientService();
        setAddServiceModalShow(false);
    }

    const handleAddModalClose = () => {
        setAddServiceModalShow(false);
    }

    const removeService = (e, cell, row) => {
        console.log(e.target.getAttribute('value'));
        cell.map((item, idx) => {
            if(idx == e.target.getAttribute('value')) {
                cell.splice(idx, 1);
            }
        });

        return cell;
    }

    const onAfterSaveCell = (row, cellName, cellValue) => {
        saveClientService(row);
    }

    const onBeforeSaveCell = (row, cellName, cellValue) => {
        setCurrentServices(row);
        return true;
    }

    const serviceCellEdit = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell,
        afterSaveCell: onAfterSaveCell
    }

    function serviceNameColFormat(cell, row) {
        if(cell == '') {
            return <div className="empty-cell">Enter client service name</div>;
        } else {
            return cell;
        }
    }

    function serviceColFormat(cell, row) {

        if(cell.length > 0) {
            return <div className="service-cell position-relative">
                {cell.map((item, idx) => (
                    <div className="badge badge-main mr-3">{item.value}
                        <span className="btn btn-close py-0 pr-0" value={idx} onClick={(e) => removeService(e, cell, row)}>x</span>
                    </div>
                ))}
                    <div className="btn-plus btn border position-absolute" onClick={()=>addService(cell, row)} >+</div>
                </div>
        } else {
            return <div className="service-cell position-relative">
                <div className="badge badge-main mr-3">
                    <div className="empty-cell">Enter client services</div>
                </div>
                <div className="btn-plus btn border position-absolute" onClick={()=>addService(cell, row)} >+</div>
            </div>
        }
    }

    const saveClientService = async (data) => {        
        let postData = {
            id: _uniqueId(),
            city: "NY",
            inScope: true,
            service_name: "",
            client_service_number: "",
            other_service_data: "",
            client_verified: true,
            deliveryModel: null,
            assumption: null,
            client_rfx: clientRfxs.id,
            services: []
        };
        let serviceRow = {};
        if(data != undefined) {
            serviceRow = data;
        } else {
            serviceRow = currentServices;
        }
        postData.id = serviceRow.id;
        postData.service_name = serviceRow.service_name;
        let service_ids = [];
        serviceRow.services.map((item, idx) => {
            service_ids.push(item.id);
        });
        postData.services = service_ids;
        if(postData.id == 'new') {
            if(postData.services.length > 0) {
                const res = await _apiService.post(`client-service/`, postData);
                console.log(res)
            }
            
        } else {
            const res = await _apiService.put(`client-service/` + postData.id + `/`, postData);
            console.log(res);
        }
    }

    const handleNextPage = async () => {
        try {
            let postData = [];
            serviceData.map((item, idx) => {
                if(item.service_name !== '') {
                    postData.push(item);
                }
            });
            console.log(postData);
            const res = await _apiService.post(`client-service-bulk/`, postData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return <Layout>
        <div className="container">
            <Stepper active="3" />
            <div className="card border-0 m-auto">
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
                                type: "Services",
                                fields: [
                                    { label: "Client Service", key: "service_name" },
                                    { label: "Caltana Services", key: "services" }
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
                            </svg> <span className="ml-2">Upload Services File</span>
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
                                        <span>Add Services</span>
                                    </div>
                                </div>
                            }

                            {addType == 1 &&
                                <div className="col-12">
                                    <div className="tbl-wrap border-left border-right">
                                        <BootstrapTable data={serviceData} bordered={ false } 
                                            cellEdit={ serviceCellEdit } 
                                            tableHeaderClass='service-header-table'
                                            tableContainerClass='tbl-services'
                                        >
                                            <TableHeaderColumn isKey={true}
                                                dataField="id"
                                                hidden={true}
                                            >ID</TableHeaderColumn>
                                            <TableHeaderColumn
                                                dataField='service_name' 
                                                width="250" 
                                                dataFormat={serviceNameColFormat}
                                            >
                                            <div className="position-relative">Client Service
                                                <div className="btn-plus btn border position-absolute"  onClick={()=>handleAddNewServices()} >+</div>
                                            </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn 
                                                dataField='services' 
                                                dataSort={ true } 
                                                dataFormat={serviceColFormat}
                                                editable={ false }
                                            >Caltana Services</TableHeaderColumn>
                                        </BootstrapTable>
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
                </div>
            </div>

            <Modal 
                show={addServiceModalShow} 
                onHide={handleAddModalClose} 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Multiselect multiple
                        options={serviceValues} 
                        displayValue="value" 
                        placeholder="Service Values"
                        selectedValues={currentServices.services}
                        onSelect={handleServiceValues} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddModalSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </Layout>
}

export default Services;