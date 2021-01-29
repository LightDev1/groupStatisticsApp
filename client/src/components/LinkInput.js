import React, { useState } from 'react';

export default function LinkInput({ getInfo }) {
    const [link, setLink] = useState('');

    const keyDownHandler = (key) => {
        if (key === 'Enter' && link.trim()) {
            if (!link.search(/(https?:\/\/[^\s]+)/g)) {
                getInfo(link, 2);
                setLink('');
                console.log(link.search(/(https?:\/\/[^\s]+)/g));
            } else {
                alert('Невалидная ссылка');
            }
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-2">
                <div className="input-field">
                    <input
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
                        onKeyDown={(event) => keyDownHandler(event.key)}
                        id="link"
                        type="text"
                        className="validate"
                    />
                    <label className="active" htmlFor="link">Вставьте вашу ссылку</label>
                </div>
            </div>
        </div>
    );
}
