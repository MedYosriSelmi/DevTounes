import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    PagingState,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering,
    EditingState
} from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
  Grid,
  Table,
  TableBandHeader,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Equalizer from '@mui/icons-material/Equalizer';
import People from '@mui/icons-material/People';
import PieChart from '@mui/icons-material/PieChart';


import Chooser from "./ChooseGrid"



import Tour from 'reactour'

import Switch from '@mui/material/Switch';






const label = { inputProps: { 'aria-label': 'Color switch demo' } };
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const getRowId = row => row.id;
const iconStyles = {
  mb: 0.5,
  ml: 1,
  verticalAlign: 'middle',
};


const BandCell = ({
  children, tableRow, tableColumn, column, classes, ...restProps
}) => {
  let icon = null;
  if (column.title === 'Population') icon = <People sx={iconStyles} />;
  if (column.title === 'Nominal GDP') icon = <Equalizer sx={iconStyles} />;
  if (column.title === 'By Sector') icon = <PieChart sx={iconStyles} />;
  return (
    <TableBandHeader.Cell
      {...restProps}
      column={column}
    >
      <strong>
        {children}
        {icon}
      </strong>
    </TableBandHeader.Cell>
  );
};

const HeaderCell = ({ classes, className, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={className}
    
  />
);

export default (props) => {

  const {columnBands,columns,contriess
    ,editingStateColumnExtensions,
    projectCode,
    selected,
    orginals_html,
    files_names,
    depaced_value
  } = props





  //files to select 

  
  const [contries,setCountries] = useState(contriess)
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = contries.length > 0 ? contries[contries.length - 1].id + 1 : 0;
      changedRows = [
        ...contries,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = contries.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = contries.filter(row => !deletedSet.has(row.id));
    }
    setCountries(changedRows);
  };


  const [formatSelected, setformatSelected] = React.useState('default');


  const handleChange = (event) => {

    setformatSelected(event.target.value);
    //get all columns of that row 
    localStorage.setItem("filter",event.target.value)
  
 
  }



  let  steps = [
    {
      selector: '#ALl',
      content: "Hi this Shadow knight Again Enjoy it ",
    },

   
   
   
  ]







  let [openTour,setOpenTour] = useState(true)
  const closeTheTour = () =>{
    setOpenTour(false)
  }



  


  useEffect(()=>{
    let x = []
    x.push(files_names)
    x.push(new Date())
    x.push(columnBands)
    x.push(contries)
    x.push(columns)
    x.push(editingStateColumnExtensions)
    x.push(orginals_html)
    x.push(selected)
    localStorage.setItem("recall",0)
    localStorage.setItem(projectCode,JSON.stringify(x))
  },[])


  useEffect(()=>{
    const itemSet = (localStorage.getItem(projectCode) !== null);
    //item exist
    if (itemSet)  {
   
      let local = JSON.parse(localStorage.getItem(projectCode)) 
   
      setCountries(local[3])
    }

  },[localStorage.getItem("recall")])




  let [dispaced_values,setDipaced ] = useState(depaced_value)
   useEffect(()=>{
      if(depaced_value){
        setformatSelected(depaced_value ? columnBands[0]?.title : "default")
        localStorage.setItem("filter",depaced_value ? columnBands[0]?.title : "default")
      }else{
        setformatSelected(depaced_value ? columnBands[0]?.title : "default")
        localStorage.setItem("filter",depaced_value ? columnBands[0]?.title : "default")
      }
  },[])
//file names
  return (

    <>
     
      <Switch {...label} defaultChecked 
      checked={true}
      />

      <h3> Project Code  : {projectCode}</h3>
      
    <div id="ALl">
     <Tour
        steps={steps}
        isOpen={openTour}
        onRequestClose={() => closeTheTour()}
        rounded={5}
        />

      
     <Box sx={{ minWidth: 120 }} id="selectDisplayingType">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Display Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="formatSelected"
          value={formatSelected}
          label={formatSelected}
          onChange={handleChange}
        >
       {!depaced_value && <MenuItem value={"default"}>Multi Level</MenuItem> }
          {columnBands.map(el =>(
            
  <MenuItem key={el} value={el.title}>{el.title}</MenuItem>
    
        
         
            
          ))}
      
        </Select>
      </FormControl>
    </Box>


    {formatSelected=="default" ? <>
    < div  data-aos="fade-up"
     data-aos-duration="3000">
         <Paper>
      <Grid
        rows={contries}
        columns={columns}
        getRowId={getRowId}
      >
            <FilteringState defaultFilters={[]} />
        <IntegratedFiltering  />
          <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />
        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[0]}
          columnExtensions={editingStateColumnExtensions}
        />
        <Table
          
        />
          <TableEditRow />
        <TableEditColumn
        
        />
        <TableHeaderRow
          cellComponent={HeaderCell}
        />
         <TableFilterRow />
        <TableBandHeader
          columnBands={columnBands}
          cellComponent={BandCell}
        />
         
         <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
    </div>
 

   
    </> 
    :
    < div  data-aos="fade-up"
    data-aos-duration="3000">
    <Chooser 
    rowss={contries}
  
    editingStateColumnExtensions={editingStateColumnExtensions}
    columnBands={columnBands}
    columns={columns}
    filter={formatSelected}
    selected={selected}
    orginals_html={orginals_html}
    projectCode = {projectCode}
    />
    </div>
    }
  
  </div>
    </>
    
  );
};
