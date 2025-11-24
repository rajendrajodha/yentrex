import { alertErrorMessage } from "../CustomAlert";

// Validation for spaces
export const handleSpaces = (e) => {
    if (e.key === ' ') {
        e.preventDefault();
    };
};

// Validation for all empty fields
export const validateFields = (fields, errorMessage = "Please enter all fields") => {
    for (const key in fields) {
        if (key === 'referralCode') continue; // Skip validation for referralCode
        
        const value = fields[key];
        if (!value || (value instanceof FileList && value.length === 0)) {
            return { isValid: false, message: `Please enter ${key}` || errorMessage };
        }
    }
    return { isValid: true };
};

// Basic email structure validation
export const validateEmailStructure = (email) => {
    // Basic email structure validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.error("Invalid email format");
        alertErrorMessage("Please enter a valid email address.");
        return false;
    }

    // Domain validation
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "appinop.com", "live.com"];
    const emailParts = email.split("@");
    if (emailParts.length === 2) {
        const domain = emailParts[1].toLowerCase();
        if (!validDomains.includes(domain)) {
            alertErrorMessage("Invalid email domain. Please use a valid email domain.");
            return false;
        }
    } else {
        alertErrorMessage("Invalid email format. Please include a valid domain.");
        return false;
    }

    return true; // Email is valid
};


// Basic password structure validation
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/;

    if (!passwordRegex.test(password)) {
        alertErrorMessage("Password must include at least one letter, one number, one special character, and be at least 5 characters long.");
        return false;
    }
    return true;
};


export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{0,10}$/; // Assuming a 10-digit phone number
    if (!phoneRegex.test(phone)) {
        alertErrorMessage("Phone number can only be 10 digits.");
        return false;
    }
    return true;
};





