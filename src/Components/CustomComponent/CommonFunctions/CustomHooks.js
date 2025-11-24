import { useEffect, useState } from 'react';
import { validateFields, validatePhone } from './CommonFunc';
import useApiFunctions from '../../../services/ApiIntegration/ApiFuncitons';


// Form Data
export const useFormData = (initialState, errorMessage) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log("Handling Change:", name, value);
        console.log("🚀 ~ handleChange ~ files:", files)
        console.log("🚀 ~ handleChange ~ value:", value)
        console.log("🚀 ~ handleChange ~ name:", name)

        // if (name === 'phoneNumber' && !validatePhone(value)) return;

        if (files && files.length > 0) {
            setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
        } else {

            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const validateEmptyField = () => {
        return validateFields(formData, errorMessage);
    }


    return [formData, handleChange, validateEmptyField, setFormData];
};


// List Data
export const useListData = (initialState) => {
    const [listData, setListData] = useState(initialState);
    const [totalData, setTotalData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    return [listData, setListData, totalData, setTotalData, currentPage, setCurrentPage];
};



