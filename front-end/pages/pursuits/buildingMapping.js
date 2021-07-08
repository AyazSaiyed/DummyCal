// pages/pursuits/buildingmapping.js

import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Layout from "../../components/Layout";
import Stepper from "../../components/Stepper";
import _apiService from '../../requests/api';
import useUser from "../../data/useUser";
import Router from "next/router";
import dynamic from 'next/dynamic';
import { getUser } from "../../requests/userApi";


const BuildingMappingTable = dynamic(() => import('../../components/BuildingMapping'), { ssr: false });

const BuildingMapping = () => {

    const { mutate, loggedIn } = useUser();
    const [alertShow, setAlertShow] = useState(false);
    const [clientRfxs, setClientRfxs] = useState({});
    const [customer, setCustomer] = useState({});

    // useEffect(() => {
    //     if (!loggedIn) Router.replace("/auth/login");
    // }, [loggedIn])

    useEffect(() => {
        if(sessionStorage.getItem('client_rfxs') === null) {
            setAlertShow(true);
        }
        else {
            let currentUser = getUser();
            let clientRfxs = JSON.parse(sessionStorage.getItem('client_rfxs'));
            setClientRfxs(clientRfxs);

            setCustomer({
                email: currentUser.email,
                name: currentUser.name,
                userId: (currentUser.id).toString(),
                client_rfx: clientRfxs.id
            });
        }
    }, []);

    const onPursuitSubmit = (e) => {
        e.preventDefault();
        Router.push("/pursuits/buildingInfo");
    }

    const handleAlertClose = () => {
        setAlertShow(false);
        Router.push("/pursuits/newPursuit");
    }


    return <Layout>
        <div className="container">
            <Stepper active="4" />

            {/* <div className="card border-0 w-50 m-auto">
                <div className="card-body">
                    <p className="form-label text-center h3">Building Mapping</p>
                </div>
            </div> */}

                { alertShow ? 
                    <div className="card border-0 m-auto">
                    <Alert variant="danger" className="w-50 m-auto" onClose={handleAlertClose} dismissible>
                        <Alert.Heading>You got an error!</Alert.Heading>
                        <p>
                            Please complete creating pursuit information first.
                        </p>
                    </Alert>
                    </div> 
                    :
                    <>
                    <div className="border-0 m-auto mb-10">
                        <BuildingMappingTable clientRfxs={{...clientRfxs, id: 8}} />
                    </div>

                    <div className="row mt-5">
                        <div className="col-6 text-right">
                            <button type="button" className="btn btn-primary">Save for Later</button>
                        </div>
                        <div className="col-6 text-left">
                            <button type="button" className="btn btn-main" onClick={onPursuitSubmit}>Next</button>
                        </div>
                    </div>
                    </>
                }

        </div>
    </Layout>

}

export default BuildingMapping;