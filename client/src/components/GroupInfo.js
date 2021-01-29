import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import GroupCard from './GroupCard';
import LikesGraph from './LikesGraph';
import SharesGraph from './SharesGraph';

export default function GroupInfo({ likesCount, sharesCount, group, groupLink, getCount }) {
    return (
        <div className="card info">
            <div className="card-tabs">
                <ul className="tabs tabs-fixed-width">
                    <li className="tab"><NavLink className="active" to="/group">Группа</NavLink></li>
                    <li className="tab"><NavLink className="active" to="/likes">Лайки</NavLink></li>
                    <li className="tab"><NavLink className="active" to="/shares">Репосты</NavLink></li>
                </ul>
            </div>
            <div className="card-content grey lighten-4">
                <Switch>
                    <Route path="/group">
                        <GroupCard
                            group={group}
                            groupLink={groupLink}
                        />
                    </Route>
                    <Route path="/likes">
                        <LikesGraph
                            likesCount={likesCount}
                            getCount={getCount}
                        />
                    </Route>
                    <Route path="/shares">
                        <SharesGraph
                            sharesCount={sharesCount}
                            getCount={getCount}
                        />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}
