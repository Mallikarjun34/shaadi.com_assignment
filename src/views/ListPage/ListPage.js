import React from 'react';
import List from './../../components/list'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";


function ListPage() {
  let history = useHistory();

  return (
    <div className="p-4">
      <button type="button" className="btn btn-link float-right" onClick={()=>{history.push("/login");}}>Logout</button>

        <List />
    </div>
  );
}

export default ListPage;
