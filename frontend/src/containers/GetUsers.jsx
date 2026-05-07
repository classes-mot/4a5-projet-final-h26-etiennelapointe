import React from "react";
import { useEffect, useState } from "react";
import UserLists from "../components/userlist/UserList";
import ErrorMsg from "../components/UIElements/ErrorMsg";
import Spinner from "../components/UIElements/Spinner";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const responseData = await response.json();
                setUsers(responseData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [fetch]);

    return (
        <>
            <div>
                {isLoading && <Spinner />}
                <ErrorMsg message={error} onClose={() => setError(null)} />
            </div>
            <UserLists items={users} />
        </>
    );
};

export default Users;
