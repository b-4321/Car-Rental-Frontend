import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addCarVariant } from "../services/carVariantService";
import { toast } from "react-toastify";
import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import userContext from "../auth/userContext";
import { CAR_IMAGE_RESOURCE } from "../services/carService";

const OwnerReg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car;
  const userData = useContext(userContext);
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const insFuture = new Date();
  insFuture.setFullYear(today.getFullYear() + 5);
  const insMaxDate = insFuture.toISOString().split("T")[0];
  const pucFuture = new Date();
  pucFuture.setFullYear(today.getFullYear() + 1);
  const pucMaxDate = pucFuture.toISOString().split("T")[0];

  const [variantDetail, setVariantDetail] = useState({
    registration: "",
    insuranceValidity: "",
    pucValidity: "",
    modelColor: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    setVariantDetail({ ...variantDetail, [id]: value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setVariantDetail({ ...variantDetail, [name]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    addCarVariant(variantDetail, car.car.modelId, userData.user.userId).then((response) => {
      setVariantDetail({
        registration: "",
        insuranceValidity: "",
        pucValidity: "",
        modelColor: "",
      });
      setErrors({});
      toast.success("Car Registration " + response.registration + " Added");
      navigate("/dashowner");
    }).catch((error) => {
      setErrors(error);
    });
  };

  const inputStyles = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "& .MuiInputBase-input": {
      color: "white"
    },
    "& .MuiInputLabel-root": {
      color: "#ccc"
    },
    "& .MuiSelect-select": {
      color: "white",
      backgroundColor: "#1c2333"
    },
    "& .MuiSvgIcon-root": {
      color: "white"
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f26] px-4">
      <div className="flex flex-col md:flex-row bg-[#1c2333] rounded-xl shadow-xl shadow-blue-500 text-white overflow-hidden w-full max-w-5xl">
        { /*Left: Form*/}
        <div className="w-full md:w-1/2 p-6">
          <form className="space-y-6" onSubmit={submitForm}>
            <TextField
              label="Registration" variant="outlined" fullWidth
              id="registration" value={variantDetail.registration} onChange={handleChange}
              error={errors?.response?.data?.registration ? true : false}
              helperText={errors?.response?.data?.registration}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "gray" } }} sx={inputStyles}
            />

            <TextField
              label="Insurance Validity" type="date" variant="outlined" fullWidth
              id="insuranceValidity" value={variantDetail.insuranceValidity} onChange={handleChange}
              error={errors?.response?.data?.insuranceValidity ? true : false}
              helperText={errors?.response?.data?.insuranceValidity}
              InputLabelProps={{ shrink: true, style: { color: "gray" } }} sx={inputStyles}
              InputProps={{ style: { color: "white" }, inputProps: { min: minDate, max: insMaxDate } }}
            />

            <TextField
              label="PUC Validity" type="date" variant="outlined" fullWidth
              id="pucValidity" value={variantDetail.pucValidity} onChange={handleChange}
              error={errors?.response?.data?.pucValidity ? true : false}
              helperText={errors?.response?.data?.pucValidity}
              InputLabelProps={{ shrink: true, style: { color: "gray" } }} sx={inputStyles}
              InputProps={{ style: { color: "white" }, inputProps: { min: minDate, max: pucMaxDate } }}
            />
            <FormControl fullWidth sx={inputStyles} error={errors?.response?.data?.modelColor ? true : false}>
              <InputLabel>Model Color</InputLabel>
              <Select
                label="Model Color" name="modelColor"
                value={variantDetail.modelColor} onChange={handleSelectChange}
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Silver">Silver</MenuItem>
                <MenuItem value="Gray">Gray</MenuItem>
                <MenuItem value="Yellow">Yellow</MenuItem>
              </Select>
              <FormHelperText>{errors?.response?.data?.modelColor}</FormHelperText>
            </FormControl>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </button>
          </form>
        </div>
        { /*Right: Car Image*/}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f172a] p-6">
            <div className="flex flex-col items-center">
              <img
              src={CAR_IMAGE_RESOURCE + car.car.modelImage}
              alt="Swift Dzire"
              className="w-full max-w-xs h-auto rounded-xl object-cover"
            />
            <p className="mt-4 text-blue-200 text-lg font-semibold">CAR - {car.car.modelName}</p>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default OwnerReg;
