import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import SingleSelect from '../Select/SingleSelect';
import DeleteIcon from '@material-ui/icons/Delete';

import { sourcesData } from './data';

const AssumptionModal = ({ addAssumptions, delAssumption, assType, assItem, toggleAssumptionModal }) => {

    const [assumption, setAssumption] = useState({
        aName: '',
        aValue: '',
        aUnit: '',
    });

    const [sourceSelected, setSourceSelected] = useState(null);

    useEffect(() => {
        if(assItem) {
            setAssumption({ ...assumption,
                id: assItem?.id, 
                aName: assItem?.name,
                aValue: assItem?.value,
                aUnit: assItem?.unit
              });
            handleSourceChange({ value: assItem?.source, label: assItem?.source[0].toUpperCase() + assItem?.source.slice(1).toLowerCase()});
        }
    },[assItem]);

    const handleChange = (event) => {
        setAssumption({ ...assumption, [event.target.name]: event.target.value});
    };

    const handleSourceChange = selected => {
        setSourceSelected(selected);
     };

    const submitAddAssumption = () => {
        if(assumption.aName) {
            addAssumptions({
                name: assumption.aName,
                value: assumption.aValue,
                unit: assumption.aUnit,
                source: sourceSelected,
                id: assumption?.id || null
            });
        }
    }

    const deleteAssumption = () => {
        delAssumption(assumption?.id);
    }
 
    return (
        <div className="card p-2">
        <p style={{paddingLeft: 20, fontWeight: "700", paddingTop: 20}}>{assType == "add" ? "Add Assumption" : "Edit Assumption"}</p>
            <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name <span style={{fontSize: "12px", fontWeight: '700'}}>required</span></label>
                        <input
                            value={assumption.aName}
                            type="text"
                            className="form-control"
                            id="aName"
                            name="aName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Value</label>
                        <input
                            value={assumption.aValue}
                            type="number"
                            className="form-control"
                            id="aValue"
                            name="aValue"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Unit</label>
                        <input
                            value={assumption.aUnit}
                            type="text"
                            className="form-control"
                            id="aUnit"
                            name="aUnit"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Source</label>
                        <SingleSelect
                            optionSeleted={sourceSelected}
                            handleChange={handleSourceChange}
                            optionsData={sourcesData}
                            placeholder="Select"
                     />
                    </div>
                    
                    {assType === "edit" &&
                        <div className="d-flex flex-auto">
                            <Button startIcon={<DeleteIcon />} onClick={deleteAssumption}>Delete</Button>
                            <Button startIcon={<DeleteIcon />} onClick={toggleAssumptionModal}>Delete all</Button>
                        </div>
                    }

                    <div className="d-flex justify-content-between flex-auto">
                        <Button onClick={toggleAssumptionModal}>Cancel</Button>
                        <Button variant="contained">Apply to all</Button>
                        <Button variant="contained" onClick={submitAddAssumption}>Apply</Button>
                    </div>
            </div>
    </div>
    );
  };
  
  export default AssumptionModal;
