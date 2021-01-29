import React from 'react';
import AnyChart from 'anychart-react';
import anychart from 'anychart';

export default function LikesGraph({ likesCount, getCount }) {
    let stage = anychart.graphics.create();
    let chart1 = anychart.line(likesCount);
    chart1.bounds(0, 0, '100%', '100%');

    return (
        <>
            <AnyChart
                instance={stage}
                width={800}
                height={400}
                charts={[chart1]}
            />
            <a
                className="waves-effect waves-light btn stats-btn"
                onClick={() => getCount(5)}
            >
                Недавнее
            </a>
            <a
                className="waves-effect waves-light btn stats-btn"
                onClick={() => getCount(25)}
            >
                За все время
            </a>
        </>
    );
}
