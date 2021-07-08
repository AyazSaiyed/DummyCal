import React, { useState, useEffect, useMemo } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dropdown from "react-bootstrap/Dropdown";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import PrimaryModal from "../Modal/PrimaryModal";
import { usePrimaryModal } from "../../data/usePrimaryModal";
import AssumptionModal from './AssumptionModal';
import produce from "immer";

import SingleSelect from '../Select/SingleSelect';
import { getServiceByBuildingList, updateServiceByBuilding } from '../../requests/serviceApi';
import { addAssumption, updateAssumption, deleteAssumption } from '../../requests/assumptionApi';
import './services.scss';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const Services = ({item, buildingID, deliveryData, settings}) => {
  
  const [serviceMapID, setServiceMapID] = useState(null);
  const [inScope, setInScope] = useState(false);
  const [deliveryTypeSelected, setdeliveryTypeSelected] = useState(null);
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const [assumptions, setAssumptions] = useState([]);
  const [assType, setAssType] = useState("add");
  const [assItem, setAssItem] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropContent, setBackdropContent] = useState("");
  const [globalStatus, setGlobalStatus] = useState({
    inScope: true,
    delivery: true,
    assumptions: true,
  });
  const classes = useStyles();

  const {
    openPrimary: openAssumptionModal,
    togglePrimary: toggleAssumptionModal,
  } = usePrimaryModal();

  useEffect(() => {
    if(settings){
      const inScope = settings?.inScope;
      const delivery = settings?.delivery;
      const assumptions = settings?.assumptions;

      if(inScope !== globalStatus.inScope) setGlobalStatus({...globalStatus, inScope: inScope});
      if(delivery !== globalStatus.delivery) setGlobalStatus({...globalStatus, delivery: delivery});
      if(assumptions !== globalStatus.assumptions) setGlobalStatus({...globalStatus, assumptions: assumptions});
    }
  },[settings]);

  useEffect(() => {
    if(item.id && buildingID) generateData();
  },[]);

  const generateData = async () => {

    try {
      const sByBuiding = await getServiceByBuildingList({building: buildingID, client_service: item.id});
      const sByBuidingCopy = JSON.parse(JSON.stringify(sByBuiding));

      const service = sByBuidingCopy[0];
      setServiceMapID(service?.id);
      setInScope(service?.inScope);
      setAssumptions([...service?.assumptions]);
      service?.deliveryModel?.id && setdeliveryTypeSelected({ value: service?.deliveryModel?.id, label: service?.deliveryModel?.name});

    } catch (error) {
      console.log(error);
        throw error; 
    }
  };

  useEffect(() => {
    let data = [];
    deliveryData.map((item) => {
      data.push({ value: item.id, label: item.name});
    });
    setDeliveryTypes(data);
  },[deliveryData])

  const handleScopeChange = (event) => {
    const isInScope = inScope;
    (async  () => {
      try {
        const serviceRes = await updateServiceByBuilding({
          id: serviceMapID,
          data: {
            inScope: !isInScope
          },
          building: buildingID, 
          client_service: item.id
        });
        const resCopy = JSON.parse(JSON.stringify(serviceRes));
        if(resCopy) {
          //
        }
      } catch (error) {
        console.log(error);
          throw error;
      }
    })();
    setInScope(!inScope);
  };

   const handleDeliveryTypeChange = selected => {
    (async  () => {
      try {
        const serviceRes = await updateServiceByBuilding({
          id: serviceMapID,
          data: {
            deliveryModel: selected.value
          },
          building: buildingID, 
          client_service: item.id
        });
        const resCopy = JSON.parse(JSON.stringify(serviceRes));
        if(resCopy) {
          //
        }
      } catch (error) {
        console.log(error);
          throw error;
      }
    })();
    setdeliveryTypeSelected(selected);
  };

  const addAssumptions = (data) => {
    handleToggleBackdrop();
    (async  () => {
        try {
          const assRes = assType === "add" ? await addAssumption({
            name: data.name,
            value: data.value,
            unit: data.unit,
            source: data.source?.value,
            service_by_building: serviceMapID
          }) : await updateAssumption({id: data?.id, data: {
            name: data.name,
            value: data.value,
            unit: data.unit,
            source: data.source?.value
          }});
          const resCopy = JSON.parse(JSON.stringify(assRes));
          if(resCopy) {
            if(assType === "add"){
              setAssumptions([...assumptions, resCopy]);
            }
            else {
              setAssumptions(produce((draft) => {
                  const item = draft.find((a) => a.id === data?.id);
                  item.name = resCopy.name;
                  item.value = resCopy.value;
                  item.unit = resCopy.unit;
                  item.source = resCopy.source;
               })
              );
            }
            handleCloseBackdrop();
            toggleAssumptionModal();
          }
      } catch (error) {
        console.log(error);
          throw error;
      }
    })();
  }

  const delAssumption = (id) => {
    (async  () => {
      try {
        const assRes = await deleteAssumption({id: id});
        if(assRes.data) {
            setAssumptions(produce((draft) => {
              const index = draft.findIndex(a => a.id === id)
              if (index !== -1) draft.splice(index, 1)
          })
          );
        }
        toggleAssumptionModal();
      } catch (error) {
        console.log(error);
          throw error;
      }
    })();
  }

  const toggleModal = (type, item) => {
    setAssType(type);
    setAssItem(item);
    toggleAssumptionModal();
  }

  const handleCloseBackdrop = () => {
    setBackdropContent("");
    setOpenBackdrop(false);
  };

  const handleToggleBackdrop = (content) => {
    setOpenBackdrop(!open);
    setBackdropContent(content || "");
  };

  return (
    <>
    <div>
      <div className="d-flex justify-content-between">
        {globalStatus.inScope && 
          <FormControlLabel 
              control={
                      <Checkbox
                      checked={inScope}
                      onChange={handleScopeChange}
                      name="inScope"
                      style ={{
                      color: "#000000",
                      }}
                  />
                  } 
          />
        }

        {inScope &&  globalStatus.delivery &&
        <>
        <div className="delivery-select">
          <SingleSelect
              optionSeleted={deliveryTypeSelected}
              handleChange={handleDeliveryTypeChange}
              optionsData={deliveryTypes}
              placeholder="Delivery Type"
          />
        </div>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => console.log("apply all")}>Add to all building</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </> }
      </div>
      {inScope && globalStatus.assumptions &&
        <>
      <div className="d-flex flex-column">
              <span>Assumptions</span>
              {!!assumptions.length && assumptions.map((item, id) => 
                <div className="d-flex assumption-item" key={id} onClick={() => toggleModal("edit", item)}><span className="assumption-name bg-light text-dark">{item?.name}</span><span className="assumption-value bg-light text-dark">{item?.value} {item?.unit}</span></div>
              )}
      </div>
      <div className="d-flex">
        <span className="add-assumptions" onClick={() => toggleModal("add", null)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7.78369 7.78384V3.45944H8.78369V7.78384L12.5415 7.78384V8.78384H8.78369V12.5405H7.78369V8.78384H3.46042V7.78384L7.78369 7.78384Z" fill="black"/>
            </svg>
        </span>
      </div>
      </> }
    </div>
      <PrimaryModal
            openPrimary={openAssumptionModal}
            togglePrimary={toggleAssumptionModal}
            width={360}
            scrollType="body"
            hideClose
        >
          <AssumptionModal
            addAssumptions={addAssumptions}
            delAssumption={delAssumption}
            assType={assType}
            assItem={assItem}
            toggleAssumptionModal={toggleAssumptionModal}
          />
      </PrimaryModal>
      <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleCloseBackdrop}>
        <div className="d-flex flex-column justify-content-center">
          <CircularProgress color="inherit" />
          <h4 className="p-2">{backdropContent}</h4>
        </div>
      </Backdrop>
    </>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));


export default Services;
