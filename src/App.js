import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import dronecharging from './dronecharging';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {manager : '',
      drones : '' ,
      name : '',
      clevel: 0,
      mileage: 0,
      poff: 0,
      xc: 0,
      yc: 0,
      value:0,
      message: '',
      winnermess:'Winner will be picked soon...',
      stations:'',
      sname:'',
      en_off:0,
      sx:0,
      sy:0,
      smess:'',
      winner_station:'0',
      winner_drone:'0'
    };
  }
  async componentDidMount(){
    const manager = await dronecharging.methods.manager().call();
    //console.log(typeof(this.state.clevel));
    const drones = await dronecharging.methods.getdrones().call();
    //const balance = await web3.eth.getBalance(dronecharging.options.address);
    //console.log(typeof(this.state.value));
    //console.log(typeof(this.state.clevel));
    const stations = await dronecharging.methods.getstations().call();
    this.setState({manager,drones,stations});
  }
  onSubmit = async(event) =>{
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();
    console.log("Hello");
    this.setState({message: 'Waiting on transaction success....: '});
    //console.log(this.state.clevel);
    await dronecharging.methods.drone_enter(this.state.name,this.state.clevel,this.state.mileage,this.state.poff,this.state.xc,this.state.yc).send({
      from:accounts[0],
      gas:'3000000',
      value:web3.utils.toWei((this.state.clevel*this.state.poff).toString(),'finney')
    });
    this.setState({message: 'You have been charged'});
    this.setState({drones: await dronecharging.methods.getdrones().call()});
  }
  onclick = async(event) =>{
    try{
    const accounts=await web3.eth.getAccounts();
    await dronecharging.methods.pickwinner().send({from:accounts[0],gas:'3000000'});
    this.setState({winnermess: 'Alotted a station to the winner drone'});
    this.setState({winner_station: await dronecharging.methods.Winner_Station().call()});
    this.setState({winner_drone: await dronecharging.methods.Winner_Drone().call()});
  }     
    catch(err){
      this.setState({winnermess: 'You are not authorised'});
    }
  }
  onSubmit1 = async(event) =>{
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();
    console.log("Hello");
    this.setState({smess: 'Wait while we are entering you'});
    //console.log(this.stte.clevel);
    await dronecharging.methods.station_enter(this.state.name,this.state.en_off,this.state.sx,this.state.sy).send({
      from:accounts[0],
      gas:'3000000'
    });
    this.setState({smess: 'You have been charged'});
    this.setState({stations: await dronecharging.methods.getstations().call()});
  }
  render(){
    //console.log(web3.accounts);
    //web3.eth.getAccounts().then(console.log);
    return(
<html>
<div className="App">
        <h1>Drone Charge Scheduling</h1>
        <p>This contract is managed by {this.state.manager} with number of drones are {this.state.drones} and number of stations are {this.state.stations} </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Give some details of the drone to be added</h4>
          <div>
            <label>
              Enter the name of the drone :  </label>
            <input
              name={this.state.name}
              onChange={event => this.setState({name: event.target.value})}
             />
             <br/>
             <label>Enter the charging level of the new drone :  </label>
             <input type="number"
              clevel = {this.state.clevel}
              onChange={event => this.setState({clevel: Number(event.target.value)})}
             />
             <br/>
             <label>Enter the mileage of the drone: </label>
             <input type="number"
             mileage = {this.state.mileage}
             onChange={event => this.setState({mileage: Number(event.target.value)})}
             />
             <br/>
             <label>Enter the price offered of the drone: </label>
             <input type="number"
             poff = {this.state.poff}
             onChange={event => this.setState({poff: Number(event.target.value)})}
             />
             <br/>
             <label>Enter the x coordinate of the drone: </label>
             <input type="number"
             xc = {this.state.xc}
             onChange={event => this.setState({xc: Number(event.target.value)})}
             />
             <br/>
             <label>Enter the y coordinate of the drone: </label>
             <input type="number"
             yc = {this.state.yc}
             onChange={event => this.setState({yc: Number(event.target.value)})}
             />
             <br/>
              
              
          </div>
          <button>Enter</button>
        </form>
    <h2>{this.state.message}</h2>
    <hr/>
    
        <form onSubmit={this.onSubmit1}>
          <h4>Give some details of the station to be added</h4>
          <div>
            <label>
              Enter the name of the station :  </label>
            <input
              name={this.state.sname}
              onChange={event => this.setState({sname: event.target.value})}
             />
             <br/>
             <label>Enter the energy offered by the station :  </label>
             <input type="number"
              en_off = {this.state.en_off}
              onChange={event => this.setState({en_off: Number(event.target.value)})}
             />
             <br/>
             <label>Enter the x coordinate of the station: </label>
             <input type="number"
             sx = {this.state.sx}
             onChange={event => this.setState({sx: Number(event.target.value)})}
             />
             <br/>
             <label>Enter the y coordinate of the station: </label>
             <input type="number"
             sy = {this.state.sy}
             onChange={event => this.setState({sy: Number(event.target.value)})}
             />
             <br/>
              
              
          </div>
          <button>Enter</button>
        </form>
    <h2>{this.state.smess}</h2><hr/>
      
    <div>
      <h3>ONLY FOR THE MANAGER</h3>
      <button type="button" onClick={this.onclick}>Allocate drone a station</button>
      <h4>{this.state.winnermess}</h4>
      <h4>winner drone: {this.state.winner_drone}</h4>
      <h4>winner station: {this.state.winner_station}</h4>
    </div><hr/>
  </div>

</html>
    )
  }
}
 export default App;
// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import web3 from './web3';
// import dronecharging from './dronecharging';

// class App extends Component{
//   constructor(props){
//     super(props);

//     this.state = {manager : '',
//       drones : '' ,
//       name : '',
//       clevel: 0,
//       mileage: 0,
//       poff: 0,
//       xc: 0,
//       yc: 0,
//       value:0,
//       message: '',
//       stname : '',
//       eoff : 0,
//       xst : 0,
//       yst : 0,
//       newp: 0,
//       newlev: 0
//     };
//   }
//   async componentDidMount(){
//     const manager = await dronecharging.methods.manager().call();
//     //console.log(typeof(this.state.clevel));
//     const drones = await dronecharging.methods.getdrones().call();
//     //const balance = await web3.eth.getBalance(dronecharging.options.address);
//     //console.log(typeof(this.state.value));
//     //console.log(typeof(this.state.clevel));

//     this.setState({manager,drones});
//   }
//   onSubmit = async(event) =>{
//     event.preventDefault();
//     const accounts=await web3.eth.getAccounts();
//     //console.log("Hello");
//     this.setState({message: 'Waiting on transaction success....: '});
//     //console.log(this.state.clevel);
//     await dronecharging.methods.drone_enter(this.state.name,this.state.clevel,this.state.mileage,this.state.poff,this.state.xc,this.state.yc).send({
//       from:accounts[0],
//       gas:'3000000',
//       value:web3.utils.toWei((this.state.clevel*this.state.poff).toString(),'finney')
//     });
//     this.setState({message: 'You have been charged'});
//     this.setState({drones: await dronecharging.methods.getdrones().call()});
//   }
//   onSubmit2 = async(event)=>{
//     event.preventDefault();
//     const accounts=await web3.eth.getAccounts();
//     this.setState({message: 'Waiting on transaction success for station....: '});
//     await dronecharging.methods.station_enter(this.state.stname,this.state.eoff,this.state.xst,this.state.yst).send({
//       from:accounts[0],
//       gas:'3000000'
//     });
    
