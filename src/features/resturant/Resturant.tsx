import { useState } from "react";
import {
  useDeleteResturantMutation,
  useGetResturantsQuery,
} from "../../slices/resturantSlice";
import styles from "./resturant.module.css";
import table from "./table.module.css";
import { NavLink } from "react-router-dom";

const Resturant = () => {
  const {
    data: resturants,
    isSuccess,
    isError,
    isLoading,
  } = useGetResturantsQuery();
  console.log("resturant lentgh", resturants?.length);
  const [deleteResturant] = useDeleteResturantMutation();

  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 5;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = resturants?.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(resturants?.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);
  // console.log(npage)

  // const prevPage = () =>{
  //   if(currentPage !== 1){
  //     setCurrentPage(currentPage - 1)
  //   }
  // }
  // const change = (id:number) =>{
  // setCurrentPage(id)
  // }
  // const nextPage = () =>{
  //   if(currentPage !== npage){
  //     setCurrentPage(currentPage + 1)
  //   }
  // }
  const handleDeleteResturant =(id:string) =>{
    alert("are you sure you want to delete");
    deleteResturant(id)
  }

  return (
    <div>
      <div className={styles.headerSearchRow}>
        <div>
          <h3>Restaurants</h3>
          <p>
            Note: Please arrange category sequence/rank from the category
            section using import/export sheet.
          </p>
        </div>
        <div className={styles.headerSearchRight}>
          <div className={styles.searchCol}>
            <input type="text" placeholder="Search" className="form-control" />
          </div>
          <button type="button" className="btn btn-primary me-3">
            Search
          </button>
          <button type="button" className="btn btn-primary me-3">
            Advance Search
          </button>
          <button type="button" className="btn btn-primary">
            <NavLink
              to="/addResturant"
              style={{ color: "white", textDecoration: "none" }}
            >
              Add a New Resturant
            </NavLink>
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className={table.defaultTable}>
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Owner Name</th>
              <th>Number of Outlets</th>
              <th>Location</th>
              <th>Email ID</th>
              <th>Mobile No.</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading && (
            <span
              style={{
                textAlign: "center",
              }}
            >
              Loading..
            </span>
          )}
          {isError && <span>Something went wrong</span>}
          {isSuccess &&
            resturants?.slice(0, 10).map((resturant) => (
              <tbody key={resturant.id}>
                <tr>
                  <td>{resturant.companyName}</td>
                  <td>{resturant.ownerName}</td>
                  <td>{resturant.id}</td>
                  <td>{resturant.adress1}</td>
                  <td>{resturant.managerEmail}</td>
                  <td>{resturant.phoneNumber}</td>
                  <td>
                    <div className={styles.tableRightBtnAction}>
                      <label className="switch-box me-2">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>

                      <button type="button" className="btn btn-primary">
                      <NavLink  to={`addResturant/${resturant?.id}`} style={{color:"white"}}>Edit</NavLink>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteResturant(resturant.id)}
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>

        {/* <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={() => prevPage()}>
                PrevP
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a href="#" className="page-link" onClick={() => change()}>
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={() => nextPage()}>
                NextP
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
};

export default Resturant;
