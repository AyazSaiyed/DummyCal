const BuildingLabels = [
    {
        key: 'building_name',
        name: 'Building Name',
        show: true,
        type: 'text'
    },
    {
        key: 'building_address',
        name: 'Building Address',
        show: true,
        type: 'text'
    },
    {
        key: 'building_type',
        name: 'Building Type',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Head office'},
            {id: 2, value: 'Standard Office'},
            {id: 3, value: 'Data Center'},
            {id: 4, value: 'R&D Labs, Warehouse'},
            {id: 5, value: 'Manufacturing'},
            {id: 6, value: 'Mixed Use'},
            {id: 7, value: 'Other'}
        ]
    },
    {
        key: 'main_region',
        name: 'Main Region',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'APAC'},
            {id: 2, value: 'EMEA'},
            {id: 3, value: 'LATAM'},
            {id: 4, value: 'NOAM'}
        ]
    },
    {
        key: 'sub_region',
        name: 'Sub Region',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'ANZ'},
            {id: 2, value: 'APAC'},
            {id: 3, value: 'ASEAN'},
            {id: 4, value: 'ISA'},
            {id: 5, value: 'North Asia'},
            {id: 6, value: 'South Asia '},
            {id: 7, value: 'CEE'},
            {id: 8, value: 'DACH'},
            {id: 9, value: 'EMEA'},
            {id: 10, value: 'MEA'},
            {id: 11, value: 'North'},
            {id: 12, value: 'South'},
            {id: 13, value: 'UK & IE'},
            {id: 14, value: 'Brazil'},
            {id: 15, value: 'CAR'},
            {id: 16, value: 'EMEA'},
            {id: 17, value: 'GLA'},
            {id: 18, value: 'Mexico'},
            {id: 19, value: 'NLA'},
            {id: 20, value: 'SLA'},
            {id: 21, value: 'APAC'},
            {id: 22, value: 'NOAM'},
        ]
    },
    {
        key: 'country',
        name: 'Country',
        show: true,
        type: 'text'
    },
    {
        key: 'state',
        name: 'State',
        show: true,
        type: 'text'
    },
    {
        key: 'city',
        name: 'City',
        show: true,
        type: 'text'
    },
    {
        key: 'site_id',
        name: 'Site Id',
        show: true,
        type: 'number'
    },
    {
        key: 'floor',
        name: 'Floor',
        show: true,
        type: 'number'
    },
    {
        key: 'floor_sub_area',
        name: 'Floor Sub-Area',
        show: true,
        type: 'number'
    },
    {
        key: 'building_area_type',
        name: 'Client Building Area Type',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Head office'},
            {id: 2, value: 'Standard Office'},
            {id: 3, value: 'Data Center'},
            {id: 4, value: 'R&D Labs, Warehouse'},
            {id: 5, value: 'Manufacturing'},
            {id: 6, value: 'Mixed Use'},
            {id: 7, value: 'Other'}
        ]
    },
    {
        key: 'ownership_type',
        name: 'Ownership Type',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Owned'},
            {id: 2, value: 'Leased'}
        ]
    },
    {
        key: 'lease_type',
        name: 'Lease Type',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Full Service Gross'},
            {id: 2, value: 'Modified Gross'},
            {id: 3, value: 'Absolute Net'},
            {id: 4, value: 'NetNetNet'}
        ]
    },
    {
        key: 'headcount',
        name: 'Headcount',
        show: true,
        type: 'number'
    },
    {
        key: 'gross_floor_area',
        name: 'Gross Floor Area',
        show: true,
        type: 'number'
    },
    {
        key: 'gross_floor_area_units',
        name: 'Gross Floor Area Units',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'sqft'},
            {id: 2, value: 'sq meters'},
        ]
    },
    {
        key: 'green_area',
        name: 'Green Area',
        show: true,
        type: 'number'
    },
    {
        key: 'green_area_units',
        name: 'Green Area Units',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'sqft'},
            {id: 2, value: 'sq meters'},
            {id: 3, value: 'acres'}
        ]
    },
    {
        key: 'service_level',
        name: 'Service Level',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Platinum'},
            {id: 2, value: 'Gold'},
            {id: 3, value: 'Silver'},
            {id: 4, value: 'Bronze'}
        ]
    },
    {
        key: 'go_live_date',
        name: 'Go-Live Date',
        show: true,
        type: 'date'
    },
    {
        key: 'scope_pursuit',
        name: 'In Scope of Pursuit',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Y'},
            {id: 2, value: 'N'}
        ]
    },
    {
        key: 'days_operation',
        name: 'Days of Operation',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: 'Monday'},
            {id: 2, value: 'Tuesday'},
            {id: 3, value: 'Wednesday'},
            {id: 4, value: 'Thursday'},
            {id: 5, value: 'Friday'},
            {id: 6, value: 'Saturday'},
            {id: 7, value: 'Sunday'},
        ]
    },
    {
        key: 'hours_operation',
        name: 'Hours of Operation',
        show: true,
        type: 'select',
        values: [
            {id: 1, value: '12am'},
            {id: 2, value: '1am'},
            {id: 3, value: '2am'},
            {id: 4, value: '3am'},
            {id: 5, value: '4am'},
            {id: 6, value: '5am'},
            {id: 7, value: '6am'},
            {id: 8, value: '7am'},
            {id: 9, value: '8am'},
            {id: 10, value: '9am'},
            {id: 11, value: '10am'},
            {id: 12, value: '11am'},
            {id: 13, value: '12am'},
        ]
    },
    {
        key: 'worker_shifts',
        name: 'How many worker shifts?',
        show: true,
        type: 'number'
    }
]

export default BuildingLabels;