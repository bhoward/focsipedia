import React from 'react';
import Layout from '@theme/Layout';
function Fooling() {
  return (
    <Layout title="2020-04-01">
      <p>
        I tried to record this a bit differently, but something seems to have gone wrong:
      </p>
      <style type="text/css">{`
      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(180deg);
        }
      }
      `}</style>
      <video width="640" height="360" autoplay controls
        style={{
          animation: 'rotation 180s 10s infinite linear',
          'margin-left': 'auto',
          'margin-right': 'auto',
        }}>
      <source src="20200401.m4v" type="video/mp4" />
      Your browser does not support the video tag.
      </video>
      <p>
        Here is an <a href="https://www.youtube.com/watch?v=Kqu62P2JAnI">explanation</a> of what might have happened, and here is
        a <a href="https://drive.google.com/file/d/1ROAaRviOeUixoru-TFyfsojOF8LrjCmM/view">second attempt</a>.
      </p>
    </Layout>
  );
}
export default Fooling;