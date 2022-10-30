import React, { useState,useEffect } from "react";
import axios from "axios"
import "./Uploader.css"
import { FileUploader } from "react-drag-drop-files";

import Button from '@mui/material/Button'

import { CircleLoader } from "react-awesome-loaders";
import Box from '@mui/material/Box';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import DataGrid  from "./datagrid"
import { MultiSelect } from "react-multi-select-component";
//banded column 
import Footer from "../pages/footer"

// live : https://www.youtube.com/watch?v=7lvWzg4Is5U
//animation
import AOS from "aos";
import "aos/dist/aos.css";

import Tour from 'reactour'

import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import useSound from 'use-sound';
import ClickSound from "../audioEffect/Mouse-Click.mp3"
import ErrorLoader  from "./ErrorLoader";
import ErrorSound from "../audioEffect/errorSound.mp3"

import Navbar from "./Navbar"


import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


function Uploader() {

  const [text, setText] = useState();
  
  
  const fileTypes = ["HTML"];
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
 
  let fileReader;

function readFileAsText(file){
  return new Promise(function(resolve,reject){
      let fr = new FileReader();

      fr.onload = function(){
          resolve(fr.result);
      };

      fr.onerror = function(){
          reject(fr);
      };

      fr.readAsText(file);
  });
}

const [selected, setSelected] = useState([]);

let [file_states,setFileState] = useState([
  {text:"begin of iteration of translation"}
])



const [orginalFiles,setOriginalFiles] = useState([])
const [originalValues,setOrignalValues] = useState([])
  const onChange = (file) => {
   
    let files = file;
    let files_list = file
  
    let readers = [];
    
    // Abort if there were no files selected
    if(!files.length) return;

    // Store promises in array
    for(let i = 0;i < files.length;i++){

        readers.push(readFileAsText(files[i]));
    }
    
    // Trigger Promises
    Promise.all(readers).then((values) => {
        // Values will be an array that contains an item
        // with the text of every selected file
        // ["File1 Content", "File2 Content" ... "FileN Content"]
        setOriginalFiles(files_list)
        setOrignalValues(values)
       
    });
    
  }
 

  const extractContent = (s) => {
    const span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  //layout for uploder 
  //


const [rows,setRows] = useState([



])

const [showLoader,setLoader] = useState(false)
const [showTable,setShowTable] = useState(false)
const [firstContent,setFirstContent] = useState(true)
let [orginal_html,setOrignalHtml] = useState("")



const [columnBands,setColumnBrand] = useState()
const [columns,setColumnNames] = useState() 
const [editingStateColumnExtensions,setEditing] = useState()
const [contries,setCountries] = useState()








const [fileTranslator,setFileTranslatior] = useState([])

const [orginals_html,setOriginalsHtml] = useState([])
let [showTerminal,setShowTerminal] = useState(false)



const structureData = (data) =>{
  let result = []
  
  console.log(data,orginalFiles)
  var merged = data.flat()

  if(selected.length == 2) {
    

    for(let i=0;i<orginalFiles.length;i++){
      console.log(orginalFiles[i])
      let res = merged.filter(el => el.file == String(orginalFiles[i].name))
     
      let  half = Math.ceil(res.length / orginalFiles.length);

   let result_to_calculate_rounds = []
      for (let d = 2; d > 0; d--) {
        result_to_calculate_rounds.push(res.splice(0, Math.ceil(res.length / d)));
    }
  
      let file_auto = String(orginalFiles[i].name).split(".")[0]+"auto" 
      let mergedBy_auto
           mergedBy_auto =    result_to_calculate_rounds[0].map(itm => ({
            ...result_to_calculate_rounds[1].find((item) => (item[file_auto] === itm[file_auto]  ) && item),
            ...itm
          }));


       
   
        
     
      
    
   
   
     
   



      result.push(mergedBy_auto)
  }

  setFileTranslatior(result)
    
      

          

       merged = result.flat()
    

  } 
 

  

  // 
  return merged
}

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];


let [files_names_all,setFilesNames] = useState([])
  




  const options = [
    { label: "Arabic", value: "ar" },
    { label: "English", value: "en" },
    { label: " French", value: "fr" },
    { label: "Spanish", value: "es" },
    { label: "Italian", value: "it" },
  ];
  
 


  let  steps = [
    {
      selector: '#ALl',
      content: "Hi this Shadow knight and let's make a tour into the website",
    },
    {
      selector: '.SelectLanguageChooser',
      content: 'From here You can choose the languages apllicate to translate thoose files',
    },
    
    {
      selector: '#fileUploader',
      content: 'From here You can Upload One or multiple File',
    },
    {
      selector: '#Submit',
      content: 'And finaly submit ',
    },
   
   
  ]



  let [openTour,setOpenTour] = useState()
  const closeTheTour = () =>{
    setOpenTour(false)
  }

  let [projectCode,setProjectCode] = useState(uuidv4())



  let [reservedCodes,setReservedCode] = useState([])
  let [isThereAnyProject,setIsThereAnyProjects] = useState(false)
  function containsNumbers(str) {
    return /\d/.test(str);
  }

  useEffect(()=>{
    let result = []
  
    for (let i = 0; i < localStorage.length; i++) {
      if(containsNumbers(localStorage.key(i))){
        setIsThereAnyProjects(true)
        result.push(localStorage.key(i))
      }
  

      
    }
   
    setReservedCode(result)
    setProjectUserCode(result[0])
  },[])










  const [ProjectUserCode, setProjectUserCode] = React.useState();
  let [data_related_to_file_names,setDataRealatedToFileNames] = useState([])
  let [date_created,setDateCreated] = useState('')
  const handleChangeCode = (event) => {
    setProjectUserCode(event.target.value);
  let filter_data_related =  event.target.value
  let local = JSON.parse(localStorage.getItem(filter_data_related)) 
  setDateCreated(moment(local[1]).format('MMMM Do YYYY, h:mm a')) 
  setDataRealatedToFileNames(local[0])
  };


  const [play] = useSound(ClickSound, {
    volume: 0.5,
  });
  let [depaced_value_affect_on_displaying_table,setValueAffect] = useState(false)
  const handleGoingForward = () =>{
    play();
    setFirstContent(false)
    setLoader(true)
    setProjectCode(ProjectUserCode)
    let local = JSON.parse(localStorage.getItem(ProjectUserCode)) 
    setFilesNames(local[0])
    setValueAffect(local[0].length>3 ? true : false)
    setColumnBrand(local[2])
    setCountries(local[3])
    setColumnNames(local[4])
    setEditing(local[5])
    setOriginalsHtml(local[6])
    setSelected(local[7])
    setLoader(false)
    setShowTable(true)
  }



  

  // values,files





  let [showErrorPage,setShowErrorPage] = useState(false)
  let [allErrorsFound,setAllErrorsFound] = useState([])
  const [playError] = useSound(ErrorSound, {
    volume: 0.5,
  });

  let [connected,setConnected] = useState()
  useEffect(() =>{
    window.addEventListener('offline', (e) => { setConnected(false) });

    window.addEventListener('online', (e) => { setConnected(true) });
  },[])



 useEffect(()=>{
      if(localStorage.getItem("firstMeet")){
          setOpenTour(localStorage.getItem("firstMeet")=="true")
      }
 },[localStorage.getItem("firstMeet")])
  const translateThoseFiles = async() =>{
    localStorage.setItem("firstMeet",false)
    play();
    
    //basic error
    if(originalValues.length == 0){
      return toast.error("No files Uploader")
    }
    if(originalValues.length >7){
      return toast.error("will You depapace the the maximum file uploaded witch  is 7")
    }
    if(originalValues.length >3){
      setValueAffect(true)
    }


    if(selected.length == 0){
      return toast.error("No language selected")
    }
    if(selected.length > 2){
      return toast.error("2 language as maximum")
    }



    let comumnbrand = []
    let column = []
    let editing = []
    let data = []
    let all_data = []
  
    let final_file = []
   
    let global_object = {}
 
    for(let x = 0 ;x<originalValues.length;x++){
        global_object[String(orginalFiles[String(x)].name.split(".")[0]+"auto")] = ""

        for(let n = 0;n<selected.length;n++){
         let  auto_string= orginalFiles[String(x)].name.split(".")[0] + selected[n].label

         global_object[auto_string] = ""
        }
    }

    //global verification before any translation 
    let eroors = []
    for(let e = 0;e<originalValues.length;e++){
   
    
      let begin_body
      if(originalValues[e].includes("</head>")){
      begin_body = originalValues[e].split("</head>")[1]
      }else{
        begin_body = originalValues[e]
      }
     
      if(begin_body.length == 0){
        eroors.push({text_error : `file ${orginalFiles[String(e)].name} is empty`})
      }
      let text_without_script = begin_body.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, "")
      //remove css attributes
      let text_without_css_attributes =  text_without_script.replace(/<([a-z][a-z0-9]*)(?:[^>]*?((?:\s(?:src|href|style)=['\"][^'\"]*['\"]){0,3}))[^>]‌​*?(\/?)>/, '') 
      
      let table_with_spaces = extractContent(text_without_css_attributes).split("\n")
      
     
      let result = []
      for(let i=0;i<table_with_spaces.length;i++){
          let string = table_with_spaces[i].trimStart()
          let string_end= string.trimEnd()
          result.push(string_end)
      }
  
      let new_result = result.filter(el => el!="")
      var unique = [...new Set(new_result)]

      if(unique.length == 0){
        eroors.push({text_error : `no text found in file ${orginalFiles[String(e)].name}`})
      }
    
     

    }
    
    if(eroors.length != 0){
      
      setFirstContent(false)
      playError()
      setAllErrorsFound(eroors)
       return  setShowErrorPage(true)
    }


  


    let files_originals =[]

    let x= []
    let files_names = []
    for (let d=0;d<originalValues.length;d++){

      files_names.push(orginalFiles[String(d)].name)
      let parent = String(orginalFiles[String(d)].name)
      comumnbrand.push({title:orginalFiles[String(d)].name,children:[]})

      let t =  {}
      t[parent] = []
      // let text = deleteLines(content, 3);
  
      let content = originalValues[d];
      setOrignalHtml(content)
      let original = {

      }
      original[orginalFiles[String(d)].name] = content
      original["name"]=orginalFiles[String(d)].name
      files_originals.push(original)
      let begin_body
      if(content.includes("</head>")){
      begin_body = content.split("</head>")[1]
      }else{
        begin_body = content
      }

    //remove script
      let text_without_script = begin_body.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, "")
      //remove css attributes
      let text_without_css_attributes =  text_without_script.replace(/<([a-z][a-z0-9]*)(?:[^>]*?((?:\s(?:src|href|style)=['\"][^'\"]*['\"]){0,3}))[^>]‌​*?(\/?)>/, '') 
      
      let table_with_spaces = extractContent(text_without_css_attributes).split("\n")
      
     
      let result = []
      for(let i=0;i<table_with_spaces.length;i++){
          let string = table_with_spaces[i].trimStart()
          let string_end= string.trimEnd()
          result.push(string_end)
      }
  
      let new_result = result.filter(el => el!="")
      var unique = [...new Set(new_result)]
     
      setFirstContent(false)
       setLoader(true)
      //run for for evrey lang and get response 

      let auto = {}

 
   
      let auto_string= orginalFiles[String(d)].name.split(".")[0] + "auto"
      comumnbrand[d].children.push({columnName:auto_string})
     
 
      
      column.push({name:auto_string,title:"auto"})
      editing.push({columnName:auto_string, editingEnabled: false})

      auto["auto"]=unique
      t[parent].push(auto)

    
      for(let j=0;j<selected.length;j++){
        //get file name 
      
        //file  structure 
        //["attestation.html":[en:[{res.data}]],frensh:[]},
        //{"attestation2.html":{}} ]
        let sub = {}
        auto_string= orginalFiles[String(d)].name.split(".")[0] + selected[j].label
     //reponde the hall translation of a html file 
   
  
 
  
  
 
    let res = []
    
    res = await axios.post("http://185.215.166.217/api/html_translator",{
      text_array: unique  ,
      language:selected[j].value,
      direction:auto_string,
      file:orginalFiles[String(d)].name,
      global_object
    
    
    })
   

       console.log(res.data.result)
  
        all_data.push(res.data.result)
      

       sub[selected[j].label] = []
      
        comumnbrand[d].children.push({columnName:auto_string})
        column.push({name:auto_string,title:selected[j].label})
     
       t[parent].push(sub)
      
  
      }
      
      final_file.push(t)
     
 
    
    
 
    }
    setFilesNames(files_names)
    setOriginalsHtml(files_originals)
    setColumnBrand(comumnbrand)
    setColumnNames(column)
    setEditing(editing)
    setCountries(structureData(all_data))
  
    



    setLoader(false)
    
    setFileState(x) 
    setShowTable(true)
  }



  return (
    <>
    <Navbar />
    <div className="App" id="ALl">
       
   {showErrorPage 
   && <ErrorLoader allErrorsFound={allErrorsFound}/>
   }
   <Tour
        steps={steps}
        isOpen={openTour}
        onRequestClose={() => closeTheTour()}
        rounded={5}
        />

<div className="container" data-aos="zoom-in" data-aos-delay="70">
      <div className="wrapper">
{showLoader && <>

  <CircleLoader
        meshColor={"#6366F1"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
      />



</> }



{
firstContent &&
<>
<div  
>

<Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <div>
        <div        id="fileUploader">
        <FileUploader handleChange={onChange}  
          multiple={true}
        types={fileTypes}
         type="file" name="myfile"
     
        />

        </div>
        <ul className="controls">
         
          <li className="exchange"><i className="fas fa-exchange-alt"></i></li>
          <li className="options">
          Select Language
          
          </li>
        </ul>
        <MultiSelect
        options={options}
        value={selected}
         onChange={setSelected}
        labelledBy="Select Language"
        className="SelectLanguageChooser"
      />
      <Button variant="contained"
      id="Submit"
      onClick={() => translateThoseFiles()}
      >Translate</Button>
        </div>
{isThereAnyProject && <>

  <Divider orientation="vertical" flexItem />
      <div>
      <p>Existing Project on your device</p>
      <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
      <InputLabel id="demo-select-small">Project Code</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={ProjectUserCode}
        label="Project Code"
        onChange={handleChangeCode}
      >
        {reservedCodes.map(el =>(
  <MenuItem key={el} value={el}>{el}</MenuItem>

        ))}
 
      </Select>
    </FormControl>
    <p>{date_created}</p>
   
    <ListItem>
      {data_related_to_file_names.map(el =>(
        <>
      
    <ListItemIcon>
    <TextSnippetIcon />
  </ListItemIcon>
  <ListItemText
    primary={el}

  />

</>
      ))}
         </ListItem>     
     
         
<Button variant="contained"
onClick={() => handleGoingForward()}
>Go Forward</Button> 
      </div>
</>}


      </Box>

</div>
</>

}



 
     
      </div>
      {showTable 
      && <>
      <DataGrid columnBands={columnBands}
      columns={columns}
      editingStateColumnExtensions= {editingStateColumnExtensions}
      contriess={contries}
      fileTranslator={fileTranslator}
      projectCode={projectCode}
      selected={selected}
      orginals_html={orginals_html}
      files_names={files_names_all}
      depaced_value={depaced_value_affect_on_displaying_table}
      />
   
      </>
      }
      <Footer version={"v1" }/>   
    </div>
    <BorderLinearProgress variant="determinate" value={1} 
    
    style={{zIndex:-1}}
    />

    <ToastContainer 
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"/>

    </div>
    </>
    
  );
}

export default Uploader


