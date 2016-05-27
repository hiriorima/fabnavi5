const
    React = require('react'),
    EditContent = require('./EditContent.react.js'),
    ProjectListStore = require('../stores/ProjectListStore'),
    ProjectStore = require('../stores/ProjectStore'),
    ProjectActionCreator = require('../actions/ProjectActionCreator'),
    jade = require('react-jade'),
    Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,


    State = require('../utils/FabnaviStateMachine'),
    editProject = jade.compileFile(__dirname + '/../templates/EditProject.jade');

const EditProject = React.createClass({

  propTypes : {
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getStateFromStores : function getStateFromStores(){
    return {
      projects : ProjectListStore.getProjectsAll(),
    };
  },

  _onChange : function (){
    this.setState(this.getStateFromStores());
  },
  getInitialState: function(){
    return this.getStateFromStores();
  },

  getDefaultProps: function(){
    return {
      id_array : [],
    };
  },

  getImage: function(){
  let project ={};
  project.content_array=[];
  project.figure=[];
  project.figure_id =[];
  project.project_id = null;

  for(var i in this.state.projects){
    if(this.state.projects[i].id == this.context.router.getCurrentParams().projectId){
      project.project_id = this.state.projects[i];
      project.content_array = this.state.projects[i].content;
    }
  }

  for(var i in project.content_array){
    project.figure.push(project.content_array[i].figure.file.file.thumb.url);
    project.figure_id.push(project.content_array[i].figure.figure_id);
  }
    return project;
  },

  onclick: function(){
    var a = this.getImage();
    console.log("button onclick: " + this.props.id_array);
    ProjectActionCreator.editContent(a.project_id,this.props.id_array);
  },




  render : editProject,

  componentWillMount : function(){
    ProjectActionCreator.getAllProjects();　
  },

  componentDidMount : function (){
    State.reload();
  },

  componentWillUpdate : function(){
    return {
    };
  },

  componentDidUpdate : function(){
    return {
    };
  },

  componentWillUnmount : function(){
  }
});

module.exports = EditProject;
