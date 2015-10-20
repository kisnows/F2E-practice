import React from 'react'
import {render,findDOMNode} from 'react-dom'
import { Router, Route, Link, History } from 'react-router'
import TransitionGroup from 'react-addons-transition-group'
require('./index.css');

let goLogin = {
  isLogin: true,
  login(){
    this.isLogin ? this.onChange(false) : this.onChange(true)
    this.isLogin = !this.isLogin
  },
  onChange(){
  }
};

let App = React.createClass({
  getInitialState(){
    return {
      login: goLogin.isLogin
    }
  },
  updateAuth(logged){
    this.setState({
      login: logged
    })
  },
  componentWillMount(){
    goLogin.onChange = this.updateAuth
  },
  render(){
    return (
      <div >
        <nav className="nav">
          {this.state.login ? (
            <Link to="/logout">Log out</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )
          }
        </nav>
        <ul>
          <li><Link to="/page1" activeClassName="active">Page1</Link></li>
          <li><Link to="/page2" activeClassName="active">Page2</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
});

let Login = React.createClass({
  mixins: [History],
  handleClick(event){
    event.preventDefault();
    goLogin.login();
    var {location} = this.props
    if (location.state && location.state.nextPathname) {
      this.history.replaceState(null, location.state.nextPathname)
    } else {
      this.history.replaceState(null, '/about')
    }
    console.log(this.history)
  },
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>Login</button>
      </div>
    )
  }
});

let Logout = React.createClass({
  componentDidMount(){
    goLogin.login()
  },
  render(){
    return (
      <div>
        <p>You are now logged out</p>
      </div>
    )
  }
});

let About = React.createClass({
  render(){
    return (
      <div>
        <h1>登录成功</h1>
      </div>
    )
  }
})

let Page1 = React.createClass({
  render(){
    return (
      <div className="page"><h1>Page1</h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium animi
        dicta
        dignissimos earum eos esse impedit ipsum iste laboriosam numquam odio perspiciatis porro, quas sequi tempore
        vero vitae voluptates?</div>
    )
  }
});
let Page2 = React.createClass({
  getInitialState(){
    return {
      className: 'pageactive'
    }
  },
  handler(){
    if (this.state.className === 'pageactive') {
      this.setState({
        className: ''
      })
    } else {
      this.setState({
        className: 'pageactive'
      })
    }
  },
  render(){
    return (
      <div className={`${this.state.className} page`} onClick={this.handler}><h1>Page2</h1>Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Fuga porro voluptas
        voluptatum.
        Corporis debitis deleniti, doloremque et eum ex id iste magni nobis nostrum quae, reiciendis rem repellendus
        similique tempora.</div>
    )
  }
})

function needLogin(nextState, replaceState) {
  if (!goLogin.isLogin) {
    replaceState({nextPathname: nextState.location.pathname}, '/login')
  }
}

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="logout" component={Logout}/>
      <Route path="about" component={About}/>
      <Route path="page1" component={Page1}/>
      <Route path="page2" component={Page2} onEnter={needLogin}/>
    </Route>
  </Router>
), document.body);