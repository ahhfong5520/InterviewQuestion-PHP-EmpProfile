import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/backend/employees.php";

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(`${BASE_URL}/data/employees.json`)
                .then((res) => {
                    const allEmployees = res.data;
                    setEmployees(allEmployees);
                })
                .catch((error) => console.error("Error loading employees data:", error));
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval); 
    }, []);

    //Read Multiple file for employees info
    //Previous Design was each employees save into one file.
    // useEffect(() => {
    //     const fetchData = () => {
    //         axios.get(`${BASE_URL}/data/files`)
    //             .then((res) => {
    //                 const files = res.data;

    //                 const promises = files.map((file) =>
    //                     axios.get(`${BASE_URL}/data/${file}`).then((res) => res.data)
    //                 );

    //                 Promise.all(promises)
    //                     .then((data) => {
    //                         const allEmployees = data.flat();
    //                         setEmployees(allEmployees);
    //                     })
    //                     .catch((error) => console.error("Error loading JSON files:", error));
    //             })
    //             .catch((error) => console.error("Error loading file list:", error));
    //     };

    //     fetchData();
    //     const interval = setInterval(fetchData, 5000);

    //     return () => clearInterval(interval);
    // }, []);

    return employees;
};

export default useEmployees;
