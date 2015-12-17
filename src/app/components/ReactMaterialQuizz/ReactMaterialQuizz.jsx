import React 		            from 'react';
import { RouteHandler }     from 'react-router';
import AppBar               from 'material-ui/lib/app-bar';
import LeftNav              from 'material-ui/lib/left-nav';
import IconMenu             from 'material-ui/lib/menus/icon-menu';
import Menu                 from 'material-ui/lib/menus/menu';
import MenuItem             from 'material-ui/lib/menus/menu-item';
import List                 from 'material-ui/lib/lists/list';
import ListDivider          from 'material-ui/lib/lists/list-divider';
import ListItem             from 'material-ui/lib/lists/list-item';
import IconButton           from 'material-ui/lib/icon-button';
import NavigationMoreVert   from 'material-ui/lib/svg-icons/navigation/more-vert';
import ThemeManager         from 'material-ui/lib/styles/theme-manager';
import MyRawTheme           from '../../shared/quizRawTheme';
import MarginTop            from '../MarginTop/MarginTop.jsx!';
import {styles}             from './ReactMaterialQuizz.style';

import TranslateIcon        from 'material-ui/lib/svg-icons/action/translate';


import navigationModel      from '../../models/navigationModel.json!json';
import appBarMenuModel      from '../../models/appBarMenuModel.json!json';
import Quiz                 from '../Quiz/Quiz.jsx!';

const HEADER_TITLE = 'React Material Quizz';

export default class ReactMaterialQuizz extends React.Component {
  
  //in pure ES6 go around lines 90 or in ES6+ you can use static :
  //You could even use ES7 decorator see : material-ui/lib/styles/theme-decorator
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  }
  
  constructor(props) {
    super(props);
    this.init();
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
    };
  }
  
  init(){
    this.state = {
      navigationList  : navigationModel,
      appBarMenuList  : appBarMenuModel,
      headerTitle     : HEADER_TITLE,
      leftNavOpen     : false
    };
  }
  
  componentWillMount() {
    
  }
  
  handleChangeRequestLeftNav(){
    let previousOpenState = this.state.leftNavOpen;
    this.setState({ leftNavOpen: !previousOpenState });    
  }


  render(){
    
    const _menuList = this.state.appBarMenuList.map((menu)=>{
      let _ListDivider;
      if((menu.key || 0)  > 0){
        _ListDivider = <ListDivider inset={false}/>;
      }
      return (
        <div key={menu.key}>
          {_ListDivider}
          <ListItem
            key={menu.key}
            primaryText={menu.text} 
            leftIcon={<TranslateIcon />} />
        </div>
      );
    });
    
    const _leftNavList = this.state.navigationList.map((navList)=>{
      let _marginTop;
      if((navList.id || 0) === 1){
        _marginTop = <MarginTop marginTopValue={15} marginTopUnit={'px'}  />;
      }            
      return (        
        <div key={navList.key}>
          {_marginTop}
          <ListItem
            primaryText={navList.label} 
            leftIcon={<TranslateIcon />} />
        </div>        
      );             
    });
  

    return (
			<div>
        <LeftNav 
          ref="leftNav" 
          docked={false}
          open={this.state.leftNavOpen}
          onRequestChange={()=>this.handleChangeRequestLeftNav()}>
        <MarginTop 
          marginTopValue={60}
          marginTopUnit={'px'}  /> 
        <ListDivider inset={false}/>  
        <List subheader="navigation">
          {_leftNavList}
        </List>
        <ListDivider inset={false}/>   
        </LeftNav>				
        <AppBar
          title={this.state.headerTitle}
          onLeftIconButtonTouchTap={()=>this.handleChangeRequestLeftNav()}
          isInitiallyOpen={true}
          iconElementRight={
          <IconMenu iconButtonElement={
            <IconButton><NavigationMoreVert /></IconButton>}>
            <List 
              style={styles.iconMenuList}>
              {_menuList}
            </List>
          </IconMenu>
          } />
          <Quiz /> 
			</div>
    );
  }

 
}

// ReactMaterialQuizz.childContextTypes = {
//   muiTheme  : React.PropTypes.object
// };





              // {
              //   this.state.appBarMenuModel.map((listItem)=>{
              //     return (
              //       <List key={listItem.id}>  
              //         <ListItem 
              //           primaryText="Language" 
              //           leftIcon={<TranslateIcon />} />                    
              //       </List>
              //     )
              //   })
              // }