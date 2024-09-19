import React from "react";
import { Rate } from 'antd';

function FilterRate({ star }) {
  return (
    <div className="rate-item">
      <Rate disabled defaultValue={star} />
      <span style={{marginLeft:8}}>{star}</span>
      {star > 1 && <span> & up</span>}
    </div>
  );
}

export default FilterRate;
