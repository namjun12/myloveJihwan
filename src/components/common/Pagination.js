import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = () => {
   return (
      <div id="pagination">
         <div className="pagination col-group">
            <Link to="" className="page-btn">
               <i className="xi-angle-left-min"></i>
            </Link>
            <Link to="" className="page-btn active">
               1
            </Link>
            <Link to="" className="page-btn">
               2
            </Link>
            <Link to="" className="page-btn">
               3
            </Link>
            <Link to="" className="page-btn">
               4
            </Link>
            <Link to="" className="page-btn">
               5
            </Link>
            <Link to="" className="page-btn">
               <i className="xi-angle-right-min"></i>
            </Link>
         </div>
      </div>
   )
}

export default Pagination