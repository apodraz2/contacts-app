import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';

class App extends Component {
    state = {
        screen: 'list', //list, create
        contacts: []
    }

    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))
        ContactsAPI.remove(contact);
    }
    
    navigateToCreate = () => {
        this.setState({ screen: 'create' })
    }
    
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
            <ListContacts 
                onDeleteContact={this.removeContact} 
                contacts={this.state.contacts} />  
    
        )}/>
        <Route path='/create' component={CreateContact} />
        
        
      </div>
    )
  }
}

export default App;
