import React from "react";
import './App.css';
import tableDetails from "./mock.json";

class App extends React.Component{

  state={
    filterBox:[],
    filterCount:0,
    name0:null,
    conditions:[],
    textLast0:""
  }

  addFilter=(data)=>{
    this.setState({
      filterCount:this.state.filterCount+1
    })

  }


  handleChange=(e,length)=>{
    if(e.target.name==="name"+length){
      this.setState({
        ["operator"+length]:"",
        ["textLast"+length]:""
      })
    }
    console.log(e.target.value,"namevalue")

    

    if(e.target.name.includes("textLast")){
      // const filterData = []
      // const findOprator = this.state.operator0==="GTE"?true:false
      // tableDetails.mock.filter((data)=>{
      //   if(
      //     e.target.name==="name" || e.target.name==="screenName" ||e.target.name==="location" ? data[this.state.name0].toLowerCase().includes(e.target.value.toLowerCase()) : findOprator ? e.target.value <= data.follower : e.target.value >= data.follower
      //    ){
      //      console.log(this.state.name0,"searchData")
      //      console.log(data.name,"searchData")
  
      //     filterData.push(<tr>
      //       <td>{data.name}</td>
      //       <td>{data.screenName}</td>
      //       <td>{data.follower}</td>
      //       <td>{data.following}</td>
      //       <td>{data.location}</td>
      //       </tr>)
      //    } 
      // this.setState({filterData:filterData})

      // })
      this.state.conditions[length]=({id:this.state["name"+length],operator:this.state["operator"+length],value:e.target.value})
      this.setState({test:true})

    }
    this.setState({[e.target.name] : e.target.value})
  }


  render(){
    console.log(this.state,"tableDetails")
    var tableData = tableDetails.mock.map((data)=>{
    return (<tr>
      <td>{data.name}</td>
      <td>{data.screenName}</td>
      <td>{data.follower}</td>
      <td>{data.following}</td>
      <td>{data.location}</td>
      </tr>)
    })

    var filterData = []

    tableDetails.mock.filter((data)=>{
      if(this.state.textLast0 === ""){
      filterData.push(<tr>
        <td>{data.name}</td>
        <td>{data.screenName}</td>
        <td>{data.follower}</td>
        <td>{data.following}</td>
        <td>{data.location}</td>
        </tr>)}
      else if(this.state.textLast0) {
        this.state.conditions.filter((val)=>{
          console.log(data.name,"insideval")
          console.log(val,"insideval")
          if(val.id==="name" && data.name.toLowerCase().includes(val.value.toLowerCase()) ||
            val.id==="screenName" && data.screenName.toLowerCase().includes(val.value.toLowerCase()) 
            // data.follower.toString().toLowerCase().includes(val.value.toLowerCase()) ||
            // data.following.toString().toLowerCase().includes(val.value.toLowerCase()) ||
            // data.location.toLowerCase().includes(val.value.toLowerCase()) 
            ){
            filterData.push(<tr>
              <td>{data.name}</td>
              <td>{data.screenName}</td>
              <td>{data.follower}</td>
              <td>{data.following}</td>
              <td>{data.location}</td>
              </tr>)
          }
        })
      }
    })

    // const searchdatas = tableDetails.mock.filter((data)=>{
    //   console.log(data,"Search_data")
    //   if(this.state.search === null)
    //     return data
    //     else if (data.nursename!== null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase())
    //     || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
    //     || (data.experience!= null && data.experience.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     || (data.Nationality!= null && data.Nationality.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     || (data.status!= null && data.status.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     || (data.fromdate!= null && data.fromdate.toLowerCase().includes(this.state.search.toLowerCase()))
    //     || (data.todate!= null && data.todate.toLowerCase().includes(this.state.search.toLowerCase()))
    //     || (data.noofdays!= null && data.noofdays.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     ) {
    //       return data
    //   }
    // }) 

    
    var filterBox =[]

      for(let index=0;index<this.state.filterCount;index++){
      filterBox.push(<div className="filterdiv">
      <div className="filterWhere">
      {index<1 ?
        "Where"
      :
      <select name={"andor"+index} onChange={(e)=>this.handleChange(e,index)}>
      <option value="" selected hidden>Operand</option>
      <option value="And">And</option>
      <option value="OR">OR</option>
    </select>
        }
      </div>
      
      <div>
      <select name={"name"+index} onChange={(e)=>this.handleChange(e,index)} placeholder="Pretty Name" >
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
        {/* <option value="Equal">{"==="}</option> */}
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
    </div>)
      }

    console.log(filterData,"conditions")
    return(
      <div className="container">

        <div>
        <div>Filters</div>
        <div className="filterContainer">
          {filterBox}
          <div className="addFilter" onClick={()=>this.addFilter("add")}>+ Add Filter
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
        {filterData}
      </table>
      </div>
    )
  }
}

export default App;


---------------------


import React from "react";
import './App.css';
import tableDetails from "./mock.json";

class App extends React.Component{

  state={
    filterBox:[],
    filterCount:0,
    name0:null,
    conditions:[],
    textLast0:""
  }

