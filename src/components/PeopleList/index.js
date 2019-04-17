import React, { Component } from 'react'
import People from '../People'
import Search from '../Search'
import ParseSDK from '../../helpers/parseSDK'

export default class PeopleList extends Component {
  state = {
    people_list: []
  }

  getPeopleList = async () => {
    const pplQuery = new ParseSDK.Query(ParseSDK.User);
    pplQuery.notEqualTo("objectId", ParseSDK.User.current().id);

    const ppl = await pplQuery.find();
    const pplList = ppl.map(e => e.toJSON());
    this.setState({ people_list: pplList });
  }

  componentDidMount() {
    this.getPeopleList();
  }

  logOut = () => {
    ParseSDK.User.logOut();
  }

  render() {
    return (
      <div className="people-list" id="people-list">
        <button onClick={this.logOut}>Log out</button>
        <Search />
        <ul className="list">
          {
            this.state.people_list.map((e, i) => <People key={i} people={e} />)
          }
        </ul>
      </div>
    )
  }
}
