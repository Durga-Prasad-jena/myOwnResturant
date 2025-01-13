import styles from "./add-resturant.module.css";
import { useForm } from "react-hook-form";
import { Resturant } from "../../models/resturant.module";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddResturantMutation,
  useGetResturantQuery,
  useUpdateResturantMutation,
} from "../../slices/resturantSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  companyName: yup
    .string()
    .required("companyName is a required field")
    .min(6)
    .max(30),
  resturantName: yup
    .string()
    .required("resturantName is a required field")
    .min(6)
    .max(30),
  resturantLogo: yup
    .string()
    .required("resturantLogo is a required field")
    .min(6)
    .max(30),
  fssiLicNumber: yup
    .string()
    .trim()
    .required("Name is a required field")
    .min(2)
    .max(30),
  ownerName: yup.string().trim().required("Name is a required field"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone is a required field"),
    // .matches(
    //   /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    //   "Invalid phone number format"
    // ),,

  branchManagerName: yup
    .string()
    .trim()
    .required("Name is a required field")
    .min(6)
    .max(30),
  managerEmail: yup
    .string()
    .trim()
    .required("Name is a required field")
    .email(),
  adress1: yup
    .string()
    .trim()
    .required("Name is a required field")
    .min(6)
    .max(30),
  adress2: yup
    .string()
    .trim()
    .required("Name is a required field")
    .min(2)
    .max(30),
});

export const Addresturant = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateResturant] = useUpdateResturantMutation();
  const { data } = useGetResturantQuery(id!);
  console.log("data=========>>>>>>",data)
  const [addResturant,refetch] = useAddResturantMutation();


 

  useEffect(() => {
    if (id && data) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [id, data]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Resturant>({
    defaultValues: {
      resturantName:data?.companyName,
      adress1:data?.adress1,  
      adress2:data?.adress2,
      branchManagerName:data?.branchManagerName,
      companyName:data?.companyName,
      fssiLicNumber:data?.fssiLicNumber,
      managerEmail:data?.managerEmail,
      ownerName:data?.ownerName,
      phoneNumber:data?.phoneNumber,
      resturantLogo:data?.resturantLogo,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (allData: Resturant) => {
    if (editMode) {
      await updateResturant(allData);
    } else {
      await addResturant(allData).then(()=>{refetch()})
    }
    navigate("/");
    setEditMode(false);
  };

  return (
    <div className="ddd">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.restaurantHeader}>
          <h3>Add Restaurant</h3>
          <p>
            Below are the configuration to manage your information. Click on the
            Save button once you add the information.
          </p>
        </div>
        <div className={styles.restaurantInfoBox}>
          <h4>Restaurant Information</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("resturantName")}
                />
                {errors.resturantName && (
                  <p style={{ color: "red" }}>{errors.resturantName.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p style={{ color: "red" }}>{errors.companyName.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Restaurant Logo</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("resturantLogo")}
                />
                {errors.resturantLogo && (
                  <p style={{ color: "red" }}>{errors.resturantLogo.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Cuisines</label>
                <select className="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Restaurant Type</label>
                <div className={styles.checkboxList}>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="fineDine"
                    />{" "}
                    Fine Dine
                  </label>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="foodCourt"
                    />{" "}
                    Food Court
                  </label>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="qsr"
                    />{" "}
                    QSR
                  </label>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="cloudKitchen"
                    />{" "}
                    Cloud Kitchen
                  </label>
                  <label className="form-check-label">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="other"
                    />{" "}
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Online Order Channel</label>
                <div className={styles.checkboxList}>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="zomato"
                    />{" "}
                    Zomato
                  </label>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="swiggy"
                    />{" "}
                    Swiggy
                  </label>
                  <label className="form-check-label me-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="uberEats"
                    />{" "}
                    Uber Eats
                  </label>
                  <label className="form-check-label">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="other"
                    />{" "}
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Seating Capacity</label>
                <select className="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>FSSAI Lic Number</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("fssiLicNumber")}
                />
                {errors.fssiLicNumber && (
                  <p style={{ color: "red" }}>{errors.fssiLicNumber.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className={styles.labelInfo}>Special Note</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.restaurantInfoBox}>
          <h4>Contact Information</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("ownerName")}
                />
                {errors.ownerName && (
                  <p style={{ color: "red" }}>{errors.ownerName.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Owner Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Owner Email</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Branch Manager name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("branchManagerName")}
                />
                {errors.branchManagerName && (
                  <p style={{ color: "red" }}>
                    {errors.branchManagerName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>
                  Branch Manager Phone Number
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Branch Manager Email</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("managerEmail")}
                />
                {errors.branchManagerName && (
                  <p style={{ color: "red" }}>
                    {errors.branchManagerName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.restaurantInfoBox}>
          <h4>Address Information </h4>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Address 1</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("adress1")}
                />
                {errors.adress1 && (
                  <p style={{ color: "red" }}>{errors.adress1.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("adress2")}
                />
                {errors.adress2 && (
                  <p style={{ color: "red" }}>{errors.adress2.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Country</label>
                <select className="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>State</label>
                <select className="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>City</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Zipcode</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className={styles.labelInfo}>Timezone</label>
                <select className="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <button type="submit">{editMode ? "Update " : "Add "}</button>
          </div>
        </div>
      </form>
    </div>
  );
};
