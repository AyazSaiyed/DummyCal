import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultiSelect from '../../Select/MultiSelect';


import { ToolbarWrapper, SelectionWrapper } from './toolbar.style';


const Toolbar = ({ checkState,
            changeCheckStatus, serviceSelected, 
            handleServiceChange, servicesData, deliveryTypes, deliverySelected, 
            handleDeliveryChange 
          }) => {

  const [serviceData, setServiceData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);


  const handleChange = (event) => {
    changeCheckStatus({ ...checkState, [event.target.name]: event.target.checked});
  };

  useEffect(() => {
    let data = [];
    servicesData.map((item) => {
      data.push({ value: item.id, label: item.service_name});
    });
    setServiceData(data);
  },[servicesData]);

  useEffect(() => {
    let data = [];
    deliveryTypes.map((item) => {
      data.push({ value: item.id, label: item.name});
    });
    setDeliveryData(data);
  },[deliveryTypes]);

  return (
    <>
    <ToolbarWrapper>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkState.inScope}
              onChange={handleChange}
              name="inScope"
              style ={{
                color: "#000000",
              }}
            />
          }
          label="In Scope"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkState.assumptions}
              onChange={handleChange}
              name="assumptions"
              style ={{
                color: "#000000",
              }}
            />
          }
          label="Assumptions"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkState.delivery}
              onChange={handleChange}
              name="delivery"
              style ={{
                color: "#000000",
              }}
            />
          }
          label="Delivery Model"
        />
        <SelectionWrapper>
          <MultiSelect
              optionSeleted={serviceSelected}
              handleChange={handleServiceChange}
              optionsData={serviceData}
              placeholder="All Services"
          />
        </SelectionWrapper>
        <SelectionWrapper>
          <MultiSelect
              optionSeleted={deliverySelected}
              handleChange={handleDeliveryChange}
              optionsData={deliveryData}
              placeholder="Delivery Types"
          />
        </SelectionWrapper>
      </FormGroup>
    </ToolbarWrapper>
    </>
  );
};

export default Toolbar;
