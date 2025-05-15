import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../axiosConfig";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "../components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Trash } from "@mynaui/icons-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { SectionTitle } from "./section-title";
import { useToast } from "../context/toastContext";

export function UserAdminPannel() {
    const [users, setUsers] = useState([]);
    const { addToast } = useToast();

    async function deleteUser(id) {
        try {
            await axiosAuthInstance.delete(`/api/user/${id}`);
            addToast({
                title: "Success",
                description: "User deleted successfully.",
                variant: "success",
                duration: 3000,
            });
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            addToast({
                title: "Error",
                description:
                    error.response.data?.message || "Failed to delete user. Please try again.",
                variant: "error",
                duration: 3000,
            });
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
        <section className="container mx-auto space-y-4 rounded-lg">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/product">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage href="/user-management">Order Management</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SectionTitle title="User Management" />

            <div className="mx-auto w-full overflow-x-auto bg-white border rounded-md p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge>{user.role.map((role) => (
                                        <span>{role}</span>
                                    ))}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant="ghost" size="icon"><Trash /></Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Delete Account?</DialogTitle>
                                                <DialogDescription>
                                                    Deleting your account is irreversible and will erase all your data. This action cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="outline">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button variant="destructive" onClick={() => deleteUser(user._id)} type="submit">Continue</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}