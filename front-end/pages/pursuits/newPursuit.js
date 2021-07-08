// pages/pursuits/new.js

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Stepper from "../../components/Stepper";
import { Form, Row, Col } from 'react-bootstrap';
import _apiService from '../../requests/api';
import Router from "next/router";
import Alert from 'react-bootstrap/Alert';

import Multiselect from 'multiselect-react-dropdown';

import Industries from "../../data/industries";
import Regions from "../../data/regions";

const NewPursuit = () => {

    const [pageStatus, setPageStatus] = useState('new');
    const [alertShow, setAlertShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [regionError, setRegionError] = useState({});

    useEffect(() => {
        if(sessionStorage.getItem('client_rfxs') !== null) {
            setPageStatus('edit');
            setClientRfxs();
        }
    }, []);

    const [clientName, setClientName] = useState('');
    const [clientIndustry, setClientIndustry] = useState(Industries[0]);
    const [outSourcing, setOutSourcing] = useState('');
    const [rfpDeadline, setRfpDeadline] = useState('');
    const [goLiveDate, setGoLiveDate] = useState('');

    const [region, setRegion] = useState([]);
    const [leadRegion, setLeadRegion] = useState(Regions[0].name);
    const [contractTerm, setContractTerm] = useState('');
    const [submittalPhase, setSubmittalPhase] = useState('');
    const [commercialModel, setCommercialModel] = useState('');

    const [solutionLead, setSolutionLead] = useState('');
    const [commercialLead, setCommercialLead] = useState('');
    const [bdmManager, setbdmManager] = useState('');
    const [globalLead, setGlobalLead] = useState('');
    const [sourcingLead, setSourcingLead] = useState('');

    const setClientRfxs = () => {
        let client_rfxs = JSON.parse(sessionStorage.getItem('client_rfxs'));
        setClientName(client_rfxs.data.clientName);
        setClientIndustry(client_rfxs.data.clientIndustry);
        setOutSourcing(client_rfxs.data.generation_of_outsourcing);
        setRfpDeadline(client_rfxs.data.rfpDeadline);
        setGoLiveDate(client_rfxs.data.goLiveDate);
        setRegion(client_rfxs.data.region);
        setContractTerm(client_rfxs.data.contract_term);
        setSubmittalPhase(client_rfxs.data.submittal_phase);
        setCommercialModel(client_rfxs.data.commercial_model);
        setSolutionLead(client_rfxs.data.solutionLead);
        setCommercialLead(client_rfxs.data.commercialLead);
        setbdmManager(client_rfxs.data.bdmManager);
        setGlobalLead(client_rfxs.data.globalLead);
        setSourcingLead(client_rfxs.data.sourcingLead);
    }

    const createNewPursuit = async (data) => {

        try {
            const res = await _apiService.post(`client_rfxs/new_form/`, data);
            if(res.status = 201) {
                sessionStorage.setItem('client_rfxs', JSON.stringify({id: res.data.client_rfx_id, data: data}));
                Router.push("/pursuits/buildingInfo");
            } else {
                setAlertShow(true);
            }
        } catch (error) {
            setAlertShow(true);
        }
    };

    const updatePursuit = async (data) => {
        // 
    }

    const handleRegionSelect = (selectedList, selectedItem) => {
        setRegion(selectedList);
    }

    const getToday = () => {
        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(today);
        return today;
    }

    const onPursuitSubmit = (e) => {

        const form = e.currentTarget;

        if (form.checkValidity() !== false) {
            e.preventDefault();
            e.stopPropagation();

            if(region.length == 0) {
                setRegionError({name: 'Please select Region', class: 'invalid'});
            }

            let data = {
                clientName: clientName,
                clientIndustry: clientIndustry,
                generation_of_outsourcing: outSourcing,
                rfpDeadline: rfpDeadline,
                goLiveDate: goLiveDate,
    
                region: region,
                lead_region: leadRegion,
                contract_term: contractTerm,
                submittal_phase: submittalPhase,
                commercial_model: commercialModel,
    
                solutionLead: solutionLead,
                commercialLead: commercialLead,
                bdmManager: bdmManager,
                globalLead: globalLead,
                sourcingLead: sourcingLead
            }

            if(pageStatus == 'new') {
                createNewPursuit(data);
            } else {
                // updatePursuit(data);
                Router.push("/pursuits/buildingInfo");
            }
        }

        setValidated(true);

    }

    return <Layout>
        <div className="container">
            <Stepper active="1" back="/pursuits/dashboard" next="/pursuits/buildingInfo"/>
            <div className="card border-0 w-50 m-auto">
                { alertShow && 
                    <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                        <Alert.Heading>You got an error!</Alert.Heading>
                        <p>
                            Please check pursuit fields.
                        </p>
                    </Alert>
                }

                <div className="card-body">
                    <Form noValidate validated={validated} onSubmit={onPursuitSubmit}>
                        <p className="form-label text-center h4 font-main-color">Client Profile & Pursuit Information</p>
                        <div className="p-3 mb-4">
                            <Form.Group as={Row} controlId="forClientName">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text"
                                        value={clientName}
                                        placeholder="Client Name"
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forClientIndustry">
                                <Col >
                                    <Form.Control 
                                        as="select"
                                        onChange={(e) => setClientIndustry(e.target.value)}
                                        placeholder="Select Client Industry..."
                                        value={clientIndustry}
                                    >
                                        <option>Select Client Industry...</option>
                                        {Industries.map((item, idx) => {
                                            return <option key={idx} value={item}>{item}</option>;
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forOutSourcing">
                                <Col >
                                    <Form.Control
                                        required
                                        type="number"
                                        value={outSourcing}
                                        placeholder="Generation of OutSourcing"
                                        onChange={(e) => setOutSourcing(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forRFPDeadline">
                                <Col >
                                    <Form.Control
                                        required
                                        type="text"
                                        value={rfpDeadline}
                                        placeholder="RFP Deadline"
                                        onFocus={(e) => e.target.type = 'date'}
                                        onChange={(e) => setRfpDeadline(e.target.value)} />
                                </Col>
                                <Col >
                                    <Form.Control
                                        required
                                        type="text"
                                        value={goLiveDate}
                                        placeholder="Go Live Date"
                                        onFocus={(e) => e.target.type = 'date'}
                                        onChange={(e) => setGoLiveDate(e.target.value)} />
                                </Col>
                            </Form.Group>
                        </div>

                        <p className="form-label text-center h4 font-main-color">Solution Information</p>
                        <div className="p-3 mb-4">
                            <Form.Group as={Row} controlId="forRegion">
                                
                                <Col className={regionError.class}>
                                    <Multiselect 
                                        multiple
                                        options={Regions} 
                                        displayValue="name" 
                                        placeholder="Regions"
                                        selectedValues={region}
                                        onSelect={handleRegionSelect} />

                                    <Form.Control.Feedback type='invalid'>
                                        { regionError.name }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forLeadRegion">
                                <Col >
                                    <Form.Control 
                                        required
                                        as="select" 
                                        value={leadRegion} 
                                        placeholder="Load Region" 
                                        onChange={e => setLeadRegion(e.target.value)}>
                                        {Regions.map((item, idx) => {
                                            return <option key={idx} value={item.name}>{item.name}</option>;
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forContract">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="number" 
                                        value={contractTerm}
                                        placeholder="Contract Term" 
                                        onChange={(e) => setContractTerm(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forSubmittalPhase">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={submittalPhase}
                                        placeholder="Submittal phase" 
                                        onChange={(e) => setSubmittalPhase(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forCommercialModel">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={commercialModel}
                                        placeholder="Commercial model" 
                                        onChange={(e) => setCommercialModel(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                        </div>

                        <p className="form-label text-center h4 font-main-color">Pursuit Team</p>
                        <div className="p-3 mb-4">
                            <Form.Group as={Row} controlId="forSolutionLead">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={solutionLead}
                                        placeholder="Solution development lead" 
                                        onChange={(e) => setSolutionLead(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forCommercialLead">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={commercialLead}
                                        placeholder="Commercial lead" 
                                        onChange={(e) => setCommercialLead(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forBDMManager">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={bdmManager}
                                        placeholder="BDM manager" 
                                        onChange={(e) => setbdmManager(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forGlobalLead">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={globalLead}
                                        placeholder="Global commercial lead" 
                                        onChange={(e) => setGlobalLead(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="forSourcingLead">
                                <Col >
                                    <Form.Control 
                                        required
                                        type="text" 
                                        value={sourcingLead}
                                        placeholder="Sourcing lead" 
                                        onChange={(e) => setSourcingLead(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        </div>

                        <div className="row mt-5">
                            <div className="col-6 text-right">
                                <button type="button" className="btn btn-primary">Save for Later</button>
                            </div>
                            <div className="col-6 text-left">
                                <button type="submit" className="btn btn-main">Next</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </Layout>

}

export default NewPursuit;