  addFilter=(data)=>{
    this.setState({
      filterCount:this.state.filterCount+1
    })

  }


  handleChange=(e,length)=>{
    if(e.target.name==="name"+length){
      this.setState({
        ["operator"+length]:"",
        ["textLast"+length]:""
      })
    }
    console.log(e.target.value,"namevalue")


    if(e.target.name.includes("textLast")){
      // const filterData = []
      // const findOprator = this.state.operator0==="GTE"?true:false
      // tableDetails.mock.filter((data)=>{
      //   if(
      //     e.target.name==="name" || e.target.name==="screenName" ||e.target.name==="location" ? data[this.state.name0].toLowerCase().includes(e.target.value.toLowerCase()) : findOprator ? e.target.value <= data.follower : e.target.value >= data.follower
      //    ){
      //      console.log(this.state.name0,"searchData")
      //      console.log(data.name,"searchData")
  
      //     filterData.push(<tr>
      //       <td>{data.name}</td>
      //       <td>{data.screenName}</td>
      //       <td>{data.follower}</td>
      //       <td>{data.following}</td>
      //       <td>{data.location}</td>
      //       </tr>)
      //    } 
      // this.setState({filterData:filterData})

      // })
      this.state.conditions[length]=({id:this.state["name"+length],operator:this.state["operator"+length],value:e.target.value})
      this.setState({test:true})

    }
    this.setState({[e.target.name] : e.target.value})
  }


  render(){
    console.log(this.state,"tableDetails")
    var tableData = tableDetails.mock.map((data)=>{
    return (<tr>
      <td>{data.name}</td>
      <td>{data.screenName}</td>
      <td>{data.follower}</td>
      <td>{data.following}</td>
      <td>{data.location}</td>
      </tr>)
    })

    var filterData = []

    tableDetails.mock.filter((data)=>{
      if(this.state.textLast0 === ""){
        filterData.push(data)

      // filterData.push(<tr>
      //   <td>{data.name}</td>
      //   <td>{data.screenName}</td>
      //   <td>{data.follower}</td>
      //   <td>{data.following}</td>
      //   <td>{data.location}</td>
      //   </tr>)
        }
      else if(this.state.textLast0) {
        this.state.conditions.filter((val)=>{
          console.log(data,"insideval")
          console.log(val,"insideval")
          if(val.id==="name" ? data.name.toLowerCase().includes(val.value.toLowerCase()) : null ||
            val.id==="screenName" ? data.screenName.toLowerCase().includes(val.value.toLowerCase()) : null ||
            val.id==="followers" ? val.operator === "GTE" ? data.follower >= val.value : data.follower <= val.value : null ||
            val.id==="following" ? val.operator === "GTE" ? data.following >= val.value : data.following <= val.value :null ||
            val.id==="location" ? data.location.toLowerCase().includes(val.value.toLowerCase()) : null
            ){
              filterData.push(data)
            // filterData.push(<tr>
            //   <td>{data.name}</td>
            //   <td>{data.screenName}</td>
            //   <td>{data.follower}</td>
            //   <td>{data.following}</td>
            //   <td>{data.location}</td>
            //   </tr>)
          }
        })
      }
    })

    // const searchdatas = tableDetails.mock.filter((data)=>{
    //   console.log(data,"Search_data")
    //   if(this.state.search === null)
    //     return data
    //     else if (data.nursename!== null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase())
    //     || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
    //     || (data.experience!= null && data.experience.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     || (data.Nationality!= null && data.Nationality.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     || (data.status!= null && data.status.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     || (data.fromdate!= null && data.fromdate.toLowerCase().includes(this.state.search.toLowerCase()))
    //     || (data.todate!= null && data.todate.toLowerCase().includes(this.state.search.toLowerCase()))
    //     || (data.noofdays!= null && data.noofdays.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()))
    //     ) {
    //       return data
    //   }
    // }) 

    
    var filterBox =[]

      for(let index=0;index<this.state.filterCount;index++){
      filterBox.push(<div className="filterdiv">
      <div className="filterWhere">
      {index<1 ?
        "Where"
      :
      <select name={"andor"+index} onChange={(e)=>this.handleChange(e,index)}>
      <option value="" selected hidden>Operand</option>
      <option value="And">And</option>
      <option value="OR">OR</option>
    </select>
        }
      </div>
      
      <div>
      <select name={"name"+index} onChange={(e)=>this.handleChange(e,index)} placeholder="Pretty Name" >
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
    </div>)
      }

        var result = filterData.reduce((unique, o) => {
          if(!unique.some(obj => obj.name === o.name && obj.screenName === o.screenName && obj.follower === o.follower && obj.following === o.following && obj.location === o.location)) {
            unique.push(o);
          }
          return unique;
      },[])
      
    console.log(result,"conditions")
    return(
      <div className="container">

        <div>
        <div>Filters</div>
        <div className="filterContainer">
          {filterBox}
          <div className="addFilter" onClick={()=>this.addFilter("add")}>+ Add Filter
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
            </tr>)
        })}

      </table>
      </div>
    )
  }
}

export default App;
