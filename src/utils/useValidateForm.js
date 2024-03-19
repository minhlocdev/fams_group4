import dayjs from "dayjs";
import { useState } from "react";

const useValidateForm = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const newErrors = {};

        // Validate User Type
        if (!formData.permissionId) {
            newErrors.permissionId = "User type is required";
        }

        // Validate name
        if (formData.name.trim() === "") {
            newErrors.name = "User name is required";
        } else if (/^\d+$/.test(formData.name.trim())) {
            newErrors.name = "User name cannot consist of only numbers";
        }

        // Validate Email
        if (formData.email.trim() === "") {
            newErrors.email = "Email address is required";
        } else if (
            !/^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/.test(formData.email)
        ) {
            newErrors.email = "Email address is invalid";
        }

        // Validate Phone
        if (formData.phone.trim() === "") {
            newErrors.phone = "Phone number is required";
        } else if (!/^0\d{9,}$/.test(formData.phone)) {
            newErrors.phone = "Phone number is invalid";
        }

        // Validate DateofBirth
        const pickedDate = dayjs();
        const eighteenYearsAgo = pickedDate.subtract(18, "year");

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else if (dayjs(formData.dateOfBirth) > pickedDate) {
            newErrors.dateOfBirth = "Date of birth cannot be a future date";
        } else if (dayjs(formData.dateOfBirth) > eighteenYearsAgo) {
            newErrors.dateOfBirth = "User must be at least 18 years old";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    return { errors, validateForm };
};

export default useValidateForm;
