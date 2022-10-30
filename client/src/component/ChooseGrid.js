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
          <Card sx={{ maxWidth: 345 }}

          >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX////kTSbxZSnr6+sAAADkSR/pc1vrWSj39/fNzc3r7/DkPgDkQxPq6urwXBToq6HxYyT4v673rpjydUXq08/wVwDAwMDe3t5ZWVnnmo3lX0D97OesrKyDg4MmJiZubm67u7t2dnbjQg88PDzsXCjiNgD649/98vDr9PX1yMDkRxryt63pemT31M7sinj1mXvtlYXnZkoWFhbtk4Lwppn0imXq4d/pxsHouLDldV/qgm7qUhj42dTkVjTytqv3sp3ybTf5yLrlaU/1nH+WlpYzMzNKSkr5w7Psa0P0kW/zflTq2dfqSwDnpZnzfVH1m35x/GanAAALFklEQVR4nO2dfVvayBrG44EAJahoZRXp27JFISoLxVa0oq3ubs+u657v/21OQhjy4jxDHnLPkOXi/qvmaif8OsnMzTz3jJbF009FoaP5tfml4rb304cirbfxv/4u2vLP4fVD/+ej+Y8/MT9jNkEJi7+FDR9GLq8RYbEwb+TdmhLOG3kTvbpOhOLTV2IX14qwGDRxFLu2XoTTS6/i19aLcPpvPq014R+W9Vvi0poRFj9UkldyQiiTT2hVAkUmgLfiWkVG+OkoeSXvhEJRwqiULWwI9WtDGNGGsPjpl+i/fff7+hEWt2Mdt46E1tvwz+8j35/WiDBi16w1JZxb7g8Kwlfm8Kwo4e+Fw0CFDIRidca3gCTh0fuo3hgj/EXykfmEs58qKsK4fv63EU4bnPbLuhJa76dfoKw1JqyIFbe1JbTezFZN15dQaEO4IQQpXIUJyyoLCeMfiiIMr08J/yAI3+tCm6nwaq75tfBSJfpXt+eXD2NNSFqQNXP4Sq54YxtttNFGG2200UYbbbTRv0StYSnPGrYyE1Y6dp7VqSxGWCRnK89ysgNaq2ZYIADh0F41hEL2A4DwJteENwDCkbtqDIXcEYDwsrZqDIVqlwDCs/aqMRRqnwEIe7km7AEIb/M8ITq3AMKTXBOeAAhPO6vGUKhzCiBE27ZyVkUbQ5g2y8LO+OX/ZNTHaGs2hBBr2zITRvvQHkIIz3NMeA4hxNo2KCHEtKFtW2bCaGMQ02ZZd1BTAyVs30EIsbYNS4gwbZZ1AZ0QoYTOBYQQa9uwhAjT5tm2/BJiTJtlQY1pVsKYpelgAK1czYcxQhdEeIw0NVkJY5bmGERYyi1hCUTYRz6mSEK3DyJs5okw2pbbBBHeIY0pkrC2CyIcI20bkhBk2pS2za1x9XWHqzpJCDJtKtvm9ne5uttj6sfnOkmIMW0q21bb7VaZ4t/+kSYEmTaFbXOb1QJP2/yabawPtZg2yyJHGrdvgPA1SdiGEU4oU2Nfd/UTxh7SmKWZwAhJ22YfGyBskIQo02ZZN6SpsfUTnpKEMNNmWQOS0GECLkF4EiOM3twdwAjp9UTni3bCix2KELSW6IsuAzsH2gm/k4SQAnCgHjnlt6+Y0wWfcI8kdFC2VFUGbo+1E+7ThIgCcKCWwrZpJ/yVNm3ZU3tCFZxt4xMqTBsgtSek+HKhnZA2bZgCcCAKkG/b+ISx1zBGiEjtCT3AbBufkDZtiNSeEJ3e49o2NiFt2iCpPSGFbdP9HhoxbWzbhvyOb8S0cW1b9axJ63Kfpfs/yekQaNpUZWCZbauOHJcUd62NXmmDrSX64tm26rNiCTnbemns8cGZNq5tq6oiqUBCnGlTpfdktq16pYswbtpga4m+aEKJbaseKOriQEIkIJ3ek9q2JyOEmNSeEJnes4cSwm1dhBpSe0KK9J6EsKvrPdSQ2hOi03sy29adaCKMNgRK7QnxbFuX/C4CJISaNlV6T2bbuoqdRDBCUGpPiLZtjsy20d9FgIRI06YqA3NtG4wQVgAORJeBubYNR4gqAAdi2jZFtiELoUbTBrRtOEIsIF0Gts95tg1GWAMTkuk9rm3LQqgltSd0zbNtDrm9vFxniSbEmjZVek9q24bHlP77miWyiA8sAAdq8lbbuqR4t6XXEmuo1J4Qnd5zniSEpJjrpT16LRFr2ri2DUZIl0fBpo1r22CE93R5FGvauLYNRvhIE2JNmyq9xyuSMgnpFW9cak+Itm0jjYR/GUjtCZF9KLVtKMJvBlJ7QnR6T2bbUIR08RBt2pSbLlZCiEvtCfFsG4iwZSK1J6QoA3OybTzCW7oAjDZtlkUvvbBsG49QUQBGbbUIpSgDc2wbj/AHbdrGcEKQbeMRGjRtMNvGIzRo2pRlYI5t4xEqTBuyADwTxrbxCE2aNphtYxHSpg2Z2hMiK2b28OkgvU5ahGT3JCf8LdxWi1B0xcx2GPq7IdffLEINpg129h6xXlp/LbmlYqsFMrUnpKiYIQg/S25pKLUnBDrEhSL8VXJLQ6k9IdDZewThzr7klka2WoSiN11ACPckt1SYNvRaoi/Q2XsU4XfJLY1stQhF2zYIocxJG9lqEYredOFNTxLxCBsyJ21mq0Uoug8nkmOoKYNAEcqWP82aNtWmi5KkxvSF+A+hCGV3pE0bcqtFKPrsvQmjDEy9hyxC6FaLUHR6z5GWgTmE9W+SGxraahFKkd7blhAS30UIQqZpw6b2hDDpPYIwB6ZNveni5bd8Kr0nJ8yDaeNvupA/1AThveSGBgvAgZibLohsA0GYA9OmXE98lhDusgiZpg2/luhLkd4bpE/vyQm5pg1eAA7ES+9dybucIJR9ZDP7Y6Oil6JK6dN7BKHsfvT+WOxWi1B0ek+2V5YwpsR7KLsfbWmwWy1C0batJiGsMgi5pg2d2hNS2LaXgIUuY8av/yW5nXHTxrZt15225L/kJWF9Z6fxKLndBZ3a02PauJsuCt3t8WDiJCnLSbzG6315LVBh2tCpPSGebfNfxWr3y/jGdWqRB7Yco6s/fienNuOmbckycLXbPXguOY5rxwg9usbnPeV6ksK04QvAgXi2LdaVhavmMHgty8GL98/9Qmv5P9OmLVt6b/rAjiZO7etO4xvx4iVk3rQxbZuU8ml3RL94CdGmTUcBOBB9qFnqI04YZyrEHlItByS/FM+2ScWo45tM7QnR6T0XT6gwbdfaCBXpvZSADMIWbdrwqT0h+sjk1Om99IR0ag++1SIUsTCxxTiZLj0hbdrgWy1C0dsKU59Ml55wBaYNkt5LT7gC06ZO73XTIaYnVBwfrMu0KX/TxWRwVUgDmZKw8v0xypdYh9Jm2pS/6cJtO6Xng251AWUawtv7fxo7OzShPtOm2Cs7lV1ztvrjL0rKRYSnP/7caSSOTkoS4rdahFKcdxF25bB5UCUfWCXhxf43Cd0LS6MjtSeU6jddeF1Zu6G6kiRs7X1uEHhJQh2pPSH6yOQkZduZNGVjj5TQG1fqNF2SUKNp46X3bNdxrnefEl35knA6rqjofEUb1pLaE1IdUyal9Mae0Xg7Qhkn9MYVxaNJENaeNRIuk95z250HbxqZPbARQnpcURNq2GoRasn0nteV7mwamRGeeONK8jy9tIQaTVum9J7XlcfNK/9kyNOF48oCQj0F4EDZ0nve2NM+v0wxriwg1JHaE1Kl91JSfuXjGTRtiN+cu9TJH0YKwIEyAy5HaCC1J6Q4pswUoabUnlD2TRfZCfWk9oSyb7pYhjC+4K3TtCE2XbAJy4kGtBWAA2XfdMEi/JjE29KW2hPK/ptzUxPK6KaE+tYSfWXfdJGO8CPdgFbThth0sZiQ6jxBqNO0qdJ7IEI1nS89Wy1C6ezDBZ03k17TpkjvZSRMRzeVZkJ600UGQgaevtSeUKlTy8aYJOTQ+asFHV2pvbkuLo+lebWlCHl0rtMp3emrykR02uvXnGW7srxk57U7k4HOBZoXOnl+6DjLdGV5ic6rOc7Nmd5pUK7eYKvT5nZlmdl5brszvNRrY5RqnZ07Sz+wC2W3HXvU01gtTKnbjGMPQeeNK9dmxpU08sYeF9mV3qM5aRodV9LoZLfUmadIM2g6roxX/2jKdTGY8MeeROc9rHJcSaPW2c2SY4835W2Nepq/OYB0ezlkjj3+o3l+t4opb2md9ka2k/KBnRZtcjeupNHJ3bWzaOzxi/79HEx5y+uiOaEfWG/Ke3jOzZS3vE7H/fbLsccfVwZ6l82M6jZm1KfjykqstFZVZkbdH1fyPuUtr9ZZfzIwPK78H2jhyTc4nuyvAAAAAElFTkSuQmCC"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"
       
        >
          HTML
        </Typography>
        
      </CardContent>
      <CardActions>
        
        <CopyToClipboard text={replacer()}
        onCopy={() => toast.success("html file Copied")}
         >
          <Button size="small">Copy HTMl file</Button>
         </CopyToClipboard>
      
      </CardActions>
    </Card>

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