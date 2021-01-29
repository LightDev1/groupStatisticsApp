import React from 'react';

export default function GroupCard({ group, groupLink }) {
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card small group-card">
                    <div className="card-image image-container">
                        <img src={group.groupLogo} />
                    </div>
                    <div className="card-content">
                        <strong>{group.groupTitle}</strong>
                        <p>Подписчики: {group.followersCount}</p>
                    </div>
                    <div className="card-action">
                        <a href={groupLink}>Перейти</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* <div class="col s12 m7">
<h5 class="header">Ваша группа</h5>
<div class="card horizontal">
    <div class="card-image logo-image">
        <img src={group.groupLogo} />
    </div>
    <div class="card-stacked">
        <div class="card-content">
            <strong>{group.groupTitle}</strong>
            <p>Подписчики: {group.followersCount}</p>
        </div>
        <div class="card-action">
            <a href={groupLink}>Перейти</a>
        </div>
    </div>
</div>
</div> */}
