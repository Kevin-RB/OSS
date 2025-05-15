import { useEffect, useRef, useState } from "react";
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
import { Slash } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"

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
        <Dialog>
            <Breadcrumb className="container my-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbPage>User Management</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="overflow-x-auto border rounded-md shadow-sm bg-white container">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Action</TableHead>
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
                        <TableCell>
                            <DialogTrigger>
                            <Button size="icon" variant="destructive"><Trash/></Button>
                            </DialogTrigger>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
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
                    <Button variant="destructive" type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}