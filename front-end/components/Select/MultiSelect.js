import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import ReSelect from "./ReSelect";
import { components } from "react-select";

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: "Select all",
  value: "*"
};

const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;
  if (currentValues.some(val => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

const MultiValue = props => {
  let labelToBeDisplayed = `${props.data.label}`;
  if (props.data.value === allOption.value) {
    labelToBeDisplayed = "All Selected";
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};

const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#ffffff",
      // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#E5E5E5" : "#E5E5E5",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      // borderRadius: 0,
      // kill the gap
      // marginTop: 0
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    }),
    placeholder: base => ({ ...base, color: '#000000', fontSize: 14 }),
    option: (base, { isDisabled, isFocused, isSelected }) => {
      return {
        ...base,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? '#ffffff'
          : isFocused
          ? '#f1f1f1'
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? '#000000'
          : '#000000',
        // fontWeight: isSelected ? 700 : null,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...base[':active'],
          backgroundColor: !isDisabled && isSelected && '#f1f1f1'
        }
      };
    },
  };


const animatedComponents = makeAnimated();

const MultiSelect = ({placeholder, optionsData, handleChange, optionSeleted}) => {

    return (
        <ReSelect
          placeholder={placeholder || "Select ..."}
          options={optionsData}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
            MultiValue,
            ValueContainer,
            animatedComponents,
            IndicatorSeparator: () => null
          }}
          onChange={handleChange}
          allowSelectAll={true}
          value={optionSeleted}
          menuPortalTarget={document.body}
          menuPosition={'fixed'} 
          styles={customStyles}
        />
    );
}

export default MultiSelect;