//     this.setState({message: 'New Station was added successfully....: '});
//   }
//   onSubmit3 = async(event)=>{
//     event.preventDefault();
//     const accounts = await web3.eth.getAccounts();
//     this.setState({message:'Updating drone price'});
//     await dronecharging.methods.update_drone_price(this.state.newp,this.state.newlev).send({
//         from : accounts[0],
//         gas: '3000000'
//     });
//     this.setState({message:'Drone price updated'});
//   }
//   render(){
//     //console.log(web3.accounts);
//     //web3.eth.getAccounts().then(console.log);
//     return(
//       <div className="App">
//         <h1>Drone Charge Scheduling</h1>
//         <p>This contract is managed by {this.state.manager} with number of drones are {this.state.drones} </p>
//         <hr/>
//         <form onSubmit={this.onSubmit}>
//           <h4>Give some details of the drone to be added</h4>
//           <div>
//             <label>
//               Enter the name of the drone :  </label>
//             <input
//               name={this.state.name}
//               onChange={event => this.setState({name: event.target.value})}
//              />
//              <br/>
//              <label>Enter the charging level of the new drone :  </label>
//              <input type="number"
//               clevel = {this.state.clevel}
//               onChange={event => this.setState({clevel: Number(event.target.value)})}
//              />
//              <br/>
//              <label>Enter the mileage of the drone: </label>
//              <input type="number"
//              mileage = {this.state.mileage}
//              onChange={event => this.setState({mileage: Number(event.target.value)})}
//              />
//              <br/>
//              <label>Enter the price offered of the drone: </label>
//              <input type="number"
//              poff = {this.state.poff}
//              onChange={event => this.setState({poff: Number(event.target.value)})}
//              />
//              <br/>
//              <label>Enter the x coordinate of the drone: </label>
//              <input type="number"
//              xc = {this.state.xc}
//              onChange={event => this.setState({xc: Number(event.target.value)})}
//              />
//              <br/>
//              <label>Enter the y coordinate of the drone: </label>
//              <input type="number"
//              yc = {this.state.yc}
//              onChange={event => this.setState({yc: Number(event.target.value)})}
//              />
//              <br/>
              
              
//           </div>
//           <button>Enter</button>
//         </form>
//         <hr/>
//         <h2>{this.state.message}</h2>
        
//         <form onSubmit = {this.onSubmit2}>
//           <h4>Give details of the station to be added : </h4>
//           <div>
//           <label>Enter the name of the station :  </label>
//             <input
//               stname={this.state.stname}
//               onChange={event => this.setState({stname: event.target.value})}
//              />
//              <br/>
//           <label>Enter the energy offered to the station :  </label>
//             <input
//               eoff={this.state.eoff}
//               onChange={event => this.setState({eoff: Number(event.target.value)})}
//              />
//              <br/>  
//              <label>
//               Enter the xcoordinate of station :  </label>
//             <input
//               xst={this.state.xst}
//               onChange={event => this.setState({xst: Number(event.target.value)})}
//              />
//              <br/>
             
//              <label>
//               Enter the xcoordinate of station :  </label>
//             <input
//               yst={this.state.yst}
//               onChange={event => this.setState({yst: Number(event.target.value)})}
//              />
//              <br/>
//           </div>
//           <button>Enter</button>
//         </form>
//         <hr/>
//         <h2>{this.state.message}</h2>
//         <form onSubmit={this.onSubmit3}>
//           <h4>If you want to update a drone's price</h4>
//           <div>
//             <label>Enter the new price:</label>
//             <input 
//               newp={this.state.newp}
//               onChange={event => this.setState({newp: Number(event.target.value)})}
//             />
//             <br/>
//             <label>Enter the current energy level of drone:</label>
//             <input 
//               newlev={this.state.newlev}
//               onChange={event => this.setState({newlev: Number(event.target.value)})}
//             />
//             <br/>
//           </div>
//           <button>Enter</button>
//         </form>
//         <hr/>
//     <h2>{this.state.message}</h2>
//       </div>
//     )
//   }
// }
// export default App;