import { useEffect, useState } from "react";
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
  const [input, setInput] = useState<string>("");
  const [resturantData, setResturantData] = useState([]);

  useEffect(() => {
    setResturantData(resturants);
  }, [resturants]);

  console.log("resturantData", resturantData?.length);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  console.log("lastIndex", lastIndex);
  console.log("firstIndex", firstIndex);
  const records = resturantData?.slice(firstIndex, lastIndex);
  console.log("records", records);
  const npage = Math.ceil(resturantData?.length / recordsPerPage);
  console.log("npage", npage);

  // const numbers = [...Array(npage + 1).keys()].slice(1);

  // console.log("numbers",numbers)
  // console.log(npage)

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const change = (id: number) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDeleteResturant = (id: string) => {
    alert("are you sure you want to delete");
    deleteResturant(id);
  };
  const onHandleSearch = () => {
    const newData = resturants?.filter((item) => {
      return item.companyName.toLowerCase().includes(input.toLowerCase());
    });
    setResturantData(newData);
  };

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
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary me-3"
            onClick={onHandleSearch}
          >
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
            records?.map((resturant) => (
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
                        <NavLink
                          to={`addResturant/${resturant?.id}`}
                          style={{ color: "white" }}
                        >
                          Edit
                        </NavLink>
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

        <nav style={{position:"absolute",justifyContent:"right"}}>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={() => prevPage()}>
                PrevP
              </a>
            </li>
           

            {Array.from({ length: npage }, (_, index) => (
              <button
                key={index}
                onClick={() => change(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={() => nextPage()}>
                NextP
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Resturant;
