import React, { useEffect, useState, useRef } from 'react';
import Toolbar from './Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getBuildings } from '../../requests/buildingApi';
import { getClientServices, getdeliveryModels, updateSettings } from '../../requests/clientApi';
import { addServiceByBuilding, getServiceByBuildingList } from '../../requests/serviceApi';
import useMapping from "../../data/useMapping";

import Services from './services';

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 16,
    backgroundColor: "#F3F3F3",
    border: '1px solid #E5E5E5 !important',
    minWidth: "140px",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '& td': {
      border: '1px solid #E5E5E5 !important',
    },
  },
}))(TableRow);

const settings = {
  inScope: true,
  delivery: true,
  assumptions: true,
  serviceSelected: [],
  deliverySelected: []
}


const BuildingMappingTable = ({ clientRfxs }) => {

  const [serviceSelected, setServiceSelected] = useState(null);
  const [deliverySelected, setDeliverySelected] = useState(null);
  const [deliveryTypes, setDeliveryType] = useState([]);
  const [buildingsData, setBuildingsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  const [checkState, setcheckState] = useState({
    inScope: true,
    assumptions: true,
    delivery: true,
  });

  const { mapping, mutate, error } = useMapping();

  useEffect(() => {
    mapping && !buildingsData.length && generateData();
  },[mapping]);

  const generateData = async () => {
    
    try {
      
      const bres = await getBuildings({client_rfx: clientRfxs?.id});
      const bcopy = JSON.parse(JSON.stringify(bres));

      const sres = await getClientServices();
      const scopy = JSON.parse(JSON.stringify(sres));

      const dModel = await getdeliveryModels();
      const dcopy = JSON.parse(JSON.stringify(dModel));

      const sByBuiding = await getServiceByBuildingList();
      const sByBuidingCopy = JSON.parse(JSON.stringify(sByBuiding));

      bcopy.map(bitem => {
        scopy.map(sitem => {
          const found = sByBuidingCopy?.some(item => item.building === bitem.id && item.client_service === sitem.id);
          if(!found){
            addServiceByBuilding(bitem.id, sitem.id);
          }
        });
      });

      if(mapping?.settings && Object.keys(mapping?.settings).length === 0){

          let selectedServices = [];
          scopy.map(sitem => {
            selectedServices.push({ value: sitem.id, label: sitem.service_name});
          });
          setServiceSelected(selectedServices);

          let selectedDelivery = [];
          dcopy.map(ditem => {
            selectedDelivery.push({ value: ditem.id, label: ditem.name});
          });
          setDeliverySelected(selectedDelivery);

          updateSettings({
            id: clientRfxs?.id, 
            settings: {...settings, serviceSelected: selectedServices, deliverySelected: selectedDelivery}
          });
          mutate();

          setDeliveryType(dcopy);
          setServicesData(scopy);
          setBuildingsData(bcopy);
      }
      else {
        setcheckState({
          inScope: mapping?.settings?.inScope,
          assumptions: mapping?.settings?.assumptions,
          delivery: mapping?.settings?.delivery,
        });
        setServiceSelected(mapping?.settings?.serviceSelected || []);
        setDeliverySelected(mapping?.settings?.deliverySelected || []);
        setDeliveryType(dcopy);
        setServicesData(scopy);
        setBuildingsData(bcopy);
      }

    } catch (error) {
      console.log(error);
        throw error;
    }
  };

  const handleServiceChange = selected => {
    setServiceSelected(selected);
    updateSettings({
      id: clientRfxs?.id, 
      settings: {...mapping?.settings, serviceSelected: selected}
    });
    mutate({...mapping, settings: {...mapping?.settings, serviceSelected: selected}});
  };

  const handleDeliveryChange = selected => {
    setDeliverySelected(selected);
    updateSettings({
      id: clientRfxs?.id, 
      settings: {...mapping?.settings, deliverySelected: selected}
    });
    mutate({...mapping, settings: {...mapping?.settings, deliverySelected: selected}});
};

  const changeCheckStatus = (checkStatus) => {
    setcheckState({ ...checkStatus});
    updateSettings({
      id: clientRfxs?.id, 
      settings: {...mapping?.settings, ...checkStatus}
    });
    mutate({...mapping, settings: {...mapping?.settings, ...checkStatus}});
  }

  console.log("mapping", mapping);
 

  if(!buildingsData.length && !servicesData.length) return <div className="d-flex justify-content-center"><CircularProgress /></div>;

  return (
    <div className="border-0 m-auto">
        <Toolbar
            checkState={checkState}
            changeCheckStatus={changeCheckStatus}
            serviceSelected={serviceSelected}
            handleServiceChange={handleServiceChange}
            servicesData={servicesData}
            deliveryTypes={deliveryTypes}
            deliverySelected={deliverySelected}
            handleDeliveryChange={handleDeliveryChange}
          />
      <TableContainer component={Paper}>
      <Table aria-label="mapping table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Building</StyledTableCell>
            <StyledTableCell>Building type</StyledTableCell>
            <StyledTableCell>Area</StyledTableCell>
            <StyledTableCell>Headcount</StyledTableCell>
            {servicesData.map((item, id) => (
              <StyledTableCell key={item.service_name+id}>{item.service_name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {buildingsData.map((building, id) => (
            <StyledTableRow key={building.site_id+id}>
              <StyledTableCell component="th" scope="row">
                <p style={{width: "160px"}}>{building.site_id}</p>
              </StyledTableCell>
              <StyledTableCell><p style={{width: "120px"}}>{building?.buildingType?.building_type}</p></StyledTableCell>
              <StyledTableCell>{building?.gross_floor_area}</StyledTableCell>
              <StyledTableCell>{building?.headcount}</StyledTableCell>
              {servicesData.map((item, id) => (
                <StyledTableCell key={item.service_name+building.site_id+id}><Services item={item} buildingID={building?.id} deliveryData={deliveryTypes} settings={checkState}/></StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default BuildingMappingTable;
