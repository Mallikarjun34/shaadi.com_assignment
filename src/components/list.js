import React, { useRef, useEffect, useState } from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

import map from 'lodash/map';
import range from 'lodash/range';
import 'bootstrap/dist/css/bootstrap.min.css';


const List = (props) => {

  const listInnerRef = useRef();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() =>{
    addItems();

  },[]);
  useEffect(()=>{
  },[list])
  const addItems = () =>{
    setIsLoading(true);
    let tempList  =[];
    for (let index = 0; index < (list.length + 10); index++) {
      tempList.push({
        userName:"User " + index,
        profileImg :"./img/download.jpg"

      });
    }
    setTimeout(() => {
      setIsLoading(false)
      setList(tempList)
    }, 2000);
  }
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        addItems()
      }
    }
  };

  const getSkeleton = () =>{
    return (
      <SkeletonTheme>
        {
          range(8).map(() =>(
            <div className="p-2 border m-2 d-flex align-items-center">
                <Skeleton height={50} width={50} />
                <div className="pl-4">
                  <Skeleton height={10} width={200} />
                </div>
            </div>
          ))
        }

      </SkeletonTheme>
    )
  }
  return (
    <div className="p-4">
        <div className="list">
      <div className="list-inner" onScroll={() => onScroll()} ref={listInnerRef}  style={{height:'480px', width:'320px', overflowY: "scroll"}}>
        {
          list.length ? map(list, item => (
            <div className="p-2 border m-2 d-flex align-items-center">
              <img src="img/download.jpg"  width="50px" />
              <div className="pl-4 ">{item.userName }</div>
            </div>
          ))
          : getSkeleton()
        }
        {
          isLoading ? (<div className="d-flex justify-content-center">
          <div className="spinner-border mt-2 mb-2" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>) :''
        }
      </div>
    </div>
    </div>
  );
}

export default List;
