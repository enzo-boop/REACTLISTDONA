import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
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
import Typography from '@mui/material/Typography';

import { red /*green*/ } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const redTheme = createTheme({ palette: { primary: red } })
//const blueTheme = createTheme({ palette: { primary: green } })

export default class Todolist extends React.Component{
    constructor(props){
        super(props);
        this.newTask = this.newTask.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.state = {tasks: [],valid:true};
    }
    

    changeInput(e){
        if(e.target.value!=='')
        this.setState({valid:false});
        else 
        this.setState({valid:true});
    }

    newTask(){
    let tempTasks = this.state.tasks;
    let input = document.getElementById('outlined-basic').value;
    let task={
        id:Math.random(),
        text:input,
        checked:false,
    }
    tempTasks.push(task);
    this.setState({tasks : tempTasks});
    localStorage.setItem('list',JSON.stringify(this.state.tasks));
    }

    render(){
        return(
            <div className='wrapper'>
<Card  variant="outlined" sx={{ minWidth: 275 }} style={{height:'100vh',backgroundColor:'rgb(6 52 84)'}} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="rgb(18 113 179)" gutterBottom>
          Parola del giorno
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="rgb(18 113 179)">
          Sogno
        </Typography>
        <Typography variant="body2" color="rgb(18 113 179)">
          Significato
          <br />
          {'" immaginazione, fantasia, cosa lontana dalla realtà,era solo un sogno; è stato un sogno; è tutto un sogno; la nostra speranza è un sogno;  una vita di sogni, di estasi, di fantasia (F. De Sanctis)"'}
        </Typography>
        <ul className='todolist'>
         {this.state.tasks.map(elem=>{return (
         <Card  key={elem.id} variant="outlined" style={{backgroundColor:"#fff"}}>
      <CardContent>
          <div className="taskcontent" style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Checkbox onChange={(e)=>{console.log(elem);elem.checked=!elem.checked}} value={elem.checked}></Checkbox>
            <Typography variant="h5" color='rgb(6 52 84)'>{elem.text}</Typography>
            <ThemeProvider theme={redTheme}>
            <Button variant='contained' onClick={(e)=>{
              localStorage.clear();
              console.log(elem);
              this.setState({tasks:this.state.tasks.filter(
                element=>{return element.id!==elem.id})
            });
              }}><Trash></Trash></Button>
            </ThemeProvider>
        </div>
      </CardContent>
    </Card>
         );
        }
 )}
      </ul>
      </CardContent>
      <CardActions>
      <div className="listcontrols" style={{position:'absolute',bottom:'10px',right:'0'}}>
      <TextField style={{color:'rgb(18 113 179)'}}id="outlined-basic" label="Nuova nota" variant="outlined" onChange={(e)=>{this.changeInput(e)}}/>
      <Button style={{height:'56px'}} variant="outlined" disabled={this.state.valid} onClick={()=>this.newTask()}><AddIcon></AddIcon></Button>
      </div>
      </CardActions>
    </Card>
            </div>
        );
    }
    componentDidMount(props){
        if(localStorage.getItem('list')){
            this.setState({tasks:JSON.parse(localStorage.getItem('list'))});
        }
    }
}