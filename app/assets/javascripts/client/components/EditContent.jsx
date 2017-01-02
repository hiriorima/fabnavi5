
import React from 'react';
import { Route, Link } from 'react-router';

import ProjectActionCreator from '../actions/ProjectActionCreator';

class EditContent extends React.Component {

  constructor(props) {
    super(props)
  }

  getInitialState(){
    return {
      src : this.props.src,
      id : this.props.act,
      flag : false,
    };
  }

  onclick (){
    this.registId(this.props.id);
    this.setState({ flag:!this.state.flag });
    this.getSrc();
    console.log(this.state.flag);
    return;
  }

  getSrc(){
    if(this.state.flag){
      this.setState({ src:this.props.src });
    } else {
      this.setState({ src:"/images/kaffcop_icon/delete_content.png" });
    }
    return;
  }

  registId(id){
    let flag = true;
    console.log("click picture : " + id);
    for(var i = 0; i < this.props.id_array.length; i++){
      if(this.props.id_array[i] == id){
        this.props.id_array.splice(i, 1);
        flag = !flag;
      }
    }
    if(flag){
      this.props.id_array.push(id);
    }
    console.log(this.props.id_array);
    return;
  }

  render () {
    return (
      <a> 
        <img 
          className="edit-thum" 
          src={this.state.src} 
          onClick={this.onclick} />
      </a>
    );
  }
}

module.exports = EditContent;
