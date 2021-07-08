// pages/pursuits/stepper.js

import Link from "next/link";
import "./Stepper.scss";
import { Button } from 'react-bootstrap';

const Stepper = props => {

    return (
        <div className="d-flex justify-content-between">
            <div className="stepper-wrap d-flex justify-content-between flex-auto">
                <div className="step-item">
                    <Link href='/pursuits/newPursuit'>
                        <span className={props.active == 1 ? 'active' : ''}>Pursuit Info</span>
                    </Link>
                </div>
                <div className="step-item">
                    <Link href='/pursuits/buildingInfo'>
                        <span className={props.active == 2 ? 'active' : ''} >Building Info</span>
                    </Link>
                </div>
                <div className="step-item">
                    <Link href='/pursuits/services'>
                        <span className={props.active == 3 ? 'active' : ''}>Services</span>
                    </Link>
                </div>
                <div className="step-item">
                    <Link href='/pursuits/buildingMapping'>
                        <span className={props.active == 4 ? 'active' : ''}>Building Service Mapping</span>
                    </Link>
                </div>
                <div className="step-item">
                    <Link href='#'>
                        <span className={props.active == 5 ? 'active' : ''}>Pricing</span>
                    </Link>
                </div>
                <div className="step-item">
                    <Link href='#'>
                        <span className={props.active == 6 ? 'active' : ''}>View/Export</span>
                    </Link>
                </div>
            </div>
            <div className="btn-wrap d-flex">
                <div className="item">
                    {props.back ? 
                    <Link href={props.back}>
                        <span className="btn btn-main my-0 mr-3">Back</span>
                    </Link>
                    :
                    <Link href='#'>
                        <span className="btn btn-main my-0 mr-3">Back</span>
                    </Link>
                    }
                </div>
                <div className="item">
                    {props.next ? 
                    <Link href={props.next}>
                        <span className="btn btn-black my-0">Next</span>
                    </Link>
                    :
                    <Link href='#'>
                        <span className="btn btn-black my-0">Next</span>
                    </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Stepper;