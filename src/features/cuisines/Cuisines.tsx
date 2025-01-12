import { useForm } from "react-hook-form";

import {
  useAddCuisinesMutation,
  useDeleteCuisinesMutation,
  useGetCuisinesQuery,
} from "../../slices/resturantSlice";
import styles from "./cuisine.module.css";
import table from "./table.module.css";
import { useState } from "react";
import Modal from "../../componets/Modal";

export interface CuisineData {
  id:string;
  cuisines : string;
}


const Cuisines = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isSuccess, isError } = useGetCuisinesQuery();
  const [deleteCuisines] = useDeleteCuisinesMutation();
  const [addCuisines] = useAddCuisinesMutation()

  const {
      register,
      handleSubmit,
    } = useForm<CuisineData>();


    const onSubmit = (data:CuisineData) =>{
      addCuisines(data)
      setOpen(false)
    }

  const handleDeleteCuisines = (id: string) => {
    alert("do you want to delete this cuisines");
    deleteCuisines(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className={styles.headerSearchRow}>
        
        <div>
          <h3>Cuisines</h3>
        </div>
        <div className={styles.headerSearchRight}>
          <div className={styles.searchCol}>
            <input type="text" placeholder="Search" className="form-control" />
          </div>
          <button type="button" className="btn btn-primary me-3">
            Search
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpen}
          >
            Add Cuisines
          </button>
        </div>
      </div>
      <div style={{ marginLeft: 100 }}>
        <div className="table-responsive">
          <table className={table.defaultTable}>
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Status</th>
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
              data?.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.cuisines}</td>
                    <td>
                      <label className="switch-box me-2">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </td>

                    <td>
                      <div className={styles.tableRightBtnAction}>
                        <button
                          type="button"
                          onClick={()=>{
                            setOpen(true)
                           
                          }}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteCuisines(item.id)}
                        >
                          delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
      {open && (
        <Modal isOpen={open}>
          <button  onClick={handleClose} style={{position:"relative",right:10,top:5,left:270}} >cross</button>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ alignSelf: "center" }}>
            <h1>Add Cuisines</h1>
            <div className="mb-3">
              <label className={styles.labelInfo}>cuisines</label>
              <input type="text" className="form-control"  {...register("cuisines")}/>
             
            </div>
            <button type="submit" className="btn btn-primary">
              add
            </button>
          </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Cuisines;
