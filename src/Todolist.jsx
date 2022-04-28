import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
/*import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";*/
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Trash from '@mui/icons-material/Delete';
//import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { red /*green*/ } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { elementAcceptingRef } from '@mui/utils';

const redTheme = createTheme({ palette: { primary: red } })
//const blueTheme = createTheme({ palette: { primary: green } })

const apiUrlDailyText =   "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

let quotes = new Array([]);
let rndQuote = {};

export default class Todolist extends React.Component{
    constructor(props){
        super(props);
        this.newTask = this.newTask.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {filteredTask:[],tasks: [],valid:true,randomQuote:null,selection:0};
    }

updateTasks(elem){
  this.setState({tasks:this.state.tasks.map(element=>{console.log(elem,element);element.id===elem.id?element = elem:element=element;return element})});
  localStorage.setItem('list',JSON.stringify(this.state.tasks));
  this.setState({filteredTask:JSON.parse(localStorage.getItem('list'))});
  this.filterTask(this.state.selection);
}

    changeInput(e){
        if(e.target.value!=='')
        this.setState({valid:false});
        else 
        this.setState({valid:true});
    }

    handleChange = (event) => {
this.setState({selection:event.target.value})
this.filterTask(event.target.value);
    }

    filterTask(value){
      if(value===0){
        this.setState({filteredTask:JSON.parse(localStorage.getItem('list'))})
      }
      if(value===10)
      {
        this.setState({filteredTask:this.state.tasks.filter(task=>{return task.checked})})
      }
      if(value===20){
        this.setState({filteredTask:this.state.tasks.filter(task=>{return !task.checked})})
      }
      console.log('filtered tasks: ',this.state.filteredTask)
    }
    newTask(e){
    let tempTasks = this.state.tasks;
    let input = document.getElementById('outlined-basic').value;
    document.getElementById('outlined-basic').value=null;
    let task={
        id:Math.random(),
        text:input,
        checked:false,
    }
    for(let prop in task){
    console.log(prop)
  }
    tempTasks.push(task);
    this.setState({tasks : tempTasks});
    localStorage.setItem('list',JSON.stringify(this.state.tasks));
    this.setState({filteredTask:JSON.parse(localStorage.getItem('list'))})
    }



    render(){
        return(
            <div className='wrapper' style={{height:'100vh',fontFamily:'system-ui'}}>
<Card  variant="outlined" sx={{ minWidth: 275 }} style={{color:'#fff',background:'rgb(95 158 160)',height:'100vh',display:'flex',flexDirection:'column',justifyContent:'stretch',alignItems:'stretch',fontSize:'18px !important'}} >
<div className="content" style={{textAlign:'center',padding:'20px 0',}}>
            <div className="header">
              {this.state.randomQuote !== null && this.state.randomQuote.quote}
            </div>
            <div className="description" style={{borderBottom:'solid 1px #1976d2'}}>
              {this.state.randomQuote !== null && this.state.randomQuote.author}
            </div>
            </div>
      <CardContent style={{background:'#fff'}}>     
        <div className="cardcontentwrapper" style={{backdropFilter:'brightness(0.5)',borderRadius:'3px',boxShadow:'rgb(30 30 30) 0px 1px 10px'}}>
        <div class="wrappercontainer" style={{display:'flex',flexDirection:'row',height:'70vh',marginTop:'20px',borderRadius:'0.25rem'}}>
          <div class='filters' style={{width:'35%',color:'#fff',marginLeft:'5px'}}>
            <h2 style={{fontSize:'24px !important',fontVariant:'all-small-caps',borderBottom:'solid 1px #1976d2'}}>
            filtri
            </h2>
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filtri</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.selection}
          label="Filtri"
          onChange={this.handleChange}
        >
          <MenuItem value={0}>Nessuna</MenuItem>
          <MenuItem value={10}>Completate</MenuItem>
          <MenuItem value={20}>Da Fare</MenuItem>
        </Select>
      </FormControl>
    </Box>
          </div>
        <ul className='todolist' style={{width:'65%',marginRight:'20px',display:'flex',flexDirection:'row',flexWrap:'wrap',overflowY:'scroll',alignItems:'flex-start'}}>
         {this.state.filteredTask.map(elem=>{return (
        <Card  id={elem.id} className='task' variant="elevation">
     <CardContent  style={{background:elem.checked?'green':'rgb(26 121 143)',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
           <Checkbox 
           className='checkbox'
           checked={elem.checked}
           onChange={()=>{
           elem.checked=!elem.checked;
           this.updateTasks(elem);
           console.log('task checked: ',elem);
           elem.checked?document.getElementById(elem.id).style.backgroundColor='green':document.getElementById(elem.id).style.backgroundColor='#40404017';
           }}></Checkbox>
           <TextareaAutosize
          onChange={(e)=>{ 
           elem.text = e.nativeEvent.srcElement.value;
           localStorage.setItem('list',JSON.stringify(this.state.tasks));
           this.setState({filteredTask:JSON.parse(localStorage.getItem('list'))});
         }
         }
     defaultValue={elem.text}
     className='text'
     aria-label="empty textarea"
     placeholder="Scrivi .."
     style={{ width: 200 ,fontSize:'16px'}}
     minRows={3}
     maxRows={3}
   >
   </TextareaAutosize>
   </div>
           <ThemeProvider theme={redTheme}>
           <Button className='delete' variant='text' style={{marginTop:'10px'}}onClick={(e)=>{
             let temp = this.state.tasks.filter(element=>{return element.id!==elem.id});
           localStorage.setItem('list',JSON.stringify(temp));
           this.setState({tasks:JSON.parse(localStorage.getItem('list'))});
           this.filterTask(this.state.selection);
           
           console.log(this.state.tasks,temp)
             }}><Trash></Trash></Button>
           </ThemeProvider>
     </CardContent>
   </Card>
        );
       })
      }
      </ul> 
      </div>
      <CardActions>
      <div className="listcontrols">
      <TextField id="outlined-basic" label="Nuova nota" variant='filled' onKeyDown={(e)=>{
        if(e.key==='Enter')
          document.getElementById('submitbtn').click();
          }}  onChange={(e)=>{this.changeInput(e)}}/>
      <Button style={{height:'56px'}} id ='submitbtn' variant='contained' disabled={this.state.valid}  onClick={(e)=>this.newTask(e)}><AddIcon></AddIcon></Button>
      </div>
      </CardActions>
     </div>
      </CardContent>
    </Card>
            </div>
        );
    }
    async componentDidMount(props){
      await fetch(apiUrlDailyText)
      .then(res => res.json())
      .then(data => {
          quotes=data.quotes;
          let randNumb = Math.floor(Math.random() * quotes.length);
          rndQuote = quotes[randNumb];
      this.setState({randomQuote:rndQuote});
      });
        if(localStorage.getItem('list')){
            this.setState({tasks:JSON.parse(localStorage.getItem('list'))});
            this.filterTask(this.state.selection);
            console.log('tasks: ',this.state.tasks);
        }
    }
}