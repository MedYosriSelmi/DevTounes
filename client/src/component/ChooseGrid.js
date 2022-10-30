import React,{useState,useEffect,
  useRef, useCallback

}  from "react";

import Paper from '@mui/material/Paper';
import {
    EditingState,
    PagingState,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,

  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { GridExporter } from '@devexpress/dx-react-grid-export';

import {CopyToClipboard} from 'react-copy-to-clipboard';




import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import axios from "axios"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import JsFileDownloader from 'js-file-downloader';
import Slide from '@mui/material/Slide';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import TextField from '@mui/material/TextField';
import saveAs from 'file-saver';
const getRowId = row => row.id;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ChooseGrid = (props) =>{
    let {rowss,editingStateColumnExtensions,columnBands,columns,filter,selected,
      orginals_html,projectCode
    
    } = props

   
    const [columnss,setColumn] = useState([]);
    const [rows, setRows] = useState([]);
    let [pageSizes] = useState([5, 10, 15, 0]);
    const [editingStateColumnExtensionss,setEditor] = useState([]);
    useEffect(()=>{
     
        if(localStorage.getItem("filter")){
            let filter = localStorage.getItem("filter")
           let data =  rowss.filter(el => el.file === filter)
            let column_banded = columnBands.filter(el => el.title == filter)[0].children
            let column_result = []
           
          
            let editing = []
            for(let i=0;i<column_banded.length;i++){
              let t = columns.filter(el => el.name ==column_banded[i].columnName)[0]
            
              let e = editingStateColumnExtensions.filter(el => el.columnName == column_banded[i].columnName)[0]
              column_result.push(t)
              editing.push(e)
            }
            editing= editing.filter(e => e !== undefined);
         
         
            setColumn(column_result)
            setEditor(editing)
            setRows(data)
        }
      
    },[localStorage.getItem("filter")])
   
    
      const commitChangess = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
          const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
          changedRows = [
            ...rows,
            ...added.map((row, index) => ({
              id: startingAddedId + index,
              ...row,
            })),
          ];
        }
        if (changed) {
          changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        
        }
        if (deleted) {
          const deletedSet = new Set(deleted);
          changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
       
        let changes_made = changedRows 
        let no_changes = rowss.filter(el => el.file !=localStorage.getItem("filter"))
        let global_again = changes_made.concat(no_changes)
        let local = JSON.parse(localStorage.getItem(projectCode)) 

        local[3] = global_again
        local = [...local, local[3]]
        localStorage.setItem(projectCode,JSON.stringify(local))
        let recall = localStorage.getItem("recall")
        recall+=1
        localStorage.setItem("recall",recall)
        
        };





 
      const [open, setOpen] = React.useState(false);



      

      


  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = React.useState(selected[0]?.label);

  const [rule, setRule] = React.useState('translated_text');

  const handleChangeRule = (event) => {
    let changed_value = event.target.value
    if(changed_value.includes("translated_text")){
      setRule(event.target.value);
    }else{
      return toast.error("tag translated_text cannot changed")
    }
  };




      const replacer = () =>{
        let filetrer = localStorage.getItem("filter").split(".")[0]+"auto"
       
        let file_language =localStorage.getItem("filter").split(".")[0]+age
        let orginal_html = orginals_html.filter(el => el.name == localStorage.getItem("filter"))[0][localStorage.getItem("filter")]
       let left_rule = rule.split("translated_text")[0]
       let right_rule = rule.split("translated_text")[1]




        for(let i=0;i<rows.length;i++){
          if(orginal_html.includes(rows[i][String(filetrer)])){
          
            orginal_html = orginal_html.replaceAll(rows[i][String(filetrer)],
              `${left_rule}${rows[i][String(file_language)]}${right_rule}`
             ) 
          }
        }
      
        return  orginal_html   
      }
    
      const   htmlDownload = async() =>{
     await axios.post("http://185.215.166.217/api/download_file",{ original_html_file:replacer()
 
    })
    // res.blob()
    axios({
      url:"http://185.215.166.217/api/file",
      method:"GET",
      responseType:"blob"
    }).then(res =>{
      new JsFileDownloader({ 
        url: '/file',
        contentType: 'multipart/form-data; boundary=something' // or false to unset it
      })
    })
      
     
    
      }
    
    
    
      const JSONDOWNLOADER = async() =>{
       let res =  await axios.post("http://185.215.166.217/api/download_json_file",{ original_json_file:replacer_json_format()})
   
       axios({
      url:"http://185.215.166.217/api/file_json",
      method:"GET",
      responseType:"blob"
    }).then(res =>{
      new JsFileDownloader({ 
        url: '/file_json',
        contentType: 'multipart/form-data; boundary=something' // or false to unset it
      })
    })
 
      }

   
      
    
      const replacer_json_format = () =>{
        let finalResult= {}
        let filetrer = localStorage.getItem("filter").split(".")[0]+"auto"
        let filter = localStorage.getItem("filter")
        let data =  rowss.filter(el => el.file === filter)
    

        let file_language =localStorage.getItem("filter").split(".")[0]+age
       
        for(let j=0;j<data.length;j++){
        
          finalResult[data[j][String(filetrer)].replaceAll(' ','').replaceAll("'",'')] = data[j][String(file_language)]
        }
     
         return JSON.stringify(finalResult)
      }


      const handleClickOpen = () => {

 
       
        setOpen(true);
        //{original_text_trimed:translated_row_text}
       
      
        
    
      };
    


    

      const handleChange = (event) => {
        setAge(event.target.value);
      };
      const exporterRef = useRef(null);

      const startExport = useCallback(() => {
        exporterRef.current.exportGrid();
      }, [exporterRef]);
      const onSave = (workbook) => {
        let file_name = localStorage.getItem("filter").split(".")[0]+".xlsx"
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), file_name);
        });
      };

     
      return (
      <div
      div  data-aos="fade-up"
    data-aos-duration="3000"
      >
        <Paper>
        <Grid
          rows={rows}
          columns={columnss}
          getRowId={getRowId}
        >
               <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <IntegratedPaging />

          <EditingState
            onCommitChanges={commitChangess}
            defaultEditingRowIds={[0]}
            columnExtensions={editingStateColumnExtensionss}
          />
              <Toolbar />
        <ExportPanel startExport={startExport} />
          <Table />
          <TableHeaderRow />
          <PagingPanel
          pageSizes={pageSizes}
        />
          <TableFilterRow />
          <TableEditRow />
          <TableEditColumn
         
            showEditCommand
            showDeleteCommand
          />
        </Grid>
        <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        onSave={onSave}
      />
      </Paper>


     
    <Button variant="contained"onClick={handleClickOpen}
    
    id="ExportTable"
    >
        Complete
      </Button>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Options to finish the process"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Stack direction="row" spacing={3}>
      
    
      </Stack>
     
      <FormControl sx={{ m: 1 }} fullWidth size="small">
      <InputLabel id="demo-select-small">Language to export</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Language to export"
        onChange={handleChange}
      >
       
        {selected.map(el =>(
     <MenuItem value={el.label}>{el.label}</MenuItem>

        ))}
   
      </Select>
    </FormControl>


 
   
    <TextField
          id="filled-multiline-flexible"
          label="Applicate a Role"
          multiline
          rows={3}
          value={rule}
          onChange={handleChangeRule}
        
          fullWidth
          
        />

      <Stack direction="row" spacing={2}>
          {/* html */}
     

{/* JSON*/}

  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://cdn-icons-png.flaticon.com/512/136/136525.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          JSON
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small"
        onClick={() => JSONDOWNLOADER()}
        >Download JSON File</Button>
        <CopyToClipboard text={replacer_json_format()}
         onCopy={() => toast.success("JSON file Copied")}
         >
          <Button size="small">Copy JSON file</Button>
         </CopyToClipboard>
      
      </CardActions>
    </Card>
       
  
          </Stack>


          
          </DialogContentText>
        </DialogContent>
      
      </Dialog>







      </div>
    )
}

export default ChooseGrid