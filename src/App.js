import React from "react";
import './App.css';
import tableDetails from "./mock.json"; // mock Table Details

class App extends React.Component{

  state={
    filterBox:[],
    filterCount:0,
    conditions:[],
    textLast0:""
  }

  // Insert Box Function

  addFilter=()=>{
    // if(this.state.filterCount<6){
    this.setState({
      filterCount:this.state.filterCount+1
    })
  // }
  // else{
  //   window.alert("")
  // }
  }

  // Onchange Function & Insert Condition Array

  handleChange=(e,length)=>{
    if(e.target.name==="name"+length){
      this.setState({
        ["operator"+length]:"",
        ["textLast"+length]:""
      })
    }

    if(e.target.name.includes("textLast")){
      this.state.conditions[length]=({id:this.state["name"+length],operator:this.state["operator"+length],value:e.target.value})
      this.setState({test:true})

    }
    this.setState({[e.target.name] : e.target.value})
  }

  // Clear

  clear=()=>{

    var dataObj = {filterCount:1};

    for(let i = 0;i<this.state.filterCount;i++){
      dataObj["name"+i]=""
      dataObj["operator"+i]=""
      dataObj["textLast"+i]=""
    }

    console.log(dataObj,"dataObj")

    this.setState(dataObj)

  }

  render(){
    // Filter Chain

    var filterData = []

    tableDetails.mock.filter((data)=>{
      if(this.state.textLast0 === ""){
        filterData.push(data)
        }
      else if(this.state.textLast0) {
        this.state.conditions.filter((val)=>{
          if(val.id==="name" ? data.name.toLowerCase().includes(val.value.toLowerCase()) : null ||
            val.id==="screenName" ? data.screenName.toLowerCase().includes(val.value.toLowerCase()) : null ||
            val.id==="followers" ? val.operator === "GTE" ? data.follower >= val.value : data.follower <= val.value : null ||
            val.id==="following" ? val.operator === "GTE" ? data.following >= val.value : data.following <= val.value :null ||
            val.id==="location" ? data.location.toLowerCase().includes(val.value.toLowerCase()) : null ||
            val.id==="verified" ? data.verified.includes(val.value):null
            ){
              filterData.push(data)
          }
        })
      }
    })

    // Filter Box
    
    var filterBox =[]

      for(let index=0;index<this.state.filterCount;index++){
      filterBox.push(<div className="filterdiv">
      <div className="filterWhere">
      {index<1 ?
        "Where"
      :
    //   <select name={"andor"+index} onChange={(e)=>this.handleChange(e,index)}>
    //   <option value="" selected hidden>Operand</option>
    //   <option value="And">And</option>
    //   <option value="OR">OR</option>
    // </select>
    "And"
        }
      </div>
      
      <div>
      <select name={"name"+index} onChange={(e)=>this.handleChange(e,index)} placeholder="Pretty Name" value={this.state["name"+index]} >
      <option value="" selected hidden >Pretty Name</option>
        <option value="name">Name</option>
        <option value="screenName">Screen Name</option>
        <option value="followers">Followers Count</option>
        <option value="following">Following Count</option>
        <option value="location">Location</option>
        <option value="verified">Verified</option>
      </select>
      </div>
      <div>
      <select name={"operator"+index}
       value={this.state["operator"+index]==="" ? "Select" : this.state["operator"+index]}
        disabled={this.state["name"+index] ? false : true} onChange={(e)=>this.handleChange(
          e,index
        )}>
        {this.state["name"+index]==="followers" || this.state["name"+index]==="following" ?
        <>
      <option value="" selected hidden >Operator</option>
        <option value="GTE">{">="}</option>
        <option value="SME">{"<="}</option>
        </>
        :<>
        <option value="" selected hidden>{"Select"}</option>
        <option value="contains">{"Contains"}</option></>}
      </select>
      </div>
      <div>
        {this.state["name"+index]==="verified" && this.state["operator"+index]==="contains" ? 
              <select name={"textLast"+index} onChange={(e)=>this.handleChange(e,index)}>
              <option value="" selected hidden>Boolean</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>:
        <input type="text" disabled={this.state["name"+index] && this.state["operator"+index] ? false : true} name={"textLast"+index} onChange={(e)=>this.handleChange(e,index)} value={this.state["textLast"+index]} />}</div>
        {index<1 ? 
        <span className={`reload`} onClick={this.clear}>↻</span>
        :<span className={`reloadBack reload`} ></span>}
    </div>)
      }

      // Avoid duplicate

        var result = filterData.reduce((unique, o) => {
          if(!unique.some(obj => obj.name === o.name && obj.screenName === o.screenName && obj.follower === o.follower && obj.following === o.following && obj.location === o.location && obj.verified === o.verified)) {
            unique.push(o);
          }
          return unique;
      },[])
      
    console.log(this.state.conditions,"conditions") //expected filter format

    return(
      <div className="container">
        <div>
        <div>Filters</div>
        <div className="filterContainer">
          {filterBox}
          <div className="addFilter" onClick={this.addFilter}>+ Add Filter
          </div>
        </div>
        </div>

        <table>
        <tr>
          <th>Name</th>
          <th>Screen Name</th>
          <th>Followers Count</th>
          <th>Following Count</th>
          <th>Location</th>
          <th>Verified</th>
        </tr>
        {result.map((data)=>{
          return (<tr>
            <td>{data.name}</td>
            <td>{data.screenName}</td>
            <td>{data.follower}</td>
            <td>{data.following}</td>
            <td>{data.location}</td>
            <td align="center" >{data.verified==="yes"?<div className="clrTic">✔</div>:<div className="clrCross">⨉</div>}</td>
            </tr>)
        })}

      </table>
      </div>
    )
  }
}

export default App;
