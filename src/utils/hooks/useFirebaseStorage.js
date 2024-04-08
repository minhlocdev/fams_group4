import { useState } from "react";
import "firebase/storage";
import { fileDB } from "../FireBase";

const useFirebaseStorage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initialize Firebase Storage
    const storage = fileDB.storage();

    // Function to upload a file to Firebase Storage
    const uploadFile = async (file, fileName) => {
        setLoading(true);
        setError(null);
        const storageRef = storage.ref(fileDB);
        const fileRef = storageRef.child(fileName);
        try {
            await fileRef.put(file);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    // Function to get a file from Firebase Storage
    const getFile = async (fileName) => {
        setLoading(true);
        setError(null);
        const storageRef = storage.ref(fileDB);
        const fileRef = storageRef.child(fileName);
        try {
            const url = await fileRef.getDownloadURL();
            setLoading(false);
            return url;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            return null;
        }
    };

    // Function to delete a file from Firebase Storage
    const deleteFile = async (fileName) => {
        setLoading(true);
        setError(null);
        const storageRef = storage.ref(fileDB);
        const fileRef = storageRef.child(fileName);
        try {
            await fileRef.delete();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return {
        error,
        loading,
        uploadFile,
        getFile,
        deleteFile,
    };
};

export default useFirebaseStorage;
