import React, { Component } from 'react'
import People from '../People'
import Search from '../Search'
import ParseSDK from '../../helpers/parseSDK'
import { Redirect } from 'react-router-dom'

export default class PeopleList extends Component {
  state = {
    people_list: [],
    reload: false
  }

  subscription = null

  getPeopleList = async () => {
    const curUser = ParseSDK.User.current();

    const cvsQuery = new ParseSDK.Query("Conversation");
    cvsQuery.equalTo("userId", curUser.id);

    this.subscription = await cvsQuery.subscribe();
    this.subscription.on('open', () => {
      console.log('subscription conversation opened');
    });
    this.subscription.on('create', (cvs) => {
      const chatter = cvs.toJSON().chatter;
      const newPplList = this.state.people_list.filter(e => e.objectId !== chatter.objectId);
      this.setState({ people_list: [chatter, ...newPplList] });
    });
    this.subscription.on('update', (cvs) => {
      const chatter = cvs.toJSON().chatter;
      const newPplList = this.state.people_list.filter(e => e.objectId !== chatter.objectId);
      this.setState({ people_list: [chatter, ...newPplList] });
    });

    cvsQuery.descending("latestChatTime");
    cvsQuery.include("chatter")
    const cvs = await cvsQuery.find();
    const ctrIdList = [];
    const ctrList = cvs.map(e => {
      const obj = e.toJSON();
      ctrIdList.push(obj.chatter.objectId);
      return obj.chatter;
    });
   
    const pplQuery = new ParseSDK.Query(ParseSDK.User);
    pplQuery.notEqualTo("objectId", curUser.id);
    pplQuery.notContainedIn("objectId", ctrIdList);
    const ppl = await pplQuery.find();
    const pplList = ppl.map(e => e.toJSON());

    this.setState({ people_list: [...ctrList, ...pplList] });
  }

  componentDidMount() {
    this.getPeopleList();
  }

  componentWillUnmount() {
    this.subscription.on('close', () => {
      console.log('subscription closed');
    });
    this.subscription.unsubscribe();
  }

  logOut = () => {
    ParseSDK.User.logOut().then(() => {
      this.setState({ reload: !this.state.reload });
    });
  }

  render() {
    if (!ParseSDK.User.current()) {
      return <Redirect to="/login" />;
    }

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
