import { useEffect, useRef, useState } from "react";
import { axiosAuthInstance } from "../axiosConfig";

export function UserAdminPannel() {
    const modalRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();

    async function deleteUser(id) {
        try {
            await axiosAuthInstance.delete(`/api/user/${id}`);
            window.alert('User deleted!');
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:',);
        } finally {
            modalRef.current.close();
        }
    }

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await axiosAuthInstance.get('/api/user');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching Users:');
            }
        }
        getUsers()
    }, [])

    return (
        <section className="grid h-full w-full pt-6 place-items-center" >
            <div class="relative max-w-3xl w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Roles
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {users?.map((user) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4 ">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user.role.map((role) => (
                                        <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1">{role}</span>
                                    ))}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => {
                                        setUser(user)
                                        modalRef.current.showModal()
                                    }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <dialog ref={modalRef} className="dialog p-6 bg-white rounded-md shadow-md w-96">
                <h1 className="text-2xl mb-6">You are about to delete a <bold>User</bold></h1>
                <p className="text-zinc-600 mb-4 text-center">This action is irreversible!</p>
                <div className="flex gap-2">
                    <button className="w-full px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => { deleteUser(user._id) }}>Delete</button>
                    <button className="w-full px-2 py-1 text-zinc-600 border border-zinc-700 rounded-md" onClick={() => { modalRef.current.close() }}>Cancel</button>
                </div>
            </dialog>
        </section>
    )
